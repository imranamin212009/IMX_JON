export type UserRole = 'customer' | 'seller' | 'admin';

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  itemCount: number;
  subcategories: {
    id: string;
    name: string;
    items: string[];
  }[];
}

export interface ProductVariant {
  color?: string;
  size?: string;
  storage?: string;
  sku: string;
  price: number;
  stock: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  subcategory?: string;
  brand: string;
  vendorId: string;
  vendorName: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  stock: number;
  isFlashSale: boolean;
  flashSaleClaimedPercent?: number;
  image: string;
  galleryImages: string[];
  description: string;
  features: string[];
  colors?: string[];
  sizes?: string[];
  warranty: string;
  shippingFee: number;
  freeShippingThreshold?: number;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  selectedStorage?: string;
  price: number;
}

export interface ShippingAddress {
  id: string;
  fullName: string;
  phoneNumber: string;
  division: string;
  city: string;
  area: string;
  detailedAddress: string;
  isDefault: boolean;
  label: 'Home' | 'Office';
}

export type PaymentMethod = 'bkash' | 'nagad' | 'rocket' | 'card' | 'cod';

export interface Order {
  id: string;
  trackingNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  total: number;
  promoCode?: string;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending' | 'failed';
  orderStatus: 'placed' | 'confirmed' | 'packed' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'cancelled';
  createdAt: string;
  estimatedDelivery: string;
  currentStepIndex: number;
}

export interface Vendor {
  id: string;
  name: string;
  storeSlug: string;
  logo: string;
  banner: string;
  rating: number;
  positiveRatingPercent: number;
  shipOnTimePercent: number;
  chatResponsePercent: number;
  joinedDate: string;
  status: 'active' | 'suspended' | 'pending';
  totalSales: number;
  commissionRate: number; // e.g. 0.08 for 8%
  balance: number;
  bankInfo: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    routingNumber: string;
  };
}

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  description: string;
}
