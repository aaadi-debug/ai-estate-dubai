import Image from 'next/image';
import { Bot, MessageCircle, Calendar, Zap, Shield, ArrowRight } from 'lucide-react';
import { ChatWidget } from '@/components/chat/ChatWidget';


export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white text-center py-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Turn Website Visitors into Booked Appointments<br />
            <span className="text-blue-600">Automatically</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            AI-powered chatbot that engages your leads 24/7, collects details, sends instant WhatsApp alerts, and schedules meetings — all while you sleep.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
              Start Free Trial <ArrowRight />
            </button>
            <button className="btn-secondary text-lg px-8 py-4">Watch Demo</button>
          </div>
        </div>

        {/* Placeholder for Hero Image or Chat Demo */}
        <div className="mt-16 max-w-4xl mx-auto bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center">
          <p className="text-gray-500 text-xl">Live Chat Widget Preview Coming Here</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Why Dubai Agents Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Smart Lead Capture</h3>
              <p className="text-gray-600">Asks the right questions: budget, location, property type — qualifies leads instantly.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Instant WhatsApp Alerts</h3>
              <p className="text-gray-600">You get notified the second a hot lead comes in — never miss an opportunity.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Auto Calendar Booking</h3>
              <p className="text-gray-600">Syncs with Google Calendar and books appointments without back-and-forth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section id="pricing" className="py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 mb-12">One-time setup + affordable monthly plans</p>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic */}
            <div className="border rounded-xl p-8 shadow-md">
              <h3 className="text-2xl font-bold mb-4">Basic</h3>
              <p className="text-4xl font-bold mb-6">$500 setup<br /><span className="text-xl font-normal text-gray-600">+ $99/month</span></p>
              <ul className="text-left space-y-3 mb-8">
                <li>✓ AI Chatbot</li>
                <li>✓ Lead Storage</li>
                <li>✓ WhatsApp Alerts</li>
              </ul>
              <button className="w-full btn-primary">Choose Plan</button>
            </div>
            {/* Medium */}
            <div className="border-2 border-blue-600 rounded-xl p-8 shadow-xl scale-105">
              <div className="bg-blue-600 text-white text-sm inline-block px-3 py-1 rounded-full mb-4">Most Popular</div>
              <h3 className="text-2xl font-bold mb-4">Professional</h3>
              <p className="text-4xl font-bold mb-6">$1,000 setup<br /><span className="text-xl font-normal text-gray-600">+ $199/month</span></p>
              <ul className="text-left space-y-3 mb-8">
                <li>✓ Everything in Basic</li>
                <li>✓ Google Calendar Sync</li>
                <li>✓ Email Confirmations</li>
                <li>✓ Priority Support</li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700">Choose Plan</button>
            </div>
            {/* Elite */}
            <div className="border rounded-xl p-8 shadow-md">
              <h3 className="text-2xl font-bold mb-4">Elite</h3>
              <p className="text-4xl font-bold mb-6">$2,000 setup<br /><span className="text-xl font-normal text-gray-600">+ $399/month</span></p>
              <ul className="text-left space-y-3 mb-8">
                <li>✓ Everything in Pro</li>
                <li>✓ White Label</li>
                <li>✓ Advanced Analytics</li>
                <li>✓ 24/7 Support</li>
              </ul>
              <button className="w-full btn-primary">Choose Plan</button>
            </div>
          </div>
        </div>
      </section>

      {/* Add Chat Widget Here */}
      <ChatWidget />
    </>
  );
}