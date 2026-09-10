import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Order,
  CartItem,
  Harvest,
  AIInsight,
  NearbyDemandOpportunity,
  Message,
  NotificationItem,
  Complaint,
  OrderStatus
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_HARVESTS,
  INITIAL_AI_INSIGHTS,
  INITIAL_NEARBY_DEMAND,
  INITIAL_NOTIFICATIONS,
  INITIAL_COMPLAINTS
} from '../data/initialData';
import { LogisticsService } from '../services/logisticsService';

interface DataContextType {
  products: Product[];
  orders: Order[];
  cart: CartItem[];
  harvests: Harvest[];
  aiInsights: AIInsight[];
  nearbyDemand: NearbyDemandOpportunity[];
  messages: Message[];
  notifications: NotificationItem[];
  complaints: Complaint[];

  // Product CRUD
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Cart operations
  addToCart: (product: Product, quantity: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  checkoutCart: (
    customerId: string,
    customerName: string,
    customerPhone: string,
    customerAddress: string,
    paymentMethod: 'UPI' | 'Card' | 'COD' | 'NetBanking'
  ) => string;

  // Order workflow
  updateOrderStatus: (orderId: string, status: OrderStatus, deliveryPartnerId?: string) => void;

  // Harvest Calendar
  addHarvest: (harvest: Omit<Harvest, 'id'>) => void;

  // Messaging & Notifications
  sendMessage: (receiverId: string, receiverName: string, senderId: string, senderName: string, text: string, orderId?: string) => void;
  markNotificationRead: (id: string) => void;

  // Complaints
  addComplaint: (complaint: Omit<Complaint, 'id' | 'createdAt' | 'status'>) => void;
  updateComplaintStatus: (id: string, status: 'Open' | 'In Review' | 'Resolved', notes?: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('k2h_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('k2h_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('k2h_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [harvests, setHarvests] = useState<Harvest[]>(() => {
    const saved = localStorage.getItem('k2h_harvests');
    return saved ? JSON.parse(saved) : INITIAL_HARVESTS;
  });

  const [aiInsights] = useState<AIInsight[]>(INITIAL_AI_INSIGHTS);
  const [nearbyDemand] = useState<NearbyDemandOpportunity[]>(INITIAL_NEARBY_DEMAND);

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('k2h_messages');
    return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('k2h_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    const saved = localStorage.getItem('k2h_complaints');
    return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
  });

  // Sync to localStorage for true dynamic persistence
  useEffect(() => {
    localStorage.setItem('k2h_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('k2h_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('k2h_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('k2h_harvests', JSON.stringify(harvests));
  }, [harvests]);

  useEffect(() => {
    localStorage.setItem('k2h_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('k2h_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('k2h_complaints', JSON.stringify(complaints));
  }, [complaints]);

  // Product CRUD
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProd: Product = {
      ...productData,
      id: `prod_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setProducts(prev => [newProd, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Cart operations
  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Checkout process
  const checkoutCart = (
    customerId: string,
    customerName: string,
    customerPhone: string,
    customerAddress: string,
    paymentMethod: 'UPI' | 'Card' | 'COD' | 'NetBanking'
  ): string => {
    if (cart.length === 0) return '';

    // Group cart items by farmer
    const primaryItem = cart[0];
    const farmerId = primaryItem.product.farmerId;
    const farmerName = primaryItem.product.farmerName;
    const farmerLocation = primaryItem.product.farmerLocation;

    const items = cart.map(c => ({
      productId: c.product.id,
      productName: c.product.name,
      unitPrice: c.product.price,
      quantity: c.quantity,
      unit: c.product.unit,
      image: c.product.image
    }));

    const farmerSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const pricing = LogisticsService.calculateTransparentPrice(farmerSubtotal, 12.5);

    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: Order = {
      id: orderId,
      customerId,
      customerName,
      customerPhone,
      customerAddress,
      farmerId,
      farmerName,
      farmerLocation,
      farmerLat: 19.9975,
      farmerLng: 73.7898,
      items,
      farmerSubtotal,
      logisticsFee: pricing.logisticsFee,
      platformFee: pricing.platformFee,
      totalPrice: pricing.totalPrice,
      status: 'placed',
      paymentMethod,
      paymentStatus: 'Paid',
      deliveryPartnerId: 'delivery_1',
      deliveryPartnerName: 'Suresh Kumar',
      deliveryPartnerPhone: '+91 97112 23344',
      destLat: 18.5362,
      destLng: 73.8940,
      createdAt: new Date().toISOString(),
      estimatedDeliveryTime: 'Today by 6:00 PM',
      trackingSteps: [
        { status: 'placed', label: 'Order Placed', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), completed: true, description: 'Order confirmed with direct farmer assignment.' },
        { status: 'confirmed', label: 'Farmer Confirmation', timestamp: '', completed: false, description: 'Farmer checking produce stock.' },
        { status: 'preparing', label: 'Preparing Harvest', timestamp: '', completed: false, description: 'Produce sorted and packed.' },
        { status: 'ready_for_pickup', label: 'Ready for Pickup', timestamp: '', completed: false, description: 'Waiting at farm dispatch station.' },
        { status: 'picked_up', label: 'Picked Up by Delivery', timestamp: '', completed: false, description: 'En route with electric freight van.' },
        { status: 'out_for_delivery', label: 'Out for Delivery', timestamp: '', completed: false, description: 'Rider approaching final destination.' },
        { status: 'delivered', label: 'Delivered', timestamp: '', completed: false, description: 'Handed over to customer.' }
      ]
    };

    // Deduct stock from products
    setProducts(prev =>
      prev.map(p => {
        const cartMatch = cart.find(c => c.product.id === p.id);
        if (cartMatch) {
          return { ...p, quantity: Math.max(0, p.quantity - cartMatch.quantity) };
        }
        return p;
      })
    );

    setOrders(prev => [newOrder, ...prev]);

    // Send notifications to Farmer & Customer
    setNotifications(prev => [
      {
        id: `notif_${Date.now()}_1`,
        userId: farmerId,
        title: 'New Order Received! 🛍️',
        message: `Order #${orderId} placed by ${customerName} for ₹${pricing.farmerSubtotal}.`,
        timestamp: 'Just now',
        read: false,
        type: 'order'
      },
      {
        id: `notif_${Date.now()}_2`,
        userId: customerId,
        title: 'Order Placed Successfully 🎉',
        message: `Your order #${orderId} has been sent directly to farmer ${farmerName}.`,
        timestamp: 'Just now',
        read: false,
        type: 'order'
      },
      ...prev
    ]);

    clearCart();
    return orderId;
  };

  // Order workflow status updates
  const updateOrderStatus = (orderId: string, status: OrderStatus, deliveryPartnerId?: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const updatedSteps = ord.trackingSteps.map(step => {
            if (step.status === status) {
              return { ...step, completed: true, timestamp: nowTime };
            }
            return step;
          });

          return {
            ...ord,
            status,
            deliveryPartnerId: deliveryPartnerId || ord.deliveryPartnerId,
            trackingSteps: updatedSteps
          };
        }
        return ord;
      })
    );
  };

  const addHarvest = (harvestData: Omit<Harvest, 'id'>) => {
    const newHarv: Harvest = {
      ...harvestData,
      id: `harv_${Date.now()}`
    };
    setHarvests(prev => [newHarv, ...prev]);
  };

  const sendMessage = (
    receiverId: string,
    receiverName: string,
    senderId: string,
    senderName: string,
    text: string,
    orderId?: string
  ) => {
    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      senderId,
      senderName,
      receiverId,
      receiverName,
      orderId,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMsg]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const addComplaint = (complaintData: Omit<Complaint, 'id' | 'createdAt' | 'status'>) => {
    const newCmp: Complaint = {
      ...complaintData,
      id: `CMP-${Math.floor(100 + Math.random() * 900)}`,
      status: 'Open',
      createdAt: new Date().toISOString()
    };
    setComplaints(prev => [newCmp, ...prev]);
  };

  const updateComplaintStatus = (id: string, status: 'Open' | 'In Review' | 'Resolved', notes?: string) => {
    setComplaints(prev =>
      prev.map(c => (c.id === id ? { ...c, status, resolutionNotes: notes || c.resolutionNotes } : c))
    );
  };

  return (
    <DataContext.Provider
      value={{
        products,
        orders,
        cart,
        harvests,
        aiInsights,
        nearbyDemand,
        messages,
        notifications,
        complaints,
        addProduct,
        updateProduct,
        deleteProduct,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        checkoutCart,
        updateOrderStatus,
        addHarvest,
        sendMessage,
        markNotificationRead,
        addComplaint,
        updateComplaintStatus
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
