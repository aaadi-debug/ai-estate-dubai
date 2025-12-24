// backend/controllers/leadController.js
import Lead from '../models/Lead.js';
import Agent from '../models/Agent.js';

export const createLead = async (req, res) => {
  try {
    const { agentId, name, phone, email, budget, propertyType, locationPrefs, preferredDateTime, message } = req.body;

    // Validate agent exists
    const agent = await Agent.findById(agentId.trim());
    if (!agent) {
      console.log(`Agent not found for ID: ${agentId}`); // log for debug
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