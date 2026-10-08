import React from 'react';
import { AlertCircle, Star } from 'lucide-react';

export default function ListingCard({ listing }) {
  const formattedRent    = listing.rent?.toLocaleString('en-IN');
  const formattedDeposit = listing.deposit?.toLocaleString('en-IN');

  const typeColor = {
    PG:   { bg: '#EBF3ED', color: '#1E4632' },
    FLAT: { bg: '#EEF2FF', color: '#3730A3' },
    ROOM: { bg: '#FEF3C7', color: '#92400E' },
  }[listing.type] || { bg: '#F3F4F6', color: '#374151' };

  return (
    <div className="listing-card">
      {/* Image */}
      <div style={{
        width: '100%', height: '160px', borderRadius: '1rem', overflow: 'hidden',
        marginBottom: '1rem', position: 'relative', background: '#F3F4F6'
      }}>
        <img
          src={listing.image}
          alt={listing.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80'; }}
        />
        {/* Type badge */}
        <span style={{
          position: 'absolute', top: '10px', left: '10px',
          background: typeColor.bg, color: typeColor.color,
          fontSize: '.72rem', fontWeight: 800, padding: '.25rem .65rem', borderRadius: '9999px'
        }}>
          {listing.type}
        </span>
        {/* Scam flag */}
        {listing.flags > 0 && (
          <span className="badge-flags" style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <AlertCircle size={11} /> {listing.flags} FLAG{listing.flags > 1 ? 'S' : ''}
          </span>
        )}
      </div>

      {/* Meta */}
      <div className="card-category" style={{ marginBottom: '.3rem' }}>
        {listing.location}, {listing.city}
      </div>
      <div className="card-title">{listing.title}</div>

      {/* Tags */}
      <div className="tags-row">
        <span className="pill-tag">{listing.forGender}</span>
        {listing.foodIncluded && <span className="pill-tag">🍽 Food</span>}
        <span className="pill-tag">Dep ₹{formattedDeposit}</span>
      </div>

      {/* Footer */}
      <div className="card-footer">
        <div className="price-text">
          ₹{formattedRent}<span>/mo</span>
        </div>
        <div className="rating-text">
          {listing.reviewCount > 0 ? (
            <>
              <Star size={13} fill="#F59E0B" color="#F59E0B" />
              {listing.overallRating}
              <span>({listing.reviewCount})</span>
            </>
          ) : (
            <span style={{ color: '#9CA3AF', fontSize: '.78rem' }}>No reviews</span>
          )}
        </div>
      </div>
    </div>
  );
}
