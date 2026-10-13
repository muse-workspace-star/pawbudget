/* ============================================================
   PawBudget — breed dataset
   Fields per breed:
     name            display name
     sizeClass       small | medium | large | giant
     weightLbs       [min, max] typical adult weight
     lifespanYears   [min, max] typical lifespan
     seniorAge       age (years) at which the breed is considered senior
     acquisitionCost [min, max] USD — adoption fees up to reputable breeder
     commonIssues    1–2 common health concerns (strings)
   ============================================================ */
const BREED_DATA = {
  "labrador-retriever": {
    name: "Labrador Retriever", sizeClass: "large",
    weightLbs: [55, 80], lifespanYears: [10, 12], seniorAge: 8,
    acquisitionCost: [200, 2000],
    commonIssues: ["Hip and elbow dysplasia", "Exercise-induced collapse"]
  },
  "golden-retriever": {
    name: "Golden Retriever", sizeClass: "large",
    weightLbs: [55, 75], lifespanYears: [10, 12], seniorAge: 8,
    acquisitionCost: [300, 2500],
    commonIssues: ["Cancer (hemangiosarcoma, lymphoma)", "Hip dysplasia"]
  },
  "french-bulldog": {
    name: "French Bulldog", sizeClass: "medium",
    weightLbs: [16, 28], lifespanYears: [10, 12], seniorAge: 9,
    acquisitionCost: [500, 4000],
    commonIssues: ["Brachycephalic airway syndrome", "Spinal issues (IVDD)"]
  },
  "german-shepherd": {
    name: "German Shepherd", sizeClass: "large",
    weightLbs: [50, 90], lifespanYears: [9, 13], seniorAge: 8,
    acquisitionCost: [300, 2000],
    commonIssues: ["Hip and elbow dysplasia", "Degenerative myelopathy"]
  },
  "poodle-standard": {
    name: "Poodle (Standard)", sizeClass: "large",
    weightLbs: [40, 70], lifespanYears: [10, 18], seniorAge: 8,
    acquisitionCost: [500, 2500],
    commonIssues: ["Hip dysplasia", "Addison's disease"]
  },
  "bulldog": {
    name: "Bulldog (English)", sizeClass: "medium",
    weightLbs: [40, 50], lifespanYears: [8, 10], seniorAge: 8,
    acquisitionCost: [500, 3500],
    commonIssues: ["Breathing difficulties", "Skin-fold infections"]
  },
  "beagle": {
    name: "Beagle", sizeClass: "medium",
    weightLbs: [20, 25], lifespanYears: [10, 15], seniorAge: 9,
    acquisitionCost: [100, 1200],
    commonIssues: ["Obesity", "Epilepsy"]
  },
  "rottweiler": {
    name: "Rottweiler", sizeClass: "large",
    weightLbs: [80, 135], lifespanYears: [9, 10], seniorAge: 7,
    acquisitionCost: [300, 2000],
    commonIssues: ["Hip and elbow dysplasia", "Osteosarcoma (bone cancer)"]
  },
  "dachshund": {
    name: "Dachshund", sizeClass: "small",
    weightLbs: [16, 32], lifespanYears: [12, 16], seniorAge: 11,
    acquisitionCost: [100, 1500],
    commonIssues: ["Intervertebral disc disease", "Obesity"]
  },
  "german-shorthaired-pointer": {
    name: "German Shorthaired Pointer", sizeClass: "large",
    weightLbs: [45, 70], lifespanYears: [10, 12], seniorAge: 8,
    acquisitionCost: [300, 1500],
    commonIssues: ["Hip dysplasia", "Bloat (gastric dilatation-volvulus)"]
  },
  "yorkshire-terrier": {
    name: "Yorkshire Terrier", sizeClass: "small",
    weightLbs: [4, 7], lifespanYears: [11, 15], seniorAge: 11,
    acquisitionCost: [200, 2500],
    commonIssues: ["Dental disease", "Luxating patella"]
  },
  "australian-shepherd": {
    name: "Australian Shepherd", sizeClass: "medium",
    weightLbs: [40, 65], lifespanYears: [12, 15], seniorAge: 9,
    acquisitionCost: [200, 1500],
    commonIssues: ["Hip dysplasia", "MDR1 drug sensitivity"]
  },
  "boxer": {
    name: "Boxer", sizeClass: "large",
    weightLbs: [50, 80], lifespanYears: [10, 12], seniorAge: 8,
    acquisitionCost: [300, 1500],
    commonIssues: ["Cancer (mast cell tumors)", "Heart conditions"]
  },
  "siberian-husky": {
    name: "Siberian Husky", sizeClass: "medium",
    weightLbs: [35, 60], lifespanYears: [12, 14], seniorAge: 9,
    acquisitionCost: [200, 1500],
    commonIssues: ["Hip dysplasia", "Eye conditions"]
  },
  "cavalier-king-charles-spaniel": {
    name: "Cavalier King Charles Spaniel", sizeClass: "small",
    weightLbs: [12, 18], lifespanYears: [12, 15], seniorAge: 10,
    acquisitionCost: [500, 2500],
    commonIssues: ["Mitral valve disease", "Syringomyelia"]
  },
  "great-dane": {
    name: "Great Dane", sizeClass: "giant",
    weightLbs: [110, 175], lifespanYears: [7, 10], seniorAge: 6,
    acquisitionCost: [300, 2000],
    commonIssues: ["Bloat (gastric dilatation-volvulus)", "Hip dysplasia"]
  },
  "doberman-pinscher": {
    name: "Doberman Pinscher", sizeClass: "large",
    weightLbs: [60, 100], lifespanYears: [10, 12], seniorAge: 8,
    acquisitionCost: [300, 2500],
    commonIssues: ["Dilated cardiomyopathy", "Wobbler syndrome"]
  },
  "shih-tzu": {
    name: "Shih Tzu", sizeClass: "small",
    weightLbs: [9, 16], lifespanYears: [10, 18], seniorAge: 11,
    acquisitionCost: [200, 1500],
    commonIssues: ["Dental disease", "Breathing issues"]
  },
  "miniature-schnauzer": {
    name: "Miniature Schnauzer", sizeClass: "small",
    weightLbs: [11, 20], lifespanYears: [12, 15], seniorAge: 10,
    acquisitionCost: [200, 1500],
    commonIssues: ["Pancreatitis", "Bladder stones"]
  },
  "boston-terrier": {
    name: "Boston Terrier", sizeClass: "small",
    weightLbs: [12, 25], lifespanYears: [11, 13], seniorAge: 10,
    acquisitionCost: [200, 1500],
    commonIssues: ["Brachycephalic airway issues", "Eye injuries"]
  },
  "pomeranian": {
    name: "Pomeranian", sizeClass: "small",
    weightLbs: [3, 7], lifespanYears: [12, 16], seniorAge: 11,
    acquisitionCost: [300, 2000],
    commonIssues: ["Dental disease", "Luxating patella"]
  },
  "cocker-spaniel": {
    name: "Cocker Spaniel", sizeClass: "medium",
    weightLbs: [20, 30], lifespanYears: [10, 14], seniorAge: 9,
    acquisitionCost: [200, 1500],
    commonIssues: ["Ear infections", "Eye conditions"]
  },
  "border-collie": {
    name: "Border Collie", sizeClass: "medium",
    weightLbs: [30, 55], lifespanYears: [12, 15], seniorAge: 9,
    acquisitionCost: [200, 1200],
    commonIssues: ["Hip dysplasia", "Collie eye anomaly"]
  },
  "mixed-breed": {
    name: "Mixed Breed", sizeClass: "medium",
    weightLbs: [20, 60], lifespanYears: [11, 14], seniorAge: 9,
    acquisitionCost: [50, 500],
    commonIssues: ["Varies by mix", "Often hardier overall"]
  }
};

const SIZE_LABELS = {
  small: "Small (under ~25 lbs)",
  medium: "Medium (~25–60 lbs)",
  large: "Large (~60–100 lbs)",
  giant: "Giant (100+ lbs)"
};

const REGION_LABELS = {
  northeast: "Northeast",
  midwest: "Midwest",
  south: "South",
  west: "West",
  rural: "Rural / low-cost area"
};

const CARE_LABELS = {
  essential: "Essential",
  standard: "Standard",
  premium: "Premium"
};
