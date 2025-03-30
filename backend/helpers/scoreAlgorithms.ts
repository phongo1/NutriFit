import { AlgorithmModels, AlmostFinishedProduct } from "../src/types";


const models: AlgorithmModels = {
    "bulking": scoreBulkingProteinFocused,
    "cutting": scoreCuttingFocused,
    "keto": scoreKetoSoftCapped,
    "diabetic": scoreDiabeticFriendly,
  };
  
//   product schema:

//   serving_weight_grams,
//   nf_metric_qty,
//   nf_metric_uom,
//   nf_total_fat: fat,
//   nf_saturated_fat: satFat = 0,
//   nf_protein: protein,
//   nf_total_carbohydrate: carbs,
//   nf_dietary_fiber: fiber = 0,
//   nf_sugars: sugars = 0,
//   nf_sodium: sodium = 0,
//   nf_cholesterol: cholesterol = 0
  // Dynamic scoring function
  export function getScore(goal: string, product: AlmostFinishedProduct) {
    if (!models[goal]) return "Invalid goal selected";
    return models[goal](product);
  }


function normalizeServingGrams(servingGrams: number | null, metricQty: number | null, metricUom: string | null) {     //helper function for liquids with fl oz and ml
    if (servingGrams && !isNaN(servingGrams)) {
      return servingGrams;
    }
  
    const unit = (metricUom || "").toLowerCase();
  
    // Support mL-based liquids (1 mL ≈ 1 g)
    if (unit === 'ml') {
      return metricQty;
    }
  
    // Support fluid ounces (1 fl oz ≈ 29.5735 g)
    if (unit === 'fl oz' ) {
      return metricQty! * 29.5735;
    }
  
    // If no usable info, return null
    return null;
  }



  function hasMissingNutrients(...values: any[]) {    //helper function for items without a nurtrition label
    return values.some(v => v === null || v === undefined || isNaN(v));
  }
  



function scoreBulkingProteinFocused(product: AlmostFinishedProduct) {    //focus on protein, carbs, and fats
    const {
    serving_weight_grams,
    nf_metric_qty,
    nf_metric_uom,
    nf_total_fat: fat,
    nf_saturated_fat: satFat = 0,
    nf_protein: protein,
    nf_total_carbohydrate: carbs,
    nf_dietary_fiber: fiber = 0,
    nf_sugars: sugars = 0,
    nf_sodium: sodium = 0,
    nf_cholesterol: cholesterol = 0
      } = product;
  
    // Normalize serving weight
    const servingGrams = normalizeServingGrams(serving_weight_grams, nf_metric_qty, nf_metric_uom);
    if (!servingGrams) return null;
  
    // Convert to % of serving weight
    const fatPct = ((fat || 0) / servingGrams) * 100;
    const proteinPct = ((protein || 0) / servingGrams) * 100;
    const carbPct = ((carbs || 0) / servingGrams) * 100;
    const sugarPct = ((sugars || 0) / servingGrams) * 100;
    const sodiumPct = (((sodium || 0) / 1000) / servingGrams) * 100;
    const cholesterolPct = (((cholesterol || 0) / 1000) / servingGrams) * 100;
  
    let score = 0;
  
    // 🥩 Protein (max 55 pts — soft cap at 25%, small bonus above)
    let proteinScore = 0;
    if (proteinPct <= 25) {
      proteinScore = (proteinPct / 25) * 50;
    } else {
      proteinScore = 50 + ((proteinPct - 25) / 10) * 1.5;
    }
    score += Math.min(proteinScore, 55);
  
    // 🧈 Fat (max 25 pts — full score in 15–35% range)
    if (fatPct >= 15 && fatPct <= 35) {
      score += 25;
    } else {
      score += Math.min((fatPct / 35) * 25, 20);
    }
  
    // 🍚 Carbs (10 pts)
    score += Math.min((carbPct / 50), 1) * 10;
  
    // 🍭 Sugar (inverse, max 5 pts)
    score += sugarPct <= 10 ? (1 - sugarPct / 10) * 5 : 0;
  
    // 🧂 Sodium (scaled, max 5 pts — looser scale 0.3–1.5%)
    if (sodiumPct >= 0.3 && sodiumPct <= 1.5) {
      score += ((sodiumPct - 0.3) / 1.2) * 5;
    }
  
    // 🫀 Cholesterol (soft penalty — max 3 pts if very low)
    if (cholesterolPct <= 0.1) {
      score += (1 - cholesterolPct / 0.1) * 3;
    }
  
    return Math.round(Math.min(score, 100));
  }
  

  







  function scoreCuttingFocused(product: AlmostFinishedProduct) {     //cutting diet     
    const {
      serving_weight_grams,
      nf_metric_qty,
      nf_metric_uom,
      nf_total_fat: fat = 0,
      nf_saturated_fat: satFat = 0,
      nf_protein: protein = 0,
      nf_total_carbohydrate: carbs = 0,
      nf_dietary_fiber: fiber = 0,
      nf_sugars: sugars = 0,
      nf_sodium: sodium = 0,
      nf_cholesterol: cholesterol = 0
    } = product;
  
    const servingGrams = normalizeServingGrams(serving_weight_grams, nf_metric_qty, nf_metric_uom);
    if (!servingGrams) return null;  
    const fatPct = ((fat || 0) / servingGrams) * 100;
    const proteinPct = ((protein || 0) / servingGrams) * 100;
    const carbPct = ((carbs || 0) / servingGrams) * 100;
    const sugarPct = ((sugars || 0) / servingGrams) * 100;
    const fiberPct = ((fiber || 0) / servingGrams) * 100;
    const sodiumPct = (((sodium || 0) / 1000) / servingGrams) * 100;
    const cholesterolPct = (((cholesterol || 0) / 1000) / servingGrams) * 100;
  
    let score = 0;
  
    // 🥩 Protein (max 50 pts)
    score += Math.min((proteinPct / 25), 1) * 50;
  
    // 🍭 Sugar (inverse, max 15 pts)
    score += sugarPct <= 10 ? (1 - sugarPct / 10) * 15 : 0;
  
    // 🍚 Carbs (inverse, max 10 pts)
    score += carbPct <= 15 ? (1 - carbPct / 15) * 10 : 0;
  
    // 🧈 Fat (moderate, max 10 pts if <=15%)
    score += fatPct <= 15 ? (1 - fatPct / 15) * 10 : 0;
  
    // 🧂 Sodium (scaled, max 10 pts between 0.2–1%)
    if (sodiumPct >= 0.2 && sodiumPct <= 1) {
      score += ((sodiumPct - 0.2) / 0.8) * 10;
    }
  
    // 🫀 Cholesterol (inverse, max 5 pts if <=0.1%)
    if (cholesterolPct <= 0.1) {
      score += (1 - cholesterolPct / 0.1) * 5;
    }
  
    return Math.round(Math.min(score, 100));
  }









  function scoreKetoSoftCapped(product: AlmostFinishedProduct) {     //Keto diet     low carbs with high fats, no sugar
    const {
      serving_weight_grams,
      nf_metric_qty,
      nf_metric_uom,
      nf_total_fat: fat = 0,
      nf_saturated_fat: satFat = 0,
      nf_protein: protein = 0,
      nf_total_carbohydrate: carbs = 0,
      nf_dietary_fiber: fiber = 0,
      nf_sugars: sugars = 0,
      nf_sodium: sodium = 0,
      nf_cholesterol: cholesterol = 0
    } = product;
  
    const servingGrams = normalizeServingGrams(serving_weight_grams, nf_metric_qty, nf_metric_uom);
    if (!servingGrams) return null;  
    const netCarbs = Math.max((carbs||0) - (fiber||0), 0);
  
    const fatPct = ((fat || 0) / servingGrams) * 100;
    const proteinPct = ((protein || 0) / servingGrams) * 100;
    const netCarbPct = ((netCarbs || 0) / servingGrams) * 100;
    const fiberPct = ((fiber || 0) / servingGrams) * 100;
    const sugarPct = ((sugars || 0) / servingGrams) * 100;
    const sodiumPct = (((sodium || 0) / 1000) / servingGrams) * 100;
    const cholesterolPct = (((cholesterol || 0) / 1000) / servingGrams) * 100;
  
    let score = 0;
  
    // 1. Fat Score (soft cap at 50%, small bonus after, max 40 pts)
    let fatScore = 0;
    if (fatPct <= 50) {
      fatScore = (fatPct / 50) * 35;
    } else {
      fatScore = 35 + ((fatPct - 50) / 10) * 1.5;
    }
    score += Math.min(fatScore, 40);
  
    // 2. Protein Score (soft cap at 25%, small bonus after, max 22 pts)
    let proteinScore = 0;
    if (proteinPct <= 25) {
      proteinScore = (proteinPct / 25) * 20;
    } else {
      proteinScore = 20 + ((proteinPct - 25) / 10);
    }
    score += Math.min(proteinScore, 22);
  
    // 3. Net Carbs (inverse, max 20 pts)
    score += netCarbPct <= 10 ? (1 - netCarbPct / 10) * 20 : 0;
  
    // 4. Fiber Score (max 10 pts)
    score += Math.min(fiberPct * 1.5, 10);
  
    // 5. Sugar Score (inverse, max 5 pts)
    score += sugarPct <= 10 ? (1 - sugarPct / 10) * 5 : 0;
  
    // 6. Sodium Score (0.3–1% = up to 5 pts)
    if (sodiumPct >= 0.3 && sodiumPct <= 1) {
      score += ((sodiumPct - 0.3) / 0.7) * 5;
    }
  
    // 7. Cholesterol Score (<= 0.1% = up to 5 pts)
    if (cholesterolPct <= 0.1) {
      score += (1 - cholesterolPct / 0.1) * 5;
    }
  
    return Math.round(Math.min(score, 100));
  }







  function scoreDiabeticFriendly(product: AlmostFinishedProduct) {     //Diabetic diet    sugar weighed the most, low sugar and high fiber is good
    const {
      serving_weight_grams,
      nf_metric_qty,
      nf_metric_uom,
      nf_total_fat: fat = 0,
      nf_saturated_fat: satFat = 0,
      nf_protein: protein = 0,
      nf_total_carbohydrate: carbs = 0,
      nf_dietary_fiber: fiber = 0,
      nf_sugars: sugars = 0,
      nf_sodium: sodium = 0,
      nf_cholesterol: cholesterol = 0
    } = product;
  
    const servingGrams = normalizeServingGrams(serving_weight_grams, nf_metric_qty, nf_metric_uom);
    if (!servingGrams) return null;

    const fatPct = ((fat || 0) / servingGrams) * 100;
    const proteinPct = ((protein || 0) / servingGrams) * 100;
    const carbPct = ((carbs || 0) / servingGrams) * 100;
    const sugarPct = ((sugars || 0) / servingGrams) * 100;
    const fiberPct = ((fiber || 0) / servingGrams) * 100;
    const sodiumPct = (((sodium || 0) / 1000) / servingGrams) * 100;
    const cholesterolPct = (((cholesterol || 0) / 1000) / servingGrams) * 100;
  
    let score = 0;
  
    // 🍭 Sugar (inverse, max 30 pts)
    score += sugarPct <= 5 ? (1 - sugarPct / 5) * 30 : 0;
  
    // 🍚 Carbs (inverse, max 20 pts)
    score += carbPct <= 15 ? (1 - carbPct / 15) * 20 : 0;
  
    // 🌾 Fiber (more is better, max 15 pts)
    score += Math.min(fiberPct * 2, 15);
  
    // 🥩 Protein (max 20 pts at ~25%)
    score += Math.min((proteinPct / 25), 1) * 20;
  
    // 🧈 Fat (light penalty, max 5 pts if <20%)
    score += fatPct <= 20 ? (1 - fatPct / 20) * 5 : 0;
  
    // 🧂 Sodium (bonus for 0.2–1% range, up to 5 pts)
    if (sodiumPct >= 0.2 && sodiumPct <= 1) {
      score += ((sodiumPct - 0.2) / (1 - 0.2)) * 5;
    }
  
    // 🫀 Cholesterol (inverse, max 5 pts if ≤0.1%)
    if (cholesterolPct <= 0.1) {
      score += (1 - cholesterolPct / 0.1) * 5;
    }
  
    return Math.round(Math.min(score, 100));
  }
  


  