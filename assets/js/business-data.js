const businesses = [
  {
    id: "nigerian-kitchen",
    name: "Northampton Nigerian Kitchen",

    category: "Restaurant",
    categoryKey: "food",
    categoryLabel: "Restaurants & Food",

    area: "Northampton",
    areaKey: "northampton",
    areaLabel: "Northampton",

    rating: 4.8,
    reviews: 24,

    featured: true,
    verified: false,
    whatsapp: true,
    website: true,
    online: false,
    open: true,
    booking: true,

    createdAt: "2026-09-20",

    description:
      "Nigerian meals, takeaway and catering services for individuals, families and events across Northampton.",

    services: [
      "Nigerian meals",
      "Takeaway",
      "Catering",
      "Event catering"
    ],

    phone: "+44 7000 000001",
    whatsappNumber: "+447000000001",
    email: "hello@example.com",
    website: "https://example.com",

    address: "Northampton, UK",

    lat: 52.2400,
    lng: -0.8990,

    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",

    coverLabel: "Nigerian Food",

    tags: [
      "Nigerian food",
      "Catering",
      "Takeaway",
      "Meals"
    ],

    statusText: "Open now",
    secondaryStatus: [
      "Takeaway",
      "Delivery"
    ],

    hours: {
      monday: "9:00 AM - 8:00 PM",
      tuesday: "9:00 AM - 8:00 PM",
      wednesday: "9:00 AM - 8:00 PM",
      thursday: "9:00 AM - 8:00 PM",
      friday: "9:00 AM - 9:00 PM",
      saturday: "10:00 AM - 9:00 PM",
      sunday: "12:00 PM - 6:00 PM"
    },

    searchText:
      "northampton nigerian kitchen nigerian restaurant restaurants food takeaway catering meals"
  },

  {
    id: "kora-beauty-studio",
    name: "Kora Beauty Studio",

    category: "Beauty",
    categoryKey: "beauty",
    categoryLabel: "Hair & Beauty",

    area: "Abington",
    areaKey: "abington",
    areaLabel: "Abington",

    rating: 4.9,
    reviews: 18,

    featured: false,
    verified: false,
    whatsapp: true,
    website: false,
    online: false,
    open: false,
    booking: true,

    createdAt: "2026-09-17",

    description:
      "Beauty and hair services with appointment-based sessions for clients in Northampton and surrounding areas.",

services: [
  "Hair styling",
  "Braiding",
  "Beauty treatments",
  "Appointments"
],

phone: "+44 7000 000002",
whatsappNumber: "+447000000002",
email: "hello@example.com",
website: "",

address: "Abington, Northampton, UK",

    lat: 52.2390,
    lng: -0.8735,

    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",

    coverLabel: "Beauty & Hair",

    tags: [
      "Hair",
      "Beauty",
      "Appointments"
    ],

    statusText: "Open today",
    secondaryStatus: [
      "Appointment required"
    ],

    hours: {
      monday: "9:00 AM - 6:00 PM",
      tuesday: "9:00 AM - 6:00 PM",
      wednesday: "9:00 AM - 6:00 PM",
      thursday: "9:00 AM - 6:00 PM",
      friday: "9:00 AM - 7:00 PM",
      saturday: "10:00 AM - 6:00 PM",
      sunday: "Closed"
    },

    searchText:
      "kora beauty studio beauty hair braiding styling abington appointments"
  },

  {
    id: "ricos-property-services",
    name: "RICO's Property Services",

    category: "Property",
    categoryKey: "property",
    categoryLabel: "Property & Home",

    area: "Northampton",
    areaKey: "northampton",
    areaLabel: "Northampton",

    rating: 4.7,
    reviews: 11,

    featured: true,
    verified: false,
    whatsapp: true,
    website: true,
    online: false,
    open: false,
    booking: true,

    createdAt: "2026-09-14",

    description:
      "Property maintenance and related services for homeowners, landlords and businesses across Northampton.",

    services: [
      "Property maintenance",
      "Repairs",
      "Landlord services",
      "Property inspections"
    ],

    phone: "+44 7000 000003",
    whatsappNumber: "+447000000003",
    email: "hello@example.com",
    website: "https://example.com",

    address: "Northampton, UK",

    lat: 52.2360,
    lng: -0.9010,

    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",

    coverLabel: "Property Services",

    tags: [
      "Property",
      "Maintenance",
      "Repairs"
    ],

    statusText: "Available",
    secondaryStatus: [
      "Quotations available"
    ],

    hours: {
      monday: "8:00 AM - 5:00 PM",
      tuesday: "8:00 AM - 5:00 PM",
      wednesday: "8:00 AM - 5:00 PM",
      thursday: "8:00 AM - 5:00 PM",
      friday: "8:00 AM - 5:00 PM",
      saturday: "9:00 AM - 1:00 PM",
      sunday: "Closed"
    },

    searchText:
      "oaks property services property maintenance repairs landlords northampton"
  },

  {
    id: "northampton-tech-support",
    name: "Northampton Tech Support",

    category: "IT Services",
    categoryKey: "professional",
    categoryLabel: "Professional Services",

    area: "Town Centre",
    areaKey: "town-centre",
    areaLabel: "Town Centre",

    rating: 4.6,
    reviews: 9,

    featured: false,
    verified: false,
    whatsapp: true,
    website: true,
    online: true,
    open: false,
    booking: true,

    createdAt: "2026-09-10",

    description:
      "IT support for individuals and small businesses, including remote and on-site technical assistance.",

    services: [
      "IT support",
      "Computer repairs",
      "Microsoft 365",
      "Remote support",
      "Business IT"
    ],

    phone: "+44 7000 000004",
    whatsappNumber: "+447000000004",
    email: "hello@example.com",
    website: "https://example.com",

    address: "Northampton Town Centre, UK",

    lat: 52.2407,
    lng: -0.8952,

    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",

    coverLabel: "IT Support",

    tags: [
      "IT Support",
      "Business",
      "Remote Support"
    ],

    statusText: "Available",
    secondaryStatus: [
      "On-site & remote"
    ],

    hours: {
      monday: "8:30 AM - 5:30 PM",
      tuesday: "8:30 AM - 5:30 PM",
      wednesday: "8:30 AM - 5:30 PM",
      thursday: "8:30 AM - 5:30 PM",
      friday: "8:30 AM - 5:30 PM",
      saturday: "10:00 AM - 2:00 PM",
      sunday: "Closed"
    },

    searchText:
      "northampton tech support IT services computer repairs microsoft 365 business remote support"
  },

  {
    id: "naija-bites-catering",
    name: "Naija Bites Catering",

    category: "Catering",
    categoryKey: "food",
    categoryLabel: "Restaurants & Food",

    area: "Northampton",
    areaKey: "northampton",
    areaLabel: "Northampton",

    rating: 4.8,
    reviews: 15,

    featured: false,
    verified: false,
    whatsapp: true,
    website: false,
    online: false,
    open: false,
    booking: true,

    createdAt: "2026-09-07",

    description:
      "Nigerian catering for birthdays, weddings, celebrations, community events and private functions.",

    services: [
      "Event catering",
      "Party food",
      "Nigerian dishes",
      "Buffet catering"
    ],

    phone: "+44 7000 000005",
    whatsappNumber: "+447000000005",
    email: "hello@example.com",
    website: "",

    address: "Northampton, UK",

    lat: 52.2430,
    lng: -0.9060,

    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",

    coverLabel: "Event Catering",

    tags: [
      "Events",
      "Catering",
      "Nigerian Food"
    ],

    statusText: "Taking bookings",
    secondaryStatus: [
      "Delivery available"
    ],

    hours: {
      monday: "9:00 AM - 6:00 PM",
      tuesday: "9:00 AM - 6:00 PM",
      wednesday: "9:00 AM - 6:00 PM",
      thursday: "9:00 AM - 6:00 PM",
      friday: "9:00 AM - 7:00 PM",
      saturday: "9:00 AM - 7:00 PM",
      sunday: "10:00 AM - 4:00 PM"
    },

    searchText:
      "naija bites catering nigerian food events catering parties weddings buffet"
  },

  {
    id: "sapphire-events-decor",
    name: "Sapphire Events & Decor",

    category: "Events",
    categoryKey: "events",
    categoryLabel: "Events & Entertainment",

    area: "Northampton",
    areaKey: "northampton",
    areaLabel: "Northampton",

    rating: 4.7,
    reviews: 13,

    featured: false,
    verified: false,
    whatsapp: true,
    website: true,
    online: false,
    open: false,
    booking: true,

    createdAt: "2026-09-03",

    description:
      "Event decoration and planning services for birthdays, weddings, celebrations and community events.",

    services: [
      "Event decoration",
      "Wedding decor",
      "Birthday decor",
      "Event planning"
    ],

    phone: "+44 7000 000006",
    whatsappNumber: "+447000000006",
    email: "hello@example.com",
    website: "https://example.com",

    address: "Northampton, UK",

    lat: 52.2382,
    lng: -0.8855,

    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",

    coverLabel: "Events & Decor",

    tags: [
      "Decor",
      "Events",
      "Planning"
    ],

    statusText: "Taking bookings",
    secondaryStatus: [
      "Quote available"
    ],

    hours: {
      monday: "9:00 AM - 5:00 PM",
      tuesday: "9:00 AM - 5:00 PM",
      wednesday: "9:00 AM - 5:00 PM",
      thursday: "9:00 AM - 5:00 PM",
      friday: "9:00 AM - 6:00 PM",
      saturday: "9:00 AM - 6:00 PM",
      sunday: "10:00 AM - 4:00 PM"
    },

    searchText:
      "sapphire events decor event decoration wedding birthday planning northampton"
  },

  {
    id: "ecanset-group-ltd",
    name: "Ecanset Group Ltd",

    category: "Tech Services",
    categoryKey: "professional",
    categoryLabel: "Professional Services",

    area: "Town Centre",
    areaKey: "town-centre",
    areaLabel: "Town Centre",

    rating: 5.0,
    reviews: 9,

    featured: true,
    verified: false,
    whatsapp: true,
    website: true,
    online: true,
    open: false,
    booking: true,

    createdAt: "2026-09-10",

    description:
      "System Administration and IT support services for individuals and businesses, including remote and on-site technical assistance.",

    services: [
      "IT support",
      "Computer repairs",
      "Microsoft 365",
      "Remote support",
      "Business IT"
    ],

    phone: "+44 7000 000004",
    whatsappNumber: "+447000000004",
    email: "hello@example.com",
    website: "https://example.com",

    address: "Northampton Town Centre, UK",

    lat: 52.2407,
    lng: -0.8952,

    image:
      "https://images.unsplash.com/photo-1780037190608-1d871be1fe41?auto=format&fit=crop&w=1200&q=80",

    coverLabel: "Tech Services",

    tags: [
      "IT Support",
      "Business",
      "Remote Support"
    ],

    statusText: "Available",
    secondaryStatus: [
      "On-site & remote"
    ],

    hours: {
      monday: "8:30 AM - 5:30 PM",
      tuesday: "8:30 AM - 5:30 PM",
      wednesday: "8:30 AM - 5:30 PM",
      thursday: "8:30 AM - 5:30 PM",
      friday: "8:30 AM - 5:30 PM",
      saturday: "10:00 AM - 2:00 PM",
      sunday: "Closed"
    },

    searchText:
      "ecanset system northampton tech support IT services computer repairs microsoft 365 business remote support"
  }


];

const categoryLabels = {
  food: "Restaurants & Food",
  beauty: "Hair & Beauty",
  shopping: "Shopping",
  property: "Property & Home",
  professional: "Professional Services",
  transport: "Transport",
  health: "Health & Wellness",
  events: "Events & Entertainment"
};

const areaLabels = {
  all: "Any area",
  northampton: "Northampton",
  "town-centre": "Town Centre",
  abington: "Abington",
  duston: "Duston",
  "east-northampton": "East Northampton",
  "west-northampton": "West Northampton"
};

const NINBusinessData = {
  businesses,
  categoryLabels,
  areaLabels
};

window.NINBusinessData = NINBusinessData;
window.businesses = businesses;

window.getBusinessById = function (id) {
  return businesses.find(function (business) {
    return business.id === id;
  });
};

window.getBusinessesByCategory = function (category) {
  return businesses.filter(function (business) {
    return business.categoryKey === category;
  });
};

window.getFeaturedBusinesses = function () {
  return businesses.filter(function (business) {
    return business.featured;
  });
};