// backend/src/models/Availability.js - (Optional for now – we can use Google Calendar directly later)
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const availabilitySchema = new Schema({
  agentId: {
    type: Schema.Types.ObjectId,
    ref: 'Agent',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  slots: [
    {
      start: String, // e.g., "10:00"
      end: String,   // e.g., "10:30"
      booked: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const Availability = model('Availability', availabilitySchema);

export default Availability;