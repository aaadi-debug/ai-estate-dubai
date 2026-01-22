'use client';
import { FaStar } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";

export default function PlanCard({
  name,
  price,
  oneTimeFee,
  period,
  description,
  features,
  isPopular = false,
  ctaText,
  loading,
  isContactSales = false,
  onSelectPlan
}) {
  return (
    <div className={`relative bg-white rounded-2xl p-8 ${isPopular ? 'border-2 border-secondary shadow-luxury' : 'border border-gray-200'} hover:shadow-xl transition-all duration-300`}>
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="bg-secondary text-primary px-6 py-2 rounded-full font-semibold text-sm flex items-center space-x-2">
            <FaStar size={16} />
            <span>Most Popular</span>
          </div>
        </div>
      )}

      {/* Plan Header */}
      <div className="text-center mb-8">
        <h3 className="font-playfair font-bold text-2xl text-primary mb-2">{name}</h3>
        <p className="text-gray-500 font-body text-sm mb-6">{description}</p>

        <div className="flex items-baseline justify-center space-x-2">
          <span className="font-playfair font-bold text-5xl text-foreground">{price}</span>
          <span className="text-gray-500 font-body text-lg">USD/{period}</span>
        </div>
        <p className="text-xs text-gray-600 mt-2">Billed monthly • Cancel anytime</p>
        {/* <p className="text-sm text-gray-500 mt-2">+ ${oneTimeFee} one-time setup fee</p> */}
      </div>

      {/* CTA Button */}
      {/* <button
        onClick={onSelectPlan}
        className={`w-full py-4 rounded-lg font-cta font-semibold text-lg transition-all duration-300 mb-8 cursor-pointer ${isPopular
            ? 'bg-secondary text-primary hover:scale-105 hover:shadow-luxury'
            : 'bg-gray-100 text-foreground hover:bg-secondary hover:text-accent-foreground'
          }`}
      >
        {ctaText}
      </button> */}
      {ctaText && (
        <>
          <button
            onClick={onSelectPlan}
            disabled={loading}
            className={`w-full py-4 px-6 rounded-lg font-bold transition-all mb-8 cursor-pointer ${isPopular
              ? 'bg-secondary text-primary hover:scale-105'
              : 'bg-gray-100 text-black hover:bg-secondary hover:text-primary'
              } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Processing...' : ctaText}
          </button>
          {/* <button
            onClick={() => {
              if (isContactSales) {
                // Option 1: Simple mailto link
                window.location.href = `mailto:aiestatedubai5@gmail.com?subject=Elite Plan Inquiry&body=Hi team,%0A%0AI'm interested in the Elite plan ($999/month).%0A%0AAgent Name: ${localStorage.getItem('agentName') || 'N/A'}%0AEmail: ${localStorage.getItem('agentEmail') || 'N/A'}%0APhone: ${localStorage.getItem('agentPhone') || 'N/A'}%0A%0AThanks!`;

                // Option 2: Open WhatsApp (recommended for Dubai users)
                // window.open('https://wa.me/+918750304088?text=Hi%20team%2C%20I%27m%20interested%20in%20Elite%20plan%20%24999%2Fmonth.%20Agent%3A%20' + (localStorage.getItem('agentName') || 'N/A'), '_blank');

                // Option 3: Show a modal with contact info (best UX)
                // alert('Please email us at aiestatedubai5@gmail.com or WhatsApp +971-50-123-4567 for Elite plan');
              } else {
                onSelectPlan() // your existing Razorpay flow
              }
            }}
            disabled={loading}
            className={`w-full mb-8 py-4 px-6 rounded-lg font-bold transition-all cursor-pointer ${isPopular
              ? 'bg-secondary text-primary hover:scale-105'
              : isContactSales
                ? 'bg-gray-300 text-black hover:bg-secondary hover:text-primary'   // different color for contact
                : 'bg-gray-300 text-black hover:bg-secondary hover:text-primary'
              } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Processing...' : ctaText}
          </button> */}
        </>
      )}


      {/* Features List */}
      <div className="space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            {/* <Icon
              name={feature.included ? 'CheckCircleIcon' : 'XCircleIcon'}
              size={20}
              variant="solid"
              className={feature.included ? 'text-success mt-0.5' : 'text-muted mt-0.5'}
            /> */}
            {feature.included ? <FaCircleCheck className="text-green-600" /> : <IoCloseCircle className="text-gray-300" />}
            <span className={`font-body text-sm ${feature.included ? 'text-gray-500' : 'text-gray-400 line-through'}`}>
              {feature.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}