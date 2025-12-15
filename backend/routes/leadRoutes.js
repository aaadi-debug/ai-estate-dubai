import express from 'express';
const router = express.Router();

router.post('/new', (req, res) => {
  res.json({ message: 'New lead received', data: req.body });
});

export default router;