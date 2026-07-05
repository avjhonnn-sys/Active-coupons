import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Tag, RefreshCw } from 'lucide-react';
import { db, BRANDS } from '../supabase';
import CouponCard from '../components/CouponCard';
import CountUp from '../components/CountUp';

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

export default function Home() {
  const [coupons, setCoupons] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiscountType, setSelectedDiscountType] = useState('All');

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        setLoading(true);
        const activeCoupons = await db.getActiveCoupons();
        setCoupons(activeCoupons);

        // Get 5 most recently added active coupons
        const sorted = [...activeCoupons].sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        setTrending(sorted.slice(0, 5));

      } catch (err) {
        console.error('Error fetching coupons:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCoupons();
  }, []);

  // Filter logic
  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch = 
      coupon.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.offer_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (coupon.coupon_code && coupon.coupon_code.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = 
      selectedDiscountType === 'All' || 
      coupon.discount_type === selectedDiscountType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="container" style={{ paddingTop: '3rem' }}>
      
      {/* Hero Section */}
      <header style={{
        textAlign: 'center',
        marginBottom: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <h1 className="glow-text" style={{
          fontSize: 'clamp(2rem, 8vw, 3.5rem)',
          lineHeight: '1.1',
          background: 'linear-gradient(to right, #fff, var(--text-secondary), var(--accent))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>
          Real Deals. Real Savings. Every Day.
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: 'clamp(1rem, 4vw, 1.25rem)',
          maxWidth: '600px',
          lineHeight: '1.6'
        }}>
          Search verified coupon codes and discount offers from the stores you already love to shop.
        </p>
      </header>

      {/* Trending Horizontal Ticker Strip */}
      {trending.length > 0 && (
        <section style={{ marginBottom: '3rem' }}>
          <div className="ticker-wrap">
            <div className="ticker">
              {/* Duplicate the array items to create a seamless infinite scroll loop */}
              {[...trending, ...trending].map((item, index) => (
                <span key={`${item.id}-${index}`} className="ticker-item">
                  🔥 <strong>{item.brand}</strong>: {item.offer_title} {item.coupon_code ? `[Code: ${item.coupon_code}]` : 'Offer'} just added ·
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Brand Badge Quick Links Grid */}
      <section style={{ marginBottom: '4.5rem' }}>
        <h2 style={{
          fontSize: '1.4rem',
          color: 'var(--text-primary)',
          marginBottom: '1.5rem',
          textAlign: 'center',
          fontFamily: 'var(--font-headings)'
        }}>
          Shop by Featured Brands
        </h2>
        <div 
          className="brand-badge-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
            gap: '1.5rem',
            justifyContent: 'center'
          }}
        >
          {BRANDS.map(brand => {
            const color = BRAND_COLORS[brand] || 'var(--accent)';
            const activeCount = coupons.filter(
              c => c.brand.toLowerCase() === brand.toLowerCase()
            ).length;

            return (
              <Link 
                key={brand}
                to={`/brand/${brand.toLowerCase()}-coupons`}
                className="glass-panel brand-card-link"
                style={{
                  borderTop: `3px solid ${color}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '1.25rem 0.5rem',
                  gap: '0.6rem',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}
              >
                <div 
                  className="brand-card-logo"
                  style={{
                    background: color,
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '1.2rem',
                    color: brand === 'Nike' ? '#111' : '#fff'
                  }}
                >
                  {brand.charAt(0)}
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{brand}</span>
                
                {/* Active Coupon Count Badge (count animated on initial load) */}
                <span style={{
                  fontSize: '0.72rem',
                  color: 'var(--text-secondary)',
                  background: 'rgba(255, 255, 255, 0.04)',
                  padding: '0.15rem 0.55rem',
                  borderRadius: '1rem',
                  marginTop: '0.1rem',
                  border: '1px solid var(--border)'
                }}>
                  <CountUp end={activeCount} /> Offers
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="glass-panel" style={{
        padding: '1.5rem',
        marginBottom: '3rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1.5rem',
        alignItems: 'center'
      }}>
        {/* Search */}
        <div style={{ position: 'relative', flexGrow: 1, minWidth: '260px' }}>
          <Search size={18} style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-secondary)'
          }} />
          <input 
            type="text" 
            placeholder="Search stores, offers, codes..."
            className="form-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '2.75rem' }}
          />
        </div>

        {/* Filter Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: '220px' }}>
          <Filter size={18} style={{ color: 'var(--text-secondary)' }} />
          <select 
            className="form-control"
            value={selectedDiscountType}
            onChange={(e) => setSelectedDiscountType(e.target.value)}
          >
            <option value="All">All Discount Types</option>
            <option value="Percentage">Percentage</option>
            <option value="Flat Amount">Flat Amount</option>
            <option value="Cashback">Cashback</option>
            <option value="Free Shipping">Free Shipping</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </section>

      {/* Coupons Content */}
      <main>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <RefreshCw size={24} className="spin" style={{ animation: 'spin 1.5s linear infinite' }} />
            <span>Loading epic deals...</span>
          </div>
        ) : filteredCoupons.length > 0 ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontFamily: 'var(--font-headings)' }}>
                Active Coupon Codes & Deals ({filteredCoupons.length})
              </h2>
            </div>
            <div 
              className="coupons-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '2rem'
              }}
            >
              {filteredCoupons.map(coupon => (
                <CouponCard key={coupon.id} coupon={coupon} />
              ))}
            </div>
          </div>
        ) : (
          <div className="glass-panel" style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: 'var(--text-secondary)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <Tag size={48} style={{ color: 'var(--border)', marginBottom: '0.5rem' }} />
            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.25rem' }}>No Coupons Found</h3>
            <p style={{ maxWidth: '400px', fontSize: '0.9rem' }}>
              We couldn't find any active coupons matching your search criteria. Try adjusting your search query or discount filters!
            </p>
            <button 
              className="btn btn-secondary" 
              onClick={() => {
                setSearchQuery('');
                setSelectedDiscountType('All');
              }}
              style={{ marginTop: '0.5rem' }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Custom inline keyframes style for spinner */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
