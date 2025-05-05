import { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

export default function CompanyLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/company/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('company', JSON.stringify(data.company));
      window.location.href = '/company/dashboard';
    } else {
      setError(data.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-space-gradient flex items-center justify-center">
      <div className="max-w-md w-full bg-space-dark/80 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-purple-300">Company Login</h2>
        <form onSubmit={handleLogin}>
          <Input className="mb-4" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <Input className="mb-4" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          {error && <div className="text-red-400 mb-2">{error}</div>}
          <Button className="w-full" type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
} 