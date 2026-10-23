// ============================================================
// fichas.mjs — run after editing js/projects.js:  node scripts/fichas.mjs
//
// The project viewer is built with JavaScript, so Google used to receive
// project.html?slug=… with a generic title, no text and a generic canonical.
// This script writes one real HTML page per project (project/<slug>/index.html)
// from project.html, with its own title, description, canonical, Open Graph,
// structured data, H1, text and first photo already in the HTML. The viewer
// (js/main.js) then works exactly as before on top of it.
//
// It also:
//  - writes the cover strip into index.html (between the fichas markers), so the
//    home page links to every project without JavaScript;
//  - makes <cover>_og.jpg (1200 px wide JPG, for WhatsApp/social link previews)
//    with ffmpeg if missing;
//  - rewrites sitemap.xml with every page and the photos of each project.
// No dependencies: Node 18+ and ffmpeg (only to make missing og images).
// ============================================================
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://freflier.com";
const read = (f) => readFileSync(join(ROOT, f), "utf8");
const projects = vm.runInNewContext(`${read("js/projects.js")}\n;projects`);

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const url = (path) => `${SITE}/${encodeURI(path)}`;
const pageUrl = (p) => `${SITE}/project/${p.slug}/`;
const og = (p) => p.cover.replace(/\.\w+$/, "_og.jpg");
// Same title and description js/main.js sets when a project is shown.
const pageTitle = (p) => `${p.title}${p.architect ? ` (${p.architect})` : ""} — fre.flier · Alicia de Lucas Bautista`;
function summary(p) {
  const s = (p.description || "").replace(/\s+/g, " ").trim();
  return s.length > 155 ? s.slice(0, 152).replace(/\s+\S*$/, "") + "…" : s;
}
// Same cells as infoCells() in js/main.js: the H1 goes in the top line, a span in the intro copy.
const infoCells = (p, asHeading) => {
  const tag = asHeading ? "h1" : "span";
  return `
    <span class="table-cell">${esc(p.code)}</span>
    <${tag} class="table-cell">${esc(p.title)}</${tag}>
    <span class="table-cell">${esc(p.format)}</span>
    <span class="table-cell">${esc(p.location)}</span>
    <span class="table-cell">${esc(p.year)}</span>
  `;
};
// The page arrives already in its intro state (blurred photo, name centred), the same frame
// playIntro() shows, so the sharp photo is never painted before the name. Without JavaScript
// the viewer can't run, so the intro state is undone.
const noScriptIntro =
  "<noscript><style>body.intro-hold{pointer-events:auto}body.intro-hold #project-photo{filter:none;opacity:1}body.intro-hold .project-info{opacity:1}body.intro-hold .project-intro{opacity:0}</style></noscript>";

/* ── og images ──────────────────────────── */
function findFfmpeg() {
  const links = join(process.env.LOCALAPPDATA || "", "Microsoft", "WinGet", "Links", "ffmpeg.exe");
  for (const c of [process.env.FFMPEG, links, "ffmpeg"]) {
    if (!c) continue;
    try { execFileSync(c, ["-version"], { stdio: "ignore" }); return c; } catch {}
  }
  const pkgs = join(process.env.LOCALAPPDATA || "", "Microsoft", "WinGet", "Packages");
  if (existsSync(pkgs)) {
    for (const d of readdirSync(pkgs).filter((n) => /ffmpeg/i.test(n))) {
      const stack = [join(pkgs, d)];
      while (stack.length) {
        const dir = stack.pop();
        for (const e of readdirSync(dir, { withFileTypes: true })) {
          const f = join(dir, e.name);
          if (e.isDirectory()) stack.push(f);
          else if (/^ffmpeg(\.exe)?$/i.test(e.name)) return f;
        }
      }
    }
  }
  return null;
}
let ffmpeg;
function makeImage(from, to, args) {
  if (existsSync(join(ROOT, to))) return;
  ffmpeg ??= findFfmpeg();
  if (!ffmpeg) throw new Error(`Missing ${to} and ffmpeg was not found (set FFMPEG=path/to/ffmpeg).`);
  execFileSync(ffmpeg, ["-v", "error", "-y", "-i", join(ROOT, from), ...args, join(ROOT, to)]);
  console.log(`  made ${to}`);
}
for (const p of projects) makeImage(p.cover, og(p), ["-vf", "scale=1200:-2", "-q:v", "4"]);

/* ── one page per project ───────────────── */
const template = read("project.html").replace(/\s*<!-- redirect:start -->[\s\S]*?<!-- redirect:end -->/, "");
rmSync(join(ROOT, "project"), { recursive: true, force: true });
for (const p of projects) {
  const link = pageUrl(p);
  const desc = summary(p);
  const first = p.images[0];
  const data = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${link}#gallery`,
    url: link,
    name: pageTitle(p),
    headline: p.title,
    description: desc,
    inLanguage: "en",
    author: { "@id": `${SITE}/#alicia` },
    creator: { "@type": "Person", "@id": `${SITE}/#alicia`, name: "Alicia de Lucas Bautista", url: `${SITE}/about.html` },
    isPartOf: { "@id": `${SITE}/#web` },
    ...(p.coords ? { contentLocation: { "@type": "Place", name: `${p.title}, ${p.location}`, geo: { "@type": "GeoCoordinates", latitude: p.coords[0], longitude: p.coords[1] } } } : {}),
    image: p.images.map((im) => url(im.url)),
  };
  const html = template
    .replace(/<meta charset="UTF-8">/, '<meta charset="UTF-8">\n  <base href="/">')
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(pageTitle(p))}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(desc)}" id="meta-description">\n  <link rel="canonical" href="${link}" id="canonical">`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(pageTitle(p))}">`)
    .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(desc)}">`)
    .replace(/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${url(og(p))}">`)
    .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${link}">`)
    .replace(/<meta property="og:type"[^>]*>/, `<meta property="og:type" content="article">`)
    .replace("</head>", `  <script type="application/ld+json">\n  ${JSON.stringify(data)}\n  </script>\n  ${noScriptIntro}\n</head>`)
    .replace(/<body class="no-scroll">/, '<body class="no-scroll intro-hold">')
    .replace(/<div class="project-info" id="project-info"><\/div>/, `<div class="project-info" id="project-info">${infoCells(p, true)}</div>`)
    .replace(/<div class="project-intro" id="project-intro"><\/div>/, `<div class="project-intro" id="project-intro">${infoCells(p, false)}</div>`)
    .replace(/<img id="project-photo" src="" alt="">/, `<img id="project-photo" src="${esc(encodeURI(first.url))}" alt="${esc(`${p.title} — 1`)}">`)
    .replace(
      /<div class="project-description" id="project-description"><\/div>/,
      `<div class="project-description" id="project-description">${(p.description || "").split("\n\n").map((t) => `<p>${esc(t)}</p>`).join("")}</div>`,
    );
  for (const marker of ["<base href", 'rel="canonical"', "<h1", 'id="project-photo" src="projects', "intro-hold", 'id="project-intro">\n']) {
    if (!html.includes(marker)) throw new Error(`project.html changed: could not place ${marker} in ${p.slug}`);
  }
  mkdirSync(join(ROOT, "project", p.slug), { recursive: true });
  writeFileSync(join(ROOT, "project", p.slug, "index.html"), html);
  console.log(`  project/${p.slug}/`);
}

/* ── home strip ─────────────────────────── */
// Same markup as buildStrip() in js/main.js, which replaces it when the page loads.
const strip = projects
  .map((p) => {
    const label = p.shortTitle
      ? `<span class="label-full">${esc(p.title)}</span><span class="label-short">${esc(p.shortTitle)}</span>`
      : esc(p.title);
    return `    <a class="strip-item" href="/project/${p.slug}/?from=image" data-year="${esc(p.year)}" data-location="${esc(p.location)}" data-format="${esc(p.format)}">
      <div class="strip-item-label">${esc(p.code)} ${label}</div>
      <div class="strip-item-img"><img src="${esc(encodeURI(p.cover))}" alt="${esc(p.title)}" loading="lazy"></div>
    </a>`;
  })
  .join("\n");
const index = read("index.html");
const start = "<!-- fichas:start -->", end = "<!-- fichas:end -->";
if (!index.includes(start) || !index.includes(end)) throw new Error("index.html: fichas markers not found");
writeFileSync(
  join(ROOT, "index.html"),
  index.replace(new RegExp(`${start}[\\s\\S]*?${end}`), `${start}\n${strip}\n    ${end}`),
);
console.log("  index.html strip");

/* ── sitemap ────────────────────────────── */
// lastmod: the newest photo of each project folder (not the card/og/thumb copies made from them).
const newest = (dir) =>
  Math.max(...readdirSync(join(ROOT, dir)).filter((f) => !/_(card|og|thumb)\.\w+$/.test(f)).map((f) => statSync(join(ROOT, dir, f)).mtimeMs));
const day = (ms) => new Date(ms).toISOString().slice(0, 10);
const entries = [
  { loc: `${SITE}/`, lastmod: day(statSync(join(ROOT, "js/projects.js")).mtimeMs) },
  { loc: `${SITE}/about.html`, lastmod: day(statSync(join(ROOT, "about.html")).mtimeMs) },
  ...projects.map((p) => ({
    loc: pageUrl(p),
    lastmod: day(newest(dirname(p.cover))),
    images: p.images.map((im) => url(im.url)),
  })),
];
writeFileSync(
  join(ROOT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries
  .map((e) => `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>${(e.images ?? []).map((i) => `\n    <image:image><image:loc>${esc(i)}</image:loc></image:image>`).join("")}
  </url>`)
  .join("\n")}
</urlset>
`,
);
console.log(`  sitemap.xml (${entries.length} pages)`);
