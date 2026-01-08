'use client';

import { useState } from 'react';
import Link from 'next/link';
import { UserRound, Mail, Phone, Lock } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Important for styling
import { isPossiblePhoneNumber, isValidPhoneNumber } from 'react-phone-number-input';

export default function AgentRegistratonForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    whatsappNumber: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!form.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(form.name.trim())) {
      newErrors.name = 'Name should only contain letters and spaces';
    }

    // Email validation
    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!form.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!isPossiblePhoneNumber(form.phone) || !isValidPhoneNumber(form.phone)) {
      newErrors.phone = 'Please enter a valid phone number with country code';
    }

    // WhatsApp validation
    if (!form.whatsappNumber) {
      newErrors.whatsappNumber = 'WhatsApp number is required';
    } else if (!isPossiblePhoneNumber(form.whatsappNumber) || !isValidPhoneNumber(form.whatsappNumber)) {
      newErrors.whatsappNumber = 'Please enter a valid WhatsApp number with country code';
    }

    // Password validation
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and a number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage('Please fix the errors above');
      return;
    }

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
        localStorage.setItem('plan', data.agent.plan || 'none'); // store plan

        setMessage('Success! Redirecting to dashboard...');
        setTimeout(() => window.location.href = '/agent-registration/buy-plan', 1500);
      } else {
        setMessage(data.error || 'Registration failed');
        setErrors({ server: data.error || 'Registration failed' });
      }
    } catch (err) {
      setMessage('Network error. Please try again.');
      setErrors({ server: 'Network error. Please try again.' });
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-8 max-sm:p-4 border border-gray-200">
      <h1 className="text-3xl max-sm:text-xl font-bold font-playfair mb-8">Create Agent Account</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div className='relative'>
          <UserRound name="UserIcon" size={20} className="absolute left-3 top-14 -translate-y-1/2 text-gray-500 max-sm:top-13" />
          <label htmlFor="company" className="block font-medium text-primary mb-2 max-sm:text-sm">
            Full Name <span className='text-red-500'>*</span>
          </label>
          <input
            type="text"
            placeholder="John Doe"
            required
            className={`w-full pl-11 pr-4 py-3 rounded-md border max-sm:text-sm ${errors.name ? 'border-red-500' : 'border-gray-300'
              } bg-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary transition-all`}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className='relative'>
          <Mail name="UserIcon" size={20} className="absolute left-3 top-14 -translate-y-1/2 text-gray-500 max-sm:top-13" />
          <label htmlFor="company" className="block font-medium text-primary mb-2 max-sm:text-sm">
            Email Address <span className='text-red-500'>*</span>
          </label>
          <input
            type="email"
            placeholder="john@example.com"
            required
            className={`w-full pl-11 pr-4 py-3 rounded-md border max-sm:text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'
              } bg-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary transition-all`}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Phone Number with Country Dropdown */}
        <div className='relative'>
          {/* <Phone name="UserIcon" size={20} className="absolute left-3 top-14 -translate-y-1/2 text-gray-500" /> */}
          <label htmlFor="company" className="block font-medium text-primary mb-2 max-sm:text-sm">
            Phone Number <span className='text-red-500'>*</span>
          </label>
          {/* <input
            type="tel"
            placeholder="+971 50 123 4567"
            required
            className="w-full pl-11 pr-4 py-3 rounded-md border max-sm:text-sm border-gray-300 bg-gray-100 text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          /> */}
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            defaultCountry="AE" // Default to UAE, change as needed
            placeholder="Enter phone number"
            value={form.phone}
            onChange={(value) => setForm({ ...form, phone: value || '' })}
            className={`w-full pl-4 pr-4 py-3 rounded-md border max-sm:text-sm ${errors.phone ? 'border-red-500' : 'border-gray-300'} bg-gray-100 text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary transition-all`}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* WhatsApp Number with Country Dropdown */}
        <div className='relative'>
          {/* <FaWhatsapp name="UserIcon" size={20} className="absolute left-3 top-14 -translate-y-1/2 text-gray-500" /> */}
          <label htmlFor="company" className="block font-medium text-primary mb-2 max-sm:text-sm">
            WhatsApp Number <span className='text-red-500'>*</span>
          </label>
          {/* <input
            type="tel"
            placeholder="WhatsApp Number (with country code)"
            required
            className="w-full pl-11 pr-4 py-3 rounded-md border max-sm:text-sm border-gray-300 bg-gray-100 text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
            onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
          /> */}
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            defaultCountry="AE"
            placeholder="Enter WhatsApp number"
            value={form.whatsappNumber}
            onChange={(value) => setForm({ ...form, whatsappNumber: value || '' })}
            className={`w-full pl-4 pr-4 py-3 rounded-md border max-sm:text-sm ${errors.whatsappNumber ? 'border-red-500' : 'border-gray-300'} bg-gray-100 text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary transition-all`}
          />
          {errors.whatsappNumber && <p className="text-red-500 text-sm mt-1">{errors.whatsappNumber}</p>}
        </div>

        {/* Password */}
        <div className='relative'>
          <Lock name="UserIcon" size={20} className="absolute left-3 top-14 -translate-y-1/2 text-gray-500 max-sm:top-13" />
          <label htmlFor="company" className="block font-medium text-primary mb-2 max-sm:text-sm">
            Create Password <span className='text-red-500'>*</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            required
            minLength="6"
            className={`w-full pl-11 pr-4 py-3 rounded-md border max-sm:text-sm ${errors.password ? 'border-red-500' : 'border-gray-300'
              } bg-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary transition-all`}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Server or general error */}
        {errors.server && <p className="text-red-500 text-center font-medium">{errors.server}</p>}

        <button type="submit" className="w-full bg-secondary text-primary rounded-lg py-3 max-sm:text-sm font-medium cursor-pointer hover:scale-105 transition duration-300">
          Sign Up
        </button>
      </form>

      <p className="text-center mt-6 text-gray-500 max-sm:text-sm">
        Already have an account?  <Link href="/login" className="text-secondary outline-none font-medium">Log in</Link>
      </p>
      {message && !errors.server && (
        <p className={`text-center mt-4 font-medium ${message.includes('Success') ? 'text-green-600' : 'text-blue-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}