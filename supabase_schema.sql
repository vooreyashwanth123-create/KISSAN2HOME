-- ============================================================
-- KISSAN2HOME — SUPABASE POSTGRESQL DATABASE SCHEMA & RLS POLICIES
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS & PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    role TEXT CHECK (role IN ('FARMER', 'CUSTOMER', 'DELIVERY', 'ADMIN')) NOT NULL,
    avatar TEXT,
    location TEXT,
    rating NUMERIC(3,2) DEFAULT 5.00,
    verification_status TEXT CHECK (verification_status IN ('pending', 'verified', 'rejected')) DEFAULT 'pending',
    farm_details JSONB,
    delivery_details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. PRODUCTS
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farmer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    farmer_name TEXT NOT NULL,
    farmer_location TEXT NOT NULL,
    name TEXT NOT NULL,
    category TEXT CHECK (category IN ('Vegetables', 'Fruits', 'Grains', 'Pulses', 'Dairy', 'Spices', 'Other')) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    unit TEXT NOT NULL,
    quantity NUMERIC(10,2) NOT NULL,
    quality_grade TEXT CHECK (quality_grade IN ('A+', 'A', 'B')) DEFAULT 'A',
    harvest_date DATE,
    is_available BOOLEAN DEFAULT TRUE,
    image TEXT NOT NULL,
    description TEXT,
    farm_source TEXT,
    organic BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. ORDERS
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES public.profiles(id),
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_address TEXT NOT NULL,
    farmer_id UUID REFERENCES public.profiles(id),
    farmer_name TEXT NOT NULL,
    farmer_location TEXT NOT NULL,
    farmer_subtotal NUMERIC(10,2) NOT NULL,
    logistics_fee NUMERIC(10,2) NOT NULL,
    platform_fee NUMERIC(10,2) NOT NULL,
    total_price NUMERIC(10,2) NOT NULL,
    status TEXT CHECK (status IN ('placed', 'confirmed', 'preparing', 'ready_for_pickup', 'picked_up', 'out_for_delivery', 'delivered', 'cancelled')) DEFAULT 'placed',
    payment_method TEXT DEFAULT 'UPI',
    payment_status TEXT DEFAULT 'Paid',
    delivery_partner_id UUID REFERENCES public.profiles(id),
    delivery_partner_name TEXT,
    tracking_steps JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. ORDER ITEMS
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id),
    product_name TEXT NOT NULL,
    unit_price NUMERIC(10,2) NOT NULL,
    quantity NUMERIC(10,2) NOT NULL,
    unit TEXT NOT NULL,
    image TEXT
);

-- 5. HARVEST CALENDAR
CREATE TABLE IF NOT EXISTS public.harvests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farmer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    crop_name TEXT NOT NULL,
    expected_date DATE NOT NULL,
    expected_quantity NUMERIC(10,2) NOT NULL,
    unit TEXT NOT NULL,
    status TEXT DEFAULT 'Growing'
);

-- 6. AI DEMAND FORECASTS
CREATE TABLE IF NOT EXISTS public.ai_demand_forecasts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    crop_name TEXT NOT NULL,
    region TEXT NOT NULL,
    predicted_surge_pct NUMERIC(5,2),
    suggested_price NUMERIC(10,2),
    confidence_score INTEGER,
    recommended_action TEXT,
    urgency TEXT DEFAULT 'medium',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. MESSAGES
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID REFERENCES public.profiles(id),
    receiver_id UUID REFERENCES public.profiles(id),
    order_id UUID REFERENCES public.orders(id),
    text TEXT NOT NULL,
    is_voice BOOLEAN DEFAULT FALSE,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. COMPLAINTS & SUPPORT
CREATE TABLE IF NOT EXISTS public.complaints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id),
    issue_category TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT DEFAULT 'Open',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Products: Everyone can read available products
CREATE POLICY "Public products access" ON public.products FOR SELECT USING (true);
-- Products: Farmers can manage their own products
CREATE POLICY "Farmers manage own products" ON public.products FOR ALL USING (auth.uid() = farmer_id);

-- Orders: Customers can see their own orders, Farmers see orders for their products, Delivery sees assigned
CREATE POLICY "Role based order access" ON public.orders FOR SELECT USING (
    auth.uid() = customer_id OR 
    auth.uid() = farmer_id OR 
    auth.uid() = delivery_partner_id OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
);
