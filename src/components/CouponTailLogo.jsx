import React from 'react';

export function CouponTailIcon({ size = 24, className = '', style = {} }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      style={{ display: 'inline-block', ...style }}
    >
      {/* Sleek, stylized fox tail swoosh */}
      <path 
        d="M 4 20 C 8 20, 13 18, 17 13 C 21 8, 20.5 4.5, 17 3 C 14 1.7, 11.5 4, 10.5 7.5 C 9.5 11, 10.5 14, 13 16 C 15 17.5, 17.5 17, 19 15.5" 
        strokeWidth="2.1"
      />
      
      {/* Signature white-tip divider for the fox tail */}
      <path 
        d="M 15.2 3.8 C 16.2 4.8, 17.2 6.3, 17.2 7.8" 
        strokeWidth="1.5"
        strokeDasharray="2 2"
      />
      
      {/* Nested ticket/coupon badge inside the tail base with custom cutouts */}
      <path 
        d="M 5.5 11.2 h 5 a 0.75 0.75 0 0 1 0.75 0.75 v 0.5 a 0.75 0.75 0 0 0 0 1.5 v 0.5 a 0.75 0.75 0 0 1 -0.75 0.75 h -5 a 0.75 0.75 0 0 1 -0.75 -0.75 v -0.5 a 0.75 0.75 0 0 0 0 -1.5 v -0.5 a 0.75 0.75 0 0 1 0.75 -0.75 z"
        transform="rotate(-20 8 13)"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function CouponTailLogo({ size = 24, style = {}, textStyle = {} }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', ...style }}>
      <div style={{
        background: 'var(--accent)',
        padding: '0.45rem',
        borderRadius: '0.6rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.35)',
        color: '#fff'
      }}>
        <CouponTailIcon size={size} style={{ transform: 'rotate(-5deg)' }} />
      </div>
      <span style={{ 
        fontFamily: 'var(--font-headings)', 
        fontWeight: 800, 
        fontSize: '1.5rem', 
        color: 'var(--text-primary)',
        letterSpacing: '-0.02em',
        ...textStyle 
      }}>
        Coupon<span style={{ color: 'var(--accent)' }}>Tail</span>
      </span>
    </div>
  );
}
