import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function loadTestData(fileName) {
    const filePath = path.join(__dirname, '..', 'test-data', fileName);
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}
