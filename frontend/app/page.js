// frontend/app/page.js
import { ClientChatWidget } from '@/components/chat/ClientChatWidget';
import { Herosection } from '@/components/Herosection';
import { Features } from '@/components/Features';
import { Testimonials } from '@/components/Testimonials';
import PricingSection from '@/components/Pricing';
import CTASection from '@/components/CtaSection';

export default function Home() {
  return (
    <>
      <Herosection />
      <Features />
      <Testimonials />
      <PricingSection />
      <CTASection />

      {/* Add Chat Widget Here */}
      {/* <ChatWidget /> */}
      <ClientChatWidget agentId="demo-agent-123" />
    </>
  );
}