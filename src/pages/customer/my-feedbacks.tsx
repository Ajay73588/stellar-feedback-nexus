import { useEffect, useState } from 'react';

export default function MyFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const customer = JSON.parse(localStorage.getItem('customer') || '{}');
    if (!customer?.id) return;
    fetch(`/api/my-feedback?customer_id=${customer.id}`)
      .then(res => res.json())
      .then(data => {
        setFeedbacks(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-space-gradient text-white p-8">
      <h2 className="text-3xl font-bold mb-6 text-purple-300">My Feedbacks</h2>
      {loading ? (
        <div>Loading...</div>
      ) : feedbacks.length === 0 ? (
        <div>No feedbacks found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map((fb: any) => (
            <div key={fb.id} className="bg-space-dark/80 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-purple-200 mb-2">{fb.Product?.name}</h3>
              <div className="text-yellow-400 mb-2">Rating: {fb.rating}</div>
              <div className="text-gray-300 mb-2">{fb.review_text}</div>
              <div className="text-xs text-gray-400">{new Date(fb.created_at).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 