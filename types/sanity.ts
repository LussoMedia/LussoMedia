export interface SanityImage {
  asset: { _ref: string }
  alt?: string
}

export interface SanityTestimonial {
  _id: string
  quote: string
  name: string
  business: string
  result: string
  avatar?: SanityImage
}

export interface SanityCaseStudy {
  _id: string
  client: string
  industry: string
  tag: string
  challenge: string
  built: string
  result: string
  image?: SanityImage
}

export interface SanityFounder {
  photo?: SanityImage
  bio: string[]
  stats: { value: string; label: string }[]
}

export interface SanityClientLogo {
  _id: string
  name: string
  logo?: SanityImage
  order?: number
}

export interface SanitySettings {
  email?: string
  instagram?: string
  tiktok?: string
  linkedin?: string
}
