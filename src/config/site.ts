/**
 * Ano Global Holdings — parent company site.
 * Architecture, links and identity per the Complete Build Brief, section 2.
 * Six pages. Do not add a seventh.
 */

export const SITE = {
  name: 'Ano Global Holdings',
  domain: 'anoglobalholdings.com',
  url: 'https://anoglobalholdings.com',
  email: 'contact@anoglobalholdings.com',
  locations: 'Hong Kong · Lagos',
  founder: 'E.J. Anosike',
  founderRole: 'Founder & Chief Executive Officer',
  founderRoleShort: 'Founder & CEO',
} as const

/**
 * Outbound links to the operating companies.
 * Client direction overrides brief §10: these open in a NEW tab.
 */
export const COMPANIES = {
  energy: {
    name: 'Ano Energy',
    legal: 'Ano Energy Africa Limited',
    href: 'https://anoenergy.com',
    label: 'anoenergy.com',
    cta: 'Visit anoenergy.com',
  },
  foundation: {
    name: 'Anosike Cares Foundation',
    href: 'https://anocaresfoundation.org',
    label: 'anocaresfoundation.org',
    cta: 'Visit anocaresfoundation.org',
  },
} as const

/** Six items, flat, no dropdowns. */
export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/leadership', label: 'Leadership' },
  { href: '/our-companies', label: 'Our Companies' },
  { href: '/speaking', label: 'Speaking' },
  { href: '/contact', label: 'Contact' },
] as const

export const PILLARS = [
  'Energy',
  'Infrastructure',
  'Human Development',
  'Global Partnerships',
] as const

/** Developer attribution. */
export const BUILT_BY = {
  name: 'Lamar',
  phone: '2349062288078',
  message:
    "Hi Lamar, I saw your work on the Ano Global Holdings website and I'd like to discuss a project.",
}

export const whatsappHref = (
  phone: string = BUILT_BY.phone,
  message: string = BUILT_BY.message,
): string => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

/**
 * IMAGE SLOTS
 *
 * Every entry is a placeholder plate until the client supplies the real
 * photograph named in `needs`. To swap one in: drop the file at the same path
 * (same aspect ratio), and delete the `placeholder: true` flag so the corner tag
 * disappears. Nothing else changes.
 *
 * Brief section 11 lists these as client supplies. Spec section 6 requires one
 * consistent grade across the whole set: slightly desaturated, warm shadows,
 * no heavy filters.
 */
export interface ImageSlot {
  src: string
  alt: string
  w: number
  h: number
  placeholder?: boolean
  needs?: string
  /** Short line shown by <Carousel>. Ignored by <Figure>. */
  caption?: string
}

/**
 * Rucker Park Africa, Lagos, July 2026 — the section the brief calls out as
 * "the concrete proof" the two-sided structure works. Feeds <Carousel>.
 */
export const LAGOS_GALLERY: ImageSlot[] = [
  {
    src: '/images/fruitguard.jpg',
    alt: 'Rucker Park Africa, opening night, Lagos',
    w: 2000,
    h: 1125,
    // placeholder: true,
    needs: 'Opening ceremony, Rucker Park Africa, Lagos, July 2026. 16:9.',
    caption: 'Opening night — Rucker Park Africa, Lagos',
  },
  {
    src: '/images/sponsor.jpeg',
    alt: 'Ano Energy premier division sponsorship, Lagos',
    w: 2000,
    h: 1125,
    // placeholder: true,
    needs: 'Ano Energy branding at the premier division court, Lagos. 16:9.',
    caption: 'Ano Energy — premier division sponsor',
  },
  {
    src: '/images/rucker7.jpg',
    alt: 'Anosike Cares Foundation youth programming on site, Lagos',
    w: 2000,
    h: 1125,
    // placeholder: true,
    needs: 'Foundation youth programming and coaching, Lagos. 16:9.',
    caption: 'Anosike Cares Foundation — youth programming',
  },
  {
    src: '/images/cola.jpeg',
    alt: 'Scholarships and jobs announced, Rucker Park Africa Lagos',
    w: 2000,
    h: 1125,
    // placeholder: true,
    needs: 'Scholarship or jobs announcement on site, Lagos. 16:9.',
    caption: 'Scholarships and jobs — the Foundation delivering',
  },
]

export const IMAGES: Record<string, ImageSlot> = {
  hero: {
    src: '/images/hero.jpeg',
    alt: 'E.J. Anosike addressing an institutional audience',
    w: 2400,
    h: 1200,
    // placeholder: true,
    needs: 'E.J. speaking at a podium, Geneva or Kigali. 2:1 desktop, 4:5 mobile.',
  },
  premise: {
    src: '/images/premise.jpg',
    alt: 'Energy and industrial infrastructure',
    w: 1800,
    h: 1200,
    // placeholder: true,
    needs: 'Infrastructure or industrial context. 3:2.',
  },
  geneva: {
    src: '/images/geneva.jpg',
    alt: 'CIPS Youth Future Summit, United Nations headquarters, Geneva',
    w: 1500,
    h: 1000,
    placeholder: true,
    needs: 'UN Geneva address. 3:2.',
  },
  kigali: {
    src: '/images/kigali.jpg',
    alt: 'Africa CEO Forum, Kigali',
    w: 1500,
    h: 1000,
    placeholder: true,
    needs: 'Africa CEO Forum, Kigali. 3:2.',
  },
  abuja: {
    src: '/images/abuja.jpg',
    alt: 'National Diaspora Day, Presidential Villa, Aso Rock, Abuja',
    w: 1500,
    h: 1000,
    placeholder: true,
    needs: 'National Diaspora Day, Aso Rock. 3:2.',
  },
  whereWeWork: {
    src: '/images/where-we-work.jpg',
    alt: 'Delegation and market activity across West Africa',
    w: 2000,
    h: 1125,
    placeholder: true,
    needs: 'Delegation, market or in-country work. 16:9.',
  },
  speaking: {
    src: '/images/speaking.jpg',
    alt: 'E.J. Anosike speaking to an audience',
    w: 2000,
    h: 1125,
    placeholder: true,
    needs: 'Speaking platform, any of the three listed events. 16:9.',
  },
  contact: {
    src: '/images/contact.jpg',
    alt: 'Hong Kong and Lagos',
    w: 2000,
    h: 1125,
    placeholder: true,
    needs: 'Hong Kong or Lagos office or skyline. 16:9.',
  },
}
