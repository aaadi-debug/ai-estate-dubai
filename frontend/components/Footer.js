'use client';
import { Mail, Phone, MessagesSquare, ShieldCheck, TicketCheck, Lock, CircleCheck } from 'lucide-react'
import { PiChats } from "react-icons/pi";
import Link from 'next/link';

const Footer = ({ className = '' }) => {
    const currentYear = new Date().getFullYear();

    // Icon mapping: string name → React component
    const iconMap = {
        PiChats: PiChats,
        Phone: Phone,
        Mail: Mail,
    };

    const footerLinks = {
        product: [
            { label: 'Features', href: '/homepage#features' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'How It Works', href: '/homepage#how-it-works' },
            { label: 'Integrations', href: '/homepage#integrations' }
        ],
        company: [
            { label: 'About Us', href: '/homepage#about' },
            { label: 'Case Studies', href: '/homepage#testimonials' },
            { label: 'Contact', href: '/contact' },
            { label: 'Security', href: '/security' }
        ],
        legal: [
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Service', href: '/terms' },
            { label: 'Cookie Policy', href: '/cookies' },
            { label: 'GDPR Compliance', href: '/security#gdpr' }
        ],
        support: [
            { label: 'Help Center', href: '/help' },
            { label: 'API Documentation', href: '/api-docs' },
            { label: 'System Status', href: '/status' },
            { label: 'Contact Support', href: '/contact' }
        ]
    };

    const socialLinks = [
        { icon: 'Mail', href: 'mailto:aiestatedubai5@gmail.com', label: 'Email' },
        { icon: 'Phone', href: 'tel:+919289584268', label: 'Phone' },
        { icon: 'PiChats', href: 'https://wa.me/+919289584268', label: 'WhatsApp' }
    ];

    return (
        <footer className={`bg-primary text-primary-foreground ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
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
                    <div>
                        <h3 className="font-playfair text-white font-bold text-sm uppercase tracking-wider mb-4">Product</h3>
                        <ul className="space-y-2">
                            {footerLinks.product.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-accent transition-colors duration-300 text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-playfair text-white font-bold text-sm uppercase tracking-wider mb-4">Company</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-accent transition-colors duration-300 text-sm"
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
                                        className="text-gray-400 hover:text-accent transition-colors duration-300 text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="font-playfair text-white font-bold text-sm uppercase tracking-wider mb-4">Support</h3>
                        <ul className="space-y-2">
                            {footerLinks.support.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-accent transition-colors duration-300 text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
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
                            <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-accent transition-colors duration-300">
                                Privacy
                            </Link>
                            <Link href="/terms-and-conditions" className="text-sm text-gray-400 hover:text-accent transition-colors duration-300">
                                Terms
                            </Link>
                            <Link href="/cookies" className="text-sm text-gray-400 hover:text-accent transition-colors duration-300">
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