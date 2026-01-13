import React from 'react'

const CookiesPolicy = () => {
  return (
    <>
      <div className="bg-primary py-20 2xl:px-32 xl:px-28 lg:px-20 md:px-10 px-6 2xl:mt-20 xl:mt-16 lg:mt-16 mt-12 relative">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-3xl max-sm:text-2xl font-bold text-secondary">Cookies Policy</h1>
          <p className="mt-2 text-blue-100 max-sm:text-sm">Last Updated: January 10, 2026</p>
        </div>
      </div>

      <div className="flex-grow w-full mx-auto 2xl:px-32 xl:px-28 lg:px-20 md:px-10 px-6 py-12 prose prose-lg max-w-5xl">
        <p className="text-lg mb-8">
          This Cookies Policy explains how AI Estate Dubai ("we", "us", or "our") uses cookies and similar technologies when you visit our website and use our Service.
        </p>

        <h2 className="text-2xl font-bold mt-10">1. What Are Cookies?</h2>
        <p>
          Cookies are small text files stored on your device (computer, phone, etc.) by websites you visit. They help the site remember information about your visit.
        </p>

        <h2 className="text-2xl font-bold mt-10">2. Cookies We Use</h2>

        <h3 className="text-xl font-semibold mt-6">Essential Cookies</h3>
        <p>
          These are required for the website to function properly (e.g., session management, authentication). They cannot be disabled.
        </p>

        <h3 className="text-xl font-semibold mt-6">Analytics Cookies</h3>
        <p>
          We use Google Analytics to understand how visitors use our site (pages viewed, time spent, etc.). Data is anonymized. You can opt out via Google Analytics settings.
        </p>

        <h3 className="text-xl font-semibold mt-6">Third-Party Cookies</h3>
        <p>
          Razorpay (payment processing), Twilio (notifications), and Google services may place cookies when you interact with those features.
        </p>

        <h2 className="text-2xl font-bold mt-10">3. How to Manage Cookies</h2>
        <p>
          You can control cookies through your browser settings. Most browsers allow you to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Block all cookies</li>
          <li>Delete existing cookies</li>
          <li>Receive alerts when cookies are set</li>
        </ul>
        <p className="mt-4">
          Note: Disabling essential cookies may prevent some features from working.
        </p>

        <h2 className="text-2xl font-bold mt-10">4. Changes to this Policy</h2>
        <p>
          We may update this Cookies Policy. Changes will be posted here with the updated date.
        </p>

        <h2 className="text-2xl font-bold mt-10">5. Contact</h2>
        <p>
          Questions about cookies: <a href="mailto:aiestatedubai5@gmail.com" className="text-blue-600 hover:underline">aiestatedubai5@gmail.com</a>
        </p>
      </div>
    </>
  )
}

export default CookiesPolicy