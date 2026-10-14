import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, UserRole, Vendor, ShippingAddress, PromoCode } from '../types';
import { PRODUCTS, VENDORS, PROMO_CODES, INITIAL_ADDRESSES, INITIAL_ORDERS } from '../data/mockData';

interface EcommerceContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  products: Product[];
  vendors: Vendor[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  addresses: ShippingAddress[];
  selectedAddress: ShippingAddress;
  setSelectedAddressId: (id: string) => void;
  addAddress: (addr: Omit<ShippingAddress, 'id'>) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  selectedBrand: string | null;
  setSelectedBrand: (brand: string | null) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  minRating: number;
  setMinRating: (r: number) => void;
  sortBy: 'relevance' | 'price_asc' | 'price_desc' | 'rating' | 'newest';
  setSortBy: (s: 'relevance' | 'price_asc' | 'price_desc' | 'rating' | 'newest') => void;
  
  // Cart
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string, color?: string, size?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, color?: string, size?: string) => void;
  clearCart: () => void;
  appliedPromo: PromoCode | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  cartSubtotal: number;
  cartShippingFee: number;
  cartDiscount: number;
  cartTotal: number;
  cartItemCount: number;

  // Wishlist
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Orders
  placeOrder: (paymentMethod: Order['paymentMethod']) => Order;
  updateOrderStatus: (orderId: string, status: Order['orderStatus'], stepIndex?: number) => void;
  selectedOrderForTracking: Order | null;
  setSelectedOrderForTracking: (order: Order | null) => void;

  // Products & Vendor actions
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewCount'>) => Product;
  updateProductStock: (productId: string, stock: number) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  activeSellerId: string;
  setActiveSellerId: (id: string) => void;
  updateVendorCommission: (vendorId: string, rate: number) => void;

  // UI state
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isOrderTrackingOpen: boolean;
  setIsOrderTrackingOpen: (open: boolean) => void;
  isDocsOpen: boolean;
  setIsDocsOpen: (open: boolean) => void;
  isCustomerDashboardOpen: boolean;
  setIsCustomerDashboardOpen: (open: boolean) => void;
  notification: string | null;
  showNotification: (msg: string) => void;
}

const EcommerceContext = createContext<EcommerceContextType | undefined>(undefined);

export const EcommerceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('customer');
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('imx_products');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });
  const [vendors, setVendors] = useState<Vendor[]>(() => {
    const saved = localStorage.getItem('imx_vendors');
    return saved ? JSON.parse(saved) : VENDORS;
  });
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('imx_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('imx_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('imx_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });
  const [addresses, setAddresses] = useState<ShippingAddress[]>(() => {
    const saved = localStorage.getItem('imx_addresses');
    return saved ? JSON.parse(saved) : INITIAL_ADDRESSES;
  });
  const [selectedAddressId, setSelectedAddressId] = useState<string>(() => {
    return INITIAL_ADDRESSES[0]?.id || '';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'relevance' | 'price_asc' | 'price_desc' | 'rating' | 'newest'>('relevance');

  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [activeSellerId, setActiveSellerId] = useState<string>('vendor-1');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState<Order | null>(null);

  // UI Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isCustomerDashboardOpen, setIsCustomerDashboardOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 3000);
  };

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('imx_products', JSON.stringify(products));
  }, [products]);
  useEffect(() => {
    localStorage.setItem('imx_vendors', JSON.stringify(vendors));
  }, [vendors]);
  useEffect(() => {
    localStorage.setItem('imx_cart', JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem('imx_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  useEffect(() => {
    localStorage.setItem('imx_orders', JSON.stringify(orders));
  }, [orders]);
  useEffect(() => {
    localStorage.setItem('imx_addresses', JSON.stringify(addresses));
  }, [addresses]);

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0] || {
    id: 'addr-default',
    fullName: 'Guest Buyer',
    phoneNumber: '+880 1700 000000',
    division: 'Dhaka',
    city: 'Dhaka North',
    area: 'Gulshan',
    detailedAddress: 'House 1, Road 1',
    isDefault: true,
    label: 'Home' as const
  };

  const addAddress = (addr: Omit<ShippingAddress, 'id'>) => {
    const newAddress: ShippingAddress = {
      ...addr,
      id: `addr-${Date.now()}`
    };
    setAddresses((prev) => [...prev, newAddress]);
    setSelectedAddressId(newAddress.id);
    showNotification('New delivery address added successfully.');
  };

  // Cart logic
  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.productId === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );

      if (existingIndex > -1) {
        const nextCart = [...prev];
        nextCart[existingIndex].quantity += quantity;
        return nextCart;
      }

      return [
        ...prev,
        {
          productId: product.id,
          product,
          quantity,
          selectedColor: color || product.colors?.[0],
          selectedSize: size || product.sizes?.[0],
          price: product.price
        }
      ];
    });

    showNotification(`Added "${product.name.slice(0, 24)}..." to cart.`);
  };

  const removeFromCart = (productId: string, color?: string, size?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.selectedColor === color &&
            item.selectedSize === size
          )
      )
    );
  };

  const updateCartQuantity = (productId: string, quantity: number, color?: string, size?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, color, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (
          item.productId === productId &&
          item.selectedColor === color &&
          item.selectedSize === size
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Dynamic shipping: Outside Dhaka is ৳120, Inside Dhaka is ৳60. Free if subtotal > 5000 or FREESHIP promo
  const isOutsideDhaka = selectedAddress.division.toLowerCase() !== 'dhaka';
  const baseShipping = isOutsideDhaka ? 120 : 60;
  const isEligibleFreeShipping = cartSubtotal >= 5000 || appliedPromo?.code === 'FREESHIP';
  const cartShippingFee = cartItemCount === 0 ? 0 : isEligibleFreeShipping ? 0 : baseShipping;

  let calculatedDiscount = 0;
  if (appliedPromo && cartSubtotal >= appliedPromo.minOrderValue) {
    if (appliedPromo.discountType === 'percentage') {
      calculatedDiscount = Math.min(
        Math.round((cartSubtotal * appliedPromo.discountValue) / 100),
        800 // max cap
      );
    } else {
      calculatedDiscount = appliedPromo.discountValue;
    }
  }
  const cartDiscount = calculatedDiscount;
  const cartTotal = Math.max(0, cartSubtotal + cartShippingFee - cartDiscount);

  const applyPromo = (codeText: string) => {
    const trimmed = codeText.trim().toUpperCase();
    const found = PROMO_CODES.find((p) => p.code === trimmed);
    if (!found) {
      return { success: false, message: 'Invalid promo code. Try FIRE20, IMX ZONE10, or FREESHIP.' };
    }
    if (cartSubtotal < found.minOrderValue) {
      return {
        success: false,
        message: `Requires minimum order of ৳${found.minOrderValue.toLocaleString()}.`
      };
    }
    setAppliedPromo(found);
    return { success: true, message: `Promo ${found.code} applied successfully!` };
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showNotification('Removed from your wishlist.');
        return prev.filter((id) => id !== productId);
      } else {
        showNotification('Saved to your wishlist!');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Checkout & Place Order
  const placeOrder = (paymentMethod: Order['paymentMethod']): Order => {
    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const trackingNumber = `TRK-BD-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const deliveryDate = new Date(now.getTime() + (isOutsideDhaka ? 4 : 2) * 24 * 60 * 60 * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const estimatedDeliveryStr = `${months[deliveryDate.getMonth()]} ${deliveryDate.getDate()}, ${deliveryDate.getFullYear()}`;

    const newOrder: Order = {
      id: orderId,
      trackingNumber,
      customerId: 'cust-1',
      customerName: selectedAddress.fullName,
      customerPhone: selectedAddress.phoneNumber,
      items: [...cart],
      subtotal: cartSubtotal,
      shippingFee: cartShippingFee,
      discountAmount: cartDiscount,
      total: cartTotal,
      promoCode: appliedPromo?.code,
      shippingAddress: selectedAddress,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      orderStatus: 'placed',
      createdAt: formattedDate,
      estimatedDelivery: estimatedDeliveryStr,
      currentStepIndex: 1
    };

    // Update stock in products
    setProducts((prev) =>
      prev.map((prod) => {
        const cartMatch = cart.find((c) => c.productId === prod.id);
        if (cartMatch) {
          return {
            ...prod,
            stock: Math.max(0, prod.stock - cartMatch.quantity)
          };
        }
        return prod;
      })
    );

    // Save order
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setIsCheckoutOpen(false);
    setSelectedOrderForTracking(newOrder);
    setIsOrderTrackingOpen(true);
    showNotification(`Order ${orderId} placed successfully!`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['orderStatus'], stepIndex?: number) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const newStep =
            stepIndex !== undefined
              ? stepIndex
              : status === 'placed'
              ? 1
              : status === 'confirmed'
              ? 2
              : status === 'packed'
              ? 3
              : status === 'in_transit'
              ? 4
              : status === 'out_for_delivery'
              ? 5
              : status === 'delivered'
              ? 6
              : 0;
          return {
            ...ord,
            orderStatus: status,
            currentStepIndex: newStep
          };
        }
        return ord;
      })
    );
    showNotification(`Order status updated to ${status}.`);
  };

  // Vendor actions
  const addProduct = (newProdData: Omit<Product, 'id' | 'rating' | 'reviewCount'>): Product => {
    const newProduct: Product = {
      ...newProdData,
      id: `prod-user-${Date.now()}`,
      rating: 5.0,
      reviewCount: 0
    };
    setProducts((prev) => [newProduct, ...prev]);
    showNotification(`Product "${newProduct.name}" listed successfully!`);
    return newProduct;
  };

  const updateProductStock = (productId: string, stock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock } : p))
    );
    showNotification('Inventory stock updated.');
  };

  const updateVendorCommission = (vendorId: string, rate: number) => {
    setVendors((prev) =>
      prev.map((v) => (v.id === vendorId ? { ...v, commissionRate: rate } : v))
    );
    showNotification(`Vendor commission set to ${(rate * 100).toFixed(1)}%.`);
  };

  return (
    <EcommerceContext.Provider
      value={{
        userRole,
        setUserRole,
        products,
        vendors,
        cart,
        wishlist,
        orders,
        addresses,
        selectedAddress,
        setSelectedAddressId,
        addAddress,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedBrand,
        setSelectedBrand,
        priceRange,
        setPriceRange,
        minRating,
        setMinRating,
        sortBy,
        setSortBy,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        appliedPromo,
        applyPromo,
        removePromo,
        cartSubtotal,
        cartShippingFee,
        cartDiscount,
        cartTotal,
        cartItemCount,
        toggleWishlist,
        isWishlisted,
        placeOrder,
        updateOrderStatus,
        selectedOrderForTracking,
        setSelectedOrderForTracking,
        addProduct,
        updateProductStock,
        selectedProduct,
        setSelectedProduct,
        activeSellerId,
        setActiveSellerId,
        updateVendorCommission,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isOrderTrackingOpen,
        setIsOrderTrackingOpen,
        isDocsOpen,
        setIsDocsOpen,
        isCustomerDashboardOpen,
        setIsCustomerDashboardOpen,
        notification,
        showNotification
      }}
    >
      {children}
    </EcommerceContext.Provider>
  );
};

export const useEcommerce = () => {
  const context = useContext(EcommerceContext);
  if (!context) {
    throw new Error('useEcommerce must be used within an EcommerceProvider');
  }
  return context;
};
