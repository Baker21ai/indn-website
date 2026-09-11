import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://indn-website.vercel.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/portal/', '/api/', '/prototypes/', '/login', '/register'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
