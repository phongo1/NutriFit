import dotenv from 'dotenv';
import config from '../config/config';
import buffer from 'buffer';
import fetch from 'node-fetch';

interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
}

let accessToken: string | null = null;
let tokenExpiresAt: number | null = null;

async function fetchAccessToken() {
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
  

async function ensureAccessToken() {
  if (!accessToken || !tokenExpiresAt || Date.now() >= tokenExpiresAt) {
    await fetchAccessToken();
  }
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

  return await tokenResponse.json();

}