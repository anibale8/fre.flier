// ============================================================
// PROJECTS
// To add a new one, copy an object and paste it at the end.
// Required fields: id, code, slug, title, year, location, format, cover, thumb, images[]
// shortTitle (optional): name shown above the cover in the Image view on mobile,
//   so long names fit on one line and the covers stay level
// thumb: 112×112 square version of the cover, shown as the map marker
// images[].orient: "landscape" | "portrait"
// coords: [lat, lng] — where the project appears on the Map view
// Photos live in projects/<folder>/ — use relative urls,
// e.g. { url: "projects/001_ronchamp/01_RONCHAMP.webp", orient: "portrait" }
// ============================================================

const projects = [
  {
    id: 1,
    code: "001",
    slug: "ronchamp",
    title: "Ronchamp",
    year: 2026,
    location: "France",
    architect: "Le Corbusier",
    format: "Architecture",
    coords: [47.7047, 6.6203],
    description: "It only took a moment in front of one façade to understand what Le Corbusier was searching for here: bringing the building closer to the people who would experience it. He fragments it. Breaks it apart. Creates small moments to inhabit. Staircases, openings, lecterns. Perched on top of the hill, this object could easily feel detached from the landscape, almost imposed upon it. Yet these fragments make it intimate. Approachable. They invite occupation and appropriation. They give a human scale to the great sloping walls, softening what might otherwise feel like a single, monolithic form.\n\nNotre Dame du Haut, Ronchamp, France.",
    cover: "projects/001_ronchamp/01_RONCHAMP.webp",
    thumb: "projects/001_ronchamp/01_RONCHAMP_thumb.webp",
    images: [
      { url: "projects/001_ronchamp/01_RONCHAMP.webp", orient: "portrait" },
      { url: "projects/001_ronchamp/02_RONCHAMP.webp", orient: "portrait" },
      { url: "projects/001_ronchamp/03_RONCHAMP.webp", orient: "landscape" },
      { url: "projects/001_ronchamp/04_RONCHAMP.webp", orient: "portrait" },
      { url: "projects/001_ronchamp/05_RONCHAMP.webp", orient: "portrait" },
      { url: "projects/001_ronchamp/06_RONCHAMP.webp", orient: "portrait" },
      { url: "projects/001_ronchamp/07_RONCHAMP.webp", orient: "portrait" },
      { url: "projects/001_ronchamp/08_RONCHAMP.webp", orient: "portrait" }
    ]
  },
  {
    id: 2,
    code: "002",
    slug: "la-tourette",
    title: "La Tourette",
    year: 2026,
    location: "France",
    architect: "Le Corbusier",
    format: "Architecture",
    coords: [45.8194, 4.6236], // Éveux, near Lyon
    description: "On such a bright day, all I could think about was how the immense concrete mass that greets you slowly dissolves into slender supports, as if it were fading away just to touch the ground. Surrounded by such an untouched landscape, the contrast between architecture and nature becomes even more intense. The weight of the concrete longs to meet the grass. The scale of the building gradually breaks apart, allowing itself to merge with its surroundings. The grass seems to flow into the building, or perhaps the building simply opens itself to the landscape.\n\nSainte Marie de La Tourette, Éveux, France.",
    cover: "projects/002_LA TOURETTE_2026/09_LA TOURETTE.webp",
    thumb: "projects/002_LA TOURETTE_2026/09_LA TOURETTE_thumb.webp",
    images: [
      { url: "projects/002_LA TOURETTE_2026/01_LA TOURETTE.webp", orient: "landscape" },
      { url: "projects/002_LA TOURETTE_2026/02_LA TOURETTE.webp", orient: "landscape" },
      { url: "projects/002_LA TOURETTE_2026/03_LA TOURETTE.webp", orient: "landscape" },
      { url: "projects/002_LA TOURETTE_2026/04_LA TOURETTE.webp", orient: "portrait" },
      { url: "projects/002_LA TOURETTE_2026/05_LA TOURETTE.webp", orient: "landscape" },
      { url: "projects/002_LA TOURETTE_2026/06_LA TOURETTE.webp", orient: "portrait" },
      { url: "projects/002_LA TOURETTE_2026/07_LA TOURETTE.webp", orient: "landscape" },
      { url: "projects/002_LA TOURETTE_2026/08_LA TOURETTE.webp", orient: "landscape" },
      { url: "projects/002_LA TOURETTE_2026/09_LA TOURETTE.webp", orient: "portrait" }
    ]
  },
  {
    id: 3,
    code: "003",
    slug: "les-cols",
    title: "Les Cols",
    year: 2025,
    location: "Spain",
    architect: "RCR Arquitectes",
    format: "Architecture",
    coords: [42.1817, 2.489], // Olot, Girona
    description: "Les Cols Restaurant Pavilion by RCR Arquitectes\n\nRestaurant Les Cols, Olot, Spain.",
    cover: "projects/003_LES COLS_2025/01_LES COLS.webp",
    thumb: "projects/003_LES COLS_2025/01_LES COLS_thumb.webp",
    images: [
      { url: "projects/003_LES COLS_2025/01_LES COLS.webp", orient: "portrait" },
      { url: "projects/003_LES COLS_2025/02_LES COLS.webp", orient: "landscape" },
      { url: "projects/003_LES COLS_2025/03_LES COLS.webp", orient: "landscape" },
      { url: "projects/003_LES COLS_2025/04_LES COLS.webp", orient: "portrait" },
      { url: "projects/003_LES COLS_2025/05_LES COLS.webp", orient: "landscape" },
      { url: "projects/003_LES COLS_2025/06_LES COLS.webp", orient: "landscape" }
    ]
  },
  {
    id: 4,
    code: "004",
    slug: "college-of-art-chandigarh",
    title: "College of Art Chandigarh",
    shortTitle: "College of Art",
    year: 2026,
    location: "India",
    architect: "Aditya Prakash, A. R. Prabhawalkar, Le Corbusier",
    format: "Architecture",
    coords: [30.7499, 76.789], // Jan Marg, Sector 10, Chandigarh
    description: "Government College of Art, Chandigarh, India.",
    cover: "projects/004_COLLEGE OF ART_2026/11_COLLEGE OF ART.webp",
    thumb: "projects/004_COLLEGE OF ART_2026/11_COLLEGE OF ART_thumb.webp",
    images: [
      { url: "projects/004_COLLEGE OF ART_2026/01_COLLEGE OF ART.webp", orient: "landscape" },
      { url: "projects/004_COLLEGE OF ART_2026/02_COLLEGE OF ART.webp", orient: "landscape" },
      { url: "projects/004_COLLEGE OF ART_2026/03_COLLEGE OF ART.webp", orient: "landscape" },
      { url: "projects/004_COLLEGE OF ART_2026/04_COLLEGE OF ART.webp", orient: "landscape" },
      { url: "projects/004_COLLEGE OF ART_2026/05_COLLEGE OF ART.webp", orient: "landscape" },
      { url: "projects/004_COLLEGE OF ART_2026/06_COLLEGE OF ART.webp", orient: "landscape" },
      { url: "projects/004_COLLEGE OF ART_2026/07_COLLEGE OF ART.webp", orient: "portrait" },
      { url: "projects/004_COLLEGE OF ART_2026/08_COLLEGE OF ART.webp", orient: "portrait" },
      { url: "projects/004_COLLEGE OF ART_2026/09_COLLEGE OF ART.webp", orient: "landscape" },
      { url: "projects/004_COLLEGE OF ART_2026/10_COLLEGE OF ART.webp", orient: "landscape" },
      { url: "projects/004_COLLEGE OF ART_2026/11_COLLEGE OF ART.webp", orient: "portrait" }
    ]
  }
];
