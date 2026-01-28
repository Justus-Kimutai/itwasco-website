export const companyInfo = {
  name: "ITEN TAMBACH WATER AND SEWERAGE COMPANY LIMITED",
  shortName: "ITWASCO",
  tagline: "WATER FOR ALL",

  contact: {
    email: "infoitwasco@gmail.com",
    phone: "0743286720",
    address: "Water Treatment Works behond Posta Iten",
    poBox: "P.O Box 700-30700",
    city: "ITEN",
    county: "Elgeyo Marakwet County",
    country: "Kenya",
  },

  officeHours: {
    weekdays: "Monday - Friday: 8:00 AM - 5:00 PM",
    saturday: "Saturday: 8:00 AM - 12:00 PM",
    sunday: "Sunday: Closed",
  },

  social: {
    facebook: "#",
    twitter: "#",
    linkedin: "#",
  },

  about: {
    overview: "ITEN TAMBACH WATER AND SEWERAGE COMPANY (ITWASCO) LIMITED is a dynamic public utility company, wholly owned by the Elgeyo Marakwet County Government. Incorporated in July 2007 and operational since June 2008, ITWASCO stands as a pivotal entity in driving sustainable water and sanitation services within its jurisdiction.",

    mission: "To deliver sustainable water and sanitation services that improve public health and support economic development in Elgeyo Marakwet County.",

    vision: "Universal access to clean, affordable, and reliable water and sanitation for all residents.",

    commitment: "ITWASCO is more than a utility provider; we are a partner in the socio-economic development of Elgeyo Marakwet County. Through disciplined implementation of our strategic plan, supported by a clear institutional framework and a rigorous Monitoring & Evaluation system, we are dedicated to delivering sustainable solutions that improve public health, support economic activity, and enhance the quality of life for every resident we serve.",
  },

  values: [
    { name: "Integrity", description: "Upholding honesty and ethical standards in all operations" },
    { name: "Excellence", description: "Striving for the highest quality in service delivery" },
    { name: "Transparency", description: "Operating with openness and accountability" },
    { name: "Customer Focus", description: "Putting our customers' needs at the center of everything" },
    { name: "Innovation", description: "Embracing new technologies and approaches" },
    { name: "Sustainability", description: "Protecting water resources for future generations" },
  ],

  milestones: [
    { year: 2007, event: "Company Incorporated", description: "ITWASCO incorporated with 500 initial water connections" },
    { year: 2008, event: "Operations Begin", description: "Started operational activities serving Iten and Tambach" },
    { year: 2018, event: "Growth Milestone", description: "Reached 3,750 active connections - 7.5x growth" },
    { year: 2024, event: "Strategic Plan", description: "Launched comprehensive 5-year strategic plan" },
  ],
} as const;

export const organizationalStructure = {
  board: "Board of Directors",
  committees: [
    "Technical Services Committee",
    "Finance, HR & General Purpose Committee",
    "Audit Risk & Governance Committee",
  ],
  departments: [
    { name: "Finance & Commercial", head: "Finance & Commercial Manager" },
    { name: "Technical", head: "Technical Manager" },
    { name: "HR & Administration", head: "HR & Admin Manager" },
    { name: "ICT", head: "ICT Manager" },
    { name: "Procurement", head: "Procurement Manager" },
    { name: "Internal Audit & Legal", head: "Internal Audit Manager" },
  ],
} as const;
