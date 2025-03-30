import config from '../config/config';
import fetch from 'node-fetch';
import { NutrinixReponse, CleanKrogerProductData, AlmostFinishedProduct } from '../types';
import { getBarcode } from './UpcCalculator';

export async function combineProductWithNutrinix(productData: CleanKrogerProductData): Promise<AlmostFinishedProduct[]> {
  const nutritionixApiKey = config.nutritionixApiKey;
  const nutritionixAppId = config.nutritionixAppId;
  const nutritionixUrl = config.nutritionixUrl;
  const result: AlmostFinishedProduct[] = [];

  for (const upc in productData) {
    const infoMap = productData[upc];
    const { description, price, brand } = infoMap[0];

    // calculate the upc
    const upcCode = getBarcode(upc);

    const url = `${nutritionixUrl}${upcCode}`;
    const headers = {
      'x-app-id': nutritionixAppId,
      'x-app-key': nutritionixApiKey,
      'Content-Type': 'application/json',
    };
    const response  = await fetch(url, { method: 'GET', headers });

    if (response.status == 404) {
      console.log(`No nutritionix data found for ${upcCode}`);
      continue;
    }

    else if (response.status >=400) {
      console.error(`Error fetching data from Nutritionix: ${response.statusText}`);
      continue;
    }

    else {
      const data = await response.json() as NutrinixReponse;
      const fullData: AlmostFinishedProduct = {
        "description": description,
        "price": price,
        "upc": upcCode,
        "brand": brand,
        "serving_weight_grams": data.serving_weight_grams,
        "nf_metric_qty": data.nf_metric_qty,
        "nf_metric_uom": data.nf_metric_uom,
        "nf_total_fat": data.nf_total_fat,
        "nf_saturated_fat": data.nf_saturated_fat,
        "nf_protein": data.nf_protein,
        "nf_total_carbohydrate": data.nf_total_carbohydrate,
        "nf_dietary_fiber": data.nf_dietary_fiber,
        "nf_sugars": data.nf_sugars,
        "nf_sodium": data.nf_sodium,
        "nf_cholesterol": data.nf_cholesterol,
        "photo": data.photo.thumb
      }
      result.push(fullData);
  }

  }
  return result;
}