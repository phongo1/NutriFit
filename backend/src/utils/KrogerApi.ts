import config from '../config/config';
import buffer from 'buffer';
import fetch from 'node-fetch';
import { AccessTokenResponse, ProductDataResponse, LocationDataResponse, ProductObject, InformationMap, CleanKrogerProductData } from '../types';

// Storing access token and location ID in memory
let locationId: string | null = '09700177';
let accessToken: string | null = null;
let tokenExpiresAt: number | null = null;


async function fetchAccessToken(): Promise<void> {
  const clientId = config.clientId;
  const clientSecret = config.clientSecret;
  const response = await fetch(`${config.oauthUrl}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + buffer.Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),

    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      scope: 'product.compact',
    }),
  })

  if (!response.ok) {
    throw new Error(`Error fetching access token: ${response.statusText}`);
  }

  const data = await response.json() as AccessTokenResponse;
  accessToken = data.access_token;
  tokenExpiresAt = Date.now() + (data.expires_in * 1000);
}

async function ensureAccessToken(): Promise<void> {
  if (!accessToken || !tokenExpiresAt || Date.now() >= tokenExpiresAt) {
    await fetchAccessToken();
  }
}

async function fetchLocationId(zipCode: number): Promise<void> {
  zipCode = zipCode;
  await ensureAccessToken();
  const response = await fetch (`https://api.kroger.com/v1/locations?filter.zipCode.near=${zipCode}`, {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      "Authorization": "Bearer " + accessToken
    }
  });

  if (!response.ok) {
    throw new Error(`Error fetching location ID: ${response.statusText}`);
  }

  const data = await response.json() as LocationDataResponse;
  locationId = data.data[0].locationId;
  if (!locationId) {
    throw new Error('No location ID found');
  }

}

export async function getProducts(zipCode: number, searchTerm: string, searchLimit: number = 10): Promise<CleanKrogerProductData> {
  console.log("This is the search term" + searchTerm)
  await ensureAccessToken();
  if (!locationId) {
    await fetchLocationId(zipCode);
  }
  if (!locationId) {
    throw new Error('Location ID not found');
  }

  const encodedSearchTerm = encodeURIComponent(searchTerm);
  const encodedLocationId = encodeURIComponent(locationId);
  const encodedSearchLimit = encodeURIComponent(searchLimit.toString());
  // const encodedAccessToken = encodeURIComponent(accessToken as string);
  console.log(`Access Token: ${accessToken}`);
  // accessToken = 'eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJudXRyaWZpdC0yNDMyNjEyNDMwMzQyNDU5NDY2NzM5MmU1NTUxN2E2NzQyNjU1MTU0MzQ1YTMyNGI3ODc0NTc2MTRmNDEzNTQ2NTI3NzM2NGQ3OTQ1NDc3NzUyN2E1NzczNTQ0YTM2NTg3OTRkNjI0NjM5MmY1ODMwNmYzNTM2NTMxOTAyNjk5NzE4NTYxMjUxNTgxIiwiZXhwIjoxNzQzMzI4NDY3LCJpYXQiOjE3NDMzMjY2NjIsImlzcyI6ImFwaS5rcm9nZXIuY29tIiwic3ViIjoiMDE5YzAzMWQtNjcyZS01MDBhLWI4N2YtYTczYjUxM2E2OTNmIiwic2NvcGUiOiJwcm9kdWN0LmNvbXBhY3QiLCJhdXRoQXQiOjE3NDMzMjY2Njc3Mzg2NjQ4NzYsImF6cCI6Im51dHJpZml0LTI0MzI2MTI0MzAzNDI0NTk0NjY3MzkyZTU1NTE3YTY3NDI2NTUxNTQzNDVhMzI0Yjc4NzQ1NzYxNGY0MTM1NDY1Mjc3MzY0ZDc5NDU0Nzc3NTI3YTU3NzM1NDRhMzY1ODc5NGQ2MjQ2MzkyZjU4MzA2ZjM1MzY1MzE5MDI2OTk3MTg1NjEyNTE1ODEifQ.S0OJct9qHXVHFbm5ngRD8nQXpHqhAdT-W57WAkWuEIzWbcRRxsHShFBZxV83rue1w6WqyFxnRnqEAk00SqgPJLxebiG3K2iO1Ish2_G7XvHe9OBSKP_XclYh4hpZrllB2NaDXd9FIdE1Kq3V6kAd27_8flUufIyeluTo8m3k24zgPTVaHP8bBF9pY6dtCAgfSerOm9Wdcv9_Odae4_SNX55-aFJZ5lLx_BqDLP6lR_f83NMrHLUzvbCX35DxSMnnPgbg2m7T9e4Y-ILD_742052-pR5Gaperk6YOEsWwa6DcOk3UJ0OMF4nvMjNbdLBUeYZopdG7YSWJCcroGmEoZg'
  const url = `https://api.kroger.com/v1/products?filter.locationId=${encodedLocationId}&filter.term=${encodedSearchTerm}&filter.limit=${encodedSearchLimit}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      "Authorization": "Bearer " +  accessToken,
    }
  });

  if (!response.ok) {
    throw new Error(`Error fetching products: ${response.statusText}`);
  }

  let result: CleanKrogerProductData = [];
  const json = await response.json() as ProductDataResponse;
  const products = json.data as Array<ProductObject>;
  for (const product of products) {

    const description = product.description;
    const price = product.items[0].price.regular;
    const upc = product.upc;
    const brand = product.brand;

    const infoObj: InformationMap = { description, price, brand };
    const productMap: Record<string, InformationMap> = { [upc]: infoObj };

    result.push(productMap);
  }
  return result;
}


// async function saveAccessToken(token: string, expiresIn: number) {
//   const expiresAt = new Date(Date.now() + (expiresIn * 1000));
//   // await TokenModel.deleteMany({});
//   // await TokenModel.create({ token, expiresAt });
// }

// async function getAccessToken(): Promise<string> {
//   // const tokenData = await TokenModel.findOne(); 
//   if (!tokenData || new Date() > tokenData.expiresAt) {
//     return await refreshAccessToken();
//   }

//   return tokenData.token;
// }

// async function refreshAccessToken(): Promise<string> {
//   const clientId = config.clientId;
//   const clientSecret = config.clientSecret;
//   const redirectUri = config.redirectUri;
//   const scope = config.scope;

// }

// async function getByRefreshToken(refreshToken: string) {
//   const body = 
//     `grant_type=refresh_token&` +
//     `refresh_token=${encodeURIComponent(refreshToken)}`;
//     return await get(body);
// }


// async function get(body: string) {
//   const encoded = Buffer.from(`${config.clientId}:${config.clientSecret}`, `ascii`);
//   const authorization = "Basic " + encoded.toString(`base64`);
//   const tokenUrl = `${config.oauthUrl}/token`;
//   let tokenResponse = await fetch(tokenUrl, {
//     method: "POST",
//     headers: {
//       "User-Agent": "",
//       "Authorization": authorization,
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: body
//   });

//   if (tokenResponse.status >= 400) {
//     console.log(`tokenResponse error: ${tokenResponse.status}`);
//     throw new Error(`tokenResponse failed with status ${tokenResponse.status}`);
//   }

  // return await tokenResponse.json();
