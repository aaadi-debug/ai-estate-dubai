import { FAQs } from './components/FAQs';
import { FormSection } from './components/FormSection';
import { HeroSection } from './components/HeroSection';

export const metadata = {
    title: 'Contact Us - AI Estate Dubai',
    description: 'Get in touch with AI Estate Dubai through WhatsApp, email, or phone. Schedule a consultation with our team for premium real estate lead generation solutions.',
};

export default function ContactPage() {
    return (
        <>
            <HeroSection />
            <FormSection />
            <FAQs />
        </>
    );
}