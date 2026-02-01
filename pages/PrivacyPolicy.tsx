
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-black text-slate-900 mb-8 uppercase tracking-tighter">Privacy <span className="text-emerald-600">Policy</span></h1>
      <div className="prose prose-slate max-w-none text-slate-500 leading-relaxed space-y-6 font-medium">
        <p>Your privacy is important to us. This policy describes how Almarky collects, uses, and protects your personal information when you use our website.</p>
        
        <h2 className="text-xl font-black text-slate-900 uppercase">Information We Collect</h2>
        <p>When you place an order, we collect your name, phone number, address, and city. We use this strictly for order fulfillment and delivery purposes.</p>

        <h2 className="text-xl font-black text-slate-900 uppercase">Data Security</h2>
        <p>We use encrypted protocols and secure storage. Your personal information is never sold, shared, or traded with third-party advertising companies.</p>

        <h2 className="text-xl font-black text-slate-900 uppercase">Google Sheets Integration</h2>
        <p>Our orders are processed using Google Forms and Google Sheets. This ensures that only authorized Almarky employees have access to your delivery details.</p>

        <h2 className="text-xl font-black text-slate-900 uppercase">Your Rights</h2>
        <p>You may contact us at any time to request a deletion of your customer record or to update your shipping information.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
