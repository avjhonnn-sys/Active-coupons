import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import { BRANDS } from '../supabase';

export default function CouponFormModal({ isOpen, onClose, onSave, couponToEdit }) {
  const [brand, setBrand] = useState(BRANDS[0]);
  const [offerTitle, setOfferTitle] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [description, setDescription] = useState('');
  const [discountType, setDiscountType] = useState('Percentage');
  const [expiryDate, setExpiryDate] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [verified, setVerified] = useState(false);
  const [active, setActive] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (couponToEdit) {
      setBrand(couponToEdit.brand);
      setOfferTitle(couponToEdit.offer_title);
      setCouponCode(couponToEdit.coupon_code || '');
      setDescription(couponToEdit.description);
      setDiscountType(couponToEdit.discount_type);
      setExpiryDate(couponToEdit.expiry_date);
      setSourceUrl(couponToEdit.source_url || '');
      setVerified(couponToEdit.verified || false);
      setActive(couponToEdit.active !== undefined ? couponToEdit.active : true);
    } else {
      // Set default values for new coupon
      setBrand(BRANDS[0]);
      setOfferTitle('');
      setCouponCode('');
      setDescription('');
      setDiscountType('Percentage');
      // Set default expiry date to today
      const todayStr = new Date().toISOString().split('T')[0];
      setExpiryDate(todayStr);
      setSourceUrl('');
      setVerified(false);
      setActive(true);
    }
    setError('');
  }, [couponToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Pre-validation
    if (!offerTitle.trim()) {
      setError('Offer title is required.');
      return;
    }
    if (!description.trim()) {
      setError('Description is required.');
      return;
    }
    if (!expiryDate) {
      setError('Expiry date is required.');
      return;
    }
    if (!sourceUrl.trim()) {
      setError('Source URL is required.');
      return;
    }

    const payload = {
      brand,
      offer_title: offerTitle.trim(),
      coupon_code: couponCode,
      description: description.trim(),
      discount_type: discountType,
      expiry_date: expiryDate,
      source_url: sourceUrl.trim(),
      verified,
      active
    };

    if (couponToEdit) {
      payload.id = couponToEdit.id;
      payload.created_at = couponToEdit.created_at;
    }

    try {
      await onSave(payload);
    } catch (err) {
      setError(err.message || 'Error saving coupon.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '650px' }}>
        {/* Modal Header */}
        <div className="modal-header">
          <h2 className="modal-title" style={{ fontFamily: 'var(--font-headings)' }}>
            {couponToEdit ? 'Edit Coupon' : 'Add New Coupon'}
          </h2>
          <button onClick={onClose} className="btn-close" type="button">
            <X size={20} />
          </button>
        </div>

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
          
          <div className="form-row">
            {/* Brand Dropdown */}
            <div className="form-group">
              <label className="form-label" htmlFor="brand">Brand</label>
              <select 
                id="brand"
                className="form-control"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                {BRANDS.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Discount Type Dropdown */}
            <div className="form-group">
              <label className="form-label" htmlFor="discountType">Discount Type</label>
              <select 
                id="discountType"
                className="form-control"
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
              >
                <option value="Percentage">Percentage</option>
                <option value="Flat Amount">Flat Amount</option>
                <option value="Cashback">Cashback</option>
                <option value="Free Shipping">Free Shipping</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            {/* Offer Title */}
            <div className="form-group">
              <label className="form-label" htmlFor="offerTitle">Offer Title</label>
              <input 
                id="offerTitle"
                type="text" 
                className="form-control"
                placeholder="e.g. 50% Off Up to ₹100"
                value={offerTitle}
                onChange={(e) => setOfferTitle(e.target.value)}
                required
              />
            </div>

            {/* Coupon Code (Optional) */}
            <div className="form-group">
              <label className="form-label" htmlFor="couponCode">Coupon Code (Optional)</label>
              <input 
                id="couponCode"
                type="text" 
                className="form-control"
                placeholder="e.g. SAVE50 (leave blank if no-code)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                style={{ textTransform: 'uppercase' }}
              />
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label" htmlFor="description">Terms & Description</label>
            <textarea 
              id="description"
              className="form-control"
              placeholder="Provide full terms and details about the coupon in plain language..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{ resize: 'vertical' }}
            />
          </div>

          <div className="form-row">
            {/* Expiry Date */}
            <div className="form-group">
              <label className="form-label" htmlFor="expiryDate">Expiry Date</label>
              <input 
                id="expiryDate"
                type="date" 
                className="form-control"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
              />
            </div>

            {/* Source URL */}
            <div className="form-group">
              <label className="form-label" htmlFor="sourceUrl">Source URL (Internal Ref Only)</label>
              <input 
                id="sourceUrl"
                type="text" 
                className="form-control"
                placeholder="e.g. https://brand.com/promo-terms"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Toggles */}
          <div style={{ display: 'flex', gap: '2.5rem', marginTop: '0.25rem' }}>
            {/* Verified Toggle */}
            <div 
              className={`toggle-wrapper ${verified ? 'active' : ''}`}
              onClick={() => setVerified(!verified)}
            >
              <div className="toggle-switch"></div>
              <span className="form-label" style={{ cursor: 'pointer' }}>Show Verified Badge</span>
            </div>

            {/* Active Toggle */}
            <div 
              className={`toggle-wrapper ${active ? 'active' : ''}`}
              onClick={() => setActive(!active)}
            >
              <div className="toggle-switch"></div>
              <span className="form-label" style={{ cursor: 'pointer' }}>Is Active (Live on Site)</span>
            </div>
          </div>

          {/* Footer Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              <Save size={16} /> Save Coupon
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
