// backend/middleware/auth.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-123';

export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ error: 'Not authorized - no token' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = {
      agentId: decoded.agentId,
      role: decoded.role || 'agent'  // fallback
    };

    next();
  } catch (error) {
    console.error('Auth error:', error.message);
    res.status(401).json({ error: 'Not authorized - invalid token' });
  }
};