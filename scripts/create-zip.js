import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

const zip = new JSZip();

const IGNORED_DIRS = new Set(['node_modules', '.git', 'dist', '.aistudio']);
const IGNORED_FILES = new Set(['bun.lock', '.DS_Store']);

function addDirectoryToZip(dirPath, zipFolder) {
  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!IGNORED_DIRS.has(item)) {
        const subFolder = zipFolder.folder(item);
        addDirectoryToZip(fullPath, subFolder);
      }
    } else {
      if (!IGNORED_FILES.has(item) && !item.endsWith('.zip')) {
        const content = fs.readFileSync(fullPath);
        zipFolder.file(item, content);
      }
    }
  }
}

async function main() {
  const rootDir = process.cwd();
  console.log('Packaging directory:', rootDir);

  // Add README.md with clear setup instructions
  const readmeContent = `# IMX ZONE - Multi-Vendor E-Commerce Platform

Inspired by IMX ZONE, featuring customer shopping, official vendor dashboards, admin oversight, flash sales, and local MFS checkout (bKash, Nagad, Rocket).

## 🚀 Quick Start Guide

### 1. Requirements
- Node.js 18+ or 20+ installed on your computer ([Download Node.js](https://nodejs.org))
- npm or yarn or pnpm

### 2. Installation
Open a terminal in this extracted folder and run:
\`\`\`bash
npm install
\`\`\`

### 3. Run Development Server
\`\`\`bash
npm run dev
\`\`\`
The application will start on: \`http://localhost:3000\` or \`http://localhost:5173\`

### 4. Build for Production
\`\`\`bash
npm run build
\`\`\`
The production files will be output to \`dist/\`.

---

## 🛠 Tech Stack
- **Frontend Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations**: Motion
- **State Management**: React Context + LocalStorage persistent state

---

## 👥 Features & Roles
- **Customer**: Flash sales with live countdowns, multi-facet filtering, product details, cart, checkout with bKash/Nagad/Rocket/Cards/COD, and live shipment tracking.
- **Seller Portal**: Vendor product catalog, inventory stock editor, product creator, order fulfillment, and net balance payouts.
- **Admin Console**: Global GMV volume, platform commission fee manager (8%/10%/12%), and global order monitor.
`;

  zip.file('README.md', readmeContent);

  addDirectoryToZip(rootDir, zip);

  if (!fs.existsSync('public')) {
    fs.mkdirSync('public', { recursive: true });
  }

  const zipBuffer = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
  fs.writeFileSync('public/imx-fire-jon-marketplace.zip', zipBuffer);
  console.log('Created public/imx-fire-jon-marketplace.zip successfully! Size:', (zipBuffer.length / 1024).toFixed(1), 'KB');
}

main().catch(console.error);
