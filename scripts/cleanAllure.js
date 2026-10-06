import fs from 'fs';

fs.rmSync('allure-results', { recursive: true, force: true});
fs.rmSync('allure-report', { recursive: true, force: true});