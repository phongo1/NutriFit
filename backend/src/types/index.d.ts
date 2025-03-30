export interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
}

export interface Config {
  port: number;
  nodeEnv: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope: string;
  oauthUrl: string;
  nutritionixApiKey: string;
  nutritionixAppId: string;
  nutritionixUrl: string;
}

export interface InformationMap {
  "description": string;
  "price": number;
  "brand": string;
}

export interface LocationDataResponse {
  data: Array<{ "locationId": string}>;
};

interface ItemObject {
  "price": {"regular": number}
}

export interface ProductObject {
  "upc": string;
  "description": string;
  "items": Array<ItemObject>;
  "brand": string;
}

export interface ProductDataResponse {
  data: Array<ProductObject>;
}

export type CleanKrogerProductData = Record<string, InformationMap>[];

export interface NutrinixReponse {
  "serving_weight_grams": number | null,
  "nf_metric_qty": number | null,
  "nf_metric_uom": string | null,
  "nf_total_fat": number | null,
  "nf_saturated_fat": number | null,
  "nf_protein": number | null,
  "nf_total_carbohydrate": number | null,
  "nf_dietary_fiber": number | null,
  "nf_sugars": number | null,
  "nf_sodium": number | null,
  "nf_cholesterol": number | null,
  "photo": {"thumb": string | null},
}

export interface FullyFinishedProduct {
  "description": string;
  "price": number;
  "upc": string;
  "brand": string;
  "serving_weight_grams": number | null,
  "nf_metric_qty": number | null,
  "nf_metric_uom": string | null,
  "nf_total_fat": number | null,
  "nf_saturated_fat": number | null,
  "nf_protein": number | null,
  "nf_total_carbohydrate": number | null,
  "nf_dietary_fiber": number | null,
  "nf_sugars": number | null,
  "nf_sodium": number | null,
  "nf_cholesterol": number | null,
  "photo": string | null
};