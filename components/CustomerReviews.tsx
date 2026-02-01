
import React from 'react';

const reviews = [
  { name: "Ahmed R.", location: "Karachi", text: "Ordered the earbuds, received in 2 days. Quality is top-notch and COD made me feel safe.", rating: 5 },
  { name: "Sana K.", location: "Lahore", text: "The ceramic tea set was packed so carefully. Truly impressed by the service and product quality.", rating: 5 },
  { name: "Bilal M.", location: "Islamabad", text: "First time buying from Almarky. I was skeptical but the support team guided me perfectly. Trusted!", rating: 4 },
];

const CustomerReviews: React.FC = () => {
  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase mb-2">What Our <span className="text-emerald-600">Customers</span> Say</h2>
        <div className="flex justify-center items-center space-x-1">
          {[1, 2, 3, 4, 5].map(star => (
            <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-2 text-xs font-bold text-slate-400">4.9/5 Average Rating</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev, i) => (
          <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative">
            <div className="absolute top-6 right-8">
               <svg className="w-8 h-8 text-emerald-50" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3L21.017 3V15C21.017 18.3137 18.3307 21 15.017 21H14.017ZM3 21L3 18C3 16.8954 3.89543 16 5 16H8C8.55228 16 9 15.5523 9 15V9C9 8.44772 8.55228 8 8 8H5C3.89543 8 3 7.10457 3 6V3L10 3V15C10 18.3137 7.31371 21 4 21H3Z" />
               </svg>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">"{rev.text}"</p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-black text-xs">
                {rev.name.charAt(0)}
              </div>
              <div className="ml-3">
                <div className="text-sm font-black text-slate-900 flex items-center">
                  {rev.name}
                  <svg className="w-3 h-3 text-emerald-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{rev.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
