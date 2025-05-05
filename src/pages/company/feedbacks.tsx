import { useEffect, useState } from 'react';

export default function CompanyFeedbacks() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  const company = JSON.parse(localStorage.getItem('company') || '{}');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data.filter((p: any) => p.company_id === company.id)));
  }, [company.id]);

  const fetchFeedbacks = (productId: string) => {
    setLoading(true);
    fetch(`/api/company/feedback/${productId}`)
      .then(res => res.json())
      .then(data => {
        setFeedbacks(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (selectedProduct) fetchFeedbacks(selectedProduct);
  }, [selectedProduct]);

  return (
    <div className="min-h-screen bg-space-gradient text-white p-8">
      <h2 className="text-3xl font-bold mb-6 text-purple-300">Product Feedbacks</h2>
      <select className="mb-6 w-full p-2 rounded bg-space-dark border border-purple-500 text-white" value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)}>
        <option value="">Select Product</option>
        {products.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>
      {loading ? (
        <div>Loading...</div>
      ) : feedbacks.length === 0 ? (
        <div>No feedbacks found for this product.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map((fb: any) => (
            <div key={fb.id} className="bg-space-dark/80 rounded-lg shadow-lg p-6">
              <div className="text-yellow-400 mb-2">Rating: {fb.rating}</div>
              <div className="text-gray-300 mb-2">{fb.review_text}</div>
              <div className="text-xs text-gray-400">{new Date(fb.created_at).toLocaleString()}</div>
              <div className="text-xs text-gray-400 mt-2">By: {fb.Customer?.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 