import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Calendar, Tag, AlertTriangle, HelpCircle, ChevronDown } from 'lucide-react';
import { db, BRANDS } from '../supabase';
import CouponCard from '../components/CouponCard';

const BRAND_COLORS = {
  Amazon: '#ff9900',
  Flipkart: '#2874f0',
  Myntra: '#ff3f6c',
  Ajio: '#2c3e50',
  Nike: '#111111',
  Adidas: '#0072bc',
  Samsung: '#2b57ff',
  Boat: '#ff0000',
  Swiggy: '#fc8019',
  Zomato: '#cb202d'
};

const BRAND_DESCRIPTIONS = {
  Amazon: 'Shop online for millions of products across electronics, fashion, home essentials, books, groceries, and more with fast delivery.',
  Flipkart: 'Explore India\'s top online shopping destination for mobile phones, electronics, fashion apparel, appliances, and home furniture.',
  Myntra: 'Discover the latest trends in fashion, lifestyle, and beauty products. Shop online for clothing, footwear, accessories, and cosmetics.',
  Ajio: 'Your ultimate fashion portal featuring handpicked trendsetting styles, international apparel brands, and exclusive indie collections.',
  Nike: 'Gear up with the best in athletic apparel, training gear, and world-class footwear technology for running, basketball, and training.',
  Adidas: 'Unleash your potential with premium sporting goods, retro street-style apparel, sneakers, and training shoes with iconic three stripes.',
  Samsung: 'Upgrade your tech with innovative smartphones, televisions, home appliances, wearable smartwatches, and computing devices.',
  Boat: 'Elevate your listening experience with stylish, durable, and high-performance audio wear: wireless earbuds, headphones, and speakers.',
  Swiggy: 'Satisfy your hunger with lightning-fast food delivery, or get groceries delivered in minutes via Instamart. Seamless online ordering.',
  Zomato: 'Explore restaurants, read food reviews, order delicious meals online, and get great discounts with select dining out options.'
};

const getFaqDefaults = (brandName) => ({
  how_to_use: `Copy the coupon code from ActiveCoupons, go to the ${brandName} website or app, add your items to the cart, paste the code in the promo/coupon box during checkout, and click apply.`,
  not_working: `Coupon codes can fail because they have expired, are restricted to specific items, require a minimum spending threshold, or are only valid for first-time customers. Double check the terms on our page.`,
  verified: `Yes! We manually check and verify our coupon codes. Look for the green "Verified" badge on the coupon cards which indicates our editors have verified this code recently.`,
  frequency: `We update our website daily with active promo codes. Keep checking back regularly to get the latest ${brandName} savings.`,
  affiliation: `No, ActiveCoupons is an independent coupon site. We are not officially affiliated with, endorsed by, or partnered with ${brandName}. All trademarks belong to their respective owners.`
});

// FAQ Accordion Row Component
function FaqRow({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="glass-panel" style={{
      marginBottom: '0.75rem',
      overflow: 'hidden',
      transition: 'all 0.22s ease',
      border: '1px solid var(--border)',
      background: isOpen ? 'rgba(255,255,255,0.03)' : 'var(--bg-secondary)'
    }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 1.25rem',
          cursor: 'pointer',
          color: 'var(--text-primary)',
          textAlign: 'left',
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          fontSize: '0.9rem'
        }}
      >
        <span>{question}</span>
        <ChevronDown size={16} style={{
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
          transition: 'transform 0.2s ease',
          color: 'var(--accent)',
          flexShrink: 0
        }} />
      </button>
      <div style={{
        maxHeight: isOpen ? '250px' : '0',
        opacity: isOpen ? 1 : 0,
        transition: 'max-height 0.28s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease-out, padding 0.28s ease',
        overflow: 'hidden',
        padding: isOpen ? '0 1.25rem 1.25rem 1.25rem' : '0 1.25rem',
        borderTop: isOpen ? '1px solid rgba(255, 255, 255, 0.02)' : '1px solid transparent',
        color: 'var(--text-secondary)',
        fontSize: '0.85rem',
        lineHeight: '1.6'
      }}>
        {answer}
      </div>
    </div>
  );
}

export default function BrandDetail() {
  const { brandName } = useParams();
  const navigate = useNavigate();
  
  // 301 Redirect old /brand/[slug] -> /brand/[slug]-coupons
  useEffect(() => {
    if (brandName && !brandName.endsWith('-coupons')) {
      navigate(`/brand/${brandName}-coupons`, { replace: true });
    }
  }, [brandName, navigate]);

  // Format param: strip '-coupons' suffix before searching BRANDS array
  const cleanBrandSlug = brandName ? brandName.replace(/-coupons$/, '') : '';
  const formattedBrand = BRANDS.find(
    b => b.toLowerCase() === cleanBrandSlug.toLowerCase()
  );

  const [coupons, setCoupons] = useState([]);
  const [brandData, setBrandData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamic SEO Titles and Meta Description tag
  useEffect(() => {
    if (formattedBrand) {
      document.title = `${formattedBrand} Coupons & Promo Codes - Verified Deals | ActiveCoupons`;
      
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', `Get the latest verified ${formattedBrand} coupons, promo codes, and discount offers. Shop and save today with ActiveCoupons.`);
    }
  }, [formattedBrand]);

  useEffect(() => {
    if (!formattedBrand) return;

    const fetchBrandData = async () => {
      try {
        const fullSlug = `${formattedBrand.toLowerCase()}-coupons`;
        const data = await db.getBrandBySlug(fullSlug);
        setBrandData(data);
      } catch (err) {
        console.error('Error fetching brand details:', err.message);
      }
    };

    const fetchBrandCoupons = async () => {
      try {
        setLoading(true);
        const brandCoupons = await db.getCouponsByBrand(formattedBrand);
        const activeCoupons = brandCoupons.filter(c => c.active === true);
        setCoupons(activeCoupons);
      } catch (err) {
        console.error('Error fetching brand coupons:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBrandData();
    fetchBrandCoupons();
  }, [formattedBrand]);

  if (!formattedBrand) {
    return (
      <div className="container" style={{ paddingTop: '5rem', textAlign: 'center' }}>
        <div className="glass-panel" style={{
          padding: '4rem 2rem',
          maxWidth: '500px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem'
        }}>
          <AlertTriangle size={48} style={{ color: 'var(--warning)' }} />
          <h2 style={{ color: '#fff', fontSize: '1.5rem' }}>Brand Not Found</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            We don\'t currently support the brand "{brandName}". We only list coupons for our 10 official partner stores.
          </p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
            <ArrowLeft size={16} /> Back to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const brandColor = BRAND_COLORS[formattedBrand] || 'var(--accent)';
  const brandDescription = brandData?.brand_description || BRAND_DESCRIPTIONS[formattedBrand] || 'Browse active coupons, deals, and promo codes.';

  const filteredCoupons = coupons.filter(coupon => {
    return (
      coupon.offer_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (coupon.coupon_code && coupon.coupon_code.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  // FAQ Compilation
  const faqOverrides = brandData?.custom_faq || {};
  const faqDefaults = getFaqDefaults(formattedBrand);
  const faqsList = [
    {
      q: `How do I use a ${formattedBrand} coupon code?`,
      a: faqOverrides.how_to_use || faqDefaults.how_to_use
    },
    {
      q: `Why isn't my coupon code working?`,
      a: faqOverrides.not_working || faqDefaults.not_working
    },
    {
      q: `Are these coupons verified?`,
      a: faqOverrides.verified || faqDefaults.verified
    },
    {
      q: `How often are new ${formattedBrand} coupons added?`,
      a: faqOverrides.frequency || faqDefaults.frequency
    },
    {
      q: `Is ActiveCoupons officially affiliated with ${formattedBrand}?`,
      a: faqOverrides.affiliation || faqDefaults.affiliation
    }
  ];

  return (
    <div className="container" style={{ paddingTop: '3rem' }}>
      {/* Back Button */}
      <Link to="/" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.9rem',
        color: 'var(--text-secondary)',
        marginBottom: '2rem',
        fontWeight: 600
      }}
      onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
      onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
      >
        <ArrowLeft size={16} /> Back to All Brands
      </Link>

      {/* Brand Hero Card */}
      <header className="glass-panel" style={{
        padding: '2rem',
        borderTop: `4px solid ${brandColor}`,
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1.5rem',
        alignItems: 'center',
        marginBottom: '2.5rem'
      }}>
        {/* Brand Circular Logo Icon */}
        <div style={{
          background: brandColor,
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: '1.75rem',
          color: formattedBrand === 'Nike' ? '#111' : '#fff',
          boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
          border: formattedBrand === 'Nike' ? '1px solid #333' : 'none'
        }}>
          {formattedBrand.charAt(0)}
        </div>

        {/* Brand Meta */}
        <div style={{ flexGrow: 1, minWidth: '260px', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <h1 style={{ fontSize: '1.75rem', color: 'var(--text-primary)' }}>{formattedBrand} Coupons</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5', maxWidth: '750px' }}>
            Get the latest active discount codes, offers, and free shipping deals.
          </p>
        </div>
      </header>

      {/* Content Layout Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        
        {/* SECTION 1: ABOUT BRAND SECTION */}
        <section className="glass-panel" style={{
          padding: '1.5rem',
          background: 'rgba(255,255,255,0.01)',
          border: '1px solid var(--border)'
        }}>
          <h2 style={{ 
            fontSize: '1.15rem', 
            color: 'var(--text-primary)', 
            marginBottom: '0.75rem', 
            fontFamily: 'var(--font-headings)',
            fontWeight: 600
          }}>
            About {formattedBrand}
          </h2>
          <p style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '0.875rem', 
            lineHeight: '1.6',
            maxWidth: '900px'
          }}>
            {brandDescription}
          </p>
        </section>

        {/* Section Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: 0 }} />

        {/* SECTION 2: ACTIVE COUPONS SECTION */}
        <section>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            gap: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <h2 style={{ 
              fontSize: '1.25rem', 
              color: 'var(--text-primary)', 
              fontFamily: 'var(--font-headings)',
              fontWeight: 600
            }}>
              Latest {formattedBrand} Coupons & Offers ({filteredCoupons.length})
            </h2>
            
            {/* Search within brand */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '280px' }}>
              <Search size={16} style={{
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-secondary)'
              }} />
              <input 
                type="text" 
                placeholder={`Search ${formattedBrand} codes...`}
                className="form-control"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '2.25rem', paddingY: '0.4rem', fontSize: '0.85rem' }}
              />
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
              Loading coupons...
            </div>
          ) : filteredCoupons.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '2rem'
            }}>
              {filteredCoupons.map((coupon, index) => (
                <div 
                  key={coupon.id} 
                  className="coupon-entrance-card"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CouponCard coupon={coupon} />
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel" style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              color: 'var(--text-secondary)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <Tag size={40} style={{ color: 'var(--border)' }} />
              <h3 style={{ color: 'var(--text-primary)', fontSize: '1.15rem' }}>No Active Offers Available</h3>
              <p style={{ maxWidth: '380px', fontSize: '0.875rem' }}>
                We don\'t have any active discount offers for {formattedBrand} matching your filter right now. Check back soon!
              </p>
            </div>
          )}
        </section>

        {/* Section Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: 0 }} />

        {/* SECTION 3: WHAT IS A COUPON CODE + FAQ SECTION */}
        <section style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
          
          {/* Explainer Block */}
          <div style={{ maxWidth: '850px' }}>
            <h2 style={{ 
              fontSize: '1.15rem', 
              color: 'var(--text-primary)', 
              marginBottom: '0.75rem', 
              fontFamily: 'var(--font-headings)',
              fontWeight: 600
            }}>
              How to Use {formattedBrand} Coupons
            </h2>
            <p style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '0.875rem', 
              lineHeight: '1.6'
            }}>
              A coupon code is an alphanumeric string offered by retailers to give shoppers instant savings at checkout. 
              To redeem one of our {formattedBrand} deals, simply click the copy code button on the card. ActiveCoupons will copy 
              the discount code to your clipboard and open the official {formattedBrand} store in a new tab. Paste the copied code into 
              the promotional field on the payment step to apply the discount. For no-code deals, click 'Activate Offer' to go directly 
              to the promotional landing page where the discount will already be applied.
            </p>
          </div>

          {/* Accordion FAQ Grid */}
          <div style={{ maxWidth: '850px' }}>
            <h3 style={{ 
              fontSize: '1.1rem', 
              color: 'var(--text-primary)', 
              marginBottom: '1rem', 
              fontFamily: 'var(--font-headings)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <HelpCircle size={18} style={{ color: 'var(--accent)' }} />
              Frequently Asked Questions (FAQs)
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {faqsList.map((faq, index) => (
                <FaqRow 
                  key={index}
                  question={faq.q}
                  answer={faq.a}
                />
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
