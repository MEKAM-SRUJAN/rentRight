import express from 'express';
import Listing from '../models/Listing.js';
import Review from '../models/Review.js';

const router = express.Router();

// Get all listings with optional filters + server-side pagination
router.get('/', async (req, res) => {
  try {
    const { search, maxRent, forGender, food, page = 1, limit = 9 } = req.query;
    let query = {};

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { title: searchRegex },
        { location: searchRegex },
        { city: searchRegex }
      ];
    }

    if (maxRent) {
      query.rent = { $lte: Number(maxRent) };
    }

    if (forGender && forGender !== 'Anyone') {
      query.forGender = { $in: [forGender, 'Anyone'] };
    }

    if (food === 'true') {
      query.foodIncluded = true;
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const [listings, total] = await Promise.all([
      Listing.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Listing.countDocuments(query)
    ]);

    res.json({
      listings,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      hasNextPage: pageNum < Math.ceil(total / limitNum),
      hasPrevPage: pageNum > 1
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get listing details by ID
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    
    const reviews = await Review.find({ listingId: req.params.id }).sort({ createdAt: -1 });
    res.json({ listing, reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new listing
router.post('/', async (req, res) => {
  try {
    const { title, type, location, city, description, rent, deposit, forGender, foodIncluded, ownerName, ownerPhone } = req.body;
    
    const listing = new Listing({
      title,
      type,
      location,
      city,
      description,
      rent: Number(rent),
      deposit: Number(deposit),
      forGender: forGender || 'Anyone',
      foodIncluded: foodIncluded || false,
      ownerName,
      ownerPhone
    });

    const savedListing = await listing.save();
    res.status(201).json(savedListing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Post a review for a listing
router.post('/:id/reviews', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    const { userName, comment, overall, water, safety, depositRefund } = req.body;

    const review = new Review({
      listingId: req.params.id,
      userName,
      comment,
      overall: Number(overall),
      water: Number(water),
      safety: Number(safety),
      depositRefund: Number(depositRefund)
    });

    await review.save();

    // Recalculate average ratings for the listing
    const allReviews = await Review.find({ listingId: req.params.id });
    const count = allReviews.length;
    
    const avgOverall = allReviews.reduce((acc, r) => acc + r.overall, 0) / count;
    const avgWater = allReviews.reduce((acc, r) => acc + r.water, 0) / count;
    const avgSafety = allReviews.reduce((acc, r) => acc + r.safety, 0) / count;
    const avgDeposit = allReviews.reduce((acc, r) => acc + r.depositRefund, 0) / count;

    listing.overallRating = Number(avgOverall.toFixed(1));
    listing.waterRating = Number(avgWater.toFixed(1));
    listing.safetyRating = Number(avgSafety.toFixed(1));
    listing.depositRefundRating = Number(avgDeposit.toFixed(1));
    listing.reviewCount = count;

    await listing.save();

    res.status(201).json({ review, listing });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Report a listing as scam / flag it
router.post('/:id/report', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    listing.flags += 1;
    await listing.save();
    res.json({ message: 'Scam report submitted', flags: listing.flags });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
