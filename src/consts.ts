/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SITE CONTENT & BUSINESS DATA — single source of truth
 * ─────────────────────────────────────────────────────────────────────────
 *  Almost everything a non-developer would change lives here: business name,
 *  contact details, services & pricing, testimonials, FAQ, gallery, nav, and
 *  SEO defaults. Edit this one file and the pages, footer, and JSON-LD schema
 *  all update automatically.
 *
 *  CONTENT SOURCE: Text, pricing, testimonials, and images were migrated from
 *  the live WordPress site (pupcutspa.com) in September 2026. The five
 *  testimonials are verbatim from the site, and the full-groom PRICING below
 *  was confirmed correct by the owner on 2026-09-04. A few FAQ answers are
 *  still marked `ASSUMPTION:` in comments — these are reasonable defaults
 *  (vaccination policy, payment methods, appointment length) that the owner
 *  should confirm or correct before/after go-live.
 */

export const SITE = {
  name: "Patty's Pup Cuts",
  shortName: "Pup Cuts",
  legalName: "Pup Cuts Dog Grooming",
  url: "https://pupcutspa.com",
  tagline: "A calm, one-on-one dog grooming experience in Morrisville, PA.",
  // One-line description used as the default meta description / OG description.
  description:
    "Patty's Pup Cuts is a home-based, mother-and-daughter dog grooming salon in Morrisville, PA. Appointment-only, one-on-one care using 100% natural shampoos. Full grooming, baths, nail trims and more for Bucks County pups.",

  // Contact — two numbers, as listed on the current site's contact page.
  phoneDisplay: "(267) 499-6674",
  phoneHref: "tel:+12674996674",
  phone2Display: "(484) 554-3082",
  phone2Href: "tel:+14845543082",
  // Public email from the business's Google listing.
  email: "pattyapurvis@gmail.com",

  // Address
  address: {
    street: "217 E Philadelphia Ave",
    city: "Morrisville",
    state: "PA",
    zip: "19067",
    country: "US",
    landmark: "Across from the Morrisville Dog Park",
  },
  // Approximate coordinates for JSON-LD / directions.
  // ⚠️ VERIFY — refine the exact pin if needed.
  geo: { lat: 40.2076, lng: -74.7745 },

  // Google Maps link (address search — safe default).
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Patty%27s+Pup+Cuts+217+E+Philadelphia+Ave+Morrisville+PA+19067",

  // Hours: the business is strictly appointment-only and publishes no set
  // hours, so we present "By appointment only" and omit openingHours from the
  // schema. Flip `appointmentOnly` to false and fill `hours` to show times.
  appointmentOnly: true,
  hours: [] as Array<{ day: string; open: string | null; close: string | null }>,

  // Areas served (used in copy + JSON-LD areaServed).
  serviceAreas: [
    "Morrisville",
    "Yardley",
    "Fairless Hills",
    "Levittown",
    "Newtown",
    "Lower Makefield",
    "Falls Township",
    "Lower Bucks County, PA",
  ],

  // Trust signals
  womenOwned: true,
  naturalProducts: true,

  // Social profiles.
  social: {
    facebook: "https://www.facebook.com/PupCutsGrooming/",
  },

  // Default social share image (lives in /public).
  ogImage: "/og-image.png",
} as const;

/** Primary navigation (order matters). */
export const NAV = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "About", href: "/about/" },
  { label: "Reviews", href: "/reviews/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Contact", href: "/contact/" },
] as const;

/**
 * ── PRICING TIERS ────────────────────────────────────────────────────────
 * Full-groom pricing by dog size. Verbatim from the current site.
 * Every full groom includes the items in `includes`.
 */
export const GROOM_INCLUDES = [
  "Nail trimming",
  "Luxurious bath",
  "Blow dry",
  "Haircut",
  "Brush out",
] as const;

export interface PriceTier {
  size: string;
  price: string;
  note?: string;
  popular?: boolean;
}

// Full-groom pricing by size — confirmed correct by the owner on 2026-09-04.
export const PRICING: PriceTier[] = [
  { size: "Small Dog", price: "$50", note: "Per dog, per session" },
  { size: "Medium Dog", price: "$60", note: "Per dog, per session", popular: true },
  { size: "Large Dog", price: "$80", note: "Per dog, per session" },
  { size: "X-Large Dog", price: "$100+", note: "And up — per dog, per session" },
];

/**
 * ── SERVICES ─────────────────────────────────────────────────────────────
 * Individual / à la carte services. `icon` maps to an inline SVG in
 * `src/components/ServiceIcon.astro`. Individual services are priced
 * separately and may be combined — the current site lists no à la carte
 * numbers, so these intentionally say "Ask when you book" rather than
 * inventing prices.
 *
 * ASSUMPTION: "De-shedding", "Ear cleaning", "Sanitary & paw trim", and
 * "Breed-specific styling" are standard offerings for a full-service groomer
 * and are reasonable to list; confirm they're all offered before go-live.
 */
export interface Service {
  title: string;
  slug: string;
  icon: string;
  summary: string; // short — used on cards
  description: string; // longer — used on the Services page
  price?: string;
  featured?: boolean;
}

export const SERVICES: Service[] = [
  {
    title: "Full Groom",
    slug: "full-groom",
    icon: "scissors",
    summary: "The complete spa day — bath, blow dry, haircut, nails, and brush out.",
    description:
      "Our signature service and the heart of what we do. Your pup gets a luxurious bath with 100% natural shampoo, a gentle blow dry, a full haircut styled the way you like, nail trimming, and a thorough brush out. Priced by size — see the pricing above.",
    price: "From $50",
    featured: true,
  },
  {
    title: "Bath & Tidy",
    slug: "bath-and-tidy",
    icon: "bath",
    summary: "A warm natural-shampoo bath, blow dry, and light tidy-up between full grooms.",
    description:
      "Perfect for keeping your dog fresh between full grooms. Includes a natural-shampoo bath, blow dry, brush out, and a light tidy of the face, feet, and sanitary areas. A great option for dogs who don't need a full haircut.",
    price: "Ask when you book",
    featured: true,
  },
  {
    title: "Nail Trim",
    slug: "nail-trim",
    icon: "paw",
    summary: "A quick, calm nail trim — on its own or added to any service.",
    description:
      "Overgrown nails are uncomfortable for your dog. Stop in for a quick, low-stress nail trim on its own, or add it to any grooming service. We take our time so nervous pups stay relaxed.",
    price: "Ask when you book",
    featured: true,
  },
  {
    title: "De-Shedding Treatment",
    slug: "de-shedding",
    icon: "brush",
    summary: "Loosen and remove undercoat to cut down on shedding around the house.",
    description:
      "For double-coated and heavy-shedding breeds, a de-shedding treatment gently removes loose undercoat with a bath, blow-out, and specialized brushing — leaving your dog more comfortable and your home a lot less furry.",
    price: "Ask when you book",
  },
  {
    title: "Ear Cleaning & Sanitary Trim",
    slug: "ear-and-sanitary",
    icon: "ear",
    summary: "Gentle ear cleaning and a tidy sanitary trim to keep your pup comfortable.",
    description:
      "Careful ear cleaning plus a sanitary and paw trim to keep your dog clean and comfortable between full grooms. Can be added to any appointment.",
    price: "Ask when you book",
  },
  {
    title: "Breed-Specific Styling",
    slug: "breed-styling",
    icon: "heart",
    summary: "A cut tailored to your breed's coat — or any style you have in mind.",
    description:
      "Whether you want the classic look for your breed or something a little different, we'll style your dog's coat to suit them. Bring a photo of the look you love and we'll make it happen.",
    price: "Included with Full Groom",
  },
];

/**
 * ── TESTIMONIALS ─────────────────────────────────────────────────────────
 * The five reviews from the current site's Reviews page — verbatim, with
 * the reviewer's name and original date.
 */
export interface Testimonial {
  quote: string;
  author: string;
  date?: string;
  source?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Just when I thought my ridiculously good looking pupper T-Bone Jones could not be any more handsome, an hour with Patty at Pup Cuts upped his game to game-changing levels. He's dapper, soft, and smells delightful. Appointment times are convenient, and Patty is super responsive, professional, and cares about the doggos!",
    author: "Dan Jones",
    date: "June 29, 2020",
  },
  {
    quote:
      "I took my “Jadie” to Patty for the 1st time and she was so great with my dog. She did a wonderful job on her grooming & was so gentle with her. She is very professional & gives quality service at a great price. I will definitely be taking my “Jadie” back to her.",
    author: "Janet Undercoffer",
    date: "June 6, 2020",
  },
  {
    quote:
      "My puppy loves going to Patty. She's responsive and does an amazing job. Very affordable. I'll never bring him to anyone else!",
    author: "Sarah Del Grosso",
    date: "March 7, 2021",
  },
  {
    quote: "Patty you are awesome.. Thanks for all you have done for Layla.",
    author: "Shelly Williams",
    date: "April 1, 2021",
  },
  {
    quote: "Great to work with. Great price. Nice job.",
    author: "Elieen Rispo",
    date: "April 7, 2021",
  },
];

/**
 * ── FAQ ──────────────────────────────────────────────────────────────────
 * Used on the FAQ page (with FAQPage JSON-LD) and referenced elsewhere.
 * ASSUMPTION notes flag answers that were reasonably inferred and should be
 * confirmed by the owner.
 */
export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: "How do I book an appointment?",
    a: "The easiest way is to message us on Facebook or give us a call or text at (267) 499-6674. We're a small, appointment-only salon, so reaching out directly is the fastest way to find a time that works. No Facebook? No problem — call, text, or use the contact form on this site.",
  },
  {
    q: "Are you appointment-only?",
    a: "Yes. We're a home-based salon and groom one dog at a time, so every visit is by appointment. This keeps things calm and unhurried for your pup — we're not a high-volume chain groomer.",
  },
  {
    q: "What happens at my dog's first visit?",
    a: "You'll drop your fur baby off at your appointment time (we offer curbside escort), let us know the style and length you're after, and pick them back up when they're freshly groomed. We take cues from your dog throughout and adapt so they stay comfortable from start to finish.",
  },
  {
    q: "What should I bring?",
    a: "Just your dog and a photo of any specific style you have in mind. If your dog has allergies, sensitivities, or medical needs, please tell us when you book. We recommend bringing or having your vaccination records available. (ASSUMPTION — confirm your exact policy.)",
  },
  {
    q: "Do you require vaccinations?",
    a: "For the safety of every pet in our care, we ask that dogs be up to date on their core vaccinations, including rabies. If you're unsure, give us a call before your appointment and we'll be glad to talk it through. (ASSUMPTION — confirm your exact vaccination policy.)",
  },
  {
    q: "What products do you use?",
    a: "We use 100% natural shampoos and conditioners. Now more than ever, your pet's safety and comfort are our top priorities, and gentle, natural products are part of that.",
  },
  {
    q: "What's your cancellation policy?",
    a: "Because we groom one dog at a time by appointment, arrivals 10 minutes late or more without notice are considered a cancellation. If you need to reschedule, just let us know ahead of time and we'll find a new spot.",
  },
  {
    q: "What sizes and breeds do you groom?",
    a: "All sizes, from small pups to extra-large dogs — full-groom pricing is set by size. If you're not sure which tier your dog falls into or have a breed-specific style in mind, just ask when you book.",
  },
  {
    q: "How long does grooming take?",
    a: "It depends on your dog's size, coat, and temperament, but most full grooms take a couple of hours. Because we never rush a pet, we'll give you a realistic pickup time when you drop off. (ASSUMPTION — adjust to your typical timing.)",
  },
  {
    q: "How do I pay?",
    a: "Payment is due at pickup. Please reach out when you book if you'd like to confirm accepted payment methods. (ASSUMPTION — confirm the payment methods you accept.)",
  },
];

/**
 * ── GALLERY ──────────────────────────────────────────────────────────────
 * Real client photos migrated from the site. Images are imported in the page
 * that renders them (astro:assets) so filenames here are for reference only.
 */
export const GALLERY = [
  { file: "two-dogs-pink-bandanas.jpg", alt: "Two freshly groomed white dogs in matching pink paw-print bandanas" },
  { file: "gallery-cocker-spaniel.jpg", alt: "Cocker spaniel groomed and styled at Patty's Pup Cuts" },
  { file: "gallery-springer-spaniel.jpg", alt: "Springer spaniel with a bow tie after a full groom" },
  { file: "groomed-dog-necktie.png", alt: "Small dog dressed up in a necktie after grooming" },
  { file: "papillon-blue-bandana.png", alt: "Fluffy papillon-mix in a blue gingham bandana" },
  { file: "groomed-dog-bow.jpg", alt: "Happy groomed dog wearing a bow" },
] as const;
