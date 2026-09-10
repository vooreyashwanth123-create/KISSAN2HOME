import { User, Product, Order, Harvest, AIInsight, NearbyDemandOpportunity, Complaint, NotificationItem } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'farmer_1',
    name: 'Ramesh Patel',
    email: 'ramesh.patel@kissan.in',
    phone: '+91 98765 43210',
    role: 'FARMER',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    location: 'Nashik, Maharashtra',
    rating: 4.9,
    verificationStatus: 'verified',
    farmDetails: {
      farmName: 'Patel Organic Farms',
      sizeAcres: 12,
      primaryCrops: ['Tomatoes', 'Red Onions', 'Grapes'],
      soilType: 'Black Cotton Soil',
      address: 'Plot 42, Dindori Road, Nashik, MH 422004',
      documentUrl: 'https://example.com/kisan_card.pdf'
    }
  },
  {
    id: 'farmer_2',
    name: 'Gurpreet Singh',
    email: 'gurpreet.singh@kissan.in',
    phone: '+91 98123 45678',
    role: 'FARMER',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    location: 'Ludhiana, Punjab',
    rating: 4.8,
    verificationStatus: 'verified',
    farmDetails: {
      farmName: 'Green Wheat & Paddy Estate',
      sizeAcres: 25,
      primaryCrops: ['Basmati Rice', 'Wheat', 'Mustard'],
      soilType: 'Alluvial Soil',
      address: 'Village GT Road, Khanna, Ludhiana, PB 141401'
    }
  },
  {
    id: 'farmer_3',
    name: 'Lakshmi Ammal',
    email: 'lakshmi.ammal@kissan.in',
    phone: '+91 94432 10987',
    role: 'FARMER',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    location: 'Theni, Tamil Nadu',
    rating: 4.95,
    verificationStatus: 'verified',
    farmDetails: {
      farmName: 'Amman Organic Spice Garden',
      sizeAcres: 8,
      primaryCrops: ['Organic Turmeric', 'Small Cardamom', 'Bananas'],
      soilType: 'Red Loamy Soil',
      address: 'Bodi Hills Foot, Theni, TN 625513'
    }
  },
  {
    id: 'customer_1',
    name: 'Ananya Sharma',
    email: 'ananya.sharma@gmail.com',
    phone: '+91 99887 76655',
    role: 'CUSTOMER',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    location: 'Koregaon Park, Pune, Maharashtra',
  },
  {
    id: 'customer_2',
    name: 'Vikramaditya Roy',
    email: 'vikram.roy@outlook.com',
    phone: '+91 98300 11223',
    role: 'CUSTOMER',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    location: 'Bandra West, Mumbai, Maharashtra',
  },
  {
    id: 'delivery_1',
    name: 'Suresh Kumar',
    email: 'suresh.delivery@kissan2home.com',
    phone: '+91 97112 23344',
    role: 'DELIVERY',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    location: 'Nashik Central Hub',
    rating: 4.9,
    deliveryDetails: {
      vehicleType: 'Refrigerated EV Mini Van',
      licenseNumber: 'MH-15-AB-9821',
      currentLat: 19.9975,
      currentLng: 73.7898,
      isAvailable: true
    }
  },
  {
    id: 'admin_1',
    name: 'KISSAN2HOME Admin Command',
    email: 'admin@kissan2home.com',
    phone: '+91 1800 123 4567',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    location: 'National Operations HQ, Pune'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    farmerId: 'farmer_1',
    farmerName: 'Ramesh Patel',
    farmerLocation: 'Nashik, MH',
    name: 'Farm Fresh Organic Tomatoes',
    category: 'Vegetables',
    price: 42,
    unit: 'kg',
    quantity: 450,
    qualityGrade: 'A+',
    harvestDate: '2026-09-08',
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
    description: 'Vine-ripened red tomatoes grown without synthetic pesticides. High juicy content and rich natural lycopene.',
    farmSource: 'Patel Organic Farms, Nashik',
    organic: true,
    createdAt: '2026-09-08T08:00:00Z'
  },
  {
    id: 'prod_2',
    farmerId: 'farmer_1',
    farmerName: 'Ramesh Patel',
    farmerLocation: 'Nashik, MH',
    name: 'Nashik Red Onions (Export Quality)',
    category: 'Vegetables',
    price: 35,
    unit: 'kg',
    quantity: 1200,
    qualityGrade: 'A',
    harvestDate: '2026-09-05',
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cf?w=600&auto=format&fit=crop&q=80',
    description: 'Famous Nashik red onions with sharp aroma and long shelf life. Perfect for daily kitchen cooking.',
    farmSource: 'Patel Organic Farms, Nashik',
    organic: false,
    createdAt: '2026-09-05T10:00:00Z'
  },
  {
    id: 'prod_3',
    farmerId: 'farmer_2',
    farmerName: 'Gurpreet Singh',
    farmerLocation: 'Ludhiana, PB',
    name: 'Aromatic Traditional Basmati Rice (1121)',
    category: 'Grains',
    price: 110,
    unit: 'kg',
    quantity: 800,
    qualityGrade: 'A+',
    harvestDate: '2026-08-20',
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
    description: 'Long grain naturally aged Basmati rice from the fertile plains of Punjab. Non-sticky and delightful aroma.',
    farmSource: 'Green Wheat & Paddy Estate, Ludhiana',
    organic: true,
    createdAt: '2026-08-22T09:30:00Z'
  },
  {
    id: 'prod_4',
    farmerId: 'farmer_3',
    farmerName: 'Lakshmi Ammal',
    farmerLocation: 'Theni, TN',
    name: 'Pure Salem Organic Turmeric Powder',
    category: 'Spices',
    price: 240,
    unit: 'kg',
    quantity: 150,
    qualityGrade: 'A+',
    harvestDate: '2026-08-15',
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80',
    description: 'High Curcumin content (5.2%) unadulterated turmeric rhizome powder direct from Bodi hills.',
    farmSource: 'Amman Organic Spice Garden, Theni',
    organic: true,
    createdAt: '2026-08-18T14:20:00Z'
  },
  {
    id: 'prod_5',
    farmerId: 'farmer_1',
    farmerName: 'Ramesh Patel',
    farmerLocation: 'Nashik, MH',
    name: 'Sweet Thompson Seedless Grapes',
    category: 'Fruits',
    price: 85,
    unit: 'kg',
    quantity: 320,
    qualityGrade: 'A+',
    harvestDate: '2026-09-09',
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&auto=format&fit=crop&q=80',
    description: 'Crisp green seedless grapes harvested early morning for peak sweetness level (Brix 18+).',
    farmSource: 'Patel Organic Farms, Nashik',
    organic: true,
    createdAt: '2026-09-09T07:15:00Z'
  },
  {
    id: 'prod_6',
    farmerId: 'farmer_3',
    farmerName: 'Lakshmi Ammal',
    farmerLocation: 'Theni, TN',
    name: 'Green Cardamom (8mm Bold Pods)',
    category: 'Spices',
    price: 1850,
    unit: 'kg',
    quantity: 45,
    qualityGrade: 'A+',
    harvestDate: '2026-08-28',
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=600&auto=format&fit=crop&q=80',
    description: 'Hand-picked green cardamom pods naturally dried in solar domes to retain essential oils.',
    farmSource: 'Amman Organic Spice Garden, Theni',
    organic: true,
    createdAt: '2026-08-30T11:00:00Z'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-98214',
    customerId: 'customer_1',
    customerName: 'Ananya Sharma',
    customerPhone: '+91 99887 76655',
    customerAddress: 'Flat 402, Green Glen Layout, Koregaon Park, Pune - 411001',
    farmerId: 'farmer_1',
    farmerName: 'Ramesh Patel',
    farmerLocation: 'Nashik, MH',
    farmerLat: 19.9975,
    farmerLng: 73.7898,
    items: [
      {
        productId: 'prod_1',
        productName: 'Farm Fresh Organic Tomatoes',
        unitPrice: 42,
        quantity: 5,
        unit: 'kg',
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'
      },
      {
        productId: 'prod_2',
        productName: 'Nashik Red Onions (Export Quality)',
        unitPrice: 35,
        quantity: 5,
        unit: 'kg',
        image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cf?w=600&auto=format&fit=crop&q=80'
      }
    ],
    farmerSubtotal: 385,
    logisticsFee: 25,
    platformFee: 5,
    totalPrice: 415,
    status: 'out_for_delivery',
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    deliveryPartnerId: 'delivery_1',
    deliveryPartnerName: 'Suresh Kumar',
    deliveryPartnerPhone: '+91 97112 23344',
    destLat: 18.5362,
    destLng: 73.8940,
    createdAt: '2026-09-10T09:30:00Z',
    estimatedDeliveryTime: 'Today by 5:30 PM',
    trackingSteps: [
      { status: 'placed', label: 'Order Placed', timestamp: '09:30 AM', completed: true, description: 'Customer confirmed cart checkout via UPI payment.' },
      { status: 'confirmed', label: 'Confirmed by Farmer', timestamp: '09:45 AM', completed: true, description: 'Farmer Ramesh Patel accepted the order for dispatch.' },
      { status: 'preparing', label: 'Produce Harvested & Packed', timestamp: '11:15 AM', completed: true, description: 'Vegetables packed in eco-friendly aerated crates.' },
      { status: 'ready_for_pickup', label: 'Ready for Pickup', timestamp: '12:30 PM', completed: true, description: 'Available at Nashik Farm Hub gate 2.' },
      { status: 'picked_up', label: 'Picked Up by Delivery', timestamp: '01:15 PM', completed: true, description: 'Delivery partner Suresh Kumar loaded the package.' },
      { status: 'out_for_delivery', label: 'Out for Delivery', timestamp: '02:00 PM', completed: true, description: 'Driver is en-route on Pune-Nashik highway route.' },
      { status: 'delivered', label: 'Delivered to Doorstep', timestamp: '', completed: false, description: 'OTP verification required at delivery.' }
    ]
  },
  {
    id: 'ORD-98215',
    customerId: 'customer_2',
    customerName: 'Vikramaditya Roy',
    customerPhone: '+91 98300 11223',
    customerAddress: 'Bungalow 12, Carter Road, Bandra West, Mumbai - 400050',
    farmerId: 'farmer_2',
    farmerName: 'Gurpreet Singh',
    farmerLocation: 'Ludhiana, PB',
    farmerLat: 30.9010,
    farmerLng: 75.8573,
    items: [
      {
        productId: 'prod_3',
        productName: 'Aromatic Traditional Basmati Rice (1121)',
        unitPrice: 110,
        quantity: 10,
        unit: 'kg',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80'
      }
    ],
    farmerSubtotal: 1100,
    logisticsFee: 40,
    platformFee: 10,
    totalPrice: 1150,
    status: 'confirmed',
    paymentMethod: 'Card',
    paymentStatus: 'Paid',
    destLat: 19.0596,
    destLng: 72.8295,
    createdAt: '2026-09-10T14:10:00Z',
    estimatedDeliveryTime: 'Tomorrow by 11:00 AM',
    trackingSteps: [
      { status: 'placed', label: 'Order Placed', timestamp: '02:10 PM', completed: true, description: 'Payment authorized successfully.' },
      { status: 'confirmed', label: 'Confirmed by Farmer', timestamp: '02:25 PM', completed: true, description: 'Farmer Gurpreet preparing 10kg sealed jute bag.' },
      { status: 'preparing', label: 'Packing', timestamp: '', completed: false, description: 'Quality inspection and moisture seal.' },
      { status: 'ready_for_pickup', label: 'Ready for Pickup', timestamp: '', completed: false, description: 'Dispatch hub assignment.' },
      { status: 'picked_up', label: 'Picked Up', timestamp: '', completed: false, description: 'Freight transit.' },
      { status: 'out_for_delivery', label: 'Out for Delivery', timestamp: '', completed: false, description: 'Local rider assignment.' },
      { status: 'delivered', label: 'Delivered', timestamp: '', completed: false, description: 'Final confirmation.' }
    ]
  }
];

export const INITIAL_HARVESTS: Harvest[] = [
  {
    id: 'har_1',
    farmerId: 'farmer_1',
    cropName: 'Organic Red Tomatoes',
    expectedDate: '2026-09-18',
    expectedQuantity: 650,
    unit: 'kg',
    status: 'Growing'
  },
  {
    id: 'har_2',
    farmerId: 'farmer_1',
    cropName: 'Export Grade Grapes',
    expectedDate: '2026-09-22',
    expectedQuantity: 1200,
    unit: 'kg',
    status: 'Harvesting Soon'
  },
  {
    id: 'har_3',
    farmerId: 'farmer_2',
    cropName: 'Golden Wheat Harvest',
    expectedDate: '2026-10-05',
    expectedQuantity: 3500,
    unit: 'kg',
    status: 'Growing'
  }
];

export const INITIAL_AI_INSIGHTS: AIInsight[] = [
  {
    id: 'ai_1',
    cropName: 'Tomatoes',
    type: 'demand_surge',
    title: 'High Demand Surge Expected in Western Region',
    description: 'Historical order data & upcoming festive week indicate a +38% rise in Tomato demand across Pune and Mumbai metros over the next 7 days.',
    predictedDemandChangePct: 38,
    suggestedPrice: 46,
    confidence: 94,
    recommendedAction: 'Increase harvest listing availability and set competitive price at ₹45-48/kg to maximize farm revenue.',
    urgency: 'high'
  },
  {
    id: 'ai_2',
    cropName: 'Red Onions',
    type: 'nearby_gap',
    title: 'Nearby Local Deficit Detected in Nashik Suburb',
    description: 'Demand requirement is 2400 kg while currently listed local supply is only 1500 kg. 900 kg supply deficit gap exists.',
    predictedDemandChangePct: 22,
    suggestedPrice: 38,
    confidence: 89,
    recommendedAction: 'List remaining stored onion inventory to capture nearby restaurant direct orders.',
    urgency: 'medium'
  },
  {
    id: 'ai_3',
    cropName: 'Grapes',
    type: 'wastage_risk',
    title: 'Perishable Spoilage Risk Warning',
    description: 'Ambient temperatures rising in Transit Route 4. Batches harvested before Sep 05 should be prioritized for fast local delivery.',
    confidence: 91,
    recommendedAction: 'Offer a 5% bulk discount for orders above 20kg to clear stock within 48 hours.',
    urgency: 'high'
  }
];

export const INITIAL_NEARBY_DEMAND: NearbyDemandOpportunity[] = [
  {
    id: 'nd_1',
    cropName: 'Tomatoes',
    category: 'Vegetables',
    requiredQty: 480,
    nearbySupplyQty: 310,
    opportunityQty: 170,
    suggestedPrice: 44,
    location: 'Koregaon Park & Kalyani Nagar, Pune',
    distanceKm: 4.2
  },
  {
    id: 'nd_2',
    cropName: 'Organic Turmeric',
    category: 'Spices',
    requiredQty: 200,
    nearbySupplyQty: 80,
    opportunityQty: 120,
    suggestedPrice: 245,
    location: 'Bandra & Juhu Organic Stores, Mumbai',
    distanceKm: 12.8
  },
  {
    id: 'nd_3',
    cropName: 'Basmati Rice',
    category: 'Grains',
    requiredQty: 1500,
    nearbySupplyQty: 900,
    opportunityQty: 600,
    suggestedPrice: 112,
    location: 'Khanna Co-op Wholesale Hub',
    distanceKm: 6.5
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    userId: 'farmer_1',
    title: 'New Order Received! 🛒',
    message: 'Customer Ananya Sharma placed an order #ORD-98214 for 5kg Tomatoes & 5kg Onions.',
    timestamp: '2 hours ago',
    read: false,
    type: 'order'
  },
  {
    id: 'notif_2',
    userId: 'farmer_1',
    title: 'AI Price Advice 📈',
    message: 'Tomato demand surged +38% in your region. Recommended price: ₹45/kg.',
    timestamp: '5 hours ago',
    read: true,
    type: 'demand'
  },
  {
    id: 'notif_3',
    userId: 'customer_1',
    title: 'Order Status Update 🚚',
    message: 'Your order #ORD-98214 is Out for Delivery with rider Suresh Kumar.',
    timestamp: '30 mins ago',
    read: false,
    type: 'order'
  }
];

export const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'CMP-104',
    userId: 'customer_2',
    userName: 'Vikramaditya Roy',
    userRole: 'CUSTOMER',
    issueCategory: 'Delivery Delay Query',
    description: 'Inquired about interstate express refrigerated freight delivery schedule for Basmati Rice from Punjab.',
    status: 'In Review',
    createdAt: '2026-09-10T14:30:00Z'
  }
];
