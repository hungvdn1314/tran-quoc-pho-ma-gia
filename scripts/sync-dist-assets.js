import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function copyFolderRecursiveSync(source, target) {
  if (!fs.existsSync(source)) return;
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const files = fs.readdirSync(source);
  for (const file of files) {
    const curSource = path.join(source, file);
    const curTarget = path.join(target, file);
    if (fs.lstatSync(curSource).isDirectory()) {
      copyFolderRecursiveSync(curSource, curTarget);
    } else {
      fs.copyFileSync(curSource, curTarget);
    }
  }
}

// 1. Copy prototype/assets -> dist/assets
const srcAssets = path.join(rootDir, 'prototype', 'assets');
const distAssets = path.join(rootDir, 'dist', 'assets');
console.log(`Syncing ${srcAssets} -> ${distAssets}...`);
copyFolderRecursiveSync(srcAssets, distAssets);

// 2. Copy prototype/game_data.js -> dist/prototype/game_data.js
const srcGameData = path.join(rootDir, 'prototype', 'game_data.js');
const distProtoDir = path.join(rootDir, 'dist', 'prototype');
if (fs.existsSync(srcGameData)) {
  if (!fs.existsSync(distProtoDir)) {
    fs.mkdirSync(distProtoDir, { recursive: true });
  }
  fs.copyFileSync(srcGameData, path.join(distProtoDir, 'game_data.js'));
  console.log(`Synced game_data.js -> dist/prototype/game_data.js`);
}

// 3. Copy prototype/styles.css -> dist/prototype/styles.css
const srcStyles = path.join(rootDir, 'prototype', 'styles.css');
if (fs.existsSync(srcStyles)) {
  fs.copyFileSync(srcStyles, path.join(distProtoDir, 'styles.css'));
  console.log(`Synced styles.css -> dist/prototype/styles.css`);
}

// 4. Copy prototype/lib -> dist/prototype/lib
const srcLib = path.join(rootDir, 'prototype', 'lib');
const distLib = path.join(distProtoDir, 'lib');
copyFolderRecursiveSync(srcLib, distLib);
console.log(`Synced prototype/lib -> dist/prototype/lib`);

// 5. Copy prototype/ink_engine.js -> dist/prototype/ink_engine.js
const srcInk = path.join(rootDir, 'prototype', 'ink_engine.js');
if (fs.existsSync(srcInk)) {
  fs.copyFileSync(srcInk, path.join(distProtoDir, 'ink_engine.js'));
  console.log(`Synced ink_engine.js -> dist/prototype/ink_engine.js`);
}

// 6. Copy prototype/app.js -> dist/prototype/app.js
const srcApp = path.join(rootDir, 'prototype', 'app.js');
if (fs.existsSync(srcApp)) {
  fs.copyFileSync(srcApp, path.join(distProtoDir, 'app.js'));
  console.log(`Synced app.js -> dist/prototype/app.js`);
}

console.log('Dist assets synced successfully.');
