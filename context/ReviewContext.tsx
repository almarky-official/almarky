
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: number;
}

interface ReviewContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  getReviewsForProduct: (productId: string) => Review[];
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('almarky_reviews');
    return saved ? JSON.parse(saved) : [
      { id: 'r1', productId: 'p001', userName: 'Zeeshan', rating: 5, comment: 'Amazing sound quality! Highly recommended.', date: Date.now() - 86400000 },
      { id: 'r2', productId: 'p001', userName: 'Amna', rating: 4, comment: 'Good battery life, but a bit big for my ears.', date: Date.now() - 172800000 }
    ];
  });

  useEffect(() => {
    localStorage.setItem('almarky_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      date: Date.now(),
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const getReviewsForProduct = (productId: string) => {
    return reviews.filter(r => r.productId === productId);
  };

  return (
    <ReviewContext.Provider value={{ reviews, addReview, getReviewsForProduct }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) throw new Error("useReviews must be used within a ReviewProvider");
  return context;
};
