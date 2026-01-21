// backend/controllers/authCOntroller.js
import Agent from '../models/Agent.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-123'; // put in .env later

// 📌 Signup
export const signup = async (req, res) => {
  try {
    const { name, email, phone, whatsappNumber, password } = req.body;

    if (await Agent.findOne({ email })) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const agent = new Agent({
      name,
      email,
      phone,
      whatsappNumber,
      password: hashedPassword,
      plan: 'none', // NEW: default plan
      notifications: {
        email: true,       // always default on
        sms: false,        // off until Professional+
        whatsapp: false,   // ← CHANGED: false by default (Elite-only feature)
      },
    });

    await agent.save();

    const token = jwt.sign({ agentId: agent._id }, JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({
      message: 'Agent created',
      agent: {
        id: agent._id,
        name: agent.name,
        email: agent.email,
        phone: agent.phone,
        plan: agent.plan
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// 📌 Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const agent = await Agent.findOne({ email });
    if (!agent) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, agent.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ agentId: agent._id }, JWT_SECRET, { expiresIn: '30d' });

    // IMPORTANT: Set httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,                // Prevents JS access (secure against XSS)
      secure: process.env.NODE_ENV === 'production', // true only in prod (HTTPS)
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' for cross-site in prod
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      path: '/',                     // Available on all routes
      domain: '.aiestatedubai.com'     // ← THIS IS THE KEY: shared across subdomains - disabled for local dev
    });

    // NEW: Set plan cookie (so middleware can read it)
    res.cookie('plan', agent.plan || 'none', {
      httpOnly: false,               // allow JS to read it (optional)
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/',
      domain: '.aiestatedubai.com'     // ← same here - disabled for local dev
    });
    
    res.json({
      message: 'Login successful',
      agent: {
        id: agent._id,
        name: agent.name,
        email: agent.email,
        phone: agent.phone,
        plan: agent.plan || 'none'
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// 📌 Logout
export const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
      domain: '.aiestatedubai.com',
    });

    res.clearCookie('plan', {
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
      domain: '.aiestatedubai.com',
    });

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ error: 'Logout failed' });
  }
};


// 📌 Change Password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const agentId = req.params.agentId || req.user?.agentId;

    if (!agentId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const agent = await Agent.findById(agentId);
    if (!agent) return res.status(404).json({ error: 'Agent not found' });

    const isMatch = await bcrypt.compare(currentPassword, agent.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'New password must be at least 8 characters' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    agent.password = hashed;
    await agent.save();

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to change password' });
  }
};