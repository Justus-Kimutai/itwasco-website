export const companyStats = [
  {
    value: 3330,
    label: "Active Connections",
    suffix: "+",
    description: "Households and businesses served",
  },
  {
    value: 53,
    label: "Coverage Rate",
    suffix: "%",
    description: "Of operational area population",
  },
  {
    value: 144,
    label: "Service Area",
    suffix: " km²",
    description: "Mandated coverage zone",
  },
  {
    value: 90000,
    label: "Target Population",
    suffix: "+",
    description: "Residents to serve",
  },
] as const;

export const growthMetrics = {
  connectionsIn2007: 500,
  connectionsIn2018: 3330,
  growthFactor: 6.66,
  operationalSince: 2008,
  incorporated: 2007,
} as const;
