import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const VALID_ENVS = ['qa', 'staging'];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envName = (process.env.ENV || 'qa').toLowerCase();

if (!VALID_ENVS.includes(envName)) {
    console.log(
        `Unknown ENV "${process.env.ENV}". Use one of: ${VALID_ENVS.join(', ')}`
    );
    process.exit(1);
}

const configPath = path.join(__dirname, 'environments', `${envName}.json`);
const envFile = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

export const config = {
    env: envName,
    ...envFile,
};

