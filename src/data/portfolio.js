const year = new Date().getFullYear()

export const site = {
  brand: "khalid.vsl",
  name: "Khalid",
  role: "Independent Video Editor & Motion Designer",
  line: "Clean edits, thoughtful motion, and visual storytelling for brands and creators — based in Casablanca, working worldwide.",
  email: "khalid1editor@gmail.com",
  whatsapp: "https://wa.me/212646173884",
  instagram: "https://www.instagram.com/khalid.vsl/",
  portrait: "/khalid-portrait.png",
  year,
}

export const nav = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
]

export const projects = [
  {
    id: "mariam-motion",
    title: "Motion Graphics — Mariam",
    categoryLabel: "Motion Graphics",
    aspectRatio: 9 / 16,
    vimeoId: "1231078928",
    poster:
      "https://i.vimeocdn.com/video/2206153678-251bb34d0635f7a4f08ec61ca3056dd4301f73e50323a64174d4196720dc4e58-d_540x960?region=us",
    description:
      "Animated visuals and kinetic text built in After Effects — rhythm, type and color doing the storytelling.",
  },
  {
    id: "gobird-motion",
    title: "Motion Graphics — GoBird",
    categoryLabel: "Motion Graphics",
    aspectRatio: 9 / 16,
    vimeoId: "1231079235",
    poster:
      "https://i.vimeocdn.com/video/2206153944-72c4f9545b9ce5a060c734aba0df20f9091b67cfc8e5d4a5563756a293601d90-d_540x960?region=us",
    description:
      "Motion-graphics piece — animated logo and branding sequence in After Effects.",
  },
  {
    id: "dr-salma-vitamins",
    title: "Dr Salma — Vitamins",
    categoryLabel: "Talking Head",
    aspectRatio: 9 / 16,
    vimeoId: "1230048855",
    poster:
      "https://i.vimeocdn.com/video/2204861990-92906d1309e2ff8986d45d53344fea7b2735f884af66e87a1586ab897af53b3f-d_540x960?region=us",
    description:
      "Short-form talking-head video — clean cut, clean audio, purposeful captions.",
  },
  {
    id: "dr-saheer-ibd",
    title: "Dr Saheer — IBD",
    categoryLabel: "Talking Head",
    industry: "Healthcare",
    aspectRatio: 9 / 16,
    vimeoId: "1230048854",
    poster:
      "https://i.vimeocdn.com/video/2204862025-3dcd4b6d0ed5a6820bb183e87883291a5efa30c4561c6224d3e8f6ec4bcbc41b-d_540x960?region=us",
    description:
      "Short-form talking-head video — clean cut, clean audio, purposeful captions.",
  },
  {
    id: "dr-talaa-consultation",
    title: "Dr. Talaa — Consultation",
    categoryLabel: "Talking Head",
    aspectRatio: 9 / 16,
    vimeoId: "1230048945",
    poster:
      "https://i.vimeocdn.com/video/2204862017-fb6e5e32d783b44e2cfea034074c0d49412238a0466ccc890a8c01dfe480d238-d_540x960?region=us",
    description:
      "Short-form talking-head video — clean cut, clean audio, purposeful captions.",
  },
  {
    id: "dr-amr-teeth",
    title: "Dr Amr — Crowded Teeth",
    categoryLabel: "Talking Head",
    aspectRatio: 9 / 16,
    vimeoId: "1230048853",
    poster:
      "https://i.vimeocdn.com/video/2204862018-4c25b6dd6268a48cdbc97cc6239412da30d0cd7a89e5e63ff3f8387ed9759dbe-d_540x960?region=us",
    description:
      "Short-form talking-head video — clean cut, clean audio, purposeful captions.",
  },
  {
    id: "dr-haitham-implant",
    title: "Dr Haitham — Confused Implant",
    categoryLabel: "Talking Head",
    aspectRatio: 9 / 16,
    vimeoId: "1230048852",
    poster:
      "https://i.vimeocdn.com/video/2204861611-daca752eac7d8ffa92b4f7d73a554403d5b344f769ca0a0f8fb66ec15a49176a-d_540x960?region=us",
    description:
      "Short-form talking-head video — clean cut, clean audio, purposeful captions.",
  },
  {
    id: "dr-mohamad-ortho",
    title: "Dr Mohamad — Ortho Fact",
    categoryLabel: "Talking Head",
    aspectRatio: 9 / 16,
    vimeoId: "1230672379",
    poster:
      "https://i.vimeocdn.com/video/2205624862-2a54f22ace3ca6d5c10144a1bd241f98bf9d441fa630eb08521ef5997b8df9c7-d_540x960?region=us",
    description:
      "Short-form talking-head video — clean cut, clean audio, purposeful captions.",
  },
  {
    id: "dr-fifi",
    title: "Dr Fifi",
    categoryLabel: "Talking Head",
    aspectRatio: 9 / 16,
    vimeoId: "1230676466",
    poster:
      "https://i.vimeocdn.com/video/2205629864-f2522de49f422036ec84b2a051ab300239804ba3fddf502871e118deefefa3af-d_540x960?region=us",
    description:
      "Short-form talking-head video — clean cut, clean audio, purposeful captions.",
  },
]

/* curated layout: one featured spread, a pair, a mirrored spread, then the rest */
export const workLayout = {
  featured: "mariam-motion",
  pair: ["gobird-motion", "dr-salma-vitamins"],
  featured2: "dr-saheer-ibd",
  minis: [
    "dr-talaa-consultation",
    "dr-amr-teeth",
    "dr-haitham-implant",
    "dr-mohamad-ortho",
    "dr-fifi",
  ],
}

export const services = [
  {
    title: "Video editing",
    text: "Clean cuts, precise pacing and sound — from raw footage to a finished piece.",
  },
  {
    title: "Motion graphics",
    text: "Titles, kinetic type and animated elements built in After Effects.",
  },
  {
    title: "Short-form content",
    text: "Vertical edits for Reels, TikTok and Shorts, built to hold attention.",
  },
]

export const about = {
  photo: "/khalid-portrait.png",
  lede: "I'm Khalid, a video editor and motion designer based in Casablanca, working with brands and creators worldwide.",
  sub: "I focus on clear storytelling, precise pacing, and motion that adds meaning to the edit.",
}

export const contact = {
  title: "Let's make something great",
  sub: "Have a project in mind? Tell me what you're looking to create.",
  formEndpoint: "https://formsubmit.co/ajax/khalid1editor@gmail.com",
}
