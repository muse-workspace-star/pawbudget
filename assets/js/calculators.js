/* ============================================================
   PawBudget — shared calculation library
   Cost model (documented in /methodology/):
     - Base annual cost by size: small $1,600 / medium $2,200 /
       large $2,900 / giant $3,600
     - Category split: food 28%, healthcare 30%, grooming 10%,
       services 14%, supplies 8%, misc 10%
     - First year x1.35 (acquisition + setup + spay/neuter + training)
     - Senior (age >= breed seniorAge): healthcare portion x1.5
     - Region multipliers: NE 1.15 / West 1.12 / Midwest 0.95 /
       South 1.00 / Rural 0.90
     - Care level: Essential 0.85 / Standard 1.00 / Premium 1.35
     - Lifetime = firstYear + annual x (lifespanMidpoint - 1)
     - All money rounded to nearest $10
   Age model:
     - humanYears = (16 * ln(dogAgeYears) + 31) x sizeFactor
       (UCSD 2019, derived from Labrador Retrievers)
     - size factors: small 0.92 / medium 1.0 / large 1.06 / giant 1.12
     - dog age clamped to [0.1, 20] years; result clamped to >= 1
   ============================================================ */

const SIZE_BASE_ANNUAL = { small: 1600, medium: 2200, large: 2900, giant: 3600 };

const CATEGORY_SPLIT = {
  food: 0.28, healthcare: 0.30, grooming: 0.10,
  services: 0.14, supplies: 0.08, misc: 0.10
};

const CATEGORY_LABELS = {
  food: "Food & treats",
  healthcare: "Healthcare & vet",
  grooming: "Grooming",
  services: "Training & services",
  supplies: "Supplies",
  misc: "Miscellaneous"
};

const REGION_MULT = { northeast: 1.15, west: 1.12, midwest: 0.95, south: 1.0, rural: 0.9 };
const CARE_MULT = { essential: 0.85, standard: 1.0, premium: 1.35 };
const FIRST_YEAR_MULT = 1.35;
const SENIOR_HEALTHCARE_MULT = 1.5;

const EMERGENCY_FUND = { small: 2000, medium: 3000, large: 5000, giant: 5000 };

const AGE_SIZE_FACTOR = { small: 0.92, medium: 1.0, large: 1.06, giant: 1.12 };
const SENIOR_THRESHOLD = { small: 10, medium: 9, large: 7, giant: 6 };

function round10(n) {
  return Math.round(n / 10) * 10;
}

function formatMoney(n) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

/**
 * Compute the full cost picture for a dog.
 * @param {Object} opts
 * @param {string} opts.breedKey   key into BREED_DATA
 * @param {string} [opts.sizeClass] override size (defaults to breed's)
 * @param {number} opts.ageYears   dog's current age in years (decimal ok)
 * @param {string} opts.region     key into REGION_MULT
 * @param {string} opts.careLevel  key into CARE_MULT
 * @returns {Object} annual, firstYear, lifetime, categories, isSenior, etc.
 */
function computeCost(opts) {
  const breed = BREED_DATA[opts.breedKey];
  if (!breed) throw new Error("Unknown breed: " + opts.breedKey);

  const size = opts.sizeClass || breed.sizeClass;
  const regionM = REGION_MULT[opts.region] != null ? REGION_MULT[opts.region] : 1.0;
  const careM = CARE_MULT[opts.careLevel] != null ? CARE_MULT[opts.careLevel] : 1.0;
  const ageYears = Math.max(0, Number(opts.ageYears) || 0);

  const baseAnnual = SIZE_BASE_ANNUAL[size] * regionM * careM;
  const isSenior = ageYears >= breed.seniorAge;

  const categories = {};
  for (const key of Object.keys(CATEGORY_SPLIT)) {
    categories[key] = baseAnnual * CATEGORY_SPLIT[key];
  }
  if (isSenior) {
    categories.healthcare *= SENIOR_HEALTHCARE_MULT;
  }

  const annual = Object.keys(categories).reduce((sum, k) => sum + categories[k], 0);
  const firstYear = annual * FIRST_YEAR_MULT;
  const lifespanMid = (breed.lifespanYears[0] + breed.lifespanYears[1]) / 2;
  const lifetime = firstYear + annual * (lifespanMid - 1);

  const roundedCats = {};
  for (const key of Object.keys(categories)) {
    roundedCats[key] = round10(categories[key]);
  }

  return {
    breedName: breed.name,
    sizeClass: size,
    ageYears: ageYears,
    isSenior: isSenior,
    annual: round10(annual),
    firstYear: round10(firstYear),
    lifetime: round10(lifetime),
    categories: roundedCats,
    lifespanMid: lifespanMid,
    emergencyFund: EMERGENCY_FUND[size] || 3000,
    region: opts.region,
    careLevel: opts.careLevel
  };
}

/**
 * Convert a dog's age to human-equivalent years.
 * @param {number} ageYears  dog age in years (decimals allowed)
 * @param {string} sizeClass small | medium | large | giant
 * @returns {number} human-equivalent years, rounded to nearest whole
 */
function humanAgeEquivalent(ageYears, sizeClass) {
  const a = Math.min(20, Math.max(0.1, Number(ageYears) || 0.1));
  const factor = AGE_SIZE_FACTOR[sizeClass] != null ? AGE_SIZE_FACTOR[sizeClass] : 1.0;
  const raw = (16 * Math.log(a) + 31) * factor;
  return Math.max(1, Math.round(raw));
}

/**
 * Life stage for a dog's age and size class.
 * Puppy: under 2 years; Senior: at/above size-based threshold; else Adult.
 */
function lifeStage(ageYears, sizeClass) {
  const a = Number(ageYears) || 0;
  if (a < 2) return "Puppy";
  const threshold = SENIOR_THRESHOLD[sizeClass] != null ? SENIOR_THRESHOLD[sizeClass] : 9;
  if (a >= threshold) return "Senior";
  return "Adult";
}

function seniorThresholdFor(sizeClass) {
  return SENIOR_THRESHOLD[sizeClass] != null ? SENIOR_THRESHOLD[sizeClass] : 9;
}

/* Export for Node-based validation (harmless in browsers). */
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    computeCost, humanAgeEquivalent, lifeStage, seniorThresholdFor,
    formatMoney, round10, SIZE_BASE_ANNUAL, CATEGORY_SPLIT, CATEGORY_LABELS,
    REGION_MULT, CARE_MULT, EMERGENCY_FUND, AGE_SIZE_FACTOR, SENIOR_THRESHOLD
  };
}
