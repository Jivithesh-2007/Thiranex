import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(form);
      window.dispatchEvent(new CustomEvent('shophub-toast', { detail: { type: 'success', message: 'Welcome back!' } }));
      navigate('/account');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="container section auth-page">
      <form className="checkout-card auth-card" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <div className="error-box">{error}</div>}
        <button className="btn btn-primary">Login</button>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </form>
    </main>
  );
}
