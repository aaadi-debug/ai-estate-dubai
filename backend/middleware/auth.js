// backend/middleware/auth.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-123';

export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ error: 'Not authorized - no token' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.agentId = decoded.agentId; // attach agentId to request
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ error: 'Not authorized - invalid token' });
  }
};