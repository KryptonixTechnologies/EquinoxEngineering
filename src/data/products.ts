export type ProductCategory =
  | "Filter Cartridges"
  | "Filter Media"
  | "Chemicals"
  | "Pumps"
  | "Laboratory"
  | "Plumbing";

export type InvestmentLevel = "Very Low" | "Low" | "Medium";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  demand: number;
  investment: InvestmentLevel;
  summary: string;
  description: string;
  applications: string[];
  highlights: string[];
  topMover?: boolean;
};

const topMovers = new Set([
  "pp-sediment-cartridges",
  "cto-carbon-cartridges",
  "gac-carbon-cartridges",
  "big-blue-filter-housings",
  "standard-filter-housings",
  "activated-carbon-media",
  "softener-resin",
  "silica-sand",
  "ro-membranes",
  "uv-lamps",
  "tds-meters",
  "ph-meters",
  "ro-antiscalant",
  "chlorine-granules",
  "mechanical-dosing-pumps",
  "ro-tubing",
  "john-guest-fittings",
  "float-switches",
  "pressure-gauges-pumps",
  "booster-pumps",
]);

const categoryCopy: Record<ProductCategory, { summary: string; applications: string[]; highlights: string[] }> = {
  "Filter Cartridges": {
    summary: "Replacement filtration component for domestic, commercial, and light industrial water systems.",
    applications: ["RO pretreatment", "Point-of-use filtration", "Service replacement"],
    highlights: ["Fast-moving replacement item", "Easy to stock", "Useful across many systems"],
  },
  "Filter Media": {
    summary: "Bulk treatment media for pressure vessels, multimedia filters, softeners, and specialty systems.",
    applications: ["Media filters", "Iron removal", "Water softening"],
    highlights: ["Core plant consumable", "Sold by volume or bag", "Supports recurring maintenance"],
  },
  Chemicals: {
    summary: "Treatment chemical for dosing, cleaning, pH control, disinfection, or RO system protection.",
    applications: ["RO protection", "Disinfection", "Membrane cleaning"],
    highlights: ["Repeat-purchase consumable", "Useful in service contracts", "Supports plant reliability"],
  },
  Pumps: {
    summary: "Dosing, pumping, measurement, and flow-control product for treatment plant operation.",
    applications: ["Chemical dosing", "RO operation", "Plant instrumentation"],
    highlights: ["High-turnover plant item", "Important for uptime", "Works with many installations"],
  },
  Laboratory: {
    summary: "Testing and calibration item for checking water quality during commissioning and service.",
    applications: ["Water testing", "Site surveys", "Service verification"],
    highlights: ["Portable and practical", "Useful for technicians", "Supports product recommendations"],
  },
  Plumbing: {
    summary: "Installation accessory for plumbing connections, isolation, sealing, and pressure control.",
    applications: ["System installation", "Maintenance", "Plant pipework"],
    highlights: ["Essential job-site stock", "Completes product installs", "Useful across many projects"],
  },
};

const rawProducts: Array<[string, string, ProductCategory, number, InvestmentLevel]> = [
  ["pp-sediment-cartridges", "PP Sediment Filter Cartridges (5\", 10\", 20\")", "Filter Cartridges", 5, "Low"],
  ["cto-carbon-cartridges", "CTO Carbon Block Cartridges", "Filter Cartridges", 5, "Low"],
  ["gac-carbon-cartridges", "GAC Carbon Cartridges", "Filter Cartridges", 5, "Low"],
  ["inline-post-carbon-filters", "Inline Post Carbon Filters", "Filter Cartridges", 5, "Low"],
  ["string-wound-filter-cartridges", "String Wound Filter Cartridges", "Filter Cartridges", 5, "Low"],
  ["pleated-filter-cartridges", "Pleated Filter Cartridges", "Filter Cartridges", 4, "Low"],
  ["jumbo-filter-cartridges", "Jumbo Filter Cartridges (20\")", "Filter Cartridges", 5, "Medium"],
  ["big-blue-filter-housings", "Big Blue Filter Housings (10\" & 20\")", "Filter Cartridges", 5, "Medium"],
  ["standard-filter-housings", "Standard 10\" Filter Housings", "Filter Cartridges", 5, "Low"],
  ["housing-spanners", "Housing Spanners", "Filter Cartridges", 4, "Very Low"],
  ["filter-housing-o-rings", "Filter Housing O-rings", "Filter Cartridges", 4, "Very Low"],
  ["uv-lamps", "UV Lamps (6W-55W)", "Filter Cartridges", 5, "Low"],
  ["uv-quartz-sleeves", "UV Quartz Sleeves", "Filter Cartridges", 4, "Low"],
  ["ro-membranes", "RO Membranes (50GPD, 75GPD, 100GPD)", "Filter Cartridges", 5, "Medium"],
  ["4040-ro-membranes", "4040 RO Membranes", "Filter Cartridges", 4, "Medium"],
  ["membrane-housing-end-caps", "Membrane Housing End Caps", "Filter Cartridges", 3, "Low"],
  ["booster-pumps", "Booster Pumps (24V & 36V)", "Pumps", 4, "Medium"],
  ["ro-solenoid-valves", "RO Solenoid Valves", "Pumps", 4, "Low"],
  ["low-pressure-switches", "Low Pressure Switches", "Pumps", 4, "Low"],
  ["high-pressure-switches", "High Pressure Switches", "Pumps", 4, "Low"],
  ["float-switches", "Float Switches", "Pumps", 5, "Low"],
  ["auto-shut-off-valves", "Auto Shut-off Valves", "Pumps", 4, "Low"],
  ["flow-restrictors", "Flow Restrictors", "Pumps", 4, "Very Low"],
  ["check-valves", "Check Valves", "Pumps", 4, "Very Low"],
  ["ro-faucets", "RO Faucets", "Plumbing", 4, "Low"],
  ["ro-storage-tank-valves", "RO Storage Tank Valves", "Plumbing", 3, "Low"],
  ["ro-tubing", "1/4\" RO Tubing", "Plumbing", 5, "Low"],
  ["john-guest-fittings", "John Guest Fittings", "Plumbing", 5, "Low"],
  ["quick-connect-elbows", "Quick Connect Elbows", "Plumbing", 5, "Low"],
  ["ball-valves-quarter-inch", "Ball Valves (1/4\")", "Plumbing", 4, "Low"],
  ["needle-valves", "Needle Valves", "Plumbing", 3, "Low"],
  ["silica-sand", "Silica Sand", "Filter Media", 5, "Low"],
  ["activated-carbon-media", "Activated Carbon (Coconut Shell)", "Filter Media", 5, "Medium"],
  ["anthracite", "Anthracite", "Filter Media", 4, "Low"],
  ["gravel-support-media", "Gravel Support Media", "Filter Media", 4, "Low"],
  ["softener-resin", "Ion Exchange Resin (Softener Resin)", "Filter Media", 5, "Medium"],
  ["katalox-light", "Katalox Light", "Filter Media", 4, "Medium"],
  ["birm", "Birm", "Filter Media", 4, "Low"],
  ["manganese-greensand", "Manganese Greensand", "Filter Media", 4, "Medium"],
  ["zeolite", "Zeolite", "Filter Media", 4, "Low"],
  ["mixed-bed-resin", "Mixed Bed Resin", "Filter Media", 3, "Medium"],
  ["ro-antiscalant", "RO Antiscalant", "Chemicals", 5, "Low"],
  ["sodium-hypochlorite", "Sodium Hypochlorite", "Chemicals", 4, "Low"],
  ["chlorine-granules", "Chlorine Granules (65%)", "Chemicals", 5, "Low"],
  ["chlorine-tablets", "Chlorine Tablets", "Chemicals", 4, "Low"],
  ["smbs", "SMBS (Sodium Metabisulfite)", "Chemicals", 4, "Low"],
  ["citric-acid", "Citric Acid", "Chemicals", 4, "Low"],
  ["acid-membrane-cleaner", "Membrane Cleaning Chemicals (Acid)", "Chemicals", 4, "Low"],
  ["alkaline-membrane-cleaner", "Membrane Cleaning Chemicals (Alkaline)", "Chemicals", 4, "Low"],
  ["ph-up-chemical", "pH Up Chemical", "Chemicals", 4, "Low"],
  ["ph-down-chemical", "pH Down Chemical", "Chemicals", 4, "Low"],
  ["mechanical-dosing-pumps", "Mechanical Dosing Pumps", "Pumps", 5, "Medium"],
  ["electromagnetic-dosing-pumps", "Electromagnetic Dosing Pumps", "Pumps", 5, "Medium"],
  ["foot-valves", "Foot Valves", "Pumps", 4, "Low"],
  ["injection-valves", "Injection Valves", "Pumps", 4, "Low"],
  ["dosing-tubing", "Dosing Tubing", "Pumps", 4, "Low"],
  ["chemical-tanks", "Chemical Tanks (60L-200L)", "Pumps", 4, "Medium"],
  ["pressure-gauges-pumps", "Pressure Gauges", "Pumps", 5, "Low"],
  ["pressure-relief-valves", "Pressure Relief Valves", "Pumps", 4, "Low"],
  ["tds-meters", "TDS Meters", "Laboratory", 5, "Low"],
  ["ph-meters", "pH Meters", "Laboratory", 5, "Low"],
  ["ec-meters", "EC Meters", "Laboratory", 4, "Low"],
  ["orp-meters", "ORP Meters", "Laboratory", 4, "Low"],
  ["chlorine-test-kits", "Chlorine Test Kits", "Laboratory", 4, "Low"],
  ["pool-test-kits", "Pool Test Kits", "Laboratory", 4, "Low"],
  ["conductivity-calibration-solution", "Conductivity Calibration Solution", "Laboratory", 3, "Low"],
  ["ph-buffer-solutions", "pH Buffer Solutions", "Laboratory", 4, "Low"],
  ["turbidity-tubes", "Turbidity Tubes", "Laboratory", 3, "Low"],
  ["pvc-ball-valves", "PVC Ball Valves", "Plumbing", 4, "Low"],
  ["upvc-fittings", "UPVC Fittings", "Plumbing", 4, "Low"],
  ["ppr-fittings", "PPR Fittings", "Plumbing", 4, "Low"],
  ["brass-nipples", "Brass Nipples", "Plumbing", 4, "Low"],
  ["thread-seal-tape", "Thread Seal Tape", "Plumbing", 5, "Very Low"],
  ["hose-clamps", "Hose Clamps", "Plumbing", 4, "Very Low"],
  ["pressure-gauges-plumbing", "Pressure Gauges", "Plumbing", 5, "Low"],
  ["non-return-valves", "Non-return Valves", "Plumbing", 4, "Low"],
];

export const products: Product[] = rawProducts.map(([id, name, category, demand, investment]) => {
  const copy = categoryCopy[category];

  return {
    id,
    name,
    category,
    demand,
    investment,
    topMover: topMovers.has(id),
    summary: copy.summary,
    description: `${name} is part of the Equinox Engineering ${category.toLowerCase()} range. It is suited for water treatment projects, service replacements, and fast-moving stock where dependable availability matters.`,
    applications: copy.applications,
    highlights: copy.highlights,
  };
});

export const categories: ProductCategory[] = [
  "Filter Cartridges",
  "Filter Media",
  "Chemicals",
  "Pumps",
  "Laboratory",
  "Plumbing",
];

export function getProduct(id?: string) {
  return products.find((product) => product.id === id);
}

export function getRecommendations(productId: string) {
  const product = getProduct(productId);

  if (!product) {
    return products.slice(0, 3);
  }

  return products
    .filter((item) => item.id !== productId)
    .sort((a, b) => {
      if (a.category === product.category && b.category !== product.category) return -1;
      if (a.category !== product.category && b.category === product.category) return 1;
      return b.demand - a.demand;
    })
    .slice(0, 3);
}
