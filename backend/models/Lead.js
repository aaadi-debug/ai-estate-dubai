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
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: String,
    budget: String, // e.g., "AED 1M - 2M"
    propertyType: {
      type: String,
      enum: ['apartment', 'villa', 'townhouse', 'penthouse', 'plot', 'office'],
      lowercase: true,  // ← Add this line
      trim: true,
    },
    locationPrefs: [String], // e.g., ["Downtown Dubai", "Palm Jumeirah"]
    preferredDateTime: Date,
    message: String,
    status: {
      type: String,
      enum: ['new', 'contacted', 'appointment_booked', 'closed'],
      default: 'new',
    },

    notes: [
      {
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        createdBy: { type: Schema.Types.ObjectId, ref: 'Agent' }, // optional: who added it
      }
    ],
  },
  {
    timestamps: true,
  }
);

const Lead = model('Lead', leadSchema);

export default Lead;