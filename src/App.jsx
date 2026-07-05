import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BrandDetail from './pages/BrandDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { 
  AboutPage, 
  ContactPage, 
  TermsPage, 
  PrivacyPage, 
  DisclaimerPage, 
  CookiePolicyPage 
} from './pages/StaticPages';

export default function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navigation header */}
        <Navbar />

        {/* Dynamic page content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/brand/:brandName" element={<BrandDetail />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            
            {/* Company & Legal Static Routes */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="/cookies" element={<CookiePolicyPage />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </Router>
  );
}
