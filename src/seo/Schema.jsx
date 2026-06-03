// ============================================================================
// Schema.org JSON-LD — what puts you in Google rich results & local pack
// ============================================================================
// Generates valid Schema for:
//   - LocalBusiness (cleaning + pest as separate entities)
//   - Service (per service page)
//   - FAQPage (for any FAQ sections — becomes expandable answers in Google)
//   - BreadcrumbList (helps Google understand your site structure)
//   - AggregateRating (the stars in Google search results)
// ============================================================================

import { Helmet } from '@dr.pogodin/react-helmet';
import { SITE, BIZ, CONTACT, PROOF, ALL_SUBURBS } from '../data/business';

// ----------------------------------------------------------------------------
// LocalBusiness — cleaning side
// ----------------------------------------------------------------------------
export function CleaningBusinessSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HouseCleaningService',
    '@id': `${SITE.url}/#cleaning-business`,
    name: BIZ.cleaning.name,
    image: `${SITE.url}/logo-cleaning.jpg`,
    url: SITE.url,
    telephone: CONTACT.phoneTel,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.address.street,
      addressLocality: CONTACT.address.suburb,
      addressRegion: CONTACT.address.state,
      postalCode: CONTACT.address.postcode,
      addressCountry: CONTACT.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: CONTACT.geo.lat,
      longitude: CONTACT.geo.lng,
    },
    areaServed: ALL_SUBURBS.map((s) => ({
      '@type': 'City',
      name: s,
      containedInPlace: { '@type': 'State', name: 'Queensland' },
    })),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: CONTACT.hours.days,
      opens: CONTACT.hours.opens,
      closes: CONTACT.hours.closes,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: PROOF.googleRating,
      reviewCount: PROOF.reviewCount,
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}

// ----------------------------------------------------------------------------
// LocalBusiness — pest side
// ----------------------------------------------------------------------------
export function PestBusinessSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'PestControlService',
    '@id': `${SITE.url}/#pest-business`,
    name: BIZ.pest.name,
    image: `${SITE.url}/logo-pest.jpg`,
    url: SITE.url,
    telephone: CONTACT.phoneTel,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.address.street,
      addressLocality: CONTACT.address.suburb,
      addressRegion: CONTACT.address.state,
      postalCode: CONTACT.address.postcode,
      addressCountry: CONTACT.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: CONTACT.geo.lat,
      longitude: CONTACT.geo.lng,
    },
    areaServed: ALL_SUBURBS.map((s) => ({
      '@type': 'City',
      name: s,
      containedInPlace: { '@type': 'State', name: 'Queensland' },
    })),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: CONTACT.hours.days,
      opens: CONTACT.hours.opens,
      closes: CONTACT.hours.closes,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: PROOF.googleRating,
      reviewCount: PROOF.reviewCount,
    },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: `QLD Pest Management Licence ${BIZ.pest.licence}`,
      credentialCategory: 'license',
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}

// ----------------------------------------------------------------------------
// Service schema — for individual service pages
// ----------------------------------------------------------------------------
export function ServiceSchema({ name, description, type = 'Service', priceFrom, area }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    provider: {
      '@type': 'LocalBusiness',
      name: BIZ.cleaning.name,
      telephone: CONTACT.phoneTel,
    },
    areaServed: area
      ? { '@type': 'City', name: area }
      : ALL_SUBURBS.map((s) => ({ '@type': 'City', name: s })),
    ...(priceFrom && {
      offers: {
        '@type': 'Offer',
        priceCurrency: 'AUD',
        price: priceFrom,
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'AUD',
          price: priceFrom,
          valueAddedTaxIncluded: true,
        },
      },
    }),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}

// ----------------------------------------------------------------------------
// FAQ schema — turns your FAQ section into Google expandable answers
// ----------------------------------------------------------------------------
export function FAQSchema({ faqs }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}

// ----------------------------------------------------------------------------
// Breadcrumb schema — helps Google understand site structure
// ----------------------------------------------------------------------------
export function BreadcrumbSchema({ items }) {
  // items: [{ name, path }, { name, path }, ...]
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}
