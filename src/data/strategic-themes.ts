export const strategicThemes = [
  {
    id: 1,
    title: "Infrastructure Development & Expansion",
    description: "Enhance water access and introduce modern sewerage services across our service area.",
    icon: "Building",
    objectives: [
      "Increase water coverage from 53% to 65%",
      "Rehabilitate aging water supply infrastructure",
      "Develop foundational sewerage infrastructure",
    ],
  },
  {
    id: 2,
    title: "Non-Revenue Water Management",
    description: "Improve system efficiency and conserve valuable water resources.",
    icon: "Gauge",
    objectives: [
      "Reduce Non-Revenue Water from 32% to 25%",
      "Implement leak detection programs",
      "Upgrade metering systems",
    ],
  },
  {
    id: 3,
    title: "Operational Excellence & Human Capital",
    description: "Optimize processes and empower our workforce for better service delivery.",
    icon: "Users",
    objectives: [
      "Reduce operational cost-to-revenue ratio from 90% to 80%",
      "Enhance staff training and development",
      "Implement digital transformation initiatives",
    ],
  },
  {
    id: 4,
    title: "Financial Sustainability & Growth",
    description: "Ensure economic viability and invest in future projects.",
    icon: "TrendingUp",
    objectives: [
      "Improve revenue collection efficiency",
      "Diversify funding sources",
      "Achieve cost recovery targets",
    ],
  },
  {
    id: 5,
    title: "Robust Corporate Governance & Image",
    description: "Uphold the highest standards of integrity, transparency, and public trust.",
    icon: "Shield",
    objectives: [
      "Strengthen board oversight",
      "Enhance stakeholder engagement",
      "Improve corporate communications",
    ],
  },
] as const;

export const progressMetrics = [
  {
    label: "Water Coverage",
    current: 53,
    target: 65,
    unit: "%",
  },
  {
    label: "Non-Revenue Water",
    current: 32,
    target: 25,
    unit: "%",
    inverted: true,
  },
  {
    label: "Operational Cost Ratio",
    current: 90,
    target: 80,
    unit: "%",
    inverted: true,
  },
] as const;
