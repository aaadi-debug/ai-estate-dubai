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
    plan: {
      type: String,
      enum: ['basic', 'medium', 'elite'],
      default: 'basic',
    },
  },
  {
    timestamps: true,
  }
);

const Agent = model('Agent', agentSchema);

export default Agent;