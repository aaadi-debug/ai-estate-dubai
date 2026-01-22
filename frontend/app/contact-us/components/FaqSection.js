'use client';

import { useState } from 'react';
import { ChevronDown, ChatBubbleLeftEllipsis } from 'lucide-react';
import { PiChats } from "react-icons/pi";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0); // First FAQ open by default

  const faqs = [
    {
      question: 'What is the typical response time for inquiries?',
      answer: 'We respond to all inquiries within 24 hours during business days. For urgent matters, we recommend contacting us via WhatsApp for immediate assistance. Our team is available Monday to Friday, 9 AM to 6 PM GST, and Saturday from 10 AM to 4 PM GST.'
    },
    {
      question: 'Do you offer consultation calls before signing up?',
      answer: 'Yes, we offer complimentary 30-minute consultation calls to discuss your specific needs and demonstrate how AI Estate Dubai can benefit your real estate business. You can schedule a call through our contact form or by reaching out via WhatsApp.'
    },
    // {
    //   question: 'Can I visit your office in person?',
    //   answer: 'Absolutely! We welcome in-person visits to our Business Bay office. We recommend scheduling an appointment in advance to ensure our team is available to provide you with dedicated attention and a comprehensive product demonstration.'
    // },
    {
      question: 'What languages does your support team speak?',
      answer: 'Our support team is fluent in both English and Arabic, ensuring we can effectively communicate with all clients in Dubai\'s diverse real estate market. We understand the importance of clear communication in business relationships.'
    },
    {
      question: 'How quickly can I get started after contacting you?',
      answer: 'Once you contact us, we can have you set up and running within 24-48 hours. Our white-glove onboarding process includes personalized setup, chatbot customization, and training to ensure you\'re capturing leads from day one.'
    },
    {
      question: 'Do you provide technical support after implementation?',
      answer: 'Yes, all our plans include ongoing technical support. Elite plan members receive priority support with dedicated account management. We\'re committed to ensuring your success with continuous optimization and assistance.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-foreground mb-4">
          Frequently Asked Questions
        </h2>
        <p className="font-body text-lg text-gray-500 max-w-2xl mx-auto">
          Find answers to common questions about contacting AI Estate Dubai and our services.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-primary transition-colors duration-300 focus:outline-none group cursor-pointer"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="font-body font-semibold text-primary group-hover:text-white pr-4">
                {faq.question}
              </span>
              <ChevronDown
                size={20}
                className={`text-secondary flex-shrink-0 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              id={`faq-answer-${index}`}
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-5 pt-2">
                <p className="font-body text-gray-500 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="font-body text-gray-500 mb-4">
          Still have questions? We're here to help.
        </p>
        <a
          href="https://wa.me/+919289584268"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-secondary text-accent-foreground rounded-md font-cta font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
        >
          <PiChats size={20} />
          <span>Chat with Us on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}