'use client';
import { Mail, Phone, MessagesSquare, ShieldCheck, TicketCheck, Lock, CircleCheck } from 'lucide-react'
import { PiChats } from "react-icons/pi";
import { FaWhatsapp } from "react-icons/fa";
import { FiLinkedin } from "react-icons/fi";
import { BsInstagram } from "react-icons/bs";
import Link from 'next/link';

const Footer = ({ className = '' }) => {
    const currentYear = new Date().getFullYear();

    // Icon mapping: string name → React component
    const iconMap = {
        PiChats: PiChats,
        FiLinkedin: FiLinkedin,
        BsInstagram: BsInstagram,
    };

    const footerLinks = {
        product: [
            { label: 'Features', href: '/homepage#features' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'How It Works', href: '/homepage#how-it-works' },
            { label: 'Integrations', href: '/homepage#integrations' }
        ],
        company: [
            // { label: 'Home', href: '/' },
            { label: 'Pricing', href: '/pricing' },
            // { label: 'About Us', href: '/about-us' },
            // { label: 'Case Studies', href: '/homepage#testimonials' },
            { label: 'Security', href: '/security' },
            { label: 'Contact Us', href: '/contact-us' },
        ],
        legal: [
            { label: 'Privacy Policy', href: '/privacy-policy' },
            { label: 'Terms of Service', href: '/terms-and-conditions' },
            { label: 'Cookie Policy', href: '/cookies-policy' },
            // { label: 'GDPR Compliance', href: '/security#gdpr' }
        ],
        support: [
            { label: 'Help Center', href: '/help' },
            { label: 'API Documentation', href: '/api-docs' },
            { label: 'System Status', href: '/status' },
            { label: 'Contact Support', href: '/contact' }
        ]
    };

    const socialLinks = [
        { icon: 'FiLinkedin', href: 'https://www.linkedin.com/company/aiestatedubai/', label: 'LinkedIn' },
        { icon: 'BsInstagram', href: 'https://www.instagram.com/aiestatedubai/', label: 'Instagram' },
    ];

    return (
        <footer className={`bg-primary text-primary-foreground ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
                {/* <div className="grid lg:grid-cols-5 gap-8 mb-12"> */}
                    {/* Brand Column */}
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center gap-2">
                            <img
                                src='/assets/images/logo.png'
                                alt='AI Estate Dubai Logo'
                                width={100}
                                height={100}
                                className='rounded-xl 2xl:w-[120px] xl:w-[110px] lg:w-[100px] w-[120px]'
                            />
                            <div className='flex flex-col'>
                                <span className="font-playfair 2xl:text-2xl xl:text-2xl font-bold text-white leading-none">AI Estate</span>
                                <span className="text-2xl font-bold text-secondary leading-none">Dubai</span>
                            </div>
                        </Link>
                        <p className="text-gray-400 mb-4 max-w-xs mt-4">
                            Dubai's premium AI assistant for real estate professionals. Never miss a lead again with 24/7 intelligent lead capture.
                        </p>
                        <div className="flex items-center space-x-4">
                            {socialLinks.map((social) => {
                                const IconComponent = iconMap[social.icon] || PiChats; // fallback icon

                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-white/20 text-white hover:bg-secondary hover:text-primary flex items-center justify-center transition-all duration-300"
                                        aria-label={social.label}
                                    >
                                        <IconComponent size={18} />
                                    </a>
                                )
                            })}
                        </div>
                    </div>

                    {/* Product Links */}
                    {/* <div>
                        <h3 className="font-playfair text-white font-bold text-sm uppercase tracking-wider mb-4">Product</h3>
                        <ul className="space-y-2">
                            {footerLinks.product.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div> */}
                    {/* Company Links */}
                    <div>
                        <h3 className="font-playfair text-white font-bold text-sm uppercase tracking-wider mb-4">Company</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="font-playfair text-white font-bold text-sm uppercase tracking-wider mb-4">Legal</h3>
                        <ul className="space-y-2">
                            {footerLinks.legal.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Contacts */}
                    <div className='col-span-2'>
                        <h3 className="font-playfair text-white font-bold text-sm uppercase tracking-wider mb-4">Quick Contacts</h3>
                        <ul className="space-y-2">
                            <li className='flex items-center gap-2 group'>
                                <span
                                    className="w-8 h-8 rounded-full bg-white/20 text-white group-hover:bg-secondary group-hover:text-primary flex items-center justify-center transition-all duration-300"
                                >
                                    <Mail size={16} />
                                </span>
                                <a
                                    href="mailto:aiestatedubai5@gmail.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className='text-gray-400 group-hover:text-white transition-colors duration-300 text-sm'
                                    aria-label="Email"
                                >
                                    aiestatedubai5@gmail.com
                                </a>
                            </li>
                            <li className='flex items-center gap-2 group'>
                                <span
                                    className="w-8 h-8 rounded-full bg-white/20 text-white group-hover:bg-secondary group-hover:text-primary flex items-center justify-center transition-all duration-300"
                                >
                                    <Phone size={16} />
                                </span>
                                <a
                                    href="tel:+919289584268"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className='text-gray-400 group-hover:text-white transition-colors duration-300 text-sm'
                                    aria-label="Email"
                                >
                                    +91-9289584268
                                </a>
                            </li>
                            <li className='flex items-center gap-2 group'>
                                <span
                                    className="w-8 h-8 rounded-full bg-white/20 text-white group-hover:bg-secondary group-hover:text-primary flex items-center justify-center transition-all duration-300"
                                >
                                    <FaWhatsapp size={16} />
                                </span>
                                <a
                                    href="https://wa.me/+919289584268"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className='text-gray-400 group-hover:text-white transition-colors duration-300 text-sm'
                                    aria-label="Email"
                                >
                                    +91-9289584268
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    {/* <div>
                        <h3 className="font-playfair text-white font-bold text-sm uppercase tracking-wider mb-4">Support</h3>
                        <ul className="space-y-2">
                            {footerLinks.support.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div> */}
                </div>

                {/* Trust Badges */}
                <div className="border-t border-gray-400 py-8">
                    <div className="flex flex-wrap items-center justify-center gap-8">
                        <div className="flex items-center space-x-2">
                            <ShieldCheck size={20} className="text-green-500" />
                            <span className="text-sm text-gray-400">UAE Business Certified</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Lock size={20} className="text-green-500" />
                            <span className="text-sm text-gray-400">GDPR Compliant</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CircleCheck size={20} className="text-secondary" />
                            <span className="text-sm text-gray-400">WhatsApp Business Partner</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <TicketCheck size={20} className="text-green-500" />
                            <span className="text-sm text-gray-400">ISO 27001 Certified</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-400 pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-gray-400 text-center md:text-left">
                            &copy; {currentYear} AI Estate Dubai. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-6">
                            <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
                                Privacy
                            </Link>
                            <Link href="/terms-and-conditions" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
                                Terms
                            </Link>
                            <Link href="/cookies-policy" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
                                Cookies
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;