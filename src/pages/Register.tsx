import { Link, Navigate } from 'react-router-dom';

import { useAuthStore } from '../stores/authStore/auth.store';
import { useState } from 'react';

export default function Register() {
  const { register, token } = useAuthStore();
  const loading = useAuthStore((s) => s.loading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await register(name, email, password);
    } catch {
      setError('No se pudo crear la cuenta');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F14]">
      <div className="w-full max-w-md bg-[#111827] border border-gray-800 rounded-xl p-8 shadow-xl">
        {/* Brand */}
        <h1 className="text-3xl font-semibold text-white mb-1">
          Create account
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          Betting app · Secure access
        </p>

        {/* Error */}
        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="name"
            required
            placeholder="Name"
            className="w-full bg-transparent border border-gray-700 text-white rounded-lg px-3 py-2 outline-none focus:border-emerald-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            required
            placeholder="Email"
            className="w-full bg-transparent border border-gray-700 text-white rounded-lg px-3 py-2 outline-none focus:border-emerald-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="w-full bg-transparent border border-gray-700 text-white rounded-lg px-3 py-2 outline-none focus:border-emerald-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            disabled={loading}
            className="w-full mt-2 bg-emerald-500 text-black font-medium py-2 rounded-lg hover:bg-emerald-400 transition disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-400 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
