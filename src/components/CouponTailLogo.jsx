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
      {/* Ticket Base Shape with perforated cutout */}
      <path d="M2 7a2 2 0 0 1 2-2h10a2 2 0 0 0 2 2 2 2 0 0 0 2-2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2a2 2 0 0 0-2-2 2 2 0 0 0-2 2H4a2 2 0 0 1-2-2V7z" />
      
      {/* Stylized animal tail swoosh curving from the right side */}
      <path d="M15 12c2.5 0 5-1.5 5-4.5s-2.5-4.5-4.5-2.5C13.5 7 12 10.5 11.5 12.5" strokeWidth="1.5" />
      
      {/* Perforation line */}
      <line x1="8" y1="9" x2="8" y2="15" strokeDasharray="2 2" />
    </svg>
  );
}

export function CouponTailLogo({ size = 24, style = {}, textStyle = {} }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', ...style }}>
      <div style={{
        background: 'var(--accent)',
        padding: '0.4rem',
        borderRadius: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 10px rgba(99, 102, 241, 0.3)',
        color: '#fff'
      }}>
        <CouponTailIcon size={size} style={{ transform: 'rotate(-5deg)' }} />
      </div>
      <span style={{ 
        fontFamily: 'var(--font-headings)', 
        fontWeight: 800, 
        fontSize: '1.5rem', 
        color: 'var(--text-primary)',
        ...textStyle 
      }}>
        Coupon<span style={{ color: 'var(--accent)' }}>Tail</span>
      </span>
    </div>
  );
}
