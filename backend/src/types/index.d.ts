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

export type CleanKrogerProductData = Array<Record<string, InformationMap>>;