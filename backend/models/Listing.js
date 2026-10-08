import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ['PG', 'FLAT', 'ROOM'], required: true },
    location: { type: String, required: true },
    city: { type: String, required: true },
    description: { type: String, required: true },
    rent: { type: Number, required: true },
    deposit: { type: Number, required: true },
    forGender: { type: String, enum: ['Girls', 'Boys', 'Anyone'], default: 'Anyone' },
    foodIncluded: { type: Boolean, default: false },
    ownerName: { type: String, required: true },
    ownerPhone: { type: String, required: true },
    image: { type: String, default: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80' },
    flags: { type: Number, default: 0 },
    overallRating: { type: Number, default: 0 },
    waterRating: { type: Number, default: 0 },
    safetyRating: { type: Number, default: 0 },
    depositRefundRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Listing', listingSchema);
