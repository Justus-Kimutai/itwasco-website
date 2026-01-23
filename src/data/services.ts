export const services = [
  {
    id: "water-supply",
    title: "Water Supply",
    description: "Clean, reliable water supply to homes and businesses across Iten, Tambach, and surrounding areas.",
    icon: "Droplets",
    image: "/images/services/water-supply.jpg",
    features: [
      "24/7 water availability",
      "Quality-tested drinking water",
      "Residential and commercial supply",
      "Meter installation services",
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure Development",
    description: "Expanding our network to serve more communities with modern water infrastructure.",
    icon: "Building2",
    image: "/images/services/infrastructure.jpg",
    features: [
      "Network expansion projects",
      "Pipeline rehabilitation",
      "Storage facility upgrades",
      "Smart meter deployment",
    ],
  },
  {
    id: "quality",
    title: "Quality Control",
    description: "Rigorous testing and monitoring to ensure safe, clean drinking water for all.",
    icon: "ShieldCheck",
    image: "/images/services/quality-control.jpg",
    features: [
      "Regular water testing",
      "Quality certifications",
      "Treatment monitoring",
      "Health compliance",
    ],
  },
] as const;

export const connectionSteps = [
  {
    step: 1,
    title: "Visit Our Office",
    description: "Our office is located at Iten town behind Posta",
  },
  {
    step: 2,
    title: "Submit Application",
    description: "Fill out the application form with required documents",
  },
  {
    step: 3,
    title: "Site Survey",
    description: "Our team will visit your property for assessment",
  },
  {
    step: 4,
    title: "Fee Payment",
    description: "Pay the connection fee as per the survey assessment",
  },
  {
    step: 5,
    title: "Installation",
    description: "Our technical team installs your water connection",
  },
  {
    step: 6,
    title: "Start Service",
    description: "Enjoy clean, reliable water supply to your property",
  },
] as const;
