import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
    userName: { type: String, required: true },
    comment: { type: String, required: true },
    overall: { type: Number, required: true, min: 1, max: 5 },
    water: { type: Number, required: true, min: 1, max: 5 },
    safety: { type: Number, required: true, min: 1, max: 5 },
    depositRefund: { type: Number, required: true, min: 1, max: 5 },
    date: { type: String, default: () => new Date().toISOString().split('T')[0] }
  },
  { timestamps: true }
);

export default mongoose.model('Review', reviewSchema);
