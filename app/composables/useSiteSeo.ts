export const siteUrl = 'https://koveesoft.com'

export function useSiteSeo({ path, title, description }: { path: string; title: string; description: string }) {
  const url = `${siteUrl}${path}`

  useSeoMeta({
    title,
    description,
    ogType: 'website',
    ogSiteName: 'Koveesoft',
    ogTitle: title,
    ogDescription: description,
    ogUrl: url,
    ogImage: `${siteUrl}/social-card.png`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: 'Koveesoft wordmark beside a faceted blue K',
    twitterCard: 'summary_large_image',
    twitterSite: '@Koveesoft',
  })

  useHead({ link: [{ rel: 'canonical', href: url }] })
}
