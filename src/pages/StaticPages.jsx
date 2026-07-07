import React, { useState } from 'react';
import { Mail, Send, Award, ShieldAlert, Sparkles, HelpCircle, CheckCircle, Info } from 'lucide-react';
import { db } from '../supabase';

// Helper component for page layout headers
function PageHeader({ title, description, icon: Icon }) {
  return (
    <header style={{
      textAlign: 'center',
      marginBottom: '3rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.75rem'
    }}>
      <div style={{
        background: 'var(--accent-glow)',
        color: 'var(--accent)',
        padding: '0.6rem',
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        marginBottom: '0.5rem'
      }}>
        {Icon && <Icon size={24} />}
      </div>
      <h1 className="glow-text" style={{ fontSize: '2.5rem', color: '#fff' }}>{title}</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', lineHeight: '1.5' }}>
        {description}
      </p>
    </header>
  );
}

// 1. ABOUT US PAGE
export function AboutPage() {
  return (
    <div className="container" style={{ paddingTop: '3rem', maxWidth: '800px' }}>
      <PageHeader 
        title="About GrabCoupon" 
        description="Learn how we source verified coupon codes and why GrabCoupon is independently run to help you save."
        icon={Sparkles}
      />
      <main className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.7' }}>
        <h2 style={{ color: '#fff', fontSize: '1.5rem', fontFamily: 'var(--font-headings)' }}>Who We Are</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Welcome to <strong>GrabCoupon</strong>, your premier, independently-run platform for finding verified online coupons, deals, and discount codes. We are dedicated to building a cleaner, simpler, and more efficient way to shop online without breaking the bank.
        </p>

        <h2 style={{ color: '#fff', fontSize: '1.5rem', fontFamily: 'var(--font-headings)', marginTop: '1rem' }}>How We Source Coupons</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Unlike massive, automated coupon networks that scrape expired and invalid codes, we source our coupons directly:
        </p>
        <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li><strong>Direct Merchant Relations:</strong> We regularly monitor top brands and official newsletters to collect the latest active codes.</li>
          <li><strong>Internal Reference Checks:</strong> Every coupon entered has a documented source URL verifying where it came from before we make it live.</li>
          <li><strong>Daily Manual Verifications:</strong> Our editor manually tests and marks codes with a <strong>Verified</strong> badge when they are confirmed active.</li>
        </ul>

        <h2 style={{ color: '#fff', fontSize: '1.5rem', fontFamily: 'var(--font-headings)', marginTop: '1rem' }}>Independently Run</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          GrabCoupon is 100% independent. We are not owned by any major shopping portal or merchant conglomerate. This autonomy ensures that we put shoppers first, providing honest terms of coupon use and focusing solely on saving you money.
        </p>
      </main>
    </div>
  );
}

// 2. CONTACT US PAGE
export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await db.submitContact(name, email, message);
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setError(err.message || 'Failed to submit contact form.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '3rem', maxWidth: '650px' }}>
      <PageHeader 
        title="Contact Us" 
        description="Have a question or feedback? Drop us a message, and we'll get back to you shortly."
        icon={Mail}
      />
      
      {success ? (
        <div className="glass-panel" style={{
          padding: '3rem 2rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem'
        }}>
          <div style={{
            background: 'var(--success-glow)',
            color: 'var(--success)',
            padding: '0.75rem',
            borderRadius: '50%',
            display: 'inline-flex'
          }}>
            <CheckCircle size={32} />
          </div>
          <h2 style={{ color: '#fff', fontSize: '1.5rem' }}>Submission Received!</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', maxWidth: '400px' }}>
            Thank you for reaching out to GrabCoupon. Your message has been saved. We will review it and reply within 24-48 business hours.
          </p>
          <button className="btn btn-secondary" onClick={() => setSuccess(false)}>
            Send Another Message
          </button>
        </div>
      ) : (
        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: 'var(--error)',
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              fontSize: '0.85rem',
              marginBottom: '1.5rem'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="contactName">Name</label>
              <input 
                id="contactName"
                type="text" 
                className="form-control"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contactEmail">Email Address</label>
              <input 
                id="contactEmail"
                type="email" 
                className="form-control"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contactMessage">Message</label>
              <textarea 
                id="contactMessage"
                className="form-control"
                placeholder="How can we help you?"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                style={{ resize: 'vertical' }}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={submitting}
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              {submitting ? 'Sending...' : 'Send Message'} <Send size={14} />
            </button>
          </form>

          <div style={{
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border)',
            textAlign: 'center',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)'
          }}>
            Alternatively, you can email support directly at: <strong style={{ color: 'var(--accent)' }}>support@grabcoupon.com</strong>
          </div>
        </div>
      )}
    </div>
  );
}

// 3. TERMS & CONDITIONS PAGE
export function TermsPage() {
  return (
    <div className="container" style={{ paddingTop: '3rem', maxWidth: '800px' }}>
      <PageHeader 
        title="Terms and Conditions" 
        description="Please read these usage guidelines carefully before browsing or using GrabCoupon."
        icon={HelpCircle}
      />
      <main className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
        <h2 style={{ color: '#fff', fontSize: '1.25rem', fontFamily: 'var(--font-headings)' }}>1. Acceptance of Terms</h2>
        <p>
          By visiting, accessing, or browsing GrabCoupon, you acknowledge and agree to be bound by these terms. If you do not agree to these terms, please refrain from using our coupon discovery service.
        </p>

        <h2 style={{ color: '#fff', fontSize: '1.25rem', fontFamily: 'var(--font-headings)' }}>2. No Warranty on Validity</h2>
        <p>
          All coupon codes, deals, and promotions published on GrabCoupon are compiled for convenience and reference only. We make every effort to verify active deals, but we do <strong>not</strong> warrant or guarantee that any coupon code will be valid, active, or accepted at checkout. Brands reserve the right to modify or deactivate discount codes at their sole discretion at any time.
        </p>

        <h2 style={{ color: '#fff', fontSize: '1.25rem', fontFamily: 'var(--font-headings)' }}>3. User Verification Responsibility</h2>
        <p>
          It is your absolute responsibility as the shopper to verify that the discount has been successfully applied to your order in the merchant's shopping cart prior to completing the purchase or checkout process. GrabCoupon is not responsible for any purchases made at full price due to code deactivation.
        </p>

        <h2 style={{ color: '#fff', fontSize: '1.25rem', fontFamily: 'var(--font-headings)' }}>4. Third-Party Transactions & Liability</h2>
        <p>
          GrabCoupon lists codes but does not sell products. Any transactions you enter into are strictly between you and the respective third-party store (e.g. Amazon, Swiggy, Nike). We hold <strong>no liability</strong> or responsibility for shipping delays, customer service issues, product defects, or payment disputes originating from merchant websites.
        </p>
      </main>
    </div>
  );
}

// 4. PRIVACY POLICY PAGE
export function PrivacyPage() {
  return (
    <div className="container" style={{ paddingTop: '3rem', maxWidth: '800px' }}>
      <PageHeader 
        title="Privacy Policy" 
        description="Learn about the data we collect, how it is used, and our commitment to protecting your privacy."
        icon={Award}
      />
      <main className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
        <h2 style={{ color: '#fff', fontSize: '1.25rem', fontFamily: 'var(--font-headings)' }}>1. Information Collected</h2>
        <p>
          GrabCoupon values your privacy. We collect:
        </p>
        <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <li><strong>Contact Submissions:</strong> When you fill out the Contact Us form, we store your name, email, and message content to reply to your inquiry.</li>
          <li><strong>Basic Analytics:</strong> We may collect non-identifying browser information (device type, operating system) to optimize site loading speeds.</li>
        </ul>

        <h2 style={{ color: '#fff', fontSize: '1.25rem', fontFamily: 'var(--font-headings)' }}>2. No Sale of Personal Data</h2>
        <p>
          We do <strong>not</strong> sell, trade, rent, or distribute your email addresses or personal information to third parties, advertising networks, or data brokers. Your contact details are strictly used to address support requests.
        </p>

        <h2 style={{ color: '#fff', fontSize: '1.25rem', fontFamily: 'var(--font-headings)' }}>3. Cookie Usage</h2>
        <p>
          We use simple site cookies or local storage settings to remember layout selections (like recently copied coupons or theme settings). No tracking or behavioral advertisement cookies are implemented on GrabCoupon.
        </p>
      </main>
    </div>
  );
}

// 5. DISCLAIMER PAGE
export function DisclaimerPage() {
  return (
    <div className="container" style={{ paddingTop: '3rem', maxWidth: '800px' }}>
      <PageHeader 
        title="Disclaimer" 
        description="Important legal statements concerning brand affiliations, trademarks, and deal validity."
        icon={ShieldAlert}
      />
      <main className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
        <h2 style={{ color: '#fff', fontSize: '1.25rem', fontFamily: 'var(--font-headings)' }}>No Official Affiliation or Endorsement</h2>
        <p>
          GrabCoupon is a public coupon aggregator. We are <strong>not</strong> officially affiliated with, endorsed by, partnered with, or sponsored by any of the brands listed on this website:
        </p>
        
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid var(--border)',
          borderRadius: '0.5rem',
          padding: '1rem',
          color: '#fff',
          fontSize: '0.85rem',
          textAlign: 'center',
          fontWeight: 600,
          letterSpacing: '0.02em'
        }}>
          Amazon • Flipkart • Myntra • Ajio • Nike • Adidas • Samsung • Boat • Swiggy • Zomato
        </div>

        <h2 style={{ color: '#fff', fontSize: '1.25rem', fontFamily: 'var(--font-headings)' }}>Trademarks & Intellectual Property</h2>
        <p>
          All brand names, store logos, and registered trademarks featured or referred to on GrabCoupon belong to their respective owners. Their inclusion is purely nominative to identify the stores where the coupons are applicable, under fair use laws.
        </p>

        <h2 style={{ color: '#fff', fontSize: '1.25rem', fontFamily: 'var(--font-headings)' }}>Coupon Accuracy</h2>
        <p>
          While we check deals routinely, coupon codes are subject to instant modification or early removal by the merchant. GrabCoupon does not guarantee coupon accuracy, expiry validity, or availability. Shoppers proceed at their own discretion.
        </p>
      </main>
    </div>
  );
}

// 6. COOKIE POLICY PAGE
export function CookiePolicyPage() {
  return (
    <div className="container" style={{ paddingTop: '3rem', maxWidth: '800px' }}>
      <PageHeader 
        title="Cookie Policy" 
        description="A brief summary of how and why we utilize cookies on GrabCoupon."
        icon={Info}
      />
      <main className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
        <h2 style={{ color: '#fff', fontSize: '1.25rem', fontFamily: 'var(--font-headings)' }}>What are Cookies?</h2>
        <p>
          Cookies are tiny text files stored in your web browser by the websites you visit. They are commonly used to remember preferences and track site traffic.
        </p>

        <h2 style={{ color: '#fff', fontSize: '1.25rem', fontFamily: 'var(--font-headings)' }}>Our Cookie Usage</h2>
        <p>
          GrabCoupon uses cookies and local storage variables solely for necessary operations:
        </p>
        <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <li><strong>Session Cookies:</strong> Storing the admin panel authorization token so that administrators do not have to re-login on page refresh.</li>
          <li><strong>Performance Optimization:</strong> Storing user UI selections (such as search filters or copying animations status).</li>
        </ul>
        <p>
          We do <strong>not</strong> implement tracking beacons, cross-site social media pixels, or behavioral tracking cookies for advertisements. You can disable cookies in your browser settings if you wish, though some features (such as staying logged into the admin dashboard) may not work correctly.
        </p>
      </main>
    </div>
  );
}
