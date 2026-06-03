// ============================================================================
// SEO Meta — drop into any page to set title, description, Open Graph, canonical
// ============================================================================
// Usage:
//   <SEOMeta
//     title="End of Lease Cleaning Toowoomba | Bond Back Guarantee | iLovah"
//     description="Real-estate approved bond cleaning across Toowoomba..."
//     path="/cleaning/end-of-lease"
//     image="/og/end-of-lease.jpg"
//   />
// ============================================================================

import { Helmet } from '@dr.pogodin/react-helmet';
import { SITE } from '../data/business';

export default function SEOMeta({
  title,
  description,
  path = '/',
  image = '/og-default.jpg',
  type = 'website',
  noindex = false,
}) {
  const url = `${SITE.url}${path}`;
  const fullImage = image.startsWith('http') ? image : `${SITE.url}${image}`;

  return (
    <Helmet>
      <title>{title || SITE.defaultTitle}</title>
      <meta name="description" content={description || SITE.defaultDescription} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title || SITE.defaultTitle} />
      <meta property="og:description" content={description || SITE.defaultDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={fullImage} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || SITE.defaultTitle} />
      <meta name="twitter:description" content={description || SITE.defaultDescription} />
      <meta name="twitter:image" content={fullImage} />

      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
}
