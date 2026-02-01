// backend/controllers/leadController.js
import Lead from '../models/Lead.js';
import Agent from '../models/Agent.js';
import validator from 'validator';
import axios from 'axios';

/*
📌 Create leads for agent 
*/
// export const createLead = async (req, res) => {
//   try {
//     const { agentId, name, phone, email, budget, propertyType, locationPrefs, preferredDateTime, message } = req.body;

//     // Basic validation (less strict)
//     if (!name || name.trim().length < 2) {
//       return res.status(400).json({ error: 'Name must be at least 2 characters' });
//     }

//     if (!email || !validator.isEmail(email)) {
//       return res.status(400).json({ error: 'Invalid email address' });
//     }

//     // Block disposable emails
//     const disposableDomains = ['mailinator.com', 'tempmail.com', '10minutemail.com'];
//     if (disposableDomains.some(domain => email.toLowerCase().endsWith(domain))) {
//       return res.status(400).json({ error: 'Please use a real email address' });
//     }

//     if (!phone || phone.trim().length < 5) { // Allow without + for now
//       return res.status(400).json({ error: 'Invalid phone number' });
//     }

//     if (!budget || budget.trim().length === 0) {
//       return res.status(400).json({ error: 'Please provide a budget' });
//     }

//     // Agent check (already there)
//     const agent = await Agent.findById(agentId);
//     if (!agent) {
//       return res.status(404).json({ error: 'Agent not found' });
//     }

//     // Monthly reset (same as before)
//     const now = new Date();
//     const lastReset = agent.lastConversationReset || new Date(0);
//     if (
//       now.getMonth() !== lastReset.getMonth() ||
//       now.getFullYear() !== lastReset.getFullYear()
//     ) {
//       agent.conversationCountThisMonth = 0;
//       agent.lastConversationReset = now;
//     }

//     // Enforce limit for starter only
//     if (agent.plan === 'starter' && agent.conversationCountThisMonth >= 50) {
//       return res.status(403).json({
//         error: 'Monthly conversation limit reached (50). Please upgrade your plan.',
//       });
//     }

//     // Simple budget-based scoring (you can make this smarter later)
//     let score = 'Cold';
//     const budgetLower = budget?.toLowerCase() || '';

//     if (budgetLower.includes('5m - 10m') || budgetLower.includes('10m+') || budgetLower.includes('custom')) {
//       score = 'Hot';
//     } else if (budgetLower.includes('3m - 5m')) {
//       score = 'Warm';
//     }

//     const newLead = new Lead({
//       agentId,
//       name,
//       phone,
//       email,
//       budget,
//       propertyType,
//       // Force locationPrefs to always be an array (even if empty or malformed)
//       locationPrefs: Array.isArray(locationPrefs)
//         ? locationPrefs
//         : typeof locationPrefs === 'string'
//           ? locationPrefs.split(',').map(s => s.trim()).filter(Boolean)
//           : [],
//       preferredDateTime: preferredDateTime ? new Date(preferredDateTime) : null,
//       message,
//       score
//     });

//     await newLead.save();

//     // 🔥 FIX: Increment count here (for all plans, after successful save)
//     agent.conversationCountThisMonth += 1;
//     await agent.save();

//     // SUCCESS: Trigger n8n webhook later
//     // Trigger n8n webhook
//     try {
//       // await axios.post('https://n8n-production-5430.up.railway.app/webhook/lead-notification', {
//       const webhookPayload = {
//         name: newLead.name,
//         phone: newLead.phone,
//         email: newLead.email,
//         budget: newLead.budget,
//         propertyType: newLead.propertyType,
//         locationPrefs: newLead.locationPrefs,
//         preferredDateTime: newLead.preferredDateTime?.toISOString(),
//         whatsappNumber: agent.whatsappNumber, // from agent document
//         agentId: agent._id.toString(), // from agent document
//         agentName: agent.name, // from agent document
//         plan: agent.plan || 'none' // from agent document
//       };

//       await axios.post(
//         'https://n8n-production-5430.up.railway.app/webhook/lead-notification',
//         webhookPayload,
//         {
//           timeout: 10000, // 10 seconds timeout
//           headers: {
//             'Content-Type': 'application/json',
//             'User-Agent': 'AI-Estate-Dubai-Backend' // helps debug in n8n logs
//           }
//         }
//       );

//       console.log('n8n webhook triggered successfully');
//     } catch (webhookError) {
//       console.error('Failed to trigger n8n webhook:', {
//         message: webhookError.message,
//         code: webhookError.code,
//         response: webhookError.response?.data,
//         status: webhookError.response?.status,
//         leadId: newLead._id
//       });
//       // Don't fail the lead save if n8n fails
//     }

//     res.status(201).json({ message: 'Lead saved successfully', lead: newLead });
//   } catch (error) {
//     console.error('❌ Lead creation error:', error);

//     res.status(500).json({
//       error: 'Failed to save lead',
//       message: error.message,
//     });
//   }
// };

// backend/controllers/leadController.js
// ... other imports remain ...

export const createLead = async (req, res) => {
  try {
    const {
      agentId,
      name,
      intent,
      budget,
      locationPrefs,
      preferredAction,
      whatsappNumber,
      phone,
      email,
      message,
    } = req.body;

    // ── VERY RELAXED VALIDATION ──
    if (!agentId) {
      return res.status(400).json({ error: 'agentId is required' });
    }

    // At minimum we want budget or whatsapp/phone — but even that's not hard-required
    if (!budget?.trim() && !whatsappNumber?.trim() && !phone?.trim()) {
      return res.status(400).json({ error: 'Please provide at least budget or contact info' });
    }

    const agent = await Agent.findById(agentId);
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    // Monthly conversation reset + limit check (keep your existing logic)
    const now = new Date();
    const lastReset = agent.lastConversationReset || new Date(0);
    if (
      now.getMonth() !== lastReset.getMonth() ||
      now.getFullYear() !== lastReset.getFullYear()
    ) {
      agent.conversationCountThisMonth = 0;
      agent.lastConversationReset = now;
    }

    const maxConversations = {
      starter: 50,
      professional: 300,
      elite: Infinity,
      none: 0,
    }[agent.plan] || 0;

    if (agent.conversationCountThisMonth >= maxConversations && maxConversations !== Infinity) {
      return res.status(403).json({
        error: `Monthly conversation limit reached (${maxConversations}). Please upgrade your plan.`,
      });
    }

    // ── Simple but better scoring ──
    let score = 'Cold';

    const budgetStr = (budget || '').toLowerCase();
    if (budgetStr.includes('5m') || budgetStr.includes('10m') || budgetStr.includes('custom')) {
      score = 'Hot';
    } else if (budgetStr.includes('3m') || budgetStr.includes('high')) {
      score = 'Warm';
    }

    // Boost score if high intent + contact info
    if (
      (intent?.toLowerCase().includes('buy') || intent?.toLowerCase().includes('invest')) &&
      (whatsappNumber || phone || email) &&
      locationPrefs?.length > 0
    ) {
      score = score === 'Cold' ? 'Warm' : score;
    }

    const newLead = new Lead({
      agentId,
      name: name?.trim() || undefined,
      intent: intent?.trim(),
      budget: budget?.trim(),
      locationPrefs: Array.isArray(locationPrefs)
        ? locationPrefs
        : typeof locationPrefs === 'string'
          ? locationPrefs.split(',').map(s => s.trim()).filter(Boolean)
          : [],
      preferredAction: preferredAction?.trim(),
      whatsappNumber: whatsappNumber?.trim().replace(/\s+/g, ''),
      phone: phone?.trim().replace(/\s+/g, ''),
      email: email?.trim().toLowerCase(),
      message: message?.trim(),
      score,
    });

    await newLead.save();

    // Increment count AFTER successful save
    agent.conversationCountThisMonth += 1;
    await agent.save();

    // n8n webhook (update payload fields)
    try {
      const webhookPayload = {
        leadId: newLead._id.toString(),
        agentId: agent._id.toString(),
        agentName: agent.name,
        agentWhatsapp: agent.whatsappNumber,
        plan: agent.plan || 'none',
        name: newLead.name || '(not provided)',
        intent: newLead.intent,
        budget: newLead.budget,
        locations: newLead.locationPrefs.join(', '),
        preferredAction: newLead.preferredAction,
        whatsappNumber: newLead.whatsappNumber,
        phone: newLead.phone,
        email: newLead.email,
        score: newLead.score,
        createdAt: newLead.createdAt.toISOString(),
      };

      await axios.post(
        // 'https://n8n-production-5430.up.railway.app/webhook/lead-notification',
        'https://n8n-production-c182.up.railway.app/webhook/lead-notification',
        webhookPayload,
        { timeout: 8000 }
      );
    } catch (webhookErr) {
      console.error('n8n webhook failed:', webhookErr.message);
      // non-blocking
    }

    res.status(201).json({
      message: 'Lead created successfully',
      lead: newLead,
    });
  } catch (error) {
    console.error('Lead creation error:', error);
    res.status(500).json({ error: 'Failed to create lead', detail: error.message });
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
      .select('intent budget locationPrefs preferredAction whatsappNumber phone email name score status createdAt')
      .lean();

    // Add simple score (optional, since n8n does it)
    const scoredLeads = leads.map(lead => {
      let score = 'Cold';
      if (lead.budget?.includes('10M+') || lead.budget?.includes('5M - 10M')) score = 'Hot';
      else if (lead.budget?.includes('3M- 5M')) score = 'Warm';
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

/*
📌 Delete a lead
*/
export const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    const agentId = req.user?.agentId || req.body.agentId;

    const lead = await Lead.findOneAndDelete({ _id: id, agentId });

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found or not authorized' });
    }

    res.json({ message: 'Lead deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

/*
📌 Add note to a lead
*/
export const addNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const agentId = req.user?.agentId || req.body.agentId; // from auth or body

    if (!text?.trim()) {
      return res.status(400).json({ error: 'Note text is required' });
    }

    const lead = await Lead.findOneAndUpdate(
      { _id: id, agentId },
      {
        $push: {
          notes: {
            text,
            createdAt: new Date(),
            createdBy: agentId,
          }
        }
      },
      { new: true }
    );

    if (!lead) return res.status(404).json({ error: 'Lead not found or unauthorized' });

    res.json({ message: 'Note added', lead });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

/*
📌 Delete a specific note from a lead
*/
export const deleteNote = async (req, res) => {
  try {
    const { leadId, noteId } = req.params;
    const agentId = req.user?.agentId || req.body.agentId;

    const lead = await Lead.findOneAndUpdate(
      { _id: leadId, agentId },
      { $pull: { notes: { _id: noteId } } },
      { new: true }
    );

    if (!lead) return res.status(404).json({ error: 'Lead or note not found' });

    res.json({ message: 'Note deleted', lead });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

/*
📌 Leads Analytics
*/
export const getAnalytics = async (req, res) => {
  try {
    const agentId = req.query.agentId || req.user?.agentId;

    if (!agentId) {
      return res.status(401).json({ error: 'Agent ID required' });
    }

    // Fetch all leads for this agent
    const leads = await Lead.find({ agentId }).lean();

    // Current month & year for filtering
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Monthly data (last 12 months)
    const monthlyData = Array(12).fill().map((_, i) => {
      const date = new Date(currentYear, currentMonth - i, 1);
      const monthName = date.toLocaleString('default', { month: 'short' });
      return { month: monthName, leads: 0, qualified: 0, converted: 0 };
    }).reverse(); // newest last

    // Aggregate stats
    let totalLeads = 0;
    let qualifiedLeads = 0;
    let convertedLeads = 0;
    let todayLeads = 0;

    leads.forEach(lead => {
      totalLeads++;

      // Qualification logic (use improved version you already have)
      const isQualified =
        (lead.score === 'Hot' || lead.score === 'Warm') ||
        (lead.budget?.toLowerCase().includes('5m') && lead.preferredDateTime) ||
        (lead.propertyType && lead.locationPrefs?.length > 0);

      if (isQualified) qualifiedLeads++;

      // Conversion logic
      const isConverted = lead.status === 'closed' || lead.status === 'appointment_booked';
      if (isConverted) convertedLeads++;

      // Monthly bucketing
      const leadDate = new Date(lead.createdAt);
      const monthDiff = (currentYear - leadDate.getFullYear()) * 12 + (currentMonth - leadDate.getMonth());
      if (monthDiff >= 0 && monthDiff < 12) {
        const idx = 11 - monthDiff;
        monthlyData[idx].leads++;
        if (isQualified) monthlyData[idx].qualified++;
        if (isConverted) monthlyData[idx].converted++;
      }

      // Today
      if (leadDate.toDateString() === now.toDateString()) todayLeads++;
    });

    // Growth % (current month vs previous)
    const currMonth = monthlyData[monthlyData.length - 1];
    const prevMonth = monthlyData[monthlyData.length - 2] || { leads: 0 };
    const leadGrowth = prevMonth.leads === 0
      ? '+0%'
      : ((currMonth.leads - prevMonth.leads) / prevMonth.leads * 100).toFixed(1) + '%';

    const conversionRate = totalLeads > 0
      ? ((convertedLeads / totalLeads) * 100).toFixed(1) + '%'
      : '0%';

    res.json({
      totalLeads,
      qualifiedLeads,
      convertedLeads,
      conversionRate,
      leadGrowth,
      monthlyData,
      todayLeads,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load analytics' });
  }
};

/*
📌 Get All Lead for admin
*/
export const getAllLeads = async (req, res) => {
  try {
    // Optional: Admin check
    // if (req.user?.role !== 'admin') {
    //   return res.status(403).json({ error: 'Admin access required' });
    // }

    const leads = await Lead.find({})
      .populate('agentId', 'name email')
      .sort({ createdAt: -1 })
      .lean();

    res.json({ leads });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};