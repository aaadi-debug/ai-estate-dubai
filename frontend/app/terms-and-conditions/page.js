import Link from 'next/link'
import React from 'react'

const TermsAndConditions = () => {
  return (
    <>
      <div className="bg-primary py-20 2xl:px-32 xl:px-28 lg:px-20 md:px-10 px-6 2xl:mt-20 xl:mt-16 lg:mt-16 mt-12 relative">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-3xl max-sm:text-2xl font-bold text-secondary">Terms of Service</h1>
          <p className="mt-2 text-blue-100 max-sm:text-sm">Last Updated: January 10, 2026</p>
        </div>
      </div>

      <div className="flex-grow w-full mx-auto 2xl:px-32 xl:px-28 lg:px-20 md:px-10 px-6 py-12 prose prose-lg max-w-5xl">
        <p className="text-lg mb-8">
          Welcome to AI Estate Dubai ("we", "us", or "our"). These Terms of Service ("Terms") govern your access to and use of our website, AI-powered chatbot service, agent dashboard, subscription plans, and related features (collectively, the "Service").
        </p>

        <p className="mb-8">
          By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, you must not use the Service.
        </p>

        <h2 className="text-2xl font-bold mt-10">1. Eligibility</h2>
        <p>
          You must be at least 18 years old and legally capable of entering contracts to use the Service. By using the Service, you represent that you meet these requirements.
        </p>

        <h2 className="text-2xl font-bold mt-10">2. Account & Subscription</h2>
        <p>
          To access full features, you must create an agent account and subscribe to a plan (Starter, Professional, Elite). Subscriptions auto-renew monthly unless cancelled. You may cancel anytime via dashboard — no refunds except as required by law.
        </p>

        <h2 className="text-2xl font-bold mt-10">3. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use the Service for illegal or fraudulent purposes</li>
          <li>Send spam, abusive messages, or overload the system</li>
          <li>Attempt to reverse engineer, copy, or scrape the AI chatbot</li>
          <li>Use the Service to violate any person’s privacy or data protection rights</li>
        </ul>
        <p className="mt-4">
          Violation may result in immediate suspension or termination.
        </p>

        <h2 className="text-2xl font-bold mt-10">4. AI & Lead Generation</h2>
        <p>
          Our AI chatbot is designed to collect lead information from website visitors. Leads belong to the agent. We do not guarantee lead quality, conversion, or any business outcome. The Service is provided "as is".
        </p>

        <h2 className="text-2xl font-bold mt-10">5. Third-Party Services</h2>
        <p>
          The Service uses Razorpay (payments), Twilio (SMS/WhatsApp), Google Calendar, Gmail/SendGrid (email), and n8n (automation). Your use of these is governed by their terms.
        </p>

        <h2 className="text-2xl font-bold mt-10">6. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, AI Estate Dubai shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from use of the Service.
        </p>

        <h2 className="text-2xl font-bold mt-10">7. Disclaimer – Real Estate Services</h2>
        <p>
          We are not licensed real estate brokers. We provide technology tools only. Any property information or advice obtained through the Service is for informational purposes only.
        </p>

        <h2 className="text-2xl font-bold mt-10">8. Termination</h2>
        <p>
          We may suspend or terminate your access at any time for violation of these Terms or at our discretion.
        </p>

        <h2 className="text-2xl font-bold mt-10">9. Governing Law</h2>
        <p>
          These Terms are governed by the laws of the United Arab Emirates. Disputes shall be resolved in the courts of Dubai.
        </p>

        <h2 className="text-2xl font-bold mt-10">10. Changes to Terms</h2>
        <p>
          We may update these Terms. Continued use after changes constitutes acceptance.
        </p>

        <h2 className="text-2xl font-bold mt-10">11. Contact</h2>
        <p>
          Questions or concerns: <Link href="mailto:support@aiestatedubai.com" className="text-blue-600 hover:underline">support@aiestatedubai.com</Link>
        </p>
      </div>
    </>
  )
}

export default TermsAndConditions