import { useEffect, useState } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import StarRating from '../../components/StarRating';

export default function SubmitFeedback() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');
    const customer = JSON.parse(localStorage.getItem('customer') || '{}');
    if (!customer?.id) {
      setError('You must be logged in as a customer.');
      return;
    }
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customer_id: customer.id, product_id: productId, rating, review_text: reviewText }),
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess('Feedback submitted!');
      setProductId(''); setRating(0); setReviewText('');
    } else {
      setError(data.message || 'Failed to submit feedback');
    }
  };

  return (
    <div className="min-h-screen bg-space-gradient text-white flex items-center justify-center">
      <div className="max-w-lg w-full bg-space-dark/80 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-purple-300">Submit Feedback</h2>
        <form onSubmit={handleSubmit}>
          <select className="mb-4 w-full p-2 rounded bg-space-dark border border-purple-500 text-white" value={productId} onChange={e => setProductId(e.target.value)} required>
            <option value="">Select Product</option>
            {products.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <div className="mb-4">
            <span className="block mb-1">Rating:</span>
            <StarRating initialRating={rating} editable onChange={setRating} />
          </div>
          <textarea
            className="mb-4 w-full p-2 rounded bg-space-dark border border-purple-500 text-white"
            placeholder="Your review..."
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
            rows={4}
          />
          {error && <div className="text-red-400 mb-2">{error}</div>}
          {success && <div className="text-green-400 mb-2">{success}</div>}
          <Button className="w-full" type="submit">Submit Feedback</Button>
        </form>
      </div>
    </div>
  );
} 