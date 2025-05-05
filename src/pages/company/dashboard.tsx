
import { useEffect, useState } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useToast } from '@/components/ui/use-toast';

export default function CompanyDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState<number|null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { isAuthenticated, userRole, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const company = JSON.parse(localStorage.getItem('company') || '{}');

  useEffect(() => {
    // Check if user is authenticated as a company
    if (!isAuthenticated || userRole !== 'company') {
      navigate('/company/login');
      return;
    }
    
    fetchProducts();
    // eslint-disable-next-line
  }, [isAuthenticated, userRole, navigate]);

  const fetchProducts = () => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.filter((p: any) => p.company_id === company.id));
        setLoading(false);
      });
  };

  const handleAddOrEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!name || !description) {
      setError('Name and description required');
      return;
    }
    if (editId) {
      // Edit
      const res = await fetch(`/api/company/products/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      });
      if (res.ok) {
        setSuccess('Product updated!');
        setEditId(null); setName(''); setDescription('');
        fetchProducts();
      } else {
        setError('Failed to update product');
      }
    } else {
      // Add
      const res = await fetch('/api/company/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, company_id: company.id }),
      });
      if (res.ok) {
        setSuccess('Product added!');
        setName(''); setDescription('');
        fetchProducts();
      } else {
        setError('Failed to add product');
      }
    }
  };

  const handleEdit = (product: any) => {
    setEditId(product.id);
    setName(product.name);
    setDescription(product.description);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this product?')) return;
    const res = await fetch(`/api/company/products/${id}`, { method: 'DELETE' });
    if (res.ok) {
      fetchProducts();
    }
  };

  return (
    <div className="min-h-screen bg-space-gradient text-white">
      <Navbar userType={userRole} onLogout={logout} />
      
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-purple-300">Company Dashboard</h2>
        <form onSubmit={handleAddOrEdit} className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <Input placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} />
            <Input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          {error && <div className="text-red-400 mb-2">{error}</div>}
          {success && <div className="text-green-400 mb-2">{success}</div>}
          <Button type="submit">{editId ? 'Update' : 'Add'} Product</Button>
          {editId && <Button type="button" className="ml-2" onClick={() => { setEditId(null); setName(''); setDescription(''); }}>Cancel</Button>}
        </form>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: any) => (
              <div key={product.id} className="bg-space-dark/80 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-purple-200 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-300 mb-2">{product.description}</p>
                <Button className="mr-2" onClick={() => handleEdit(product)}>Edit</Button>
                <Button variant="destructive" onClick={() => handleDelete(product.id)}>Delete</Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
