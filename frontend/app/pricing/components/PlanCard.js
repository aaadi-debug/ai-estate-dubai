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
        <p className="text-sm text-gray-500 mt-2">+ ${oneTimeFee} one-time setup fee</p>
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