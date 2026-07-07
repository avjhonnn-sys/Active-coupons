import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Ticket, ChevronDown, ShieldCheck, Sun, Moon, Menu, X } from 'lucide-react';
import { BRANDS, isUsingMock, db } from '../supabase';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('grabcoupon_theme') || 'dark');
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const session = await db.getSession();
      setIsAdmin(!!session);
    };
    checkSession();

    // Check periodically or use storage event
    const interval = setInterval(checkSession, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [theme]);

  const handleLogout = async () => {
    try {
      await db.logout();
      setIsAdmin(false);
      setMenuOpen(false);
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err.message);
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('grabcoupon_theme', nextTheme);
  };

  return (
    <nav className="glass-panel" style={{
      borderRadius: '0 0 1rem 1rem',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      padding: '1rem 0'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative'
      }}>
        {/* Logo */}
        <Link to="/" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.5rem', color: 'var(--text-primary)' }}>
          <div style={{
            background: 'var(--accent)',
            padding: '0.4rem',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(99, 102, 241, 0.3)'
          }}>
            <Ticket size={24} style={{ transform: 'rotate(-10deg)', color: '#fff' }} />
          </div>
          <span style={{ fontFamily: 'var(--font-headings)' }}>
            Grab<span style={{ color: 'var(--accent)' }}>Coupon</span>
          </span>
        </Link>

        {/* Links & Menu Items Container */}
        <div className={`nav-links-container ${menuOpen ? 'open' : ''}`}>
          
          {/* Brands Dropdown */}
          <div className="nav-dropdown-wrapper" style={{ position: 'relative' }}>
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                cursor: 'pointer',
                width: '100%',
                justifyContent: 'space-between'
              }}
            >
              <span>Brands</span> 
              <ChevronDown size={16} style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>

            {dropdownOpen && (
              <div className="glass-panel nav-dropdown-menu" style={{
                position: 'absolute',
                top: 'calc(100% + 0.75rem)',
                right: 0,
                width: '180px',
                background: 'var(--bg-secondary)',
                padding: '0.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                boxShadow: '0 15px 30px rgba(0,0,0,0.6)',
                zIndex: 100
              }}>
                {BRANDS.map(brand => (
                  <Link 
                    key={brand} 
                    to={`/brand/${brand.toLowerCase()}-coupons`}
                    onClick={() => { setDropdownOpen(false); setMenuOpen(false); }}
                    style={{
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.35rem',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: 'var(--text-secondary)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = 'var(--text-primary)';
                      e.target.style.background = 'rgba(255,255,255,0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = 'var(--text-secondary)';
                      e.target.style.background = 'none';
                    }}
                  >
                    {brand}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'var(--accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Admin Navigation (Only visible when logged in) */}
          {isAdmin && (
            <div className="nav-admin-group" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link to="/admin/dashboard" onClick={() => setMenuOpen(false)} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                <ShieldCheck size={16} /> Dashboard
              </Link>
              <button onClick={handleLogout} className="btn btn-danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                Logout
              </button>
            </div>
          )}

          {/* Mode Indicator */}
          <span 
            className="badge" 
            style={{ 
              fontSize: '0.65rem', 
              background: isUsingMock ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)', 
              color: isUsingMock ? 'var(--warning)' : 'var(--success)',
              border: `1px solid ${isUsingMock ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`,
              alignSelf: 'center'
            }}
          >
            {isUsingMock ? 'Mock Storage' : 'Supabase Live'}
          </span>
        </div>

        {/* Hamburger Menu Toggle Button (visible on mobile) */}
        <button 
          className="hamburger-btn" 
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '0.5rem',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '0.35rem',
            border: '1px solid var(--border)'
          }}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </nav>
  );
}
