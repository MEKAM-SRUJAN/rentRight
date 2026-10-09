# RentRight 🏠

A modern, transparent, tenant-first real estate platform built with the **MERN Stack** (MongoDB, Express, React, Node.js). 

Unlike traditional real estate classifieds, RentRight is designed to protect tenants from scams and hidden brokerages by providing honest, community-driven data on properties before you pay a deposit.

## ✨ Killer Features

* **Tenant Truth Report:** A dedicated dashboard for every property displaying real tenant ratings on Deposit Return Reliability, Water Supply consistency, and Neighborhood Safety.
* **Fair Rent Meter:** Instantly compares the listing's asking rent to the local city average, visually highlighting if the property is a "Great Deal", "Fair Price", or "Overpriced".
* **Community Scam Flagging:** A community moderation system that allows users to flag suspicious properties (e.g., asking for fake visiting fees). Highly flagged properties display a massive warning banner to protect future tenants.
* **Spam-Free Communication:** Direct, single-click WhatsApp integration to message owners without your phone number being sold to third-party telemarketers.
* **Server-Side Pagination:** Highly optimized backend querying capable of handling thousands of properties smoothly.

## 🛠 Tech Stack

**Frontend:**
* React 18 (via Vite for blazing-fast builds)
* React Router DOM (Client-side routing)
* Custom CSS (Responsive Grid/Flexbox architecture)
* Lucide React (Modern iconography)

**Backend:**
* Node.js & Express.js
* MongoDB & Mongoose (Schema validation & data modeling)
* bcryptjs (Secure password hashing)

## 🚀 Running Locally

To run this project on your local machine:

**1. Clone the repository**
```bash
git clone https://github.com/MEKAM-SRUJAN/rentRight.git
cd rentRight
```

**2. Start the Backend**
```bash
cd backend
npm install
node seed.js     # Populates the database with 50 diverse properties
node server.js   # Starts the Express API on port 5000
```

**3. Start the Frontend**
```bash
cd ../frontend
npm install
npm run dev      # Starts the Vite dev server on port 5173
```

## 📐 Architecture highlights
* **RESTful API:** Clean, modular routing separated by resources (`/api/listings`, `/api/auth`).
* **Responsive Design:** Mobile-first CSS ensures the complex filter sidebars gracefully degrade into off-canvas or stacked layouts on smaller screens.
* **Dynamic Rating Recalculation:** When a new review is submitted via the POST route, the backend automatically recalculates the aggregate water, safety, and deposit averages across the entire property document.
