import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const targetPath = './src/environments/environment.ts';

const apiUrl = process.env['NG_APP_API_URL'];
const apiKey = process.env['NG_APP_API_KEY'];

if (!apiUrl || !apiKey) {
  console.error('Missing NG_APP_API_URL or NG_APP_API_KEY in .env');
  process.exit(1);
}

const envConfigFile = `
export const environment = {
  production: false,
  apiUrl: '${apiUrl}',
  apiKey: '${apiKey}'
};
`;

fs.writeFileSync(targetPath, envConfigFile, { encoding: 'utf8' });
console.log(`Environment file generated at ${targetPath}`);
