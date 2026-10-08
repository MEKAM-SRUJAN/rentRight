import Listing from './models/Listing.js';
import Review from './models/Review.js';

export const seedDatabase = async () => {
  try {
    const count = await Listing.countDocuments();
    if (count >= 50) {
      console.log(`Database already has ${count} listings`);
      return;
    }

    console.log('Seeding 50 RentRight listings...');
    await Listing.deleteMany({});
    await Review.deleteMany({});

    const listings = [
      // ── BANGALORE ──────────────────────────────────────────
      {
        title: 'Sunrise Ladies PG',
        type: 'PG', location: 'KORAMANGALA', city: 'BANGALORE',
        description: 'Twin sharing, 3 meals, Wi-Fi, washing machine. 5 min walk to Forum Mall.',
        rent: 9500, deposit: 15000, forGender: 'Girls', foodIncluded: true,
        ownerName: 'Lakshmi R.', ownerPhone: '98450 12345',
        flags: 0, overallRating: 4.0, waterRating: 3.5, safetyRating: 5.0, depositRefundRating: 4.5, reviewCount: 2,
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80'
      },
      {
        title: 'Techie Nest Boys PG',
        type: 'PG', location: 'MARATHAHALLI', city: 'BANGALORE',
        description: 'Single and double rooms for working professionals with high-speed fiber internet.',
        rent: 7500, deposit: 10000, forGender: 'Boys', foodIncluded: true,
        ownerName: 'Ramesh V.', ownerPhone: '98451 99887',
        flags: 2, overallRating: 2.0, waterRating: 2.0, safetyRating: 3.0, depositRefundRating: 1.0, reviewCount: 1,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80'
      },
      {
        title: 'Green View 1BHK Apartment',
        type: 'FLAT', location: 'INDIRANAGAR', city: 'BANGALORE',
        description: 'Modern fully-furnished 1BHK with private balcony near 100 Feet Road.',
        rent: 22000, deposit: 45000, forGender: 'Anyone', foodIncluded: false,
        ownerName: 'Kavitha M.', ownerPhone: '98801 11223',
        flags: 0, overallRating: 4.8, waterRating: 5.0, safetyRating: 4.5, depositRefundRating: 5.0, reviewCount: 4,
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80'
      },
      {
        title: 'Elite Executive Stays PG',
        type: 'PG', location: 'HSR LAYOUT', city: 'BANGALORE',
        description: 'Premium PG for men with gym, daily housekeeping, 3-course meals & biometric entry.',
        rent: 12500, deposit: 20000, forGender: 'Boys', foodIncluded: true,
        ownerName: 'Sanjay Gowda', ownerPhone: '97400 44556',
        flags: 0, overallRating: 4.5, waterRating: 4.0, safetyRating: 5.0, depositRefundRating: 4.5, reviewCount: 3,
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80'
      },
      {
        title: 'Furnished Master Bedroom in 3BHK',
        type: 'ROOM', location: 'BELLANDUR', city: 'BANGALORE',
        description: 'Attached bath, AC, fridge, microwave in gated society next to EcoSpace.',
        rent: 14000, deposit: 28000, forGender: 'Anyone', foodIncluded: false,
        ownerName: 'Deepak Sharma', ownerPhone: '96112 33445',
        flags: 0, overallRating: 4.2, waterRating: 4.0, safetyRating: 4.5, depositRefundRating: 4.0, reviewCount: 2,
        image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80'
      },
      {
        title: 'Orchid Luxury Womens Residency',
        type: 'PG', location: 'WHITEFIELD', city: 'BANGALORE',
        description: 'Spacious AC rooms, North & South Indian food, 24/7 security guard.',
        rent: 11000, deposit: 18000, forGender: 'Girls', foodIncluded: true,
        ownerName: 'Anita Reddy', ownerPhone: '99005 66778',
        flags: 0, overallRating: 4.7, waterRating: 4.5, safetyRating: 5.0, depositRefundRating: 4.5, reviewCount: 5,
        image: 'https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=600&q=80'
      },
      {
        title: 'Studio Flat near Manyata Tech Park',
        type: 'FLAT', location: 'HEBBAL', city: 'BANGALORE',
        description: 'Independent studio with kitchenette, ideal for single IT professional.',
        rent: 15500, deposit: 30000, forGender: 'Anyone', foodIncluded: false,
        ownerName: 'Manjunath B.', ownerPhone: '98440 22114',
        flags: 0, overallRating: 3.9, waterRating: 3.5, safetyRating: 4.0, depositRefundRating: 4.0, reviewCount: 3,
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80'
      },
      {
        title: 'Green Park Co-Living Hub',
        type: 'PG', location: 'KORAMANGALA', city: 'BANGALORE',
        description: 'Single AC rooms, gaming console lounge, organic breakfast included.',
        rent: 13500, deposit: 22000, forGender: 'Anyone', foodIncluded: true,
        ownerName: 'Girish Kumar', ownerPhone: '98455 77889',
        flags: 0, overallRating: 4.6, waterRating: 4.5, safetyRating: 4.8, depositRefundRating: 4.5, reviewCount: 5,
        image: 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=600&q=80'
      },
      {
        title: 'Highland 2BHK Flat',
        type: 'FLAT', location: 'WHITEFIELD', city: 'BANGALORE',
        description: 'Near ITPL, fully equipped modular kitchen, swimming pool access.',
        rent: 28000, deposit: 60000, forGender: 'Anyone', foodIncluded: false,
        ownerName: 'Nitin Roy', ownerPhone: '99001 22334',
        flags: 0, overallRating: 4.7, waterRating: 4.5, safetyRating: 5.0, depositRefundRating: 4.5, reviewCount: 4,
        image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80'
      },
      {
        title: 'Budget Room for Students',
        type: 'ROOM', location: 'JP NAGAR', city: 'BANGALORE',
        description: 'No-frills furnished room near BTM, ideal for students and freshers.',
        rent: 6500, deposit: 10000, forGender: 'Boys', foodIncluded: false,
        ownerName: 'Basavaraju T.', ownerPhone: '99860 55443',
        flags: 0, overallRating: 3.5, waterRating: 3.0, safetyRating: 3.8, depositRefundRating: 3.5, reviewCount: 2,
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80'
      },

      // ── HYDERABAD ──────────────────────────────────────────
      {
        title: '2BHK near Hitech City',
        type: 'FLAT', location: 'MADHAPUR', city: 'HYDERABAD',
        description: 'Spacious 2BHK in gated community with power backup, gym and covered parking.',
        rent: 24000, deposit: 50000, forGender: 'Anyone', foodIncluded: false,
        ownerName: 'Suresh Kumar', ownerPhone: '97001 55443',
        flags: 0, overallRating: 5.0, waterRating: 5.0, safetyRating: 5.0, depositRefundRating: 5.0, reviewCount: 1,
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80'
      },
      {
        title: 'Cyber Towers Co-Living PG',
        type: 'PG', location: 'KONDAPUR', city: 'HYDERABAD',
        description: 'Modern co-living space with gaming area, rooftop café and buffet meals.',
        rent: 10500, deposit: 15000, forGender: 'Anyone', foodIncluded: true,
        ownerName: 'Venkatesh Rao', ownerPhone: '98490 88776',
        flags: 0, overallRating: 4.6, waterRating: 4.5, safetyRating: 4.8, depositRefundRating: 4.5, reviewCount: 6,
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80'
      },
      {
        title: 'Independent 1RK Room in Gachibowli',
        type: 'ROOM', location: 'GACHIBOWLI', city: 'HYDERABAD',
        description: 'Quiet residential area, 10 min drive to Financial District.',
        rent: 8500, deposit: 17000, forGender: 'Boys', foodIncluded: false,
        ownerName: 'Srinivas K.', ownerPhone: '99890 12389',
        flags: 0, overallRating: 4.1, waterRating: 4.0, safetyRating: 4.0, depositRefundRating: 4.2, reviewCount: 3,
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80'
      },
      {
        title: 'Royal Palms 3BHK Gated Flat',
        type: 'FLAT', location: 'JUBILEE HILLS', city: 'HYDERABAD',
        description: 'Ultra-luxurious flat with modular kitchen, pool access and servant quarter.',
        rent: 42000, deposit: 100000, forGender: 'Anyone', foodIncluded: false,
        ownerName: 'Harsha Vardhan', ownerPhone: '98480 33221',
        flags: 0, overallRating: 4.9, waterRating: 5.0, safetyRating: 5.0, depositRefundRating: 4.8, reviewCount: 4,
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80'
      },
      {
        title: 'Sri Sai Ladies Hostel & PG',
        type: 'PG', location: 'AMEERPET', city: 'HYDERABAD',
        description: 'Clean rooms with biometric entry, 3 meals and study table for students.',
        rent: 6800, deposit: 8000, forGender: 'Girls', foodIncluded: true,
        ownerName: 'Radha Rani', ownerPhone: '99499 55112',
        flags: 0, overallRating: 3.8, waterRating: 4.0, safetyRating: 4.5, depositRefundRating: 3.0, reviewCount: 2,
        image: 'https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=600&q=80'
      },
      {
        title: 'Comfort Stay PG for Women',
        type: 'PG', location: 'GACHIBOWLI', city: 'HYDERABAD',
        description: 'Strict security, 3 meals daily, daily room cleaning included.',
        rent: 9000, deposit: 15000, forGender: 'Girls', foodIncluded: true,
        ownerName: 'Swathi N.', ownerPhone: '98499 11223',
        flags: 0, overallRating: 4.4, waterRating: 4.2, safetyRating: 4.8, depositRefundRating: 4.2, reviewCount: 3,
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80'
      },
      {
        title: 'Modern 1BHK Furnished Flat',
        type: 'FLAT', location: 'KONDAPUR', city: 'HYDERABAD',
        description: 'Furnished with fridge, washing machine, sofa and smart TV.',
        rent: 18500, deposit: 35000, forGender: 'Anyone', foodIncluded: false,
        ownerName: 'Mahesh Reddy', ownerPhone: '97000 88990',
        flags: 0, overallRating: 4.5, waterRating: 4.5, safetyRating: 4.5, depositRefundRating: 4.5, reviewCount: 3,
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80'
      },
      {
        title: 'Spacious 2BHK in Banjara Hills',
        type: 'FLAT', location: 'BANJARA HILLS', city: 'HYDERABAD',
        description: 'Peaceful neighbourhood, great connectivity, semi-furnished with wardrobes.',
        rent: 27000, deposit: 55000, forGender: 'Anyone', foodIncluded: false,
        ownerName: 'Priya Sharma', ownerPhone: '98485 22334',
        flags: 0, overallRating: 4.3, waterRating: 4.0, safetyRating: 4.5, depositRefundRating: 4.5, reviewCount: 2,
        image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80'
      },
      {
        title: 'Value PG for IT Professionals',
        type: 'PG', location: 'HITECH CITY', city: 'HYDERABAD',
        description: 'Walking distance to DLF Cyber Towers, clean rooms, AC, Wi-Fi.',
        rent: 8800, deposit: 12000, forGender: 'Boys', foodIncluded: false,
        ownerName: 'Ravi Teja', ownerPhone: '99000 44321',
        flags: 1, overallRating: 3.6, waterRating: 3.5, safetyRating: 4.0, depositRefundRating: 3.0, reviewCount: 2,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80'
      },
      {
        title: 'Serene Studio Apartment',
        type: 'FLAT', location: 'MANIKONDA', city: 'HYDERABAD',
        description: 'Brand new apartment complex, pet-friendly, close to DLF Mall.',
        rent: 14000, deposit: 28000, forGender: 'Anyone', foodIncluded: false,
        ownerName: 'Arun Kapoor', ownerPhone: '97005 11223',
        flags: 0, overallRating: 4.4, waterRating: 4.5, safetyRating: 4.5, depositRefundRating: 4.2, reviewCount: 3,
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80'
      },

      // ── PUNE ──────────────────────────────────────────────
      {
        title: 'Single Room, Viman Nagar',
        type: 'ROOM', location: 'VIMAN NAGAR', city: 'PUNE',
        description: 'Fully furnished independent room with attached balcony and bathroom.',
        rent: 11000, deposit: 22000, forGender: 'Anyone', foodIncluded: false,
        ownerName: 'Amit Shah', ownerPhone: '98220 33441',
        flags: 0, overallRating: 4.3, waterRating: 4.0, safetyRating: 4.5, depositRefundRating: 4.5, reviewCount: 3,
        image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80'
      },
      {
        title: 'IT Park Heights 2BHK',
        type: 'FLAT', location: 'HINJEWADI', city: 'PUNE',
        description: 'Close to Phase 1 IT companies, semi-furnished with modular kitchen.',
        rent: 19500, deposit: 40000, forGender: 'Anyone', foodIncluded: false,
        ownerName: 'Nilesh Patil', ownerPhone: '98500 77665',
        flags: 0, overallRating: 4.4, waterRating: 4.2, safetyRating: 4.5, depositRefundRating: 4.5, reviewCount: 5,
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80'
      },
      {
        title: 'Scholar Nest Student PG',
        type: 'PG', location: 'KOTHRUD', city: 'PUNE',
        description: 'Home-style Maharashtrian food, high-speed Wi-Fi, quiet atmosphere.',
        rent: 8000, deposit: 12000, forGender: 'Boys', foodIncluded: true,
        ownerName: 'Sunil Deshmukh', ownerPhone: '97640 11998',
        flags: 0, overallRating: 4.6, waterRating: 4.8, safetyRating: 4.5, depositRefundRating: 4.5, reviewCount: 4,
        image: 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=600&q=80'
      },
      {
        title: 'Cozy Private Room in Koregaon Park',
        type: 'ROOM', location: 'KOREGAON PARK', city: 'PUNE',
        description: 'Trendy neighborhood, close to cafes and parks. Looking for peaceful roommate.',
        rent: 13500, deposit: 25000, forGender: 'Anyone', foodIncluded: false,
        ownerName: 'Rohan Mehta', ownerPhone: '98231 44556',
        flags: 0, overallRating: 4.7, waterRating: 4.5, safetyRating: 5.0, depositRefundRating: 4.5, reviewCount: 3,
        image: 'https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=600&q=80'
      },
      {
        title: 'Amanora Park Town Room',
        type: 'ROOM', location: 'HADAPSAR', city: 'PUNE',
        description: 'Room inside luxury township with mall, park and lake access.',
        rent: 12000, deposit: 24000, forGender: 'Anyone', foodIncluded: false,
        ownerName: 'Prashant More', ownerPhone: '98501 22334',
        flags: 0, overallRating: 4.8, waterRating: 5.0, safetyRating: 5.0, depositRefundRating: 4.5, reviewCount: 4,
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80'
      },
      {
        title: 'Kalyani Nagar 1BHK Flat',
        type: 'FLAT', location: 'KALYANI NAGAR', city: 'PUNE',
        description: 'Prime location, walking to restaurants, furnished with inverter backup.',
        rent: 21000, deposit: 42000, forGender: 'Anyone', foodIncluded: false,
        ownerName: 'Sneha Kulkarni', ownerPhone: '97666 55443',
        flags: 0, overallRating: 4.5, waterRating: 4.5, safetyRating: 4.5, depositRefundRating: 4.5, reviewCount: 3,
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80'
      },
      {
        title: 'Girls-Only PG near Symbiosis',
        type: 'PG', location: 'VIMAN NAGAR', city: 'PUNE',
        description: 'Ideal for students near Symbiosis university, 24hr warden, meals included.',
        rent: 9200, deposit: 15000, forGender: 'Girls', foodIncluded: true,
        ownerName: 'Anupama Joshi', ownerPhone: '98232 77889',
        flags: 0, overallRating: 4.3, waterRating: 4.0, safetyRating: 5.0, depositRefundRating: 4.0, reviewCount: 4,
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80'
      },

      // ── GURGAON ───────────────────────────────────────────
      {
        title: 'Cyber City Luxury Co-Living',
        type: 'PG', location: 'DLF PHASE 3', city: 'GURGAON',
        description: 'AC, smart TV, gaming zone, 3 times meals and weekly laundry service.',
        rent: 16000, deposit: 25000, forGender: 'Anyone', foodIncluded: true,
        ownerName: 'Vikram Singh', ownerPhone: '98100 99881',
        flags: 0, overallRating: 4.6, waterRating: 4.5, safetyRating: 4.8, depositRefundRating: 4.5, reviewCount: 5,
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80'
      },
      {
        title: 'Independent 1BHK Floor',
        type: 'FLAT', location: 'SECTOR 43', city: 'GURGAON',
        description: 'Private terrace, 100% power backup, near HUDA City Centre metro.',
        rent: 21000, deposit: 35000, forGender: 'Anyone', foodIncluded: false,
        ownerName: 'Rajesh Yadav', ownerPhone: '99102 33221',
        flags: 0, overallRating: 4.2, waterRating: 4.0, safetyRating: 4.5, depositRefundRating: 4.0, reviewCount: 3,
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80'
      },
      {
        title: 'Safe Haven Girls PG',
        type: 'PG', location: 'SECTOR 56', city: 'GURGAON',
        description: 'Gated security, CCTV surveillance, biometric lock, organic food.',
        rent: 13000, deposit: 20000, forGender: 'Girls', foodIncluded: true,
        ownerName: 'Suman Gupta', ownerPhone: '98115 66774',
        flags: 0, overallRating: 4.8, waterRating: 4.5, safetyRating: 5.0, depositRefundRating: 4.8, reviewCount: 6,
        image: 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=600&q=80'
      },
      {
        title: 'Golf Course Road 3BHK Flat',
        type: 'FLAT', location: 'SECTOR 54', city: 'GURGAON',
        description: 'Premium high-rise apartment with panoramic skyline view.',
        rent: 48000, deposit: 110000, forGender: 'Anyone', foodIncluded: false,
        ownerName: 'Sunil Bansal', ownerPhone: '98101 44556',
        flags: 0, overallRating: 4.9, waterRating: 5.0, safetyRating: 5.0, depositRefundRating: 4.8, reviewCount: 5,
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80'
      },
      {
        title: 'MG Road Metro Walk Room',
        type: 'ROOM', location: 'MG ROAD', city: 'GURGAON',
        description: 'Fully furnished room, 2 min walk to MG Road metro station.',
        rent: 16500, deposit: 30000, forGender: 'Anyone', foodIncluded: false,
        ownerName: 'Deepa Verma', ownerPhone: '99110 88776',
        flags: 0, overallRating: 4.4, waterRating: 4.2, safetyRating: 4.5, depositRefundRating: 4.5, reviewCount: 3,
        image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80'
      },

      // ── MUMBAI ────────────────────────────────────────────
      {
        title: '1BHK Sea View Apartment',
        type: 'FLAT', location: 'BANDRA WEST', city: 'MUMBAI',
        description: 'Prime location near Carter Road, fully updated interiors and dedicated parking.',
        rent: 55000, deposit: 150000, forGender: 'Anyone', foodIncluded: false,
        ownerName: 'Cyrus Mistry', ownerPhone: '98200 11990',
        flags: 0, overallRating: 4.9, waterRating: 5.0, safetyRating: 5.0, depositRefundRating: 4.8, reviewCount: 4,
        image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80'
      },
      {
        title: 'Executive Male PG near Mindspace',
        type: 'PG', location: 'MALAD WEST', city: 'MUMBAI',
        description: 'Single occupancy AC room with Wi-Fi, laundry and breakfast.',
        rent: 14500, deposit: 25000, forGender: 'Boys', foodIncluded: true,
        ownerName: 'Prakash Shetty', ownerPhone: '98690 44332',
        flags: 0, overallRating: 4.1, waterRating: 4.0, safetyRating: 4.2, depositRefundRating: 4.0, reviewCount: 3,
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80'
      },
      {
        title: 'Room for Professional near IIT',
        type: 'ROOM', location: 'POWAI', city: 'MUMBAI',
        description: 'Walking distance to Hiranandani complex and IIT Bombay.',
        rent: 16500, deposit: 35000, forGender: 'Anyone', foodIncluded: false,
        ownerName: 'Sameer Joshi', ownerPhone: '98199 88771',
        flags: 0, overallRating: 4.3, waterRating: 4.5, safetyRating: 4.5, depositRefundRating: 4.0, reviewCount: 2,
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80'
      },
      {
        title: '2BHK Gated Flat near BKC',
        type: 'FLAT', location: 'KURLA WEST', city: 'MUMBAI',
        description: 'Close to BKC financial district, high security gated compound.',
        rent: 38000, deposit: 90000, forGender: 'Anyone', foodIncluded: false,
        ownerName: 'Aslam Shaikh', ownerPhone: '98211 55443',
        flags: 0, overallRating: 4.0, waterRating: 3.8, safetyRating: 4.2, depositRefundRating: 4.0, reviewCount: 3,
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80'
      },
      {
        title: 'Sunshine Girls PG near Metro',
        type: 'PG', location: 'ANDHERI WEST', city: 'MUMBAI',
        description: 'Near metro station, clean meals, high-speed Wi-Fi, CCTV.',
        rent: 12000, deposit: 20000, forGender: 'Girls', foodIncluded: true,
        ownerName: 'Pooja Kulkarni', ownerPhone: '98205 66112',
        flags: 0, overallRating: 4.5, waterRating: 4.5, safetyRating: 4.8, depositRefundRating: 4.5, reviewCount: 4,
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80'
      },
      {
        title: 'Sea Crest Room in Juhu Duplex',
        type: 'ROOM', location: 'JUHU', city: 'MUMBAI',
        description: 'Beautiful room near beach with sea breeze, looking for working executive.',
        rent: 22000, deposit: 50000, forGender: 'Anyone', foodIncluded: false,
        ownerName: 'Rhea Kapoor', ownerPhone: '98201 99001',
        flags: 0, overallRating: 4.7, waterRating: 4.5, safetyRating: 5.0, depositRefundRating: 4.5, reviewCount: 3,
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80'
      },
      {
        title: 'Affordable Room in Thane',
        type: 'ROOM', location: 'THANE WEST', city: 'MUMBAI',
        description: 'Budget-friendly furnished room near Thane station.',
        rent: 9800, deposit: 18000, forGender: 'Anyone', foodIncluded: false,
        ownerName: 'Mohan Kale', ownerPhone: '97020 33445',
        flags: 0, overallRating: 3.9, waterRating: 3.8, safetyRating: 4.0, depositRefundRating: 3.8, reviewCount: 2,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80'
      },

      // ── CHENNAI ───────────────────────────────────────────
      {
        title: 'OMR Tech Corridor PG',
        type: 'PG', location: 'OMR', city: 'CHENNAI',
        description: 'Close to major IT companies on OMR, food included, AC rooms.',
        rent: 9000, deposit: 15000, forGender: 'Boys', foodIncluded: true,
        ownerName: 'Karthik Raj', ownerPhone: '99400 22334',
        flags: 0, overallRating: 4.2, waterRating: 4.0, safetyRating: 4.5, depositRefundRating: 4.0, reviewCount: 3,
        image: 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=600&q=80'
      },
      {
        title: 'Adyar River View 2BHK',
        type: 'FLAT', location: 'ADYAR', city: 'CHENNAI',
        description: 'Beautiful riverside apartment, fully furnished, ideal for family.',
        rent: 28000, deposit: 60000, forGender: 'Anyone', foodIncluded: false,
        ownerName: 'Sundar Rajan', ownerPhone: '98400 55667',
        flags: 0, overallRating: 4.7, waterRating: 4.8, safetyRating: 5.0, depositRefundRating: 4.8, reviewCount: 4,
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80'
      },
      {
        title: 'Ladies Hostel near Anna University',
        type: 'PG', location: 'GUINDY', city: 'CHENNAI',
        description: 'Safe and clean hostel for women near Anna University campus.',
        rent: 7500, deposit: 10000, forGender: 'Girls', foodIncluded: true,
        ownerName: 'Meena Devi', ownerPhone: '99401 77889',
        flags: 0, overallRating: 4.3, waterRating: 4.5, safetyRating: 5.0, depositRefundRating: 4.0, reviewCount: 3,
        image: 'https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=600&q=80'
      },
      {
        title: 'T Nagar Room Near Shopping Hub',
        type: 'ROOM', location: 'T NAGAR', city: 'CHENNAI',
        description: 'Budget room near Pondy Bazaar, AC, attached bath.',
        rent: 8500, deposit: 15000, forGender: 'Anyone', foodIncluded: false,
        ownerName: 'Selvam P.', ownerPhone: '98402 44556',
        flags: 0, overallRating: 3.8, waterRating: 3.5, safetyRating: 4.0, depositRefundRating: 3.8, reviewCount: 2,
        image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80'
      },

      // ── NOIDA / DELHI NCR ──────────────────────────────────
      {
        title: 'Sector 62 Premium PG',
        type: 'PG', location: 'SECTOR 62', city: 'NOIDA',
        description: 'Close to NSEZ, AC double rooms, food, laundry included.',
        rent: 12000, deposit: 20000, forGender: 'Anyone', foodIncluded: true,
        ownerName: 'Alok Srivastava', ownerPhone: '98100 33221',
        flags: 0, overallRating: 4.4, waterRating: 4.3, safetyRating: 4.5, depositRefundRating: 4.5, reviewCount: 4,
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80'
      },
      {
        title: '2BHK Flat in Greater Noida West',
        type: 'FLAT', location: 'GREATER NOIDA WEST', city: 'NOIDA',
        description: 'Affordable 2BHK in society with swimming pool, gym and park.',
        rent: 16000, deposit: 32000, forGender: 'Anyone', foodIncluded: false,
        ownerName: 'Anjali Singh', ownerPhone: '97188 99887',
        flags: 0, overallRating: 4.3, waterRating: 4.0, safetyRating: 4.5, depositRefundRating: 4.5, reviewCount: 3,
        image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80'
      },
      {
        title: 'Lajpat Nagar 1BHK',
        type: 'FLAT', location: 'LAJPAT NAGAR', city: 'DELHI',
        description: 'Central Delhi location, fully furnished, metro connectivity.',
        rent: 24000, deposit: 50000, forGender: 'Anyone', foodIncluded: false,
        ownerName: 'Rohit Arora', ownerPhone: '98110 44567',
        flags: 0, overallRating: 4.1, waterRating: 3.8, safetyRating: 4.2, depositRefundRating: 4.0, reviewCount: 3,
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80'
      },
      {
        title: 'Hauz Khas Girls PG',
        type: 'PG', location: 'HAUZ KHAS', city: 'DELHI',
        description: 'Vibrant South Delhi neighborhood, near metro, food included.',
        rent: 14000, deposit: 22000, forGender: 'Girls', foodIncluded: true,
        ownerName: 'Neha Malhotra', ownerPhone: '98111 77665',
        flags: 0, overallRating: 4.5, waterRating: 4.2, safetyRating: 4.8, depositRefundRating: 4.5, reviewCount: 5,
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80'
      },
    ];

    const inserted = await Listing.insertMany(listings);

    // Add a few reviews for key listings
    const sunrise = inserted[0];
    const techie  = inserted[1];
    const hitech  = inserted[10];

    await Review.insertMany([
      { listingId: sunrise._id, userName: 'Priya', comment: 'Food is homely, owner is strict but very safe.', overall: 4, water: 4, safety: 5, depositRefund: 4, date: '2026-08-12' },
      { listingId: sunrise._id, userName: 'Ananya', comment: 'Got full deposit back within a week!', overall: 4, water: 3, safety: 5, depositRefund: 5, date: '2026-06-02' },
      { listingId: techie._id,  userName: 'Rahul',  comment: 'Frequent water shortage, owner deducted ₹3000 without reason.', overall: 2, water: 2, safety: 3, depositRefund: 1, date: '2026-07-20' },
      { listingId: hitech._id,  userName: 'Vikram', comment: 'Excellent flat and prompt deposit refund.', overall: 5, water: 5, safety: 5, depositRefund: 5, date: '2026-09-01' },
    ]);

    console.log(`✅ Seeded ${inserted.length} listings successfully!`);
  } catch (err) {
    console.error('Seeding error:', err);
  }
};
