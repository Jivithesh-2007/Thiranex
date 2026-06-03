import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function SignupPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', phone: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await register(form);
      window.dispatchEvent(new CustomEvent('shophub-toast', { detail: { type: 'success', message: 'Account created' } }));
      navigate('/account');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="container section auth-page">
      <form className="checkout-card auth-card" onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        {['firstName', 'lastName', 'email', 'password', 'phone'].map((field) => (
          <input
            key={field}
            type={field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
            placeholder={field}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            required={field !== 'phone'}
          />
        ))}
        {error && <div className="error-box">{error}</div>}
        <button className="btn btn-primary">Sign up</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </main>
  );
}
