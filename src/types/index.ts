export type UserRole = 'FARMER' | 'CUSTOMER' | 'DELIVERY' | 'ADMIN';

export type VerificationStatus = 'pending' | 'verified' | 'rejected';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  location: string;
  rating?: number;
  verificationStatus?: VerificationStatus;
  farmDetails?: {
    farmName: string;
    sizeAcres: number;
    primaryCrops: string[];
    soilType: string;
    address: string;
    documentUrl?: string;
  };
  deliveryDetails?: {
    vehicleType: string;
    licenseNumber: string;
    currentLat: number;
    currentLng: number;
    isAvailable: boolean;
  };
}

export type ProductCategory = 'Vegetables' | 'Fruits' | 'Grains' | 'Pulses' | 'Dairy' | 'Spices' | 'Other';

export interface Product {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerLocation: string;
  name: string;
  category: ProductCategory;
  price: number; // Price per unit in INR
  unit: 'kg' | 'quintal' | 'dozen' | 'litre' | 'bunch';
  quantity: number; // Available quantity
  qualityGrade: 'A+' | 'A' | 'B';
  harvestDate: string; // ISO date string
  isAvailable: boolean;
  image: string; // Dynamic URL or base64
  description: string;
  farmSource: string;
  organic: boolean;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'preparing'
  | 'ready_for_pickup'
  | 'picked_up'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface TrackingStep {
  status: OrderStatus;
  label: string;
  timestamp?: string;
  completed: boolean;
  description: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  unit: string;
  image: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  farmerId: string;
  farmerName: string;
  farmerLocation: string;
  farmerLat: number;
  farmerLng: number;
  items: OrderItem[];
  farmerSubtotal: number;
  logisticsFee: number;
  platformFee: number;
  totalPrice: number;
  status: OrderStatus;
  paymentMethod: 'UPI' | 'Card' | 'COD' | 'NetBanking';
  paymentStatus: 'Paid' | 'Pending' | 'Settled';
  deliveryPartnerId?: string;
  deliveryPartnerName?: string;
  deliveryPartnerPhone?: string;
  destLat: number;
  destLng: number;
  createdAt: string;
  estimatedDeliveryTime: string;
  trackingSteps: TrackingStep[];
}

export interface Harvest {
  id: string;
  farmerId: string;
  cropName: string;
  expectedDate: string;
  expectedQuantity: number;
  unit: string;
  status: 'Growing' | 'Harvesting Soon' | 'Ready to Sell';
}

export interface AIInsight {
  id: string;
  cropName: string;
  type: 'demand_surge' | 'price_recommendation' | 'wastage_risk' | 'nearby_gap';
  title: string;
  description: string;
  predictedDemandChangePct?: number;
  suggestedPrice?: number;
  confidence: number; // 0 - 100
  recommendedAction: string;
  urgency: 'high' | 'medium' | 'low';
}

export interface NearbyDemandOpportunity {
  id: string;
  cropName: string;
  category: ProductCategory;
  requiredQty: number; // kg
  nearbySupplyQty: number; // kg
  opportunityQty: number; // kg
  suggestedPrice: number;
  location: string;
  distanceKm: number;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  orderId?: string;
  text: string;
  timestamp: string;
  isVoice?: boolean;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'order' | 'payment' | 'demand' | 'verification' | 'system';
}

export interface Complaint {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  issueCategory: string;
  description: string;
  status: 'Open' | 'In Review' | 'Resolved';
  createdAt: string;
  resolutionNotes?: string;
}

export type IndianLanguageCode =
  | 'en'
  | 'hi'
  | 'bn'
  | 'te'
  | 'mr'
  | 'ta'
  | 'ur'
  | 'gu'
  | 'kn'
  | 'or'
  | 'ml'
  | 'as'
  | 'mai'
  | 'sat'
  | 'ks'
  | 'ne'
  | 'kok'
  | 'doi'
  | 'mni'
  | 'brx'
  | 'sa'
  | 'sd';

export interface LanguageOption {
  code: IndianLanguageCode;
  name: string;
  nativeName: string;
}
