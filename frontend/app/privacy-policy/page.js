import React from 'react'

const PrivacyPolicy = () => {
    return (
        <>
            <div class="bg-blue-600 text-white py-6">
                <div class="max-w-5xl mx-auto px-6 text-center">
                    <h1 class="text-3xl font-bold">Privacy Policy</h1>
                    <p class="mt-2 text-blue-100">Last Updated: December 29, 2025</p>
                </div>
            </div>

            <div class="flex-grow max-w-5xl mx-auto px-6 py-12 prose prose-lg">
                <p class="text-lg mb-8">
                    At AI Estate Dubai, we respect your privacy. This Privacy Policy explains how we collect, use, and protect information when you use our Service.
                </p>

                <h2 class="text-2xl font-bold mt-10">1. Information We Collect</h2>
                <p>We collect information in two ways:</p>
                <h3 class="text-xl font-semibold mt-6">From Agents (You):</h3>
                <ul class="list-disc pl-6 space-y-2">
                    <li>Account details: name, email, phone, WhatsApp number</li>
                    <li>Payment information (processed securely via Stripe)</li>
                </ul>
                <h3 class="text-xl font-semibold mt-6">From Website Visitors (Leads):</h3>
                <ul class="list-disc pl-6 space-y-2">
                    <li>Name, phone, email, budget, property type, location preferences, preferred date/time</li>
                    <li>Chat messages (for lead capture)</li>
                </ul>

                <h2 class="text-2xl font-bold mt-10">2. How We Use Your Information</h2>
                <ul class="list-disc pl-6 space-y-2">
                    <li>To provide the Service (save leads, send notifications)</li>
                    <li>To improve the chatbot (anonymized analytics)</li>
                    <li>To communicate with you (updates, support)</li>
                    <li>To comply with legal obligations</li>
                </ul>

                <h2 class="text-2xl font-bold mt-10">3. Data Sharing</h2>
                <p>We do not sell your data. We share:</p>
                <ul class="list-disc pl-6 space-y-2">
                    <li>Lead information with the agent who owns the chatbot</li>
                    <li>With third-party services (Twilio, Gmail, Google Calendar) to deliver notifications</li>
                </ul>

                <h2 class="text-2xl font-bold mt-10">4. Data Storage & Security</h2>
                <p>
                    Data is stored securely on cloud servers (MongoDB Atlas). We use encryption and access controls. Data is retained as long as needed for the Service.
                </p>

                <h2 class="text-2xl font-bold mt-10">5. Your Rights</h2>
                <p>
                    Access, correct, or delete your data — contact <a href="mailto:support@aiestatedubai.com" class="text-blue-600 hover:underline">support@aiestatedubai.com</a>. Agents can delete leads from their dashboard.
                </p>

                <h2 class="text-2xl font-bold mt-10">6. Cookies & Tracking</h2>
                <p>
                    We use cookies for site functionality and analytics. You can manage them in your browser.
                </p>

                <h2 class="text-2xl font-bold mt-10">7. Changes to Policy</h2>
                <p>
                    We may update this Policy. Changes will be posted here.
                </p>

                <h2 class="text-2xl font-bold mt-10">8. Contact</h2>
                <p>
                    For privacy questions: <a href="mailto:support@aiestatedubai.com" class="text-blue-600 hover:underline">support@aiestatedubai.com</a>
                </p>
            </div>
        </>
    )
}

export default PrivacyPolicy