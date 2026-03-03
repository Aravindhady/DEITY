'use client';

import { useState, useEffect } from 'react';
import { FiStar } from 'react-icons/fi';

interface Review {
  _id: string;
  rating: number;
  title?: string;
  comment: string;
  createdAt: string;
  user?: {
    name: string;
  };
}

export default function ProductReviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch reviews - you'll need to create this API endpoint
    // For now, using placeholder
    setLoading(false);
  }, [productId]);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-b pb-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-full" />
            </div>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-gray-600">No reviews yet. Be the first to review!</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review._id} className="border-b pb-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar
                      key={star}
                      className={`w-5 h-5 ${
                        star <= review.rating ? 'fill-deity-green text-deity-green' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">{review.user?.name || 'Anonymous'}</span>
                <span className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              {review.title && <h4 className="font-semibold mb-2">{review.title}</h4>}
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
