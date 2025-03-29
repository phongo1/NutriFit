import dotenv from 'dotenv';
import config from '../config/config';
import buffer from 'buffer';

async function saveAccessToken(token: string, expiresIn: number) {
  const expiresAt = new Date(Date.now() + (expiresIn * 1000));
  // await TokenModel.deleteMany({});
  // await TokenModel.create({ token, expiresAt });
}

async function getAccessToken(): Promise<string> {
  // const tokenData = await TokenModel.findOne(); 
  if (!tokenData || new Date() > tokenData.expiresAt) {
    return await refreshAccessToken();
  }

  return tokenData.token;
}

async function refreshAccessToken(): Promise<string> {
  const clientId = config.clientId;
  const clientSecret = config.clientSecret;
  const redirectUri = config.redirectUri;
  const scope = config.scope;
}


async function get(body: string) {
  const encoded = Buffer.from(`${config.clientId}:${config.clientSecret}`, `ascii`);
  const authorization = "Basic " + encoded.toString(`base64`);
  const tokenUrl = `${config.oauthUrl}/token`;
  let tokenResponse = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "User-Agent": "",
      "Authorization": authorization,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body
  });

  if (tokenResponse.status >= 400) {
    console.log(`tokenResponse error: ${tokenResponse.status}`);
    throw new Error(`tokenResponse failed with status ${tokenResponse.status}`);
  }

  return await tokenResponse.json();

}