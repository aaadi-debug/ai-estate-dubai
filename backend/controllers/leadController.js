// backend/controllers/leadController.js
import Lead from '../models/Lead.js';
import Agent from '../models/Agent.js';
import validator from 'validator';

export const createLead = async (req, res) => {
  try {
    const { agentId, name, phone, email, budget, propertyType, locationPrefs, preferredDateTime, message } = req.body;

    // Basic validation (less strict)
    if (!name || name.trim().length < 2) {
      return res.status(400).json({ error: 'Name must be at least 2 characters' });
    }

    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Block disposable emails
    const disposableDomains = ['mailinator.com', 'tempmail.com', '10minutemail.com'];
    if (disposableDomains.some(domain => email.toLowerCase().endsWith(domain))) {
      return res.status(400).json({ error: 'Please use a real email address' });
    }

    if (!phone || phone.trim().length < 5) { // Allow without + for now
      return res.status(400).json({ error: 'Invalid phone number' });
    }

    if (!budget || budget.trim().length === 0) {
      return res.status(400).json({ error: 'Please provide a budget' });
    }

    // Agent check (already there)
    const agent = await Agent.findById(agentId);
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    const newLead = new Lead({
      agentId,
      name,
      phone,
      email,
      budget,
      propertyType,
      locationPrefs: Array.isArray(locationPrefs) ? locationPrefs : [locationPrefs].filter(Boolean),
      preferredDateTime: preferredDateTime ? new Date(preferredDateTime) : null,
      message,
    });

    await newLead.save();

    // SUCCESS: Trigger n8n webhook later
    res.status(201).json({ message: 'Lead saved successfully', lead: newLead });
  } catch (error) {
    console.error('Lead save error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};