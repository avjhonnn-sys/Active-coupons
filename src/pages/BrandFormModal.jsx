import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle, HelpCircle } from 'lucide-react';

const getDefaults = (brandName) => ({
  how_to_use: `Copy the coupon code from CouponTail, go to the ${brandName} website or app, add your items to the cart, paste the code in the promo/coupon box during checkout, and click apply.`,
  not_working: `Coupon codes can fail because they have expired, are restricted to specific items, require a minimum spending threshold, or are only valid for first-time customers. Double check the terms on our page.`,
  verified: `Yes! We manually check and verify our coupon codes. Look for the green "Verified" badge on the coupon cards which indicates our editors have verified this code recently.`,
  frequency: `We update our website daily with active promo codes. Keep checking back regularly to get the latest ${brandName} savings.`,
  affiliation: `No, CouponTail is an independent coupon site. We are not officially affiliated with, endorsed by, or partnered with ${brandName}. All trademarks belong to their respective owners.`
});

export default function BrandFormModal({ isOpen, onClose, onSave, brand }) {
  const [description, setDescription] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [howToUse, setHowToUse] = useState('');
  const [notWorking, setNotWorking] = useState('');
  const [verified, setVerified] = useState('');
  const [frequency, setFrequency] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [error, setError] = useState('');

  const defaults = brand ? getDefaults(brand.brand_name) : {};

  useEffect(() => {
    if (brand) {
      setDescription(brand.brand_description || '');
      setLogoUrl(brand.logo_url || '');
      
      const faq = brand.custom_faq || {};
      setHowToUse(faq.how_to_use || '');
      setNotWorking(faq.not_working || '');
      setVerified(faq.verified || '');
      setFrequency(faq.frequency || '');
      setAffiliation(faq.affiliation || '');
    }
    setError('');
  }, [brand, isOpen]);

  if (!isOpen || !brand) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!description.trim()) {
      setError('Description is required.');
      return;
    }

    const customFaq = {};
    if (howToUse.trim()) customFaq.how_to_use = howToUse.trim();
    if (notWorking.trim()) customFaq.not_working = notWorking.trim();
    if (verified.trim()) customFaq.verified = verified.trim();
    if (frequency.trim()) customFaq.frequency = frequency.trim();
    if (affiliation.trim()) customFaq.affiliation = affiliation.trim();

    const payload = {
      brand_slug: brand.brand_slug,
      brand_description: description.trim(),
      logo_url: logoUrl.trim(),
      custom_faq: customFaq
    };

    try {
      await onSave(payload);
    } catch (err) {
      setError(err.message || 'Error saving brand information.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto' }}>
        
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title" style={{ fontFamily: 'var(--font-headings)' }}>
            Edit Brand: {brand.brand_name}
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
          
          <div className="form-group">
            <label className="form-label" htmlFor="brandNameDisabled">Brand Name</label>
            <input 
              id="brandNameDisabled"
              type="text" 
              className="form-control" 
              value={brand.brand_name} 
              disabled 
              style={{ opacity: 0.6 }}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="brandDescription">Brand Description</label>
            <textarea 
              id="brandDescription"
              className="form-control"
              placeholder={`Write a description about ${brand.brand_name}...`}
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{ resize: 'vertical' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="brandLogoUrl">Logo URL (Optional)</label>
            <input 
              id="brandLogoUrl"
              type="text" 
              className="form-control"
              placeholder="e.g. https://domain.com/logo.png"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
            />
          </div>

          {/* FAQs Custom Override Section */}
          <div style={{
            marginTop: '0.5rem',
            borderTop: '1px solid var(--border)',
            paddingTop: '1.25rem'
          }}>
            <h3 style={{
              color: '#fff',
              fontSize: '1.1rem',
              fontFamily: 'var(--font-headings)',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <HelpCircle size={18} style={{ color: 'var(--accent)' }} />
              FAQ Answers Custom Overrides
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '1.25rem', lineHeight: '1.4' }}>
              Override default answers. Leave these blank to use the generic CouponTail fallback answers for this brand.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* FAQ 1 */}
              <div className="form-group">
                <label className="form-label" htmlFor="faqHowToUse">
                  How do I use a {brand.brand_name} coupon code?
                </label>
                <textarea 
                  id="faqHowToUse"
                  className="form-control"
                  placeholder={`Default: ${defaults.how_to_use}`}
                  rows={2}
                  value={howToUse}
                  onChange={(e) => setHowToUse(e.target.value)}
                  style={{ fontSize: '0.85rem', resize: 'vertical' }}
                />
              </div>

              {/* FAQ 2 */}
              <div className="form-group">
                <label className="form-label" htmlFor="faqNotWorking">
                  Why isn't my coupon code working?
                </label>
                <textarea 
                  id="faqNotWorking"
                  className="form-control"
                  placeholder={`Default: ${defaults.not_working}`}
                  rows={2}
                  value={notWorking}
                  onChange={(e) => setNotWorking(e.target.value)}
                  style={{ fontSize: '0.85rem', resize: 'vertical' }}
                />
              </div>

              {/* FAQ 3 */}
              <div className="form-group">
                <label className="form-label" htmlFor="faqVerified">
                  Are these coupons verified?
                </label>
                <textarea 
                  id="faqVerified"
                  className="form-control"
                  placeholder={`Default: ${defaults.verified}`}
                  rows={2}
                  value={verified}
                  onChange={(e) => setVerified(e.target.value)}
                  style={{ fontSize: '0.85rem', resize: 'vertical' }}
                />
              </div>

              {/* FAQ 4 */}
              <div className="form-group">
                <label className="form-label" htmlFor="faqFrequency">
                  How often are new {brand.brand_name} coupons added?
                </label>
                <textarea 
                  id="faqFrequency"
                  className="form-control"
                  placeholder={`Default: ${defaults.frequency}`}
                  rows={2}
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  style={{ fontSize: '0.85rem', resize: 'vertical' }}
                />
              </div>

              {/* FAQ 5 */}
              <div className="form-group">
                <label className="form-label" htmlFor="faqAffiliation">
                  Is CouponTail officially affiliated with {brand.brand_name}?
                </label>
                <textarea 
                  id="faqAffiliation"
                  className="form-control"
                  placeholder={`Default: ${defaults.affiliation}`}
                  rows={2}
                  value={affiliation}
                  onChange={(e) => setAffiliation(e.target.value)}
                  style={{ fontSize: '0.85rem', resize: 'vertical' }}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '1rem',
            marginTop: '1.25rem',
            borderTop: '1px solid var(--border)',
            paddingTop: '1.25rem'
          }}>
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
              <Save size={16} /> Save Brand Settings
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
