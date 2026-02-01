
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">About Almarky</h1>
      
      <div className="prose prose-lg text-gray-600 mx-auto space-y-6">
        <p className="text-xl font-medium text-gray-800">
          Almarky is Pakistan's emerging destination for premium, high-quality products ranging from electronics to lifestyle essentials.
        </p>
        
        <p>
          Founded in 2024, our mission is to simplify the online shopping experience for Pakistani consumers. We understand the unique challenges of local ecommerce, which is why we prioritize <strong>trust</strong>, <strong>quality</strong>, and <strong>speed</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-green-700 mb-2">Our Vision</h3>
            <p className="text-sm">To become Pakistan's most trusted online store by providing a seamless shopping experience and premium curated goods.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-green-700 mb-2">Our Values</h3>
            <p className="text-sm">We believe in customer satisfaction above all. Our "No Questions Asked" support team is always here for you.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 pt-8 border-t border-gray-100">Why Shop With Us?</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>100% Quality Inspected Products</li>
          <li>Cash on Delivery Across All Cities in Pakistan</li>
          <li>Easy 7-Day Replacement Warranty</li>
          <li>Transparent Pricing - No Hidden Charges</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
