import { Category, Product, Vendor, PromoCode, ShippingAddress, Order, Review } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Electronic Devices',
    slug: 'electronic-devices',
    iconName: 'Smartphone',
    itemCount: 1420,
    subcategories: [
      {
        id: 'sub-1-1',
        name: 'Smartphones & Tablets',
        items: ['Apple iPhones', 'Samsung Galaxy', 'Xiaomi & Redmi', 'Realme', 'iPads & Android Tablets']
      },
      {
        id: 'sub-1-2',
        name: 'Laptops & Computers',
        items: ['Gaming Laptops', 'Ultrabooks', 'Desktop PCs', 'Monitors & Displays', 'PC Components']
      },
      {
        id: 'sub-1-3',
        name: 'Cameras & Drones',
        items: ['DSLR Cameras', 'Mirrorless Cameras', 'Action Cams', 'Drones & Gimbals', 'Security Cameras']
      }
    ]
  },
  {
    id: 'cat-2',
    name: 'Electronic Accessories',
    slug: 'electronic-accessories',
    iconName: 'Headphones',
    itemCount: 2850,
    subcategories: [
      {
        id: 'sub-2-1',
        name: 'Audio & Sound',
        items: ['Bluetooth Earbuds (TWS)', 'Over-Ear Headphones', 'Portable Bluetooth Speakers', 'Microphones']
      },
      {
        id: 'sub-2-2',
        name: 'Wearables & Smart Tech',
        items: ['Smartwatches', 'Fitness Trackers', 'Smart Bands', 'VR Headsets']
      },
      {
        id: 'sub-2-3',
        name: 'Mobile Accessories',
        items: ['Fast Chargers & Cables', 'Power Banks', 'Phone Cases', 'Screen Protectors']
      }
    ]
  },
  {
    id: 'cat-3',
    name: 'TV & Home Appliances',
    slug: 'tv-home-appliances',
    iconName: 'Tv',
    itemCount: 890,
    subcategories: [
      {
        id: 'sub-3-1',
        name: 'Televisions & Videos',
        items: ['4K Smart LED TVs', 'OLED / QLED TVs', 'Android TV Boxes', 'Soundbars']
      },
      {
        id: 'sub-3-2',
        name: 'Large Appliances',
        items: ['Inverter Air Conditioners', 'Refrigerators & Freezers', 'Washing Machines', 'Microwaves']
      }
    ]
  },
  {
    id: 'cat-4',
    name: "Health & Beauty",
    slug: 'health-beauty',
    iconName: 'Sparkles',
    itemCount: 3120,
    subcategories: [
      {
        id: 'sub-4-1',
        name: 'Skincare & Cosmetics',
        items: ['Face Serums', 'Moisturizers & Sunscreen', 'Lipsticks & Lip Gloss', 'Foundation & Concealer']
      },
      {
        id: 'sub-4-2',
        name: 'Fragrances & Hair Care',
        items: ['Perfumes & Cologne', 'Shampoo & Conditioners', 'Hair Dryers & Stylers']
      }
    ]
  },
  {
    id: 'cat-5',
    name: "Men's Fashion",
    slug: 'mens-fashion',
    iconName: 'Shirt',
    itemCount: 2450,
    subcategories: [
      {
        id: 'sub-5-1',
        name: 'Clothing',
        items: ['Casual & Formal Shirts', 'Polo T-Shirts', 'Denim Jeans', 'Panjabi & Traditional Wear']
      },
      {
        id: 'sub-5-2',
        name: 'Shoes & Accessories',
        items: ['Sneakers', 'Formal Leather Shoes', 'Wallets & Belts', 'Sunglasses & Watches']
      }
    ]
  },
  {
    id: 'cat-6',
    name: "Women's Fashion",
    slug: 'womens-fashion',
    iconName: 'ShoppingBag',
    itemCount: 3890,
    subcategories: [
      {
        id: 'sub-6-1',
        name: 'Ethnic & Western Wear',
        items: ['Sarees & Kurtis', 'Salwar Kameez', 'Dresses & Tops', 'Hijabs & Abayas']
      },
      {
        id: 'sub-6-2',
        name: 'Bags & Footwear',
        items: ['Handbags & Totes', 'Heels & Flats', 'Jewelry Sets']
      }
    ]
  },
  {
    id: 'cat-7',
    name: 'Home & Living',
    slug: 'home-living',
    iconName: 'Home',
    itemCount: 1670,
    subcategories: [
      {
        id: 'sub-7-1',
        name: 'Furniture & Decor',
        items: ['Ergonomic Chairs', 'Study Tables', 'Wall Clocks', 'Ambient Lighting']
      },
      {
        id: 'sub-7-2',
        name: 'Kitchen & Dining',
        items: ['Non-stick Cookware', 'Air Fryers', 'Blenders & Grinders', 'Water Purifiers']
      }
    ]
  },
  {
    id: 'cat-8',
    name: 'Sports & Outdoor',
    slug: 'sports-outdoor',
    iconName: 'Dumbbell',
    itemCount: 940,
    subcategories: [
      {
        id: 'sub-8-1',
        name: 'Fitness & Gym',
        items: ['Dumbbells & Resistance Bands', 'Yoga Mats', 'Treadmills', 'Sports Nutrition']
      },
      {
        id: 'sub-8-2',
        name: 'Outdoor Sports',
        items: ['Cricket Bats & Balls', 'Football', 'Badminton Rackets', 'Bicycles']
      }
    ]
  }
];

export const VENDORS: Vendor[] = [
  {
    id: 'vendor-1',
    name: 'IMX Official Store',
    storeSlug: 'imx-official',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
    rating: 4.9,
    positiveRatingPercent: 98,
    shipOnTimePercent: 99,
    chatResponsePercent: 95,
    joinedDate: 'Jan 2024',
    status: 'active',
    totalSales: 4892000,
    commissionRate: 0.08,
    balance: 382400,
    bankInfo: {
      accountName: 'IMX Global Enterprise',
      accountNumber: '2050183009212000',
      bankName: 'City Bank Ltd, Gulshan Branch',
      routingNumber: '225271891'
    }
  },
  {
    id: 'vendor-2',
    name: 'Jon Tech Bangladesh',
    storeSlug: 'jon-tech-bd',
    logo: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop&q=80',
    rating: 4.8,
    positiveRatingPercent: 96,
    shipOnTimePercent: 97,
    chatResponsePercent: 92,
    joinedDate: 'Mar 2024',
    status: 'active',
    totalSales: 2150000,
    commissionRate: 0.08,
    balance: 184500,
    bankInfo: {
      accountName: 'Jon Tech Solutions',
      accountNumber: '1102948291028',
      bankName: 'BRAC Bank Ltd',
      routingNumber: '060261891'
    }
  },
  {
    id: 'vendor-3',
    name: 'Fire Sound & Gadgets',
    storeSlug: 'fire-sound-gadgets',
    logo: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1511707171634-5f897ff025a0?w=1200&auto=format&fit=crop&q=80',
    rating: 4.7,
    positiveRatingPercent: 94,
    shipOnTimePercent: 95,
    chatResponsePercent: 89,
    joinedDate: 'Jul 2024',
    status: 'active',
    totalSales: 1680000,
    commissionRate: 0.08,
    balance: 142000,
    bankInfo: {
      accountName: 'Fire Sound BD',
      accountNumber: '109283746501',
      bankName: 'Dutch Bangla Bank Ltd',
      routingNumber: '090261444'
    }
  },
  {
    id: 'vendor-4',
    name: 'Apex Lifestyle & Apparel',
    storeSlug: 'apex-lifestyle',
    logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&auto=format&fit=crop&q=80',
    rating: 4.6,
    positiveRatingPercent: 92,
    shipOnTimePercent: 94,
    chatResponsePercent: 91,
    joinedDate: 'Aug 2024',
    status: 'active',
    totalSales: 890000,
    commissionRate: 0.08,
    balance: 78500,
    bankInfo: {
      accountName: 'Apex Lifestyle Apparels',
      accountNumber: '312984719283',
      bankName: 'Eastern Bank Ltd',
      routingNumber: '085261999'
    }
  }
];

export const PRODUCTS: Product[] = [
  // Flash Sale products
  {
    id: 'prod-fs-1',
    name: 'IMX Ultra ANC Wireless Headphones - 45H Battery, Hi-Res Spatial Audio',
    slug: 'imx-ultra-anc-wireless-headphones',
    category: 'Electronic Accessories',
    subcategory: 'Audio & Sound',
    brand: 'IMX FIRE',
    vendorId: 'vendor-1',
    vendorName: 'IMX Official Store',
    price: 3499,
    originalPrice: 6999,
    discountPercentage: 50,
    rating: 4.9,
    reviewCount: 348,
    stock: 24,
    isFlashSale: true,
    flashSaleClaimedPercent: 82,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Studio-grade hybrid active noise cancellation engineered with 40mm titanium drivers. Up to 45 hours playback with ultra-low latency gaming mode and quick charge support.',
    features: [
      'Hybrid 42dB Active Noise Cancellation',
      '40mm Beryllium-coated Drivers',
      'Multipoint Dual Device Connection',
      'Bluetooth 5.3 + AAC/LDAC codecs',
      'Type-C fast charge: 10 mins gives 5 hours'
    ],
    colors: ['Matte Black', 'Titanium Silver', 'Fire Orange'],
    warranty: '1 Year Brand Replacement Warranty',
    shippingFee: 60
  },
  {
    id: 'prod-fs-2',
    name: 'FireWatch Pro 2 AMOLED Smartwatch - Bluetooth Calling, SpO2 & GPS',
    slug: 'firewatch-pro-2-amoled-smartwatch',
    category: 'Electronic Accessories',
    subcategory: 'Wearables & Smart Tech',
    brand: 'IMX FIRE',
    vendorId: 'vendor-1',
    vendorName: 'IMX Official Store',
    price: 2890,
    originalPrice: 5200,
    discountPercentage: 44,
    rating: 4.8,
    reviewCount: 512,
    stock: 18,
    isFlashSale: true,
    flashSaleClaimedPercent: 74,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Vibrant 1.43-inch AMOLED display with 1000 nits peak brightness. Crystal-clear Bluetooth calls with dual ENC microphones and 120+ professional sports tracking modes.',
    features: [
      '1.43-inch Always-On AMOLED 466x466',
      'High-fidelity Bluetooth Calling with Dialer',
      '24/7 Heart Rate, SpO2 & Sleep Tracker',
      'IP68 Waterproof rating',
      'Up to 10 days battery life'
    ],
    colors: ['Jet Black', 'Space Gray', 'Dark Olive'],
    warranty: '6 Months Official Warranty',
    shippingFee: 60
  },
  {
    id: 'prod-fs-3',
    name: 'JonTech Fast Charge 65W GaN Charger - 3 Ports USB-C PD Laptop & Phone',
    slug: 'jontech-fast-charge-65w-gan-charger',
    category: 'Electronic Accessories',
    subcategory: 'Mobile Accessories',
    brand: 'JonTech',
    vendorId: 'vendor-2',
    vendorName: 'Jon Tech Bangladesh',
    price: 1350,
    originalPrice: 2450,
    discountPercentage: 45,
    rating: 4.9,
    reviewCount: 220,
    stock: 35,
    isFlashSale: true,
    flashSaleClaimedPercent: 65,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Next-gen Gallium Nitride (GaN 3) power adapter. Rapidly charges MacBooks, iPhones, Samsung flagships, and tablets simultaneously with dynamic smart wattage distribution.',
    features: [
      '65W High-power GaN Fast Charging',
      '2x USB-C PD 3.0 + 1x USB-A QC 4.0 ports',
      'Multi-protection safety chip against overheating',
      'Ultra-compact foldable plug design'
    ],
    colors: ['White', 'Carbon Black'],
    warranty: '1 Year Warranty',
    shippingFee: 60
  },
  {
    id: 'prod-fs-4',
    name: 'FireBass 20W Rugged Bluetooth Speaker - IPX7 Waterproof Deep Bass',
    slug: 'firebass-20w-rugged-bluetooth-speaker',
    category: 'Electronic Accessories',
    subcategory: 'Audio & Sound',
    brand: 'FireSound',
    vendorId: 'vendor-3',
    vendorName: 'Fire Sound & Gadgets',
    price: 1899,
    originalPrice: 3500,
    discountPercentage: 46,
    rating: 4.7,
    reviewCount: 184,
    stock: 12,
    isFlashSale: true,
    flashSaleClaimedPercent: 91,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Immense 360-degree room-filling acoustic audio with dual passive bass radiators. Completely waterproof IPX7 construction ideal for outdoor adventures, pools, and showers.',
    features: [
      '20W Stereo Sound with BassBoost',
      'IPX7 Waterproof (submersible up to 1 meter)',
      '18-Hour Nonstop Playtime (4400mAh battery)',
      'TWS Pairing (link 2 speakers for stereo sound)'
    ],
    colors: ['Midnight Black', 'Camo Army', 'Electric Orange'],
    warranty: '6 Months Replacement Warranty',
    shippingFee: 60
  },
  {
    id: 'prod-fs-5',
    name: 'Smart 4K Android TV Stick with Google Assistant & Dolby Atmos',
    slug: 'smart-4k-android-tv-stick',
    category: 'TV & Home Appliances',
    subcategory: 'Televisions & Videos',
    brand: 'JonTech',
    vendorId: 'vendor-2',
    vendorName: 'Jon Tech Bangladesh',
    price: 3250,
    originalPrice: 5500,
    discountPercentage: 41,
    rating: 4.8,
    reviewCount: 310,
    stock: 28,
    isFlashSale: true,
    flashSaleClaimedPercent: 55,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Upgrade any ordinary monitor or television into an ultra-fast 4K HDR Android TV. Preloaded with Netflix, YouTube, Prime Video, and voice search remote control.',
    features: [
      '4K 60fps Ultra HD Streaming + Dolby Vision',
      'Official Google TV OS with Play Store',
      'Chromecast built-in',
      'Dual-band WiFi 2.4/5GHz + Bluetooth 5.0'
    ],
    warranty: '1 Year Hardware Warranty',
    shippingFee: 60
  },
  {
    id: 'prod-fs-6',
    name: 'Ergonomic High-Back Breathable Mesh Office & Gaming Chair',
    slug: 'ergonomic-high-back-mesh-office-chair',
    category: 'Home & Living',
    subcategory: 'Furniture & Decor',
    brand: 'Apex Lifestyle',
    vendorId: 'vendor-4',
    vendorName: 'Apex Lifestyle & Apparel',
    price: 6850,
    originalPrice: 11500,
    discountPercentage: 40,
    rating: 4.8,
    reviewCount: 129,
    stock: 14,
    isFlashSale: true,
    flashSaleClaimedPercent: 78,
    image: 'https://images.unsplash.com/photo-1580481077195-c3f995a6ec8c?w=800&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1580481077195-c3f995a6ec8c?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Designed for 10+ hours comfortable work posture. Dynamic adaptive lumbar support, 3D adjustable armrests, and certified Class-4 hydraulic gas lift cylinder.',
    features: [
      'Self-adjusting Lumbar Arch Support',
      'Heavy-duty nylon wheelbase rated for 150kg',
      '135-degree recline with tilt tension lock',
      'Breathable tear-resistant Korean mesh'
    ],
    colors: ['Onyx Black', 'Cool Gray'],
    warranty: '2 Years Mechanism Warranty',
    shippingFee: 120
  },

  // Just For You Catalog Products
  {
    id: 'prod-jfy-1',
    name: 'Apple iPhone 15 Pro Max 256GB - Natural Titanium (Official Factory Unlocked)',
    slug: 'apple-iphone-15-pro-max-256gb',
    category: 'Electronic Devices',
    subcategory: 'Smartphones & Tablets',
    brand: 'Apple',
    vendorId: 'vendor-1',
    vendorName: 'IMX Official Store',
    price: 145000,
    originalPrice: 159999,
    discountPercentage: 9,
    rating: 4.9,
    reviewCount: 840,
    stock: 15,
    isFlashSale: false,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Aerospace-grade titanium design powered by the revolutionary A17 Pro chip. 48MP main camera with 5x optical zoom telephoto lens and customizable Action button.',
    features: [
      'A17 Pro chip with 6-core GPU',
      'Super Retina XDR 6.7-inch display with ProMotion 120Hz',
      '48MP Triple Lens Camera System with Photonic Engine',
      'USB-C with USB 3 speeds up to 10Gbps'
    ],
    colors: ['Natural Titanium', 'Black Titanium', 'White Titanium', 'Blue Titanium'],
    warranty: '1 Year Apple Official International Warranty',
    shippingFee: 0,
    freeShippingThreshold: 5000
  },
  {
    id: 'prod-jfy-2',
    name: 'Samsung Galaxy S24 Ultra 5G (12GB RAM / 256GB Storage) Titanium Gray',
    slug: 'samsung-galaxy-s24-ultra-5g',
    category: 'Electronic Devices',
    subcategory: 'Smartphones & Tablets',
    brand: 'Samsung',
    vendorId: 'vendor-2',
    vendorName: 'Jon Tech Bangladesh',
    price: 132000,
    originalPrice: 144999,
    discountPercentage: 9,
    rating: 4.9,
    reviewCount: 462,
    stock: 19,
    isFlashSale: false,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Galaxy AI is here. Epic titanium armor frame with built-in S Pen stylus, Corning Gorilla Armor anti-reflective glass, and 200MP detail camera.',
    features: [
      'Snapdragon 8 Gen 3 for Galaxy',
      'Built-in S Pen stylus',
      '200MP Quad Tele System with 100x Space Zoom',
      '5000mAh Battery with 45W Fast Charging'
    ],
    colors: ['Titanium Gray', 'Titanium Black', 'Titanium Violet'],
    warranty: '1 Year Samsung Bangladesh Official Warranty',
    shippingFee: 0
  },
  {
    id: 'prod-jfy-3',
    name: 'Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones',
    slug: 'sony-wh-1000xm5-wireless-headphones',
    category: 'Electronic Accessories',
    subcategory: 'Audio & Sound',
    brand: 'Sony',
    vendorId: 'vendor-3',
    vendorName: 'Fire Sound & Gadgets',
    price: 36500,
    originalPrice: 42000,
    discountPercentage: 13,
    rating: 4.9,
    reviewCount: 610,
    stock: 22,
    isFlashSale: false,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Two processors and eight microphones for unprecedented noise cancellation. Auto NC Optimizer automatically optimizes sound according to wearing conditions and environment.',
    features: [
      'Integrated Processor V1 + HD Noise Cancelling QN1',
      'Up to 30 hours battery life with quick charge',
      'Ultra-comfortable lightweight leather fit',
      'Speak-to-chat smart conversational sensor'
    ],
    colors: ['Silver', 'Black', 'Midnight Blue'],
    warranty: '1 Year Sony Warranty',
    shippingFee: 60
  },
  {
    id: 'prod-jfy-4',
    name: 'Mechanical Gaming Keyboard RGB Hot-Swappable Custom Linear Switches',
    slug: 'mechanical-gaming-keyboard-rgb',
    category: 'Electronic Accessories',
    subcategory: 'Wearables & Smart Tech',
    brand: 'IMX FIRE',
    vendorId: 'vendor-1',
    vendorName: 'IMX Official Store',
    price: 2750,
    originalPrice: 4500,
    discountPercentage: 39,
    rating: 4.8,
    reviewCount: 195,
    stock: 45,
    isFlashSale: false,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80'
    ],
    description: '75% compact layout keyboard featuring pre-lubed red linear switches, sound dampening foam, programmable per-key RGB backlighting, and volume knob.',
    features: [
      'Hot-swappable 5-pin PCB sockets',
      'Pre-lubed Red Linear Smooth Switches',
      'Double-shot PBT Cherry Profile Keycaps',
      'Detachable Type-C braided cable'
    ],
    colors: ['Carbon Grey', 'Retro White', 'Cyberpunk Pink'],
    warranty: '1 Year Warranty',
    shippingFee: 60
  },
  {
    id: 'prod-jfy-5',
    name: 'Men Premium Slim Fit Casual Oxford Cotton Button-Down Shirt',
    slug: 'men-premium-slim-fit-oxford-cotton-shirt',
    category: "Men's Fashion",
    subcategory: 'Clothing',
    brand: 'Apex Lifestyle',
    vendorId: 'vendor-4',
    vendorName: 'Apex Lifestyle & Apparel',
    price: 1190,
    originalPrice: 1950,
    discountPercentage: 39,
    rating: 4.7,
    reviewCount: 312,
    stock: 58,
    isFlashSale: false,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Crafted from 100% long-staple combed cotton with subtle textured weave. Wrinkle-resistant finish for smart office looks and weekend evening wear.',
    features: [
      '100% Breathable Combed Oxford Cotton',
      'Durable resin button stitching',
      'Modern tailored slim cut',
      'Pre-shrunk fabric'
    ],
    sizes: ['M (38)', 'L (40)', 'XL (42)', 'XXL (44)'],
    colors: ['Sky Blue', 'Crisp White', 'Navy', 'Olive Green'],
    warranty: '7 Days Return & Exchange Policy',
    shippingFee: 60
  },
  {
    id: 'prod-jfy-6',
    name: 'Korean Hyaluronic Acid Glow Hydrating Serum 50ml with Niacinamide',
    slug: 'korean-hyaluronic-acid-glow-hydrating-serum',
    category: 'Health & Beauty',
    subcategory: 'Skincare & Cosmetics',
    brand: 'GlowSkin',
    vendorId: 'vendor-4',
    vendorName: 'Apex Lifestyle & Apparel',
    price: 990,
    originalPrice: 1750,
    discountPercentage: 43,
    rating: 4.8,
    reviewCount: 420,
    stock: 65,
    isFlashSale: false,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Multi-molecular hyaluronic acid deeply hydrates all skin layers. Infused with 5% pure niacinamide and centella asiatica to smooth pores and restore natural radiance.',
    features: [
      '5 Types of Hyaluronic Acid for Deep Hydration',
      '5% Pure Niacinamide for Tone Brightening',
      'Dermatologically tested & fragrance-free',
      'Suitable for all skin types'
    ],
    warranty: '100% Authentic Product Guarantee',
    shippingFee: 60
  },
  {
    id: 'prod-jfy-7',
    name: 'Smart WiFi Robot Vacuum Cleaner with Mop & LiDAR Navigation',
    slug: 'smart-wifi-robot-vacuum-cleaner-mop',
    category: 'TV & Home Appliances',
    subcategory: 'Large Appliances',
    brand: 'JonTech',
    vendorId: 'vendor-2',
    vendorName: 'Jon Tech Bangladesh',
    price: 18500,
    originalPrice: 28000,
    discountPercentage: 34,
    rating: 4.8,
    reviewCount: 89,
    stock: 11,
    isFlashSale: false,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Precision laser mapping creates detailed floor plans of your home. 4000Pa powerful suction cleans carpets, hardwood floors, and pet hair with automatic recharge.',
    features: [
      'LiDAR 360 Laser Multi-floor Mapping',
      '4000Pa Strong Vacuum Suction + Wet Mopping',
      'App Control via WiFi with No-Go Zones',
      'Automatic Docking & Resume'
    ],
    colors: ['Pure White', 'Matte Black'],
    warranty: '1 Year Motor Warranty',
    shippingFee: 120
  },
  {
    id: 'prod-jfy-8',
    name: 'Air Flow Cushion Athletic Running & Gym Training Sneakers',
    slug: 'air-flow-cushion-athletic-running-sneakers',
    category: 'Sports & Outdoor',
    subcategory: 'Fitness & Gym',
    brand: 'IMX Active',
    vendorId: 'vendor-1',
    vendorName: 'IMX Official Store',
    price: 2150,
    originalPrice: 3800,
    discountPercentage: 43,
    rating: 4.7,
    reviewCount: 278,
    stock: 33,
    isFlashSale: false,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Responsive air-cushioned midsole delivers maximum impact absorption for runners. Breathable flyknit upper keeps feet cool during intense marathon workouts.',
    features: [
      'Shock-absorbing Responsive Air Cushion',
      'Seamless Flyknit Breathable Mesh Upper',
      'Anti-slip Rubber Traction Outsole',
      'Ultralight weight: only 240g per shoe'
    ],
    sizes: ['EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44'],
    colors: ['Fire Red / Black', 'Triple Black', 'Glacier White'],
    warranty: '30 Days Quality Guarantee',
    shippingFee: 60
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    userId: 'u-1',
    userName: 'Tanvir Ahmed',
    rating: 5,
    date: '2 days ago',
    comment: 'Authentic product! Delivered to Gulshan in just 24 hours. The sound quality and battery life on these headphones is unbelievable. IMX ZONE/IMX packaging was pristine.',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    userId: 'u-2',
    userName: 'Sabrina Islam',
    rating: 5,
    date: '1 week ago',
    comment: 'Got this on flash sale with bKash cashback. 100% recommended seller! Super fast response and premium build quality.',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    userId: 'u-3',
    userName: 'Md. Rakibul Hasan',
    rating: 4,
    date: '2 weeks ago',
    comment: 'Good value for money. Packaging was safe with bubble wrap. Delivery took 2 days in Chittagong. Satisfied with the purchase.',
    verifiedPurchase: true
  }
];

export const PROMO_CODES: PromoCode[] = [
  {
    code: 'FIRE20',
    discountType: 'percentage',
    discountValue: 20,
    minOrderValue: 2000,
    description: '20% OFF on orders over ৳2,000 (Max ৳800)'
  },
  {
    code: 'IMX ZONE10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 1000,
    description: '10% OFF on orders over ৳1,000'
  },
  {
    code: 'FREESHIP',
    discountType: 'fixed',
    discountValue: 120,
    minOrderValue: 1500,
    description: 'Free Shipping Voucher on orders over ৳1,500'
  },
  {
    code: 'JON100',
    discountType: 'fixed',
    discountValue: 100,
    minOrderValue: 800,
    description: 'Instant ৳100 flat discount on all orders'
  }
];

export const INITIAL_ADDRESSES: ShippingAddress[] = [
  {
    id: 'addr-1',
    fullName: 'Mohammad Jon',
    phoneNumber: '+880 1712 345678',
    division: 'Dhaka',
    city: 'Dhaka North',
    area: 'Gulshan-2',
    detailedAddress: 'House 42, Road 71, Block D, Apt 5B',
    isDefault: true,
    label: 'Home'
  },
  {
    id: 'addr-2',
    fullName: 'Mohammad Jon',
    phoneNumber: '+880 1819 876543',
    division: 'Dhaka',
    city: 'Dhaka South',
    area: 'Motijheel C/A',
    detailedAddress: 'City Center Tower, Level 14, Suite 1402',
    isDefault: false,
    label: 'Office'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-89421',
    trackingNumber: 'TRK-BD-928174',
    customerId: 'cust-1',
    customerName: 'Mohammad Jon',
    customerPhone: '+880 1712 345678',
    items: [
      {
        productId: 'prod-fs-1',
        product: PRODUCTS[0],
        quantity: 1,
        selectedColor: 'Fire Orange',
        price: 3499
      }
    ],
    subtotal: 3499,
    shippingFee: 60,
    discountAmount: 200,
    total: 3359,
    promoCode: 'FIRE20',
    shippingAddress: INITIAL_ADDRESSES[0],
    paymentMethod: 'bkash',
    paymentStatus: 'paid',
    orderStatus: 'in_transit',
    createdAt: '2026-10-12 14:30',
    estimatedDelivery: 'Oct 14, 2026',
    currentStepIndex: 3
  },
  {
    id: 'ORD-77319',
    trackingNumber: 'TRK-BD-664120',
    customerId: 'cust-1',
    customerName: 'Mohammad Jon',
    customerPhone: '+880 1712 345678',
    items: [
      {
        productId: 'prod-fs-3',
        product: PRODUCTS[2],
        quantity: 2,
        selectedColor: 'Carbon Black',
        price: 1350
      }
    ],
    subtotal: 2700,
    shippingFee: 60,
    discountAmount: 100,
    total: 2660,
    promoCode: 'JON100',
    shippingAddress: INITIAL_ADDRESSES[0],
    paymentMethod: 'nagad',
    paymentStatus: 'paid',
    orderStatus: 'delivered',
    createdAt: '2026-10-08 10:15',
    estimatedDelivery: 'Oct 10, 2026',
    currentStepIndex: 5
  }
];
