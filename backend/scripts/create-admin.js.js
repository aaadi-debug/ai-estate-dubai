// backend/scripts/create-admin.js
// require('dotenv').config();

import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
// import chalk from 'chalk';
import Agent from '../models/Agent.js';

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI);

  const email = 'adityaraj51202@example.com';  // Change to your email
  const password = 'A@dubaiadmin@12345#';  // Change + use a generated one (at least 12 chars, symbols, numbers)

  if (await Agent.findOne({ email })) {
    console.log('Admin already exists');
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);  // Stronger salt (12 rounds)

  const admin = new Agent({
    name: 'Admin User',
    email,
    password: hashedPassword,
    role: 'admin',
    plan: 'elite',  // Give admin full access
    // Add other fields if needed
    whatsappNumber: '+919289584268'
  });

  await admin.save();
  console.log('Admin created! Credentials:');
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);  // Print once, then change via dashboard

  mongoose.disconnect();
}

createAdmin().catch(console.error);