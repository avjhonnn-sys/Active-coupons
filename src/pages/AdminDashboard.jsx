import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit, 
  Calendar, 
  Tag, 
  Layers, 
  Search, 
  LogOut, 
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { db } from '../supabase';
import CouponFormModal from './CouponFormModal';
import BrandFormModal from './BrandFormModal';

export default function AdminDashboard() {
  const [coupons, setCoupons] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('coupons'); // 'coupons' or 'brands'
  
  // Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [brandSearchQuery, setBrandSearchQuery] = useState('');
  
  // Notification states
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [couponToEdit, setCouponToEdit] = useState(null);
  
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [brandToEdit, setBrandToEdit] = useState(null);

  const navigate = useNavigate();

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const data = await db.getCoupons();
      setCoupons(data);
    } catch (err) {
      setError('Failed to fetch coupons: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchBrands = async () => {
    try {
      const data = await db.getBrands();
      setBrands(data);
    } catch (err) {
      console.error('Failed to fetch brands:', err.message);
    }
  };

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const session = await db.getSession();
      if (!session) {
        navigate('/admin');
        return;
      }
      fetchCoupons();
      fetchBrands();
    };
    checkAuthAndFetch();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await db.logout();
      navigate('/admin');
    } catch (err) {
      setError('Logout failed: ' + err.message);
    }
  };

  // Delete Action
  const handleDelete = async (id, brand, title) => {
    if (window.confirm(`Are you sure you want to delete the coupon "${title}" for brand "${brand}"?`)) {
      try {
        setError('');
        setSuccessMsg('');
        await db.deleteCoupon(id);
        setSuccessMsg('Coupon deleted successfully!');
        fetchCoupons();
        setTimeout(() => setSuccessMsg(''), 4000);
      } catch (err) {
        setError('Failed to delete coupon: ' + err.message);
      }
    }
  };

  // Open Add Modal
  const handleOpenAddModal = () => {
    setCouponToEdit(null);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (coupon) => {
    setCouponToEdit(coupon);
    setIsModalOpen(true);
  };

  // Form Save Success Handler
  const handleSaveCoupon = async (couponData) => {
    try {
      setError('');
      setSuccessMsg('');
      await db.saveCoupon(couponData);
      
      setSuccessMsg(couponData.id ? 'Coupon updated successfully!' : 'New coupon added successfully!');
      setIsModalOpen(false);
      fetchCoupons();
      
      // Auto-clear success message after 4s
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      throw err;
    }
  };

  // Brand Form Save Success Handler
  const handleSaveBrand = async (brandData) => {
    try {
      setError('');
      setSuccessMsg('');
      await db.saveBrand(brandData);
      
      setSuccessMsg('Brand settings updated successfully!');
      setIsBrandModalOpen(false);
      fetchBrands();
      
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      throw err;
    }
  };

  // Stats calculations
  const totalActiveCoupons = coupons.filter(c => c.active === true).length;
  const totalBrands = brands.length;

  const countExpiringSoon = coupons.filter(c => {
    if (!c.active) return false;
    const expiry = new Date(c.expiry_date);
    expiry.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 3;
  }).length;

  // Search filter - Coupons
  const filteredCoupons = coupons.filter(c => {
    return (
      c.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.offer_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.coupon_code && c.coupon_code.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  // Search filter - Brands
  const filteredBrands = brands.filter(b => {
    return b.brand_name.toLowerCase().includes(brandSearchQuery.toLowerCase());
  });

  return (
    <div className="container" style={{ paddingTop: '3rem' }}>
      
      {/* Dashboard Top Title Bar */}
      <header style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2.5rem',
        gap: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            background: 'var(--accent-glow)',
            color: 'var(--accent)',
            padding: '0.5rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(99, 102, 241, 0.2)'
          }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.75rem', color: 'var(--text-primary)' }}>Admin Dashboard</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              Manage CouponTail live brand coupons and deals
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleOpenAddModal} className="btn btn-primary">
            <Plus size={16} /> Add New Coupon
          </button>
          <button onClick={handleLogout} className="btn btn-secondary">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      {/* Success & Error Banners */}
      {successMsg && (
        <div className="glass-panel" style={{
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          color: 'var(--success)',
          padding: '1rem',
          borderRadius: '0.75rem',
          marginBottom: '2rem',
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <CheckCircle size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="glass-panel" style={{
          background: 'rgba(239, 68, 68, 0.08)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: 'var(--error)',
          padding: '1rem',
          borderRadius: '0.75rem',
          marginBottom: '2rem',
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Stats Cards Grid */}
      <section className="stats-grid">
        {/* Stat: Total Active */}
        <div className="glass-panel stat-card stat-card-glow">
          <span className="stat-card-value">{totalActiveCoupons}</span>
          <span className="stat-card-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Tag size={14} /> Total Active Coupons
          </span>
        </div>

        {/* Stat: Expiring 3 Days */}
        <div className="glass-panel stat-card" style={{ overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'var(--warning)' }}></div>
          <span className="stat-card-value">{countExpiringSoon}</span>
          <span className="stat-card-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Calendar size={14} /> Expiring in 3 Days
          </span>
        </div>

        {/* Stat: Total Brands */}
        <div className="glass-panel stat-card" style={{ overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'var(--accent)' }}></div>
          <span className="stat-card-value">{totalBrands}</span>
          <span className="stat-card-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Layers size={14} /> Total Unique Brands
          </span>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border)', marginBottom: '1.5rem' }}>
        <button 
          onClick={() => setActiveTab('coupons')}
          style={{
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'coupons' ? '2px solid var(--accent)' : '2px solid transparent',
            color: activeTab === 'coupons' ? 'var(--text-primary)' : 'var(--text-secondary)',
            fontWeight: 600,
            padding: '0.75rem 1rem',
            cursor: 'pointer',
            fontSize: '0.95rem',
            transition: 'all 0.2s ease'
          }}
        >
          Manage Coupons
        </button>
        <button 
          onClick={() => setActiveTab('brands')}
          style={{
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'brands' ? '2px solid var(--accent)' : '2px solid transparent',
            color: activeTab === 'brands' ? 'var(--text-primary)' : 'var(--text-secondary)',
            fontWeight: 600,
            padding: '0.75rem 1rem',
            cursor: 'pointer',
            fontSize: '0.95rem',
            transition: 'all 0.2s ease'
          }}
        >
          Manage Brands
        </button>
      </div>

      {/* Search Filter and Table list */}
      <section className="glass-panel" style={{ padding: '1.5rem' }}>
        
        {/* Tab 1: Coupons Management */}
        {activeTab === 'coupons' && (
          <div>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', fontFamily: 'var(--font-headings)' }}>All Coupons Listing</h3>
              
              {/* Table Search Input */}
              <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
                <Search size={16} style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-secondary)'
                }} />
                <input 
                  type="text" 
                  placeholder="Search by brand, title, code..."
                  className="form-control"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ paddingLeft: '2.25rem', paddingY: '0.5rem', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                Loading coupons database...
              </div>
            ) : filteredCoupons.length > 0 ? (
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Brand</th>
                      <th>Offer Title</th>
                      <th>Code</th>
                      <th>Type</th>
                      <th>Expiry Date</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCoupons.map((c) => {
                      const today = new Date();
                      today.setHours(0,0,0,0);
                      const expiry = new Date(c.expiry_date);
                      expiry.setHours(0,0,0,0);
                      const isExpired = expiry < today;
                      const isActive = c.active && !isExpired;

                      return (
                        <tr key={c.id}>
                          <td style={{ fontWeight: 600 }}>{c.brand}</td>
                          <td>{c.offer_title}</td>
                          <td>
                            {c.coupon_code ? (
                              <code style={{
                                background: 'rgba(255,255,255,0.06)',
                                padding: '0.2rem 0.4rem',
                                borderRadius: '0.25rem',
                                border: '1px solid var(--border)',
                                fontFamily: 'monospace',
                                color: 'var(--text-primary)',
                                fontSize: '0.85rem'
                              }}>{c.coupon_code}</code>
                            ) : (
                              <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '0.8rem' }}>No-code Deal</span>
                            )}
                          </td>
                          <td>
                            <span className="badge badge-discount" style={{ fontSize: '0.7rem' }}>{c.discount_type}</span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem' }}>
                              <Calendar size={14} style={{ color: 'var(--text-secondary)' }} />
                              <span>{c.expiry_date}</span>
                            </div>
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                              <span style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: isActive ? 'var(--success)' : 'var(--error)',
                                boxShadow: `0 0 8px ${isActive ? 'var(--success)' : 'var(--error)'}`
                              }}></span>
                              <span style={{ fontSize: '0.8rem', fontWeight: 500, color: isActive ? 'var(--success)' : 'var(--text-secondary)' }}>
                                {isActive ? 'Active' : isExpired ? 'Expired' : 'Inactive'}
                              </span>
                            </div>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                              <button 
                                onClick={() => handleOpenEditModal(c)}
                                className="btn btn-secondary"
                                style={{ padding: '0.35rem', borderRadius: '0.35rem' }}
                                title="Edit Coupon"
                              >
                                <Edit size={14} />
                              </button>
                              <button 
                                onClick={() => handleDelete(c.id, c.brand, c.offer_title)}
                                className="btn btn-danger"
                                style={{ padding: '0.35rem', borderRadius: '0.35rem' }}
                                title="Delete Coupon"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                No coupons found matching your search.
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Brands Management */}
        {activeTab === 'brands' && (
          <div>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', fontFamily: 'var(--font-headings)' }}>All Brands Listing</h3>
              
              <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
                <Search size={16} style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-secondary)'
                }} />
                <input 
                  type="text" 
                  placeholder="Search by brand name..."
                  className="form-control"
                  value={brandSearchQuery}
                  onChange={(e) => setBrandSearchQuery(e.target.value)}
                  style={{ paddingLeft: '2.25rem', paddingY: '0.5rem', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            {filteredBrands.length > 0 ? (
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: '150px' }}>Brand Name</th>
                      <th style={{ width: '120px' }}>Slug</th>
                      <th>Description</th>
                      <th style={{ width: '180px' }}>FAQ Overrides</th>
                      <th style={{ width: '100px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBrands.map((b) => {
                      const overrideCount = Object.keys(b.custom_faq || {}).filter(
                        k => b.custom_faq[k] && b.custom_faq[k].trim()
                      ).length;
                      
                      return (
                        <tr key={b.brand_slug}>
                          <td style={{ fontWeight: 600 }}>{b.brand_name}</td>
                          <td><code>{b.brand_slug}</code></td>
                          <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                            {b.brand_description && b.brand_description.length > 120 
                              ? b.brand_description.substring(0, 120) + '...' 
                              : b.brand_description || 'No description set.'}
                          </td>
                          <td>
                            <span className="badge badge-discount" style={{ fontSize: '0.7rem' }}>
                              {overrideCount} / 5 Overridden
                            </span>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <button 
                              onClick={() => { setBrandToEdit(b); setIsBrandModalOpen(true); }}
                              className="btn btn-secondary"
                              style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                            >
                              <Edit size={14} style={{ marginRight: '0.2rem' }} /> Edit
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                No brands found matching your search.
              </div>
            )}
          </div>
        )}

      </section>

      {/* Coupon Modal Form overlay */}
      <CouponFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCoupon}
        couponToEdit={couponToEdit}
      />

      {/* Brand Modal Form overlay */}
      <BrandFormModal 
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
        onSave={handleSaveBrand}
        brand={brandToEdit}
      />
    </div>
  );
}
