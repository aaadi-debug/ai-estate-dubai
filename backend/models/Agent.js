// backend/models/Agent.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const agentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: String,
    whatsappNumber: {
      type: String,
      required: true,
    },
    calendarId: String, // e.g., primary Google Calendar ID
    apiKeys: {
      type: Map,
      of: String,
      default: {},
    },

    // ── New / improved fields for dashboard ──
    bio: { type: String, maxlength: 500, default: '' },
    agencyName: { type: String, trim: true },
    reraNumber: { type: String, trim: true },
    profilePhoto: { type: String }, // URL to photo (Cloudinary, S3, etc.)
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      whatsapp: { type: Boolean, default: true },
    },
    
    plan: {
      type: String,
      enum: ['starter', 'professional', 'elite', 'none'],
      default: 'none',
    },
    planExpiry: { type: Date },
    conversationCountThisMonth: { type: Number, default: 0 }, // reset monthly
    lastConversationReset: { type: Date },

    password: { type: String, required: true }, // hashed

    isDeleted: { type: Boolean, default: false }, 
    deletionReason: Object, 
    deletionDate: Date
  },
  {
    timestamps: true,
  }
);

const Agent = model('Agent', agentSchema);

export default Agent;