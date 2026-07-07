import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isUsingMock = !supabaseUrl || !supabaseAnonKey;

// Real Supabase Client (if keys exist)
export const supabase = !isUsingMock ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Brands list constant
export const BRANDS = [
  'Amazon', 'Flipkart', 'Myntra', 'Ajio', 'Nike', 
  'Adidas', 'Samsung', 'Boat', 'Swiggy', 'Zomato'
];

// Initial mock coupons data
const INITIAL_COUPONS = [
  {
    id: 'c1',
    brand: 'Amazon',
    offer_title: 'Flat ₹100 Off on Groceries',
    coupon_code: 'AMZNEW100',
    description: 'Get flat ₹100 discount on your first grocery transaction of ₹500 or more.',
    discount_type: 'Flat Amount',
    expiry_date: '2026-08-31',
    source_url: 'https://amazon.in/coupons',
    verified: true,
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'c2',
    brand: 'Swiggy',
    offer_title: '50% Off Up to ₹120',
    coupon_code: 'SWIGGYIT',
    description: 'Get 50% discount on orders from select premium restaurants. Minimum order value ₹150.',
    discount_type: 'Percentage',
    expiry_date: '2026-09-15',
    source_url: 'https://swiggy.com',
    verified: true,
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'c3',
    brand: 'Zomato',
    offer_title: 'Flat ₹150 Off on Feast',
    coupon_code: 'ZOMATO150',
    description: 'Save flat ₹150 on your food delivery orders above ₹399.',
    discount_type: 'Flat Amount',
    expiry_date: '2026-07-20',
    source_url: 'https://zomato.com',
    verified: false,
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'c4',
    brand: 'Myntra',
    offer_title: 'Flat ₹300 Cashback',
    coupon_code: 'MYNTRAPLAY',
    description: 'Get flat ₹300 cashback in your Myntra wallet on purchases above ₹1999.',
    discount_type: 'Cashback',
    expiry_date: '2026-08-10',
    source_url: 'https://myntra.com',
    verified: true,
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'c5',
    brand: 'Ajio',
    offer_title: 'Free Shipping on Apparel',
    coupon_code: '',
    description: 'Enjoy free shipping on all orders above ₹999. No coupon code required at checkout.',
    discount_type: 'Free Shipping',
    expiry_date: '2026-07-15',
    source_url: 'https://ajio.com',
    verified: true,
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'c6',
    brand: 'Nike',
    offer_title: '10% Off on Sneakers',
    coupon_code: 'NIKEJUST',
    description: 'Get an additional 10% discount on select Nike Air and Pegasus series models.',
    discount_type: 'Percentage',
    expiry_date: '2026-07-06', // Expires in 2 days (as of July 4, 2026)
    source_url: 'https://nike.com',
    verified: true,
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'c7',
    brand: 'Adidas',
    offer_title: 'Flat ₹500 Off',
    coupon_code: 'ADI3STRIPES',
    description: 'Get flat ₹500 off on purchase of any two clothing items or footwear.',
    discount_type: 'Flat Amount',
    expiry_date: '2026-07-05', // Expires in 1 day
    source_url: 'https://adidas.co.in',
    verified: false,
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'c8',
    brand: 'Samsung',
    offer_title: 'Flat ₹5000 Off on Galaxy S24',
    coupon_code: 'SAMSUNGS24',
    description: 'Exclusive instant discount on purchase of Galaxy S24 series via pre-paid mode.',
    discount_type: 'Flat Amount',
    expiry_date: '2026-12-31',
    source_url: 'https://samsung.com/in',
    verified: true,
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'c9',
    brand: 'Boat',
    offer_title: '20% Off on Wireless Earbuds',
    coupon_code: 'BOATAUDIO',
    description: 'Save 20% on all Airdopes model earbuds. Maximum discount up to ₹500.',
    discount_type: 'Percentage',
    expiry_date: '2026-07-08', // Expires in 4 days
    source_url: 'https://boat-lifestyle.com',
    verified: true,
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'c10',
    brand: 'Swiggy',
    offer_title: 'Free Delivery on Instamart',
    coupon_code: '',
    description: 'Get free delivery on orders above ₹199 from Swiggy Instamart grocery service.',
    discount_type: 'Free Shipping',
    expiry_date: '2026-08-15',
    source_url: 'https://swiggy.com',
    verified: true,
    active: true,
    created_at: new Date().toISOString()
  }
];

// Initial mock brands data
const INITIAL_BRANDS = [
  { brand_slug: 'amazon-coupons', brand_name: 'Amazon', brand_description: 'Shop online for millions of products across electronics, fashion, home essentials, books, groceries, and more with fast delivery.', logo_url: '', custom_faq: {} },
  { brand_slug: 'flipkart-coupons', brand_name: 'Flipkart', brand_description: 'Explore India\'s top online shopping destination for mobile phones, electronics, fashion apparel, appliances, and home furniture.', logo_url: '', custom_faq: {} },
  { brand_slug: 'myntra-coupons', brand_name: 'Myntra', brand_description: 'Discover the latest trends in fashion, lifestyle, and beauty products. Shop online for clothing, footwear, accessories, and cosmetics.', logo_url: '', custom_faq: {} },
  { brand_slug: 'ajio-coupons', brand_name: 'Ajio', brand_description: 'Your ultimate fashion portal featuring handpicked trendsetting styles, international apparel brands, and exclusive indie collections.', logo_url: '', custom_faq: {} },
  { brand_slug: 'nike-coupons', brand_name: 'Nike', brand_description: 'Gear up with the best in athletic apparel, training gear, and world-class footwear technology for running, basketball, and training.', logo_url: '', custom_faq: {} },
  { brand_slug: 'adidas-coupons', brand_name: 'Adidas', brand_description: 'Unleash your potential with premium sporting goods, retro street-style apparel, sneakers, and training shoes with iconic three stripes.', logo_url: '', custom_faq: {} },
  { brand_slug: 'samsung-coupons', brand_name: 'Samsung', brand_description: 'Upgrade your tech with innovative smartphones, televisions, home appliances, wearable smartwatches, and computing devices.', logo_url: '', custom_faq: {} },
  { brand_slug: 'boat-coupons', brand_name: 'Boat', brand_description: 'Elevate your listening experience with stylish, durable, and high-performance audio wear: wireless earbuds, headphones, and speakers.', logo_url: '', custom_faq: {} },
  { brand_slug: 'swiggy-coupons', brand_name: 'Swiggy', brand_description: 'Satisfy your hunger with lightning-fast food delivery, or get groceries delivered in minutes via Instamart. Seamless online ordering.', logo_url: '', custom_faq: {} },
  { brand_slug: 'zomato-coupons', brand_name: 'Zomato', brand_description: 'Explore restaurants, read food reviews, order delicious meals online, and get great discounts with select dining out options.', logo_url: '', custom_faq: {} }
];

// Seed localStorage if empty
if (isUsingMock) {
  if (!localStorage.getItem('GrabCoupon_coupons')) {
    localStorage.setItem('GrabCoupon_coupons', JSON.stringify(INITIAL_COUPONS));
  }
  if (!localStorage.getItem('GrabCoupon_brands')) {
    localStorage.setItem('GrabCoupon_brands', JSON.stringify(INITIAL_BRANDS));
  }
  if (!localStorage.getItem('GrabCoupon_submissions')) {
    localStorage.setItem('GrabCoupon_submissions', JSON.stringify([]));
  }
  if (!localStorage.getItem('GrabCoupon_session')) {
    localStorage.setItem('GrabCoupon_session', null);
  }
}

// Database Services Wrapper
export const db = {
  // --- AUTH SERVICES ---
  async login(email, password) {
    if (!isUsingMock) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    } else {
      // Mock Admin Login (Accepts any email and password 'admin123' or 'password')
      if (email === 'admin@grabcoupon.com' && (password === 'admin123' || password === 'password')) {
        const session = { user: { email, id: 'admin-uid' }, access_token: 'mock-token' };
        localStorage.setItem('GrabCoupon_session', JSON.stringify(session));
        return session;
      } else {
        throw new Error('Invalid login credentials.');
      }
    }
  },

  async logout() {
    if (!isUsingMock) {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } else {
      localStorage.setItem('GrabCoupon_session', null);
    }
  },

  async getSession() {
    if (!isUsingMock) {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    } else {
      const session = localStorage.getItem('GrabCoupon_session');
      return session ? JSON.parse(session) : null;
    }
  },

  // --- COUPON SERVICES ---
  async getCoupons() {
    if (!isUsingMock) {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    } else {
      const coupons = JSON.parse(localStorage.getItem('GrabCoupon_coupons') || '[]');
      // Sort by created_at descending
      return coupons.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
  },

  async getActiveCoupons() {
    if (!isUsingMock) {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    } else {
      const coupons = await this.getCoupons();
      return coupons.filter(c => c.active === true);
    }
  },

  async getCouponsByBrand(brand) {
    if (!isUsingMock) {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .eq('brand', brand)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    } else {
      const coupons = await this.getCoupons();
      return coupons.filter(c => c.brand.toLowerCase() === brand.toLowerCase());
    }
  },

  async saveCoupon(couponData) {
    // 1. Process and format coupon code (Auto-uppercase and trim)
    let processedCode = couponData.coupon_code || '';
    processedCode = processedCode.trim().toUpperCase();

    const formattedCoupon = {
      ...couponData,
      coupon_code: processedCode,
    };

    // 2. Validate Expiry Date (Expiry date cannot be in the past when adding a new coupon)
    // Only check if it's a NEW coupon (no id, or id not in current list)
    const isNew = !couponData.id;
    const todayStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    if (isNew && formattedCoupon.expiry_date < todayStr) {
      throw new Error('Expiry date cannot be in the past for new coupons.');
    }

    if (!isUsingMock) {
      // Supabase insert/update
      // First, check duplicate in database for brand + coupon_code combo (except itself)
      if (formattedCoupon.coupon_code) {
        let query = supabase
          .from('coupons')
          .select('id')
          .eq('brand', formattedCoupon.brand)
          .eq('coupon_code', formattedCoupon.coupon_code);
        
        if (formattedCoupon.id) {
          query = query.neq('id', formattedCoupon.id);
        }
        
        const { data: duplicates, error: dupError } = await query;
        if (dupError) throw dupError;
        if (duplicates && duplicates.length > 0) {
          throw new Error(`A coupon with code "${formattedCoupon.coupon_code}" already exists for ${formattedCoupon.brand}.`);
        }
      }

      if (formattedCoupon.id) {
        const { data, error } = await supabase
          .from('coupons')
          .update({
            brand: formattedCoupon.brand,
            offer_title: formattedCoupon.offer_title,
            coupon_code: formattedCoupon.coupon_code,
            description: formattedCoupon.description,
            discount_type: formattedCoupon.discount_type,
            expiry_date: formattedCoupon.expiry_date,
            source_url: formattedCoupon.source_url,
            verified: formattedCoupon.verified,
            active: formattedCoupon.active
          })
          .eq('id', formattedCoupon.id)
          .select()
          .single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from('coupons')
          .insert([formattedCoupon])
          .select()
          .single();
        if (error) throw error;
        return data;
      }
    } else {
      // Mock Storage Save
      const coupons = JSON.parse(localStorage.getItem('GrabCoupon_coupons') || '[]');

      // Check duplicates in localStorage
      if (formattedCoupon.coupon_code) {
        const duplicate = coupons.find(c => 
          c.brand.toLowerCase() === formattedCoupon.brand.toLowerCase() && 
          c.coupon_code === formattedCoupon.coupon_code &&
          c.id !== formattedCoupon.id
        );
        if (duplicate) {
          throw new Error(`A coupon with code "${formattedCoupon.coupon_code}" already exists for ${formattedCoupon.brand}.`);
        }
      }

      if (formattedCoupon.id) {
        // Edit Mode
        const index = coupons.findIndex(c => c.id === formattedCoupon.id);
        if (index === -1) throw new Error('Coupon not found.');
        coupons[index] = {
          ...coupons[index],
          ...formattedCoupon,
        };
        localStorage.setItem('GrabCoupon_coupons', JSON.stringify(coupons));
        return coupons[index];
      } else {
        // Add Mode
        const newCoupon = {
          ...formattedCoupon,
          id: 'mock-' + Math.random().toString(36).substr(2, 9),
          created_at: new Date().toISOString()
        };
        coupons.push(newCoupon);
        localStorage.setItem('GrabCoupon_coupons', JSON.stringify(coupons));
        return newCoupon;
      }
    }
  },

  async deleteCoupon(id) {
    if (!isUsingMock) {
      const { error } = await supabase
        .from('coupons')
        .delete()
        .eq('id', id);
      if (error) throw error;
    } else {
      const coupons = JSON.parse(localStorage.getItem('GrabCoupon_coupons') || '[]');
      const filtered = coupons.filter(c => c.id !== id);
      localStorage.setItem('GrabCoupon_coupons', JSON.stringify(filtered));
    }
  },

  // --- CONTACT SERVICES ---
  async submitContact(name, email, message) {
    if (!name || !email || !message) {
      throw new Error('All contact form fields are required.');
    }

    const submission = {
      name,
      email,
      message,
      created_at: new Date().toISOString()
    };

    if (!isUsingMock) {
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([submission])
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      const submissions = JSON.parse(localStorage.getItem('GrabCoupon_submissions') || '[]');
      const newSubmission = {
        ...submission,
        id: 'sub-' + Math.random().toString(36).substr(2, 9)
      };
      submissions.push(newSubmission);
      localStorage.setItem('GrabCoupon_submissions', JSON.stringify(submissions));
      return newSubmission;
    }
  },

  // --- BRAND SERVICES ---
  async getBrands() {
    if (!isUsingMock) {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .order('brand_name', { ascending: true });
      if (error) throw error;
      return data;
    } else {
      return JSON.parse(localStorage.getItem('GrabCoupon_brands') || '[]');
    }
  },

  async getBrandBySlug(slug) {
    if (!isUsingMock) {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .eq('brand_slug', slug.toLowerCase())
        .single();
      if (error) throw error;
      return data;
    } else {
      const brands = JSON.parse(localStorage.getItem('GrabCoupon_brands') || '[]');
      const brand = brands.find(b => b.brand_slug.toLowerCase() === slug.toLowerCase());
      if (!brand) throw new Error('Brand not found.');
      return brand;
    }
  },

  async saveBrand(brandData) {
    if (!isUsingMock) {
      const { data, error } = await supabase
        .from('brands')
        .update({
          brand_description: brandData.brand_description,
          logo_url: brandData.logo_url,
          custom_faq: brandData.custom_faq
        })
        .eq('brand_slug', brandData.brand_slug)
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      const brands = JSON.parse(localStorage.getItem('GrabCoupon_brands') || '[]');
      const index = brands.findIndex(b => b.brand_slug.toLowerCase() === brandData.brand_slug.toLowerCase());
      if (index === -1) throw new Error('Brand not found.');
      brands[index] = {
        ...brands[index],
        brand_description: brandData.brand_description,
        logo_url: brandData.logo_url,
        custom_faq: brandData.custom_faq
      };
      localStorage.setItem('GrabCoupon_brands', JSON.stringify(brands));
      return brands[index];
    }
  }
};
