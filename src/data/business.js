// ============================================================================
// iLovah / Rest In Pest — Central Business Data
// ============================================================================
// Update once here; flows through to ALL pages, SEO schema, and forms.
// ============================================================================

export const SITE = {
  url: 'https://www.ilovahcleaningservices.com.au',
  defaultTitle: 'iLovah Cleaning & Rest In Pest Control — Toowoomba, Highfields, Helidon',
  defaultDescription:
    'Family-owned cleaning & pest control across Toowoomba, Highfields, Helidon & Darling Downs. Bond-back guarantee, 12-month pest warranty.',
};

export const BIZ = {
  cleaning: {
    name: 'iLovah Cleaning Services',
    short: 'iLovah',
    tagline: 'Toowoomba\'s trusted cleaning team',
    email: 'ilovahcleaning@gmail.com',
  },
  pest: {
    name: 'Rest In Pest Control Service',
    short: 'Rest In Pest',
    tagline: 'Family-owned pest control with 12-month warranty',
    email: 'restinpest@gmail.com',
    licence: 'PMT014413925',
    technician: 'Francis Velasco',
  },
};

export const CONTACT = {
  phone: '0478 711 829',
  phoneTel: '+61478711829',
  address: {
    street: '37 Seventeen Mile Road',
    suburb: 'Helidon',
    state: 'QLD',
    postcode: '4344',
    country: 'AU',
  },
  geo: {
    lat: -27.553,
    lng: 152.116,
  },
  hours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '07:00',
    closes: '18:00',
  },
};

// ============================================================================
// SOCIAL PROOF — update these as they grow
// ============================================================================

export const PROOF = {
  customersServed: '1,000+',
  googleRating: '4.9',
  reviewCount: '87',
  pestWarrantyMonths: '12',
  suburbsServiced: '49',
};

// ============================================================================
// SERVICE AREAS — 49 suburbs across 3 clusters
// Tier 1 = full landing page, Tier 2 = small page, Tier 3 = listed only
// ============================================================================

export const AREAS = {
  toowoomba: {
    name: 'Toowoomba',
    slug: 'toowoomba',
    tier: 1,
    headline: 'Toowoomba City + Inner Suburbs',
    description: 'Our biggest service area — 23 inner Toowoomba suburbs',
    suburbs: [
      'Toowoomba CBD',
      'East Toowoomba',
      'North Toowoomba',
      'South Toowoomba',
      'Newtown',
      'Mount Lofty',
      'Rangeville',
      'Centenary Heights',
      'Middle Ridge',
      'Kearneys Spring',
      'Wilsonton',
      'Wilsonton Heights',
      'Harristown',
      'Darling Heights',
      'Glenvale',
      'Rockville',
      'Harlaxton',
      'Mount Kynoch',
      'Prince Henry Heights',
      'Redwood',
      'Top Camp',
      'Cranley',
      'Drayton',
      'Westbrook',
      'Torrington',
    ],
  },
  highfields: {
    name: 'Highfields',
    slug: 'highfields',
    tier: 1,
    headline: 'Highfields Region',
    description: 'Highfields, Cabarlah, Meringandan & surrounding suburbs',
    suburbs: [
      'Highfields',
      'Cabarlah',
      'Meringandan',
      'Meringandan West',
      'Cotswold Hills',
      'Kingsthorpe',
      'Gowrie Junction',
      'Gowrie Mountain',
      'Gowrie Little Plain',
      'Charlton',
      'Wellcamp',
      'Mount Rascal',
      'Vale View',
      'Hodgson Vale',
      'Preston',
      'Birnam',
    ],
  },
  helidon: {
    name: 'Helidon & Lockyer',
    slug: 'helidon',
    tier: 1,
    headline: 'Helidon Corridor & Lockyer Valley',
    description: 'Our home base — Helidon, Withcott, Gatton & surrounds',
    suburbs: [
      'Helidon',
      'Helidon Spa',
      'Murphys Creek',
      'Postmans Ridge',
      'Withcott',
      'Gatton',
      'Forest Hill',
      'Laidley',
      'Plainland',
      'Grantham',
      'Cambooya',
    ],
  },
};

// All suburbs flat — for schema `areaServed`
export const ALL_SUBURBS = [
  ...AREAS.toowoomba.suburbs,
  ...AREAS.highfields.suburbs,
  ...AREAS.helidon.suburbs,
];

// ============================================================================
// SERVICES — for both businesses
// ============================================================================

export const CLEANING_SERVICES = [
  {
    slug: 'end-of-lease',
    name: 'End-of-Lease Cleaning',
    short: 'End of Lease',
    fromPrice: 350,
    isHero: true,
    description: 'Bond-back guaranteed end-of-lease & bond cleaning',
  },
  {
    slug: 'regular-house-clean',
    name: 'Regular House Cleaning',
    short: 'Home Clean',
    fromPrice: 120,
    description: 'Weekly, fortnightly or monthly home cleans',
  },
  {
    slug: 'carpet-cleaning',
    name: 'Carpet Cleaning',
    short: 'Carpet',
    fromPrice: 150,
    description: 'Deep steam clean for fresh, revitalised carpets',
  },
  {
    slug: 'window-cleaning',
    name: 'Window Cleaning',
    short: 'Windows',
    fromPrice: 120,
    description: 'Streak-free interior & exterior window washing',
  },
  {
    slug: 'gutter-cleaning',
    name: 'Gutter Cleaning',
    short: 'Gutters',
    fromPrice: 180,
    description: 'Clear gutters before storm season',
  },
  {
    slug: 'pressure-washing',
    name: 'Pressure Washing',
    short: 'Pressure Wash',
    fromPrice: 200,
    description: 'Driveways, patios, fences, decks',
  },
  {
    slug: 'pram-cleaning',
    name: 'Pram & Baby Gear Cleaning',
    short: 'Pram Clean',
    fromPrice: 80,
    description: 'Steam-clean prams, car seats, capsules & high chairs',
  },
];

export const PEST_SERVICES = [
  {
    slug: 'cockroach-control',
    name: 'Cockroach Treatment',
    short: 'Cockroaches',
    fromPrice: 220,
    warrantyMonths: 12,
    isHero: true,
    description: 'Australian, American & German cockroach treatments',
  },
  {
    slug: 'ant-control',
    name: 'Ant Control',
    short: 'Ants',
    fromPrice: 220,
    warrantyMonths: 12,
    description: 'Black & brown household ant treatment',
  },
  {
    slug: 'spider-control',
    name: 'Spider Treatment',
    short: 'Spiders',
    fromPrice: 220,
    warrantyMonths: 12,
    description: 'Webbing spider treatments — eaves & exterior',
  },
  {
    slug: 'rodent-control',
    name: 'Rodent Control',
    short: 'Rodents',
    fromPrice: 250,
    warrantyMonths: 1,
    description: 'Rat & mouse treatment with bait stations',
  },
  {
    slug: 'silverfish-control',
    name: 'Silverfish Treatment',
    short: 'Silverfish',
    fromPrice: 220,
    warrantyMonths: 12,
    description: 'Targeted silverfish treatment',
  },
  {
    slug: 'end-of-lease-pest',
    name: 'End-of-Lease Pest Treatment',
    short: 'End of Lease Pest',
    fromPrice: 250,
    description: 'Real-estate approved end-of-lease pest treatment with report',
  },
];
