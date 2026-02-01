
import React, { useState } from 'react';
import { useReviews } from '../context/ReviewContext';

interface ProductReviewsProps {
  productId: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const { getReviewsForProduct, addReview } = useReviews();
  const reviews = getReviewsForProduct(productId);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReview({
      productId,
      userName: 'Guest User',
      ...newReview
    });
    setNewReview({ rating: 5, comment: '' });
    setShowForm(false);
  };

  return (
    <div className="mt-16 border-t border-slate-100 pt-16">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Customer Feedback</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Verified Experience Report</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-slate-900 text-white text-[10px] font-black px-6 py-3 rounded-xl uppercase tracking-widest hover:bg-blue-600 transition"
        >
          {showForm ? 'Close Editor' : '+ Submit Review'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-12 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 animate-in slide-in-from-top-4 duration-300">
          <div className="space-y-6">
            <div>
              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 text-center">Satisfaction Rating</label>
              <div className="flex justify-center space-x-3">
                {[1, 2, 3, 4, 5].map(star => (
                  <button 
                    key={star}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className={`w-12 h-12 rounded-2xl text-xl flex items-center justify-center transition-all ${newReview.rating >= star ? 'bg-yellow-400 text-white shadow-lg' : 'bg-white text-slate-200 border border-slate-100'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div>
              <textarea 
                required
                rows={3}
                placeholder="Share your detailed thoughts about the product quality and delivery..."
                className="w-full border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all text-sm font-medium"
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              />
            </div>
            <button className="w-full bg-slate-900 text-white font-black py-4 rounded-xl text-xs uppercase tracking-widest">Publish Verified Review</button>
          </div>
        </form>
      )}

      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map(review => (
            <div key={review.id} className="bg-white p-8 rounded-[2rem] border border-slate-50 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 font-black uppercase text-xs">
                    {review.userName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900 uppercase tracking-tight flex items-center">
                      {review.userName}
                      <svg className="w-3.5 h-3.5 text-blue-500 ml-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    </p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'fill-slate-100'}`} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed italic">"{review.comment}"</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-100">
           <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No reviews yet for this product.</p>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
