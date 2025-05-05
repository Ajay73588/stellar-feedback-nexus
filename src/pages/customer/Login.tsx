
import { useState } from 'react';
import StarBackground from '../../components/StarBackground';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

export default function CustomerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(email, password, 'customer');
      
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome back, customer!",
        });
        navigate('/customer/products');
      } else {
        setError('Invalid credentials');
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-space-gradient flex items-center justify-center">
      <StarBackground />
      <div className="max-w-md w-full bg-space-dark/80 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-purple-300">Customer Login</h2>
        <form onSubmit={handleLogin}>
          <Input className="mb-4" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <Input className="mb-4" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          {error && <div className="text-red-400 mb-2">{error}</div>}
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  );
}
