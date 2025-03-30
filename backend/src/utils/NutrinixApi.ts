import config from '../config/config';
import fetch from 'node-fetch';
import { NutrinixReponseMain, AlmostFinishedProduct, CleanKrogerProductData, FullyFinishedProduct } from '../types';
import { getBarcode } from './UpcCalculator';

export async function combineProductWithNutrinix(productData: CleanKrogerProductData): Promise<AlmostFinishedProduct[]> {
  const nutritionixApiKey = config.nutritionixApiKey;
  const nutritionixAppId = config.nutritionixAppId;
  const nutritionixUrl = config.nutritionixUrl;
  const result: AlmostFinishedProduct[] = [];

  for (let i = 0; i < productData.length; i++) {
    const product = productData[i];
    const upc = Object.keys(product)[0];

    const info = product[upc];

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
      const data = await response.json() as NutrinixReponseMain;
      const foodData = data.foods;
      const nutriInfo = foodData[0];

      const fullData: AlmostFinishedProduct = {
        "description": info.description,
        "price": info.price,
        "upc": upcCode,
        "brand": info.brand,
        "serving_weight_grams": nutriInfo.serving_weight_grams? nutriInfo.serving_weight_grams : null,
        "nf_metric_qty": nutriInfo.nf_metric_qty,
        "nf_metric_uom": nutriInfo.nf_metric_uom,
        "nf_total_fat": nutriInfo.nf_total_fat,
        "nf_saturated_fat": nutriInfo.nf_saturated_fat,
        "nf_protein": nutriInfo.nf_protein,
        "nf_total_carbohydrate": nutriInfo.nf_total_carbohydrate,
        "nf_dietary_fiber": nutriInfo.nf_dietary_fiber,
        "nf_sugars": nutriInfo.nf_sugars,
        "nf_sodium": nutriInfo.nf_sodium,
        "nf_cholesterol": nutriInfo.nf_cholesterol,
        "photo": nutriInfo.photo ? nutriInfo.photo.thumb : null,
      }
      result.push(fullData);
  }
  }
  return result;
}