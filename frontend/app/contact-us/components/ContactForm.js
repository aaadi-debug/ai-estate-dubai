'use client';

import { useState } from 'react';
import { FaRegCircleCheck } from "react-icons/fa6";
import { HiPaperAirplane } from "react-icons/hi2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        contactMethod: 'email'
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        // if (!formData.email.trim()) {
        //     newErrors.email = 'Email is required';
        // } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        //     newErrors.email = 'Please enter a valid email address';
        // }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            setSubmitSuccess(true);
            setFormData({ name: '', phone: '', message: '', contactMethod: 'phone' });

            setTimeout(() => setSubmitSuccess(false), 5000);
        } catch (err) {
            alert(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
            {/* Success Message */}
            {submitSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-500 rounded-md p-4 flex items-start space-x-3">
                    <FaRegCircleCheck size={20} className="text-success mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="font-semibold">Message sent successfully!</p>
                        <p className="text-sm mt-1">We'll get back to you within 2-3 hours.</p>
                    </div>
                </div>
            )}

            <h2 className="lg:text-3xl text-lg font-bold text-primary text-left leading-none font-playfair">
                Send Us a Message
            </h2>
            <p className="text-gray-500 text-left leading-none -mt-2">
                Fill out the form below and our team will get back to you within 2-3 hours.
            </p>
            {/* Name */}
            <div>
                <label htmlFor="name" className="block font-medium text-primary mb-2">
                    Full Name <span className='text-red-500'>*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-md border ${errors.name ? 'border-error' : 'border-gray-300'
                        } bg-gray-100 text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary transition-all`}
                    placeholder="John Doe"
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-error">{errors.name}</p>
                )}
            </div>

            {/* Email */}
            {/* <div>
                <label htmlFor="email" className="block font-medium text-primary mb-2">
                    Email Address <span className='text-red-500'>*</span>
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-md border ${errors.email ? 'border-error' : 'border-gray-300'
                        } bg-gray-100 text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary transition-all`}
                    placeholder="john@example.com"
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-error">{errors.email}</p>
                )}
            </div> */}

            {/* Phone */}
            <div>
                <label htmlFor="phone" className="block font-medium text-primary mb-2">
                    Phone Number <span className='text-red-500'>*</span>
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-md border ${errors.phone ? 'border-error' : 'border-gray-300'
                        } bg-gray-100 text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary transition-all`}
                    placeholder="+971 50 123 4567"
                />
                {errors.phone && (
                    <p className="mt-1 text-sm text-error">{errors.phone}</p>
                )}
            </div>

            {/* Company */}
            {/* <div>
                <label htmlFor="company" className="block font-medium text-primary mb-2">
                    Company / Agency (Optional)
                </label>
                <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-100 text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                    placeholder="Dubai Properties Group"
                />
            </div> */}

            {/* Preferred Contact Method */}
            <div>
                <label htmlFor="contactMethod" className="block font-medium text-primary mb-2">
                    Preferred Contact Method
                </label>
                <select
                    id="contactMethod"
                    name="contactMethod"
                    value={formData.contactMethod}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-100 text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                >
                    {/* <option value="email">Email</option> */}
                    <option value="phone">Phone Call</option>
                    <option value="whatsapp">WhatsApp</option>
                </select>
            </div>

            {/* Message */}
            <div>
                <label htmlFor="message" className="block font-medium text-primary mb-2">
                    Message <span className='text-red-500'>*</span>
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-md border ${errors.message ? 'border-error' : 'border-gray-300'
                        } bg-gray-100 text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary transition-all resize-none`}
                    placeholder="Tell us about your real estate business and how we can help..."
                />
                {errors.message && (
                    <p className="mt-1 text-sm text-error">{errors.message}</p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-secondary text-primary rounded-md font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2 cursor-pointer"
            >
                {isSubmitting ? (
                    <>
                        <AiOutlineLoading3Quarters size={20} className="animate-spin" />
                        <span>Sending...</span>
                    </>
                ) : (
                    <>
                        <HiPaperAirplane size={20} />
                        <span>Send Message</span>
                    </>
                )}
            </button>

            <p className="text-sm text-gray-500 text-center">
                By submitting this form, you agree to our privacy policy and terms of service.
            </p>
        </form>
    );
}