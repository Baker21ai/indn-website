import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://indn-website.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    { url: `${siteUrl}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/about/board`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/programs`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/events`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/sponsors`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/sponsor`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/sponsor/apply`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/donate`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/volunteer`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
  ]
}
