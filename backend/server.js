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
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/rentright';

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/listings', listingsRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.send('RentRight MERN API is running...');
});

// Connect to MongoDB and start server
mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await seedDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
