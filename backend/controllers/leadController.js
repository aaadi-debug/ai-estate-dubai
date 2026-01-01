// backend/controllers/leadController.js
import Lead from '../models/Lead.js';
import Agent from '../models/Agent.js';
import validator from 'validator';
import axios from 'axios';

/*
📌 Create leads for agent 
*/
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
    // Trigger n8n webhook
    try {
      await axios.post('https://n8n-production-5430.up.railway.app/webhook/lead-notification', {
        name: newLead.name,
        phone: newLead.phone,
        email: newLead.email,
        budget: newLead.budget,
        propertyType: newLead.propertyType,
        locationPrefs: newLead.locationPrefs,
        preferredDateTime: newLead.preferredDateTime,
        whatsappNumber: agent.whatsappNumber, // from agent document
        agentId: agent._id,
        agentName: agent.name
      });
      console.log('n8n webhook triggered successfully');
    } catch (webhookError) {
      console.error('Failed to trigger n8n webhook:', webhookError.message);
      // Don't fail the lead save if n8n fails
    }

    res.status(201).json({ message: 'Lead saved successfully', lead: newLead });
  } catch (error) {
    console.error('Lead save error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

/*
📌 Get all agent leads
*/
export const getAgentLeads = async (req, res) => {
  try {
    // Get agentId from auth (we'll add JWT auth later, for now use query)
    const agentId = req.query.agentId || req.user?.agentId; // fallback

    if (!agentId) {
      return res.status(400).json({ error: 'Agent ID required' });
    }

    const leads = await Lead.find({ agentId })
      .sort({ createdAt: -1 })
      .lean();

    // Add simple score (optional, since n8n does it)
    const scoredLeads = leads.map(lead => {
      let score = 'Cold';
      if (lead.budget?.includes('10M+') || lead.budget?.includes('5M - 10M')) score = 'Hot';
      else if (lead.budget?.includes('3M - 5M')) score = 'Warm';
      return { ...lead, score };
    });

    res.json({ leads: scoredLeads });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

/*
📌 Mark agent lead as contacted
*/
export const updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // "contacted"

    const lead = await Lead.findByIdAndUpdate(id, { status }, { new: true });
    if (!lead) return res.status(404).json({ error: 'Lead not found' });

    res.json({ message: 'Status updated', lead });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};