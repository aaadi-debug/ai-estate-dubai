// backend/controllers/leadController.js
import Lead from '../models/Lead.js';
import Agent from '../models/Agent.js';

export const createLead = async (req, res) => {
  try {
    const { agentId, name, phone, email, budget, propertyType, locationPrefs, preferredDateTime, message } = req.body;

    // Debug: Log the raw received agentId
    console.log('Received agentId (raw):', agentId);
    console.log('Received agentId (type):', typeof agentId);
    console.log('Received agentId (length):', agentId?.length);
    console.log('Received agentId (trimmed):', agentId?.trim());
    
    const cleanedId = agentId?.trim(); // remove spaces

    // Try to find agent with cleaned ID
    const agent = await Agent.findById(cleanedId);

    console.log('Found agent:', agent ? agent._id : 'NOT FOUND');

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