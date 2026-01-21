// backend/controllers/agentController.js
import Agent from '../models/Agent.js';
import bcrypt from 'bcrypt';

// Get agent profile (for dashboard)
export const getProfile = async (req, res) => {
  try {
    const agentId = req.params.agentId || req.user?.agentId; // support both for now

    if (!agentId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const agent = await Agent.findById(agentId).select(
      '-password -__v -apiKeys'
    );

    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    res.json(agent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update profile
export const updateProfile = async (req, res) => {
  try {
    const agentId = req.params.agentId || req.user?.agentId;

    if (!agentId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const allowedUpdates = [
      'name',
      'phone',
      'whatsappNumber',
      'bio',
      'agencyName',
      'reraNumber',
      'profilePhoto',
    ];

    const updates = {};
    for (const field of allowedUpdates) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const agent = await Agent.findByIdAndUpdate(agentId, updates, {
      new: true,
      runValidators: true,
    }).select('-password -__v');

    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    res.json({ message: 'Profile updated', agent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

// Get basic usage stats (for My Plan page)
export const getUsageStats = async (req, res) => {
  try {
    const agentId = req.params.agentId || req.user?.agentId;

    const agent = await Agent.findById(agentId).select(
      'plan planExpiry conversationCountThisMonth lastConversationReset'
    );

    if (!agent) return res.status(404).json({ error: 'Agent not found' });

    // Very simple monthly reset logic (you can make it cron later)
    const now = new Date();
    const lastReset = agent.lastConversationReset || new Date(0);
    if (
      now.getMonth() !== lastReset.getMonth() ||
      now.getFullYear() !== lastReset.getFullYear()
    ) {
      agent.conversationCountThisMonth = 0;
      agent.lastConversationReset = now;
      await agent.save();
    }

    const maxConversations = {
      starter: 200,
      professional: Infinity,
      elite: Infinity,
      none: 0,
    }[agent.plan] || 0;

    res.json({
      plan: agent.plan,
      planExpiry: agent.planExpiry,
      conversationsUsed: agent.conversationCountThisMonth,
      conversationsLimit: maxConversations,
      isUnlimited: maxConversations === Infinity,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get usage stats' });
  }
};

export const updateNotifications = async (req, res) => {
  try {
    const agentId = req.params.agentId || req.user?.agentId;
    const { email, sms, whatsapp } = req.body;

    const agent = await Agent.findByIdAndUpdate(
      agentId,
      { 
        'notifications.email': email,
        'notifications.sms': sms,
        'notifications.whatsapp': whatsapp 
      },
      { new: true }
    );

    if (!agent) return res.status(404).json({ error: 'Agent not found' });

    res.json({ message: 'Notifications updated', notifications: agent.notifications });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Increment conversation count + enforce limit
// export const incrementConversation = async (req, res) => {
//   try {
//     const { agentId, message } = req.body;

//     if (!agentId) {
//       return res.status(400).json({ error: 'Agent ID required' });
//     }

//     const agent = await Agent.findById(agentId);
//     if (!agent) {
//       return res.status(404).json({ error: 'Agent not found' });
//     }

//     // Monthly reset check
//     const now = new Date();
//     const lastReset = agent.lastConversationReset || new Date(0);
//     if (
//       now.getMonth() !== lastReset.getMonth() ||
//       now.getFullYear() !== lastReset.getFullYear()
//     ) {
//       agent.conversationCountThisMonth = 0;
//       agent.lastConversationReset = now;
//     }

//     // Get limit
//     const maxConversations = {
//       starter: 200,
//       professional: Infinity,
//       elite: Infinity,
//       none: 0,
//     }[agent.plan] || 0;

//     // Enforce limit for Starter
//     if (agent.plan === 'starter' && agent.conversationCountThisMonth >= maxConversations) {
//       return res.status(403).json({ 
//         error: 'Monthly conversation limit reached. Please upgrade your plan.' 
//       });
//     }

//     // Increment
//     agent.conversationCountThisMonth += 1;
//     await agent.save();

//     // Optional: Log the message if you want (for debugging)
//     // console.log(`Conversation #${agent.conversationCountThisMonth} from agent ${agentId}: ${message}`);

//     res.json({ success: true, count: agent.conversationCountThisMonth });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

export default { getProfile, updateProfile, getUsageStats, updateNotifications };