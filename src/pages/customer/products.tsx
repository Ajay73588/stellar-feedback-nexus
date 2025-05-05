import { useEffect, useState } from 'react';
import StarRating from '../../components/StarRating';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-space-gradient text-white p-8">
      <h2 className="text-3xl font-bold mb-6 text-purple-300">Products</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => {
            const avgRating = product.Feedbacks?.length ? (product.Feedbacks.reduce((acc: any, f: any) => acc + f.rating, 0) / product.Feedbacks.length) : 0;
            return (
              <div key={product.id} className="bg-space-dark/80 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-purple-200 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-300 mb-2">{product.description}</p>
                <div className="flex items-center">
                  <StarRating initialRating={avgRating} />
                  <span className="ml-2 text-gray-400">({product.Feedbacks?.length || 0} reviews)</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
} 