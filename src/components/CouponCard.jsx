import React, { useState } from 'react';
import ReactGA from 'react-ga4';
import { Calendar, Copy, Check, ExternalLink, Award } from 'lucide-react';

const BRAND_COLORS = {
  Amazon: '#ff9900',
  Flipkart: '#2874f0',
  Myntra: '#ff3f6c',
  Ajio: '#2c3e50',
  Nike: '#ffffff', // Nike is white text/border on dark
  Adidas: '#0072bc',
  Samsung: '#2b57ff',
  Boat: '#ff0000',
  Swiggy: '#fc8019',
  Zomato: '#cb202d'
};

const BRAND_TEXT_COLORS = {
  Nike: '#111111',
  Amazon: '#111111'
};

export default function CouponCard({ coupon }) {
  const [copied, setCopied] = useState(false);
  const [particles, setParticles] = useState([]);

  const brandColor = BRAND_COLORS[coupon.brand] || 'var(--accent)';
  const isNoCode = !coupon.coupon_code || coupon.coupon_code.trim() === '';

  // Expiry Calculations
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(coupon.expiry_date);
  expiry.setHours(0, 0, 0, 0);
  const diffTime = expiry - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let expiryText = '';
  let expiryClass = '';

  if (diffDays < 0) {
    expiryText = 'Expired';
    expiryClass = 'expired';
  } else if (diffDays === 0) {
    expiryText = 'Expires Today';
    expiryClass = 'expiring-soon';
  } else if (diffDays === 1) {
    expiryText = 'Expires Tomorrow';
    expiryClass = 'expiring-soon';
  } else if (diffDays <= 3) {
    expiryText = `Expires in ${diffDays} days`;
    expiryClass = 'expiring-soon';
  } else {
    // Format date: e.g. Jul 31, 2026
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    expiryText = `Expires: ${expiry.toLocaleDateString('en-US', options)}`;
  }

  const triggerConfetti = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Create 5 particles radiating in different directions (as defined by CSS particleMove0-4 keyframes)
    const newParticles = Array.from({ length: 5 }).map((_, i) => ({
      id: Math.random(),
      style: {
        animation: `particleMove${i} 0.5s ease-out forwards`,
        backgroundColor: brandColor === '#ffffff' ? 'var(--accent)' : brandColor,
        left: '50%',
        top: '50%',
      }
    }));
    
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 550);
  };

  const handleAction = (e) => {
    if (!isNoCode) {
      navigator.clipboard.writeText(coupon.coupon_code);
      setCopied(true);
      triggerConfetti();
      
      if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
        ReactGA.event('copy_coupon_code', {
          brand_name: coupon.brand
        });
      }
      setTimeout(() => setCopied(false), 1500);
    }
    
    // Open source URL in a new tab after a tiny delay
    if (coupon.source_url) {
      setTimeout(() => {
        window.open(coupon.source_url, '_blank', 'noopener,noreferrer');
      }, 300);
    }
  };

  return (
    <div className="coupon-card" style={{ borderTop: `4px solid ${brandColor}` }}>
      {/* Top Section */}
      <div className="coupon-top">
        <div className="coupon-brand-header">
          <div className="brand-badge-container">
            <div className="brand-badge" style={{ 
              background: brandColor, 
              color: BRAND_TEXT_COLORS[coupon.brand] || '#fff',
              border: coupon.brand === 'Nike' ? '1px solid #333' : 'none'
            }}>
              {coupon.brand.charAt(0)}
            </div>
            <span className="brand-name">{coupon.brand}</span>
          </div>

          <div className="coupon-badge-group" style={{ display: 'flex', gap: '0.4rem' }}>
            <span className="badge badge-discount">{coupon.discount_type}</span>
            {coupon.verified && (
              <span className="badge badge-verified" style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
                <Award size={10} /> Verified
              </span>
            )}
          </div>
        </div>

        <h3 className="coupon-title">{coupon.offer_title}</h3>
        <p className="coupon-description">{coupon.description}</p>
      </div>

      {/* Ticket Tear Semicircle Area */}
      <hr className="coupon-divider" />

      {/* Bottom Section */}
      <div className="coupon-bottom">
        <div className="coupon-meta">
          <div className={`coupon-expiry ${expiryClass}`}>
            <Calendar size={14} />
            <span>{expiryText}</span>
          </div>
        </div>

        <div className="coupon-action-box">
          {isNoCode ? (
            <button onClick={handleAction} className="btn-no-code" style={{ background: brandColor, color: BRAND_TEXT_COLORS[coupon.brand] || '#fff' }}>
              Activate Offer <ExternalLink size={16} style={{ marginLeft: '0.4rem' }} />
            </button>
          ) : (
            <button 
              onClick={handleAction} 
              className={`btn-copy-code ${copied ? 'copied' : ''}`}
              style={{ position: 'relative', overflow: 'visible' }}
            >
              {/* Confetti particles */}
              {particles.map(p => (
                <div key={p.id} className="copy-particle" style={p.style} />
              ))}
              
              <span>{copied ? 'COPIED!' : coupon.coupon_code}</span>
              
              <span style={{ fontSize: '0.75rem', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                {copied ? <Check size={14} className="fade-in" style={{ color: 'var(--success)' }} /> : <Copy size={14} />}
                {copied ? '' : 'COPY'}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
