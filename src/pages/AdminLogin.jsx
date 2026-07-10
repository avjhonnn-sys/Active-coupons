import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { db, isUsingMock } from '../supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const session = await db.getSession();
      if (session) {
        navigate('/admin/dashboard');
      }
    };
    checkSession();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await db.login(email, password);
      // Wait a tiny bit for localStorage sync if mock
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 100);
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '70vh',
      paddingTop: '3rem'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '420px',
        width: '100%',
        padding: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        {/* Header Icon */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            background: 'var(--accent-glow)',
            color: 'var(--accent)',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem',
            border: '1px solid rgba(99, 102, 241, 0.2)'
          }}>
            <ShieldCheck size={28} />
          </div>
          <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '0.25rem' }}>Admin Portal</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Log in to manage CouponTail coupons
          </p>
        </div>

        {/* Mock Mode Alert */}
        {isUsingMock && (
          <div className="glass-panel" style={{
            background: 'rgba(245, 158, 11, 0.05)',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            padding: '0.75rem 1rem',
            fontSize: '0.8rem',
            color: 'var(--warning)',
            borderRadius: '0.5rem',
            lineHeight: '1.4'
          }}>
            <span style={{ fontWeight: 'bold' }}>Mock Mode active:</span> Use email <strong>admin@coupontail.com</strong> and password <strong>password</strong> or <strong>admin123</strong> to log in.
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: 'var(--error)',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-secondary)'
              }} />
              <input 
                id="email"
                type="email" 
                className="form-control"
                placeholder="admin@coupontail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-secondary)'
              }} />
              <input 
                id="password"
                type="password" 
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            {loading ? 'Logging in...' : 'Sign In'} <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
