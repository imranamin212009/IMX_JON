# IMX ZONE - Multi-Vendor E-Commerce Platform

Inspired by IMX ZONE, featuring customer shopping, official vendor dashboards, admin oversight, flash sales, and local MFS checkout (bKash, Nagad, Rocket).

## 🚀 Quick Start Guide

### 1. Requirements
- Node.js 18+ or 20+ installed on your computer ([Download Node.js](https://nodejs.org))
- npm, yarn, or pnpm

### 2. Installation
Open a terminal in this extracted project folder and run:
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
The application will start on: `http://localhost:3000` or `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```
The production bundle will be output to `dist/`.

---

## 🛠 Tech Stack
- **Frontend Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations**: Motion
- **State Management**: React Context + LocalStorage persistent state

---

## 👥 Features & Personas
- **Customer**: Flash sales with live countdowns, multi-facet filtering, product details, cart, checkout with bKash/Nagad/Rocket/Cards/COD, and live shipment tracking.
- **Seller Portal**: Vendor product catalog, inventory stock editor, product creator, order fulfillment, and net balance payouts.
- **Admin Console**: Global GMV volume, platform commission fee manager (8%/10%/12%), and global order monitor.
