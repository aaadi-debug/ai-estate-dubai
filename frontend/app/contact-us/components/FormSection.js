import ContactForm from "./ContactForm";
import {
    Phone,
    Mail,
    Clock,
} from 'lucide-react';
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export function FormSection() {
    const contactMethods = [
        {
            icon: Phone,
            title: 'Phone',
            value: '+971 50 123 4567',
            link: 'tel:+971501234567',
            description: 'Mon-Fri, 9AM-6PM GST',
            isExternal: false,
        },
        {
            icon: Mail,
            title: 'Email',
            value: 'contact@aiestate.ae',
            link: 'mailto:contact@aiestate.ae',
            description: 'We reply within 24 hours',
            isExternal: false,
        },
        {
            icon: FaWhatsapp,
            title: 'WhatsApp',
            value: '+971 50 123 4567',
            link: 'https://wa.me/971501234567',
            description: 'Instant messaging support',
            isExternal: true,
        },
    ];
    return (
        <section className="bg-[#FAFBFC] py-20 2xl:px-32 xl:px-28 lg:px-20 md:px-10 px-6 relative">
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Left Side  */}
                <ContactForm />

                {/* Right Side  */}
                <div className="bg-card rounded-lg shadow-lg p-6 lg:p-8">
                    <h2 className="font-playfair lg:text-3xl text-lg font-bold text-primary mb-6">
                        Contact Information
                    </h2>

                    <div className="space-y-6">
                        {contactMethods.map((method, index) => {
                            const IconComponent = method.icon;

                            return (
                                <Link
                                    key={index}
                                    href={method.link}
                                    target={method.isExternal ? '_blank' : undefined}
                                    rel={method.isExternal ? 'noopener noreferrer' : undefined}
                                    className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-100 transition-all duration-300 group"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-secondary group-hover:scale-110 transition-all duration-300">
                                        <IconComponent
                                            size={24}
                                            className="text-secondary group-hover:text-primary transition-colors duration-300"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-playfair font-semibold text-primary mb-1">
                                            {method.title}
                                        </h3>
                                        <p className="text-secondary font-medium mb-1">
                                            {method.value}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {method.description}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Business Hours */}
                    <div className="mt-8 pt-8 border-t border-gray-200">
                        <h3 className="font-playfair font-semibold text-foreground mb-4">
                            Business Hours
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Monday - Friday</span>
                                <span className="text-primary font-medium">9:00 AM - 6:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Saturday</span>
                                <span className="text-primary font-medium">10:00 AM - 4:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Sunday</span>
                                <span className="text-primary font-medium">Closed</span>
                            </div>
                        </div>
                    </div>

                    {/* Response Time */}
                    <div className="mt-8 pt-8 border-t border-gray-200">
                        <h3 className="font-playfair font-semibold text-primary mb-4">
                            Response Time
                        </h3>
                        <div className="flex items-start space-x-3">
                            <Clock size={20} className="text-secondary mt-0.5 flex-shrink-0" />
                            <p className="font-body text-sm text-gray-500">
                                We typically respond to all inquiries within 24 hours during business days. For urgent matters, please contact us via WhatsApp for immediate assistance.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}