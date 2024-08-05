import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fs from 'fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
fs.rmSync(path.join(__dirname, 'dist'), { recursive: true });
fs.unlinkSync(path.join(__dirname, 'electron', 'app.asar'));
