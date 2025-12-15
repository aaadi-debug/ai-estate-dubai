import Agent from '../models/Agent.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-123'; // put in .env later

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
    });

    await agent.save();

    const token = jwt.sign({ agentId: agent._id }, JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({
      message: 'Agent created',
      agent: { id: agent._id, name, email },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const agent = await Agent.findOne({ email });
    if (!agent) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, agent.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ agentId: agent._id }, JWT_SECRET, { expiresIn: '30d' });

    res.json({
      message: 'Login successful',
      agent: { id: agent._id, name: agent.name, email },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};