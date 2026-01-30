// backend/controllers/contactController.js
import ContactMessage from '../models/ContactMessage.js';
import validator from 'validator';
import { rateLimit } from 'express-rate-limit';

// Rate limiter: max 5 submissions per IP per hour
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 5,
  message: { error: 'Too many contact form submissions. Please try again later.' },
  standardHeaders: true,
  keyGenerator: (req) => req.ip || 'anonymous',
});

// Create new contact message
export const submitContact = [
  contactLimiter,
  async (req, res) => {
    try {
      const { name, email, phone, contactMethod, message } = req.body;

      // Basic server-side validation (extra safety)
      if (!name || name.trim().length < 2) {
        return res.status(400).json({ error: 'Name must be at least 2 characters' });
      }

      if (!email || !validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
      }

      if (!phone || phone.trim().length < 8) {
        return res.status(400).json({ error: 'Invalid phone number' });
      }

      if (!['phone', 'whatsapp'].includes(contactMethod)) {
        return res.status(400).json({ error: 'Invalid contact method' });
      }

      if (!message || message.trim().length < 10) {
        return res.status(400).json({ error: 'Message must be at least 10 characters' });
      }

      // Optional: block disposable emails
      const disposableDomains = ['mailinator.com', 'tempmail.com', '10minutemail.com'];
      if (disposableDomains.some(d => email.toLowerCase().endsWith(d))) {
        return res.status(400).json({ error: 'Please use a real email address' });
      }

      // Save to database
      const newMessage = new ContactMessage({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        contactMethod,
        message: message.trim(),
        ip: req.ip, // For abuse tracking (optional)
      });

      await newMessage.save();

      // Optional: trigger n8n webhook for notification
      // try {
      //   await fetch('https://your-n8n-webhook-url', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ ...newMessage.toObject(), type: 'contact_form' }),
      //   });
      // } catch (webhookErr) {
      //   console.error('Webhook failed:', webhookErr);
      // }

      res.status(201).json({
        message: 'Thank you! Your message has been sent successfully.',
      });
    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({ error: 'Failed to submit message. Please try again later.' });
    }
  },
];

// Optional: Get all messages (admin only)
export const getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .limit(100); // Prevent overload

    res.json({ messages });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

// Optional: Mark as read/responded (admin only)
export const updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const message = await ContactMessage.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!message) return res.status(404).json({ error: 'Message not found' });

    res.json({ message: 'Status updated', data: message });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
};