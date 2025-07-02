import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isDev = __dirname.includes('src');
const envPath = isDev 
  ? path.join(__dirname, '.env')
  : path.join(__dirname, '..', '..', 'src', 'config', '.env');

dotenv.config({ path: envPath });

export interface EnvConfig {
  BOT_TOKEN: string;
  PORT: number;
  VPS_API_URL: string;
  ADMINS: number[];
}

function getEnvConfig(): EnvConfig {
  const requiredEnvVars = ['BOT_TOKEN', 'VPS_API_URL'];
  
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }

  return {
    BOT_TOKEN: process.env.BOT_TOKEN!,
    PORT: parseInt(process.env.PORT || '3000'),
    VPS_API_URL: process.env.VPS_API_URL!,
    ADMINS: process.env.ADMINS ? 
      process.env.ADMINS.split(',').map(id => parseInt(id.trim())) : []
  };
}

export const config = getEnvConfig();
