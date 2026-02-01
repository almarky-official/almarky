
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ProductProvider } from './context/ProductContext';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import { ReviewProvider } from './context/ReviewContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import PurchaseActivity from './components/PurchaseActivity';
import WhatsAppFloating from './components/WhatsAppFloating';
import AIAgent from './components/AIAgent';

// Pages
import Home from './pages/Home';
import Shop from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import About from './pages/About';
import Contact from './pages/Contact';
import TrustCenter from './pages/TrustCenter';
import TrackOrder from './pages/TrackOrder';
import Wishlist from './pages/Wishlist';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import AdminDashboard from './pages/AdminDashboard';
import Account from './pages/Account';
import MyOrders from './pages/MyOrders';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <OrderProvider>
        <ProductProvider>
          <ReviewProvider>
            <CartProvider>
              <WishlistProvider>
                <Router>
                  <div className="min-h-screen flex flex-col bg-white text-slate-900">
                    <PurchaseActivity />
                    <WhatsAppFloating />
                    <AIAgent />
                    <Navbar />
                    <main className="flex-grow">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/success" element={<Success />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/trust-center" element={<TrustCenter />} />
                        <Route path="/track-order" element={<TrackOrder />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="/terms" element={<TermsOfService />} />
                        {/* Stealth Path for Admin */}
                        <Route path="/almarky-internal-v2026" element={<AdminDashboard />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/my-orders" element={<MyOrders />} />
                      </Routes>
                    </main>
                    <Footer />
                    <MobileBottomNav />
                  </div>
                </Router>
              </WishlistProvider>
            </CartProvider>
          </ReviewProvider>
        </ProductProvider>
      </OrderProvider>
    </AuthProvider>
  );
};

export default App;
