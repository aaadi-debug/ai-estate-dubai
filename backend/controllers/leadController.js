// backend/controllers/leadController.js
import Lead from '../models/Lead.js';
import Agent from '../models/Agent.js';
import validator from 'validator';

export const createLead = async (req, res) => {
  try {
    const { agentId, name, phone, email, budget, propertyType, locationPrefs, preferredDateTime, message } = req.body;

    // Basic validation
    if (!name || name.length < 2) {
      return res.status(400).json({ error: 'Name must be at least 2 characters' });
    }

    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Block common disposable domains (add more as needed)
    const disposableDomains = ['mailinator.com', 'tempmail.com', '10minutemail.com'];
    if (disposableDomains.some(domain => email.toLowerCase().endsWith(domain))) {
      return res.status(400).json({ error: 'Please use a real email address' });
    }

    if (!phone || !validator.isMobilePhone(phone, 'any', { strictMode: true })) {
      return res.status(400).json({ error: 'Invalid phone number (include country code, e.g., +971...)' });
    }

    if (!budget || budget.length < 3) {
      return res.status(400).json({ error: 'Please provide a valid budget' });
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