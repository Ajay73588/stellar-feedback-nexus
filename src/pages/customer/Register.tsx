import { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

export default function CustomerRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const res = await fetch('/api/customer/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess('Registration successful! You can now log in.');
      setName(''); setEmail(''); setPassword('');
    } else {
      setError(data.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-space-gradient flex items-center justify-center">
      <div className="max-w-md w-full bg-space-dark/80 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-purple-300">Customer Register</h2>
        <form onSubmit={handleRegister}>
          <Input className="mb-4" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
          <Input className="mb-4" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <Input className="mb-4" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          {error && <div className="text-red-400 mb-2">{error}</div>}
          {success && <div className="text-green-400 mb-2">{success}</div>}
          <Button className="w-full" type="submit">Register</Button>
        </form>
      </div>
    </div>
  );
} 