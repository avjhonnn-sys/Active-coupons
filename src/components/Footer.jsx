import React from 'react';
import { Link } from 'react-router-dom';
import { CouponTailLogo } from './CouponTailLogo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-panel" style={{
      borderRadius: '1rem 1rem 0 0',
      borderBottom: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      padding: '3rem 0 2rem 0',
      marginTop: 'auto',
      background: 'var(--bg-secondary)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2.5rem',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid var(--border)'
        }}>
          {/* Brand Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <CouponTailLogo size={18} style={{ marginBottom: '1rem' }} textStyle={{ fontSize: '1.25rem' }} />
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.6' }}>
              Your premier destination for verified discount codes, coupons, and promo codes from top brands. Shop smart, save more.
            </p>
          </div>

          {/* Quick Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ color: '#fff', fontSize: '1rem', fontFamily: 'var(--font-headings)' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
              <Link to="/about" style={{ color: 'var(--text-secondary)' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>About Us</Link>
              <Link to="/contact" style={{ color: 'var(--text-secondary)' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Contact Us</Link>
            </div>
          </div>

          {/* Legal Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ color: '#fff', fontSize: '1rem', fontFamily: 'var(--font-headings)' }}>Legal & Policies</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
              <Link to="/terms" style={{ color: 'var(--text-secondary)' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Terms & Conditions</Link>
              <Link to="/privacy" style={{ color: 'var(--text-secondary)' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Privacy Policy</Link>
              <Link to="/cookies" style={{ color: 'var(--text-secondary)' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Cookie Policy</Link>
              <Link to="/disclaimer" style={{ color: 'var(--text-secondary)' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Disclaimer</Link>
            </div>
          </div>
        </div>

        {/* Bottom Area */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '2rem',
          fontSize: '0.8rem',
          color: 'var(--text-secondary)',
          gap: '1rem'
        }}>
          <span>&copy; {currentYear} CouponTail. All rights reserved. Independently run.</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            Created with passion to help you save money.
          </span>
        </div>
      </div>
    </footer>
  );
}
