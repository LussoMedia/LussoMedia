import { sanityFetch } from './sanity';
import type {
  SanityTestimonial,
  SanityCaseStudy,
  SanityFounder,
  SanityClientLogo,
  SanitySettings,
} from '@/types/sanity';

export async function getTestimonials() {
  return sanityFetch<SanityTestimonial[]>(`
    *[_type == "testimonial"] | order(_createdAt asc) {
      _id,
      quote,
      name,
      business,
      result,
      avatar
    }
  `);
}

export async function getCaseStudies() {
  return sanityFetch<SanityCaseStudy[]>(`
    *[_type == "caseStudy"] | order(order asc, _createdAt asc) {
      _id,
      client,
      industry,
      tag,
      challenge,
      built,
      result,
      image
    }
  `);
}

export async function getFounder() {
  return sanityFetch<SanityFounder>(`
    *[_type == "founder"][0] {
      photo,
      bio,
      stats
    }
  `);
}

export async function getClientLogos() {
  return sanityFetch<SanityClientLogo[]>(`
    *[_type == "clientLogo"] | order(order asc, name asc) {
      _id,
      name,
      logo,
      order
    }
  `);
}

export async function getSettings() {
  return sanityFetch<SanitySettings>(`
    *[_type == "siteSettings"][0] {
      email,
      instagram,
      tiktok,
      linkedin
    }
  `);
}
