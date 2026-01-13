import Link from 'next/link'
import React from 'react'

const PrivacyPolicy = () => {
  return (
    <>
      <div className="bg-primary py-20 2xl:px-32 xl:px-28 lg:px-20 md:px-10 px-6 2xl:mt-20 xl:mt-16 lg:mt-16 mt-12 relative">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-3xl max-sm:text-2xl font-bold text-secondary">Privacy Policy</h1>
          <p className="mt-2 text-blue-100 max-sm:text-sm">Last Updated: January 10, 2026</p>
        </div>
      </div>

      <div className="flex-grow w-full mx-auto 2xl:px-32 xl:px-28 lg:px-20 md:px-10 px-6 py-12 prose prose-lg max-w-5xl">
        <p className="text-lg mb-8">
          At AI Estate Dubai ("we", "us", or "our"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard personal information when you use our website, AI-powered chatbot service, agent dashboard, and related features (collectively, the "Service").
        </p>

        <p className="mb-8">
          By accessing or using the Service, you agree to the practices described in this Policy. If you do not agree, please do not use the Service.
        </p>

        <h2 className="text-2xl font-bold mt-10">1. Information We Collect</h2>

        <h3 className="text-xl font-semibold mt-6">A. Information from Agents (You)</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Account information: name, email, phone, WhatsApp number, agency name, RERA number, bio</li>
          <li>Payment information (processed securely via Razorpay — we do not store card details)</li>
          <li>Usage data: dashboard activity, leads viewed, conversations initiated</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">B. Information from Website Visitors / Leads</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Contact details: name, phone, email</li>
          <li>Property preferences: budget, property type, location preferences, preferred date/time</li>
          <li>Chat messages and interaction history (processed by AI)</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>To provide and maintain the Service (lead capture, notifications, dashboard access)</li>
          <li>To improve our AI chatbot (anonymized training data only)</li>
          <li>To process payments and subscriptions</li>
          <li>To send service updates, support messages, and marketing (with consent)</li>
          <li>To comply with UAE Federal Decree-Law No. 45/2021 on Personal Data Protection</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10">3. AI & Automated Processing</h2>
        <p>
          Our AI chatbot uses large language models to collect and respond to visitor inquiries. All data processed by AI is handled in accordance with this Policy and is used only for lead generation purposes.
        </p>

        <h2 className="text-2xl font-bold mt-10">4. Data Sharing & Third Parties</h2>
        <p>We do not sell your data. We share information only with:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>The agent who owns the chatbot (lead data)</li>
          <li>Payment processor: Razorpay</li>
          <li>Notification providers: Twilio (SMS/WhatsApp), SendGrid/Gmail (email)</li>
          <li>Calendar integration: Google Calendar</li>
          <li>Workflow automation: n8n</li>
        </ul>
        <p className="mt-4">
          All third parties are contractually bound to protect your data and comply with applicable laws.
        </p>

        <h2 className="text-2xl font-bold mt-10">5. Data Storage, Security & Retention</h2>
        <p>
          Data is stored on secure cloud servers (MongoDB Atlas) with encryption in transit and at rest. We retain data only as long as necessary:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Agent account data: until account deletion</li>
          <li>Lead data: 3 years (or earlier if deleted by agent)</li>
          <li>Chat logs: 90 days (anonymized after)</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10">6. Your Rights (UAE PDPL & GDPR)</h2>
        <p>You have the right to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Access, correct, or delete your data</li>
          <li>Object to or restrict processing</li>
          <li>Withdraw consent</li>
          <li>Portability (in machine-readable format)</li>
        </ul>
        <p className="mt-4">
          To exercise these rights, email <a href="mailto:aiestatedubai5@gmail.com" className="text-blue-600 hover:underline">aiestatedubai5@gmail.com</a>. We respond within 30 days.
        </p>

        <h2 className="text-2xl font-bold mt-10">7. Cookies & Tracking</h2>
        <p>
          We use essential cookies for site functionality and analytics cookies (Google Analytics) for usage insights. See our <Link href="/cookies-policy" className="text-blue-600 hover:underline">Cookies Policy</Link> for details.
        </p>

        <h2 className="text-2xl font-bold mt-10">8. Children's Privacy</h2>
        <p>
          Our Service is not directed to children under 18. We do not knowingly collect data from children.
        </p>

        <h2 className="text-2xl font-bold mt-10">9. Changes to this Policy</h2>
        <p>
          We may update this Policy. Changes will be posted here with the updated "Last Updated" date.
        </p>

        <h2 className="text-2xl font-bold mt-10">10. Contact Us</h2>
        <p>
          For privacy questions or data rights requests: <a href="mailto:aiestatedubai5@gmail.com" className="text-blue-600 hover:underline">aiestatedubai5@gmail.com</a>
        </p>
      </div>
    </>
  )
}

export default PrivacyPolicy