import { PiChats } from "react-icons/pi";
import { Phone } from 'lucide-react'

export function HeroSection() {
    return (
        <section className="bg-primary py-20 2xl:px-32 xl:px-28 lg:px-20 md:px-10 px-6 2xl:mt-20 xl:mt-16 lg:mt-16 mt-12 relative">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header  */}
                <div className="flex flex-col items-center justify-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full mb-6">
                        <PiChats size={32} className="text-primary" />
                    </div>
                    <h2 className="max-w-3xl lg:text-5xl md:text-4xl text-3xl font-semibold text-white text-center leading-none font-playfair">
                        Get in Touch with <span className="text-secondary">AI Estate Dubai </span>
                    </h2>
                    <p className="text-gray-400 mt-6 lg:text-lg text-center">
                        Connect with our team for personalized consultation and discover how our AI-powered lead generation can transform your real estate business in Dubai's premium market.
                    </p>
                </div>

                {/* Section Content  */}
                <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
                    <a
                        href="https://wa.me/971501234567"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-secondary text-accent-foreground rounded font-cta font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
                    >
                        <PiChats size={20} />
                        <span>WhatsApp Us</span>
                    </a>
                    <a
                        href="tel:+971501234567"
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-foreground rounded font-cta font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
                    >
                        <Phone size={20} />
                        <span>Call Now</span>
                    </a>
                </div>
            </div>
        </section>
    )
}
