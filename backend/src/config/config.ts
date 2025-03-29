import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope: string;
  oauthUrl: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientId: process.env.KROGER_CLIENT_ID || '',
  clientSecret: process.env.KROGER_CLIENT_SECRET || '',
  redirectUri: process.env.KROGER_REDIRECT_URI || '',
  scope: process.env.KROGER_SCOPE || 'product.compact',
  oauthUrl: process.env.KROGER_OAUTH_URL || 'https://api.kroger.com/v1/connect/oauth2',
};

export default config;