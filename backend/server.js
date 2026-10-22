import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import listingsRouter from './routes/listings.js';
import authRouter from './routes/auth.js';
import { seedDatabase } from './seed.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check endpoint for uptime monitors / keep-alive pings
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.send('RentRight MERN API is running...');
});

// API Routes
app.use('/api/listings', listingsRouter);
app.use('/api/auth', authRouter);

// Start server immediately so Render detects port readiness right away
const server = app.listen(PORT, () => {
  console.log(`RentRight server running on port ${PORT}`);
});

// Connect to MongoDB once, then run background seeding without blocking HTTP
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {
      console.log('Connected to MongoDB Atlas');
      try {
        await seedDatabase();
      } catch (seedErr) {
        console.error('Database seeding error (non-fatal):', seedErr.message);
      }
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err.message);
    });
} else {
  console.warn('Warning: MONGO_URI environment variable is not defined.');
}

export default app;
