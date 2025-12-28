import React from 'react'

const TermsAndConditions = () => {
    return (
        <>
            <div class="bg-blue-600 text-white py-6">
                <div class="max-w-5xl mx-auto px-6 text-center">
                    <h1 class="text-3xl font-bold">Terms of Service</h1>
                    <p class="mt-2 text-blue-100">Last Updated: December 29, 2025</p>
                </div>
            </div>

            <div class="flex-grow max-w-5xl mx-auto px-6 py-12 prose prose-lg">
                <p class="text-lg mb-8">
                    Welcome to AI Estate Dubai ("we", "us", or "our"). These Terms of Service ("Terms") govern your access to and use of our website, AI-powered chatbot service, and related features (collectively, the "Service").
                </p>
                <p class="mb-8">
                    By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, do not use the Service.
                </p>

                <h2 class="text-2xl font-bold mt-10">1. Service Description</h2>
                <p>
                    AI Estate Dubai provides an AI-powered chatbot that helps real estate agents capture leads from their websites. The Service includes embedding a chatbot widget, collecting visitor data, storing leads, and sending notifications via third-party integrations.
                </p>

                <h2 class="text-2xl font-bold mt-10">2. Eligibility</h2>
                <p>
                    You must be at least 18 years old to use the Service. By using the Service, you represent that you meet this requirement.
                </p>

                <h2 class="text-2xl font-bold mt-10">3. Account Registration</h2>
                <p>
                    To use certain features, you must create an agent account. You agree to provide accurate information and keep it updated. You are responsible for maintaining the confidentiality of your account credentials.
                </p>

                <h2 class="text-2xl font-bold mt-10">4. Acceptable Use</h2>
                <p>You agree not to:</p>
                <ul class="list-disc pl-6 space-y-2">
                    <li>Use the Service for illegal purposes</li>
                    <li>Attempt to interfere with or disrupt the Service</li>
                    <li>Send spam or abusive messages through the chatbot</li>
                    <li>Reverse engineer or copy the Service</li>
                </ul>
                <p class="mt-4">
                    We reserve the right to suspend or terminate accounts for violations.
                </p>

                <h2 class="text-2xl font-bold mt-10">5. Lead Data Ownership</h2>
                <p>
                    Leads collected belong to the agent (you). We store leads securely and only use them to provide the Service. You are responsible for complying with data protection laws when contacting leads.
                </p>

                <h2 class="text-2xl font-bold mt-10">6. Third-Party Services</h2>
                <p>
                    The Service integrates with Twilio (SMS/WhatsApp), Gmail/SendGrid (email), and Google Calendar. Use of these is subject to their terms.
                </p>

                <h2 class="text-2xl font-bold mt-10">7. Pricing & Payments</h2>
                <p>
                    The Service is offered under subscription plans (Basic, Medium, Elite). Payments are processed via Stripe. All fees are non-refundable except as required by law.
                </p>

                <h2 class="text-2xl font-bold mt-10">8. Limitation of Liability</h2>
                <p>
                    To the fullest extent permitted by law, we are not liable for any indirect, incidental, or consequential damages arising from your use of the Service.
                </p>

                <h2 class="text-2xl font-bold mt-10">9. Termination</h2>
                <p>
                    We may terminate your access to the Service at any time for any reason.
                </p>

                <h2 class="text-2xl font-bold mt-10">10. Governing Law</h2>
                <p>
                    These Terms are governed by the laws of the United Arab Emirates.
                </p>

                <h2 class="text-2xl font-bold mt-10">11. Changes to Terms</h2>
                <p>
                    We may update these Terms. Continued use constitutes acceptance of changes.
                </p>

                <h2 class="text-2xl font-bold mt-10">Contact</h2>
                <p>
                    For any questions: <a href="mailto:support@aiestatedubai.com" class="text-blue-600 hover:underline">support@aiestatedubai.com</a>
                </p>
            </div>

        </>
    )
}

export default TermsAndConditions