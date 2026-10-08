import React, { useState } from 'react';

export default function PostListingModal({ isOpen, onClose, onListingCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'PG',
    location: '',
    city: '',
    description: '',
    rent: '',
    deposit: '',
    forGender: 'Anyone',
    foodIncluded: false,
    ownerName: '',
    ownerPhone: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onListingCreated(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">Post a Property Listing</div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="select-label">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Sunrise Ladies PG"
              required
              className="form-input"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="select-label">Property Type</label>
              <select name="type" className="rating-select" value={formData.type} onChange={handleChange}>
                <option value="PG">PG</option>
                <option value="ROOM">ROOM</option>
                <option value="FLAT">FLAT</option>
              </select>
            </div>
            <div className="form-group">
              <label className="select-label">Gender Preference</label>
              <select name="forGender" className="rating-select" value={formData.forGender} onChange={handleChange}>
                <option value="Anyone">Anyone</option>
                <option value="Girls">Girls</option>
                <option value="Boys">Boys</option>
              </select>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="select-label">Location / Area</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Koramangala"
                required
                className="form-input"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="select-label">City</label>
              <input
                type="text"
                name="city"
                placeholder="e.g. Bangalore"
                required
                className="form-input"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="select-label">Monthly Rent (₹)</label>
              <input
                type="number"
                name="rent"
                placeholder="9500"
                required
                className="form-input"
                value={formData.rent}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="select-label">Security Deposit (₹)</label>
              <input
                type="number"
                name="deposit"
                placeholder="15000"
                required
                className="form-input"
                value={formData.deposit}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="select-label">Description & Amenities</label>
            <textarea
              name="description"
              placeholder="Describe wi-fi, food quality, timings, walkability..."
              required
              className="form-textarea"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="select-label">Owner Name</label>
              <input
                type="text"
                name="ownerName"
                placeholder="Lakshmi R."
                required
                className="form-input"
                value={formData.ownerName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="select-label">Owner Phone</label>
              <input
                type="text"
                name="ownerPhone"
                placeholder="98450 12345"
                required
                className="form-input"
                value={formData.ownerPhone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              name="foodIncluded"
              id="foodCheck"
              checked={formData.foodIncluded}
              onChange={handleChange}
            />
            <label htmlFor="foodCheck" style={{ fontSize: '0.9rem', fontWeight: 600 }}>Food Included</label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="button" onClick={onClose} className="btn-report" style={{ color: '#4B5563', borderColor: '#E5E7EB' }}>
              Cancel
            </button>
            <button type="submit" className="btn-post">
              Submit Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
