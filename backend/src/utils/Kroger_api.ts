import config from '../config/config';
import buffer from 'buffer';
import fetch from 'node-fetch';

interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
}

interface LocationDataResponse {
  data: Array<{ "locationId": string}>;
};


let locationId: string | null = null;
let accessToken: string | null = null;
let tokenExpiresAt: number | null = null;


async function fetchAccessToken(): Promise<void> {
  const clientId = config.clientId;
  const clientSecret = config.clientSecret;
  const response = await fetch(`${config.oauthUrl}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${buffer.Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials'
    }),
  })

  if (!response.ok) {
    throw new Error(`Error fetching access token: ${response.statusText}`);
  }

  const data = await response.json() as AccessTokenResponse;
  accessToken = data.access_token;
  tokenExpiresAt = Date.now() + (data.expires_in * 1000);
  

async function ensureAccessToken(): Promise<void> {
  if (!accessToken || !tokenExpiresAt || Date.now() >= tokenExpiresAt) {
    await fetchAccessToken();
  }
}

async function fetchLocationId(zipCode: number): Promise<void> {
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

async function getProducts(locationId: string, searchTerm: string, searchLimit: number = 10): Promise<Array<Map<string, number>>> {
  await ensureAccessToken();
  const encodedSearchTerm = encodeURIComponent(searchTerm);
  const encodedLocationId = encodeURIComponent(locationId);
  const encodedSearchLimit = encodeURIComponent(searchLimit.toString());
  const encodedAccessToken = encodeURIComponent(accessToken as string);

  const response = await fetch(`https://api.kroger.com/v1/products?filter.locationId=${encodedLocationId}&filter.term=${encodedSearchTerm}&filter.limit=${encodedSearchLimit}}`, {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      "Authorization": "Bearer " + encodedAccessToken
    }
  });

  if (!response.ok) {
    throw new Error(`Error fetching products: ${response.statusText}`);
  }

  let result: Array<Map<string, number>> = [];
  const json = await response.json() as { data: Array<Map<string, Map<string, string>>> }; // {upc: {description: string, price: number}}
  const products = json.data;
  for (const product of products) {
    // description, price, upc
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
}