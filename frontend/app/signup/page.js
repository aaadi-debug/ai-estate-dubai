'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    whatsappNumber: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Creating account...');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('agentId', data.agent.id);
        setMessage('Success! Redirecting to dashboard...');
        setTimeout(() => window.location.href = '/dashboard', 1500);
      } else {
        setMessage(data.error || 'Error');
      }
    } catch (err) {
      setMessage('Network error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Create Agent Account</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="tel"
            placeholder="Phone"
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            type="tel"
            placeholder="WhatsApp Number (with country code)"
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
            onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            minLength="6"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-600"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button type="submit" className="w-full btn-primary py-3 text-lg font-medium">
            Sign Up
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Already have an account? <Link href="/login" className="text-blue-600 font-medium">Log in</Link>
        </p>
        {message && <p className="text-center mt-4 font-medium">{message}</p>}
      </div>
    </div>
  );
}