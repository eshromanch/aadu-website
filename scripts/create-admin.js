#!/usr/bin/env node

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '..', '.env.production') });

// Import the Admin model
const Admin = require('../src/models/Admin');

async function createAdmin() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/aadu_website';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@aadu.online' });
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log('Email: admin@aadu.online');
      console.log('If you forgot the password, delete the user first.');
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 12);

    // Create admin user
    const admin = new Admin({
      username: 'admin',
      email: 'admin@aadu.online',
      password: hashedPassword
    });

    await admin.save();
    
    console.log('🎉 Admin user created successfully!');
    console.log('📧 Email: admin@aadu.online');
    console.log('🔑 Password: admin123');
    console.log('🌐 Login at: https://aadu.online/admin');
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  }
}

// Run the function
createAdmin();
