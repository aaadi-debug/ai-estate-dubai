// backend/models/Lead.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const leadSchema = new Schema(
  {
    agentId: {
      type: Schema.Types.ObjectId,
      ref: 'Agent',
      required: true,
    },

    // ── New minimal + intent-focused fields ──
    intent: {
      type: String,
      trim: true,
      // Examples: "Buy for myself / family", "Invest (rental or resale)", "Just browsing for now"
    },

    budget: {
      type: String,
      trim: true,
    },
    locationPrefs: {
      type: [String],
      default: [],
    },
    preferredAction: {
      type: String,
      trim: true,
      // Examples: "Send properties on WhatsApp", "Book a call / viewing", "Email some options"
    },

    // Contact fields – whatsappNumber is now most important
    whatsappNumber: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      // NO required: true anymore
    },

    // propertyType: {
    //   type: String,
    //   enum: ['apartment', 'villa', 'townhouse', 'penthouse', 'plot', 'office'],
    //   lowercase: true,  // ← Add this line
    //   trim: true,
    // },
    // preferredDateTime: Date,
    // message: String,
    status: {
      type: String,
      enum: ['new', 'contacted', 'appointment_booked', 'closed'],
      default: 'new',
    },
    score: {
      type: String,
      enum: ['Hot', 'Warm', 'Cold'],
      default: 'Cold',
    },
    notes: [
      {
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        createdBy: { type: Schema.Types.ObjectId, ref: 'Agent' }, // optional: who added it
      }
    ],
    name: {
      type: String,
      // required: true,
      trim: true,
    },
    // Optional: keep message if user types something extra
    message: String,
  },
  {
    timestamps: true,
  }
);

const Lead = model('Lead', leadSchema);

export default Lead;