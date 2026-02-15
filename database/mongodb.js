import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../config/env.js';

if(!DB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.<development/production>.local');
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);

    console.log(`Connected to database in ${NODE_ENV} mode`);
  } catch (error) {
    console.error('⚠️  MongoDB connection failed - running in demo mode without database');
    console.error('   Error:', error.message);
    console.error('   To fix: Install and start MongoDB, or use a cloud MongoDB instance');
  }
}

export default connectToDatabase;