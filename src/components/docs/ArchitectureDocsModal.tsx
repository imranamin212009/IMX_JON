import React, { useState } from 'react';
import { X, Database, Server, Code, Terminal, Layers, CheckCircle2, Copy } from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';

export const ArchitectureDocsModal: React.FC = () => {
  const { isDocsOpen, setIsDocsOpen, showNotification } = useEcommerce();
  const [docTab, setDocTab] = useState<'architecture' | 'schema' | 'api' | 'setup'>('architecture');

  if (!isDocsOpen) return null;

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    showNotification('Snippet copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 md:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F57224] flex items-center justify-center font-bold text-white shadow-md">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base md:text-lg font-bold">
                IMX JON Technical Documentation
              </h2>
              <p className="text-xs text-slate-400">
                System Architecture · Database ER Diagrams · REST API Specs · Setup Manual
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/imx-fire-jon-marketplace.zip"
              download="imx-fire-jon-marketplace.zip"
              className="bg-[#F57224] hover:bg-[#e06117] text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span>Download ZIP</span>
            </a>
            <button
              onClick={() => setIsDocsOpen(false)}
              className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50 gap-4 overflow-x-auto text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setDocTab('architecture')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer shrink-0 ${
              docTab === 'architecture'
                ? 'border-[#F57224] text-[#F57224]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            1. System Architecture
          </button>
          <button
            onClick={() => setDocTab('schema')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer shrink-0 ${
              docTab === 'schema'
                ? 'border-[#F57224] text-[#F57224]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            2. Database Schema (ERD)
          </button>
          <button
            onClick={() => setDocTab('api')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer shrink-0 ${
              docTab === 'api'
                ? 'border-[#F57224] text-[#F57224]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            3. RESTful API Endpoints
          </button>
          <button
            onClick={() => setDocTab('setup')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer shrink-0 ${
              docTab === 'setup'
                ? 'border-[#F57224] text-[#F57224]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            4. Setup & Deployment Guide
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 flex-1 overflow-y-auto text-xs leading-relaxed text-slate-700 space-y-6">
          {/* TAB 1: ARCHITECTURE */}
          {docTab === 'architecture' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Architecture Overview</h3>
                <p>
                  IMX JON is architected as a high-throughput, multi-vendor marketplace platform modeled after IMX JON and Alibaba Group logistics architectures, designed to handle concurrent customer traffic, real-time inventory locking during flash sales, and automated commission payouts.
                </p>
              </div>

              {/* Architecture Diagram Card */}
              <div className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-[11px] overflow-x-auto border border-slate-800">
                <pre>{`
  +-----------------------------------------------------------------------------------+
  |                                CLIENT APPLICATION                                 |
  |  [Customer PWA / Mobile Web]   [Seller Vendor Center]   [Admin Oversight Portal]  |
  +-----------------------------------------+-----------------------------------------+
                                            | HTTPS / WSS
                                            v
  +-----------------------------------------------------------------------------------+
  |                         REVERSE PROXY & API GATEWAY                               |
  |                 Nginx / Cloudflare (Rate Limiting, SSL, CDN Caching)              |
  +-----------------------------------------+-----------------------------------------+
                                            |
                                            v
  +-----------------------------------------------------------------------------------+
  |                       MICROSERVICES / APPLICATION LAYER                           |
  |  +--------------------+  +--------------------+  +--------------------+           |
  |  | Catalog & Search   |  | Order & Cart Engine|  | Multi-Vendor Portal|           |
  |  | (MeiliSearch/ES)   |  | (Inventory Locks)  |  | (Commission Calc)  |           |
  |  +--------------------+  +--------------------+  +--------------------+           |
  |  +--------------------+  +--------------------+  +--------------------+           |
  |  | Payment Orchestrator| | Logistics / Delivery| | Notification Center|           |
  |  | (bKash/Nagad/Card) |  | (Hub Routing)      |  | (SMS OTP & Email)  |           |
  |  +--------------------+  +--------------------+  +--------------------+           |
  +-----------------------------------------+-----------------------------------------+
                                            |
                                            v
  +-----------------------------------------------------------------------------------+
  |                                DATA STORAGE LAYER                                 |
  |  +-----------------------------+     +--------------------+   +----------------+  |
  |  | Primary PostgreSQL DB       |     | Redis In-Memory    |   | S3 Object Store|  |
  |  | (ACID Orders, Users, Sellers)|    | (Flash Sale Stocks)|   | (Product Media)|  |
  |  +-----------------------------+     +--------------------+   +----------------+  |
  +-----------------------------------------------------------------------------------+
                `}</pre>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <span className="font-bold text-slate-900 block">Frontend Stack</span>
                  <p>React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Motion gestures. Optimized for sub-second page loads and mobile conversions.</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <span className="font-bold text-slate-900 block">Backend & Core Services</span>
                  <p>Node.js (Express), JSON Web Tokens (JWT) authentication, RBAC authorization (Buyer, Vendor, Super Admin), and webhook consumers.</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <span className="font-bold text-slate-900 block">MFS Payment Connectors</span>
                  <p>bKash Tokenized Checkout v1.2, Nagad Merchant API, DBBL Rocket PG, and Stripe/SSLCommerz for cards.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SCHEMA */}
          {docTab === 'schema' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Relational Database Schema (Prisma / PostgreSQL)</h3>
                <p>Entity relationship schema supporting multi-vendor catalogs, dynamic inventory tracking, customer reviews, and order fulfillment:</p>
              </div>

              <div className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-[11px] overflow-x-auto border border-slate-800">
                <pre>{`
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String         @id @default(uuid())
  email         String         @unique
  phoneNumber   String         @unique
  fullName      String
  role          UserRole       @default(CUSTOMER) // CUSTOMER, VENDOR, ADMIN
  addresses     Address[]
  orders        Order[]
  reviews       Review[]
  createdAt     DateTime       @default(now())
}

model Vendor {
  id               String       @id @default(uuid())
  storeName        String       @unique
  storeSlug        String       @unique
  ownerId          String
  logoUrl          String?
  bannerUrl        String?
  commissionRate   Decimal      @default(0.08) // 8% platform fee
  balance          Decimal      @default(0.00)
  status           VendorStatus @default(ACTIVE)
  products         Product[]
  bankAccounts     BankAccount[]
  createdAt        DateTime     @default(now())
}

model Product {
  id                 String       @id @default(uuid())
  name               String
  slug               String       @unique
  vendorId           String
  vendor             Vendor       @relation(fields: [vendorId], references: [id])
  categoryId         String
  category           Category     @relation(fields: [categoryId], references: [id])
  price              Decimal
  originalPrice      Decimal
  discountPercentage Int          @default(0)
  stock              Int          @default(0)
  isFlashSale        Boolean      @default(false)
  image              String
  galleryImages      String[]
  features           String[]
  colors             String[]
  sizes              String[]
  warranty           String?
  shippingFee        Decimal      @default(60.00)
  orderItems         OrderItem[]
  reviews            Review[]
}

model Order {
  id              String        @id @default(uuid())
  trackingNumber  String        @unique
  customerId      String
  customer        User          @relation(fields: [customerId], references: [id])
  subtotal        Decimal
  shippingFee     Decimal
  discountAmount  Decimal       @default(0.00)
  totalAmount     Decimal
  paymentMethod   PaymentMethod // BKASH, NAGAD, ROCKET, CARD, COD
  paymentStatus   PaymentStatus @default(PENDING)
  orderStatus     OrderStatus   @default(PLACED)
  shippingAddress Json
  orderItems      OrderItem[]
  createdAt       DateTime      @default(now())
}

model OrderItem {
  id         String   @id @default(uuid())
  orderId    String
  order      Order    @relation(fields: [orderId], references: [id])
  productId  String
  product    Product  @relation(fields: [productId], references: [id])
  quantity   Int
  unitPrice  Decimal
  variant    Json?
}
                `}</pre>
              </div>
            </div>
          )}

          {/* TAB 3: API SPEC */}
          {docTab === 'api' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">RESTful API Endpoints Specification</h3>
                <p>Standardized JSON endpoints exposed by the backend service:</p>
              </div>

              <div className="space-y-3 font-mono text-[11px]">
                {/* 1. Products */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded text-[10px]">GET</span>
                    <strong className="text-slate-900">/api/v1/products</strong>
                  </div>
                  <p className="text-slate-600 font-sans">Query params: <code>?category=&brand=&minPrice=&maxPrice=&rating=&sort=&q=</code></p>
                  <p className="text-slate-400 mt-1 font-sans">Returns paginated product array with facet aggregate counters.</p>
                </div>

                {/* 2. Flash sales */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded text-[10px]">GET</span>
                    <strong className="text-slate-900">/api/v1/flash-sales/active</strong>
                  </div>
                  <p className="text-slate-600 font-sans">Returns ongoing flash sale items with countdown timestamp and inventory % sold.</p>
                </div>

                {/* 3. Checkout */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-blue-600 text-white font-bold px-1.5 py-0.5 rounded text-[10px]">POST</span>
                    <strong className="text-slate-900">/api/v1/orders/checkout</strong>
                  </div>
                  <p className="text-slate-600 font-sans">Payload: <code>{`{ items, addressId, promoCode, paymentMethod }`}</code></p>
                  <p className="text-slate-400 mt-1 font-sans">Atomically locks inventory stock, calculates dynamic shipping, and initiates gateway session.</p>
                </div>

                {/* 4. bKash Gateway */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-blue-600 text-white font-bold px-1.5 py-0.5 rounded text-[10px]">POST</span>
                    <strong className="text-slate-900">/api/v1/payments/bkash/create</strong>
                  </div>
                  <p className="text-slate-600 font-sans">Payload: <code>{`{ orderId, amount, intent: 'sale' }`}</code></p>
                  <p className="text-slate-400 mt-1 font-sans">Generates bKash payment URL and paymentID token.</p>
                </div>

                {/* 5. Tracking */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded text-[10px]">GET</span>
                    <strong className="text-slate-900">/api/v1/orders/track/:trackingNumber</strong>
                  </div>
                  <p className="text-slate-600 font-sans">Returns current milestone index (1 to 6), timestamp history, and assigned delivery rider phone.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SETUP & DEPLOYMENT */}
          {docTab === 'setup' && (
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Download Project Source Code (.ZIP)</h4>
                  <p className="text-slate-600 text-xs mt-0.5">
                    Includes all components, types, mock data, Tailwind config, and Vite setup ready to run.
                  </p>
                </div>
                <a
                  href="/imx-fire-jon-marketplace.zip"
                  download="imx-fire-jon-marketplace.zip"
                  className="px-5 py-2.5 bg-[#F57224] hover:bg-[#e06117] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-xs text-center shrink-0"
                >
                  Download .ZIP File (71 KB)
                </a>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Local Machine Execution Steps</h3>
                <p>Steps to run, build, and deploy IMX JON locally or on your own VPS server:</p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-slate-900 text-slate-200 rounded-xl space-y-2 font-mono text-[11px]">
                  <p className="text-slate-400"># 1. Clone repository and install dependencies</p>
                  <p className="text-emerald-400">git clone https://github.com/imx-fire-jon/marketplace.git</p>
                  <p className="text-emerald-400">cd marketplace && npm install</p>

                  <p className="text-slate-400 pt-2"># 2. Configure environment variables in .env</p>
                  <p className="text-emerald-400">PORT=3000</p>
                  <p className="text-emerald-400">DATABASE_URL="postgresql://user:password@localhost:5432/imx_fire_db"</p>
                  <p className="text-emerald-400">BKASH_APP_KEY="your_bkash_key"</p>

                  <p className="text-slate-400 pt-2"># 3. Run development server</p>
                  <p className="text-amber-400">npm run dev</p>

                  <p className="text-slate-400 pt-2"># 4. Build for production</p>
                  <p className="text-amber-400">npm run build</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
