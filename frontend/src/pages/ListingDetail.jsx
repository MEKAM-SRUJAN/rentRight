import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ShieldAlert, CheckCircle2, AlertTriangle, 
  MessageCircle, Phone, ArrowLeft, Star, 
  Droplet, Shield, BadgeIndianRupee, TrendingDown, TrendingUp, Minus
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Mock average rents for the Fair Rent Meter
const avgRents = {
  BANGALORE: { PG: 11000, FLAT: 26000, ROOM: 14000 },
  HYDERABAD: { PG: 9500, FLAT: 22000, ROOM: 11000 },
  PUNE: { PG: 9000, FLAT: 20000, ROOM: 12000 },
  GURGAON: { PG: 13000, FLAT: 30000, ROOM: 16000 },
  MUMBAI: { PG: 15000, FLAT: 45000, ROOM: 20000 },
  DEFAULT: { PG: 10000, FLAT: 25000, ROOM: 12000 }
};

export default function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE}/api/listings/${id}`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading...</div>;
  if (!data || !data.listing) return <div style={{ padding: '4rem', textAlign: 'center' }}>Listing not found</div>;

  const { listing, reviews } = data;

  // Fair Rent Calculation
  const cityAvg = avgRents[listing.city]?.[listing.type] || avgRents.DEFAULT[listing.type];
  const diffPercent = ((listing.rent - cityAvg) / cityAvg) * 100;
  let rentStatus = { text: 'Fair Price', color: '#EAB308', icon: Minus, bg: '#FEF9C3' };
  if (diffPercent <= -10) {
    rentStatus = { text: 'Great Deal', color: '#16A34A', icon: TrendingDown, bg: '#DCFCE7' };
  } else if (diffPercent >= 15) {
    rentStatus = { text: 'Overpriced', color: '#EF4444', icon: TrendingUp, bg: '#FEE2E2' };
  }

  const handleReport = async () => {
    if (window.confirm('Are you sure you want to flag this as a scam?')) {
      try {
        await axios.post(`${API_BASE}/api/listings/${id}/report`);
        alert('Report submitted. Our team will review this listing.');
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const whatsappText = encodeURIComponent(`Hi ${listing.ownerName}, I saw your ${listing.type} listing "${listing.title}" on RentRight. Is it still available?`);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', marginBottom: '1.5rem', fontWeight: 600 }}>
        <ArrowLeft size={18} /> Back to Search
      </button>

      {/* Scam Warning Banner */}
      {listing.flags > 0 && (
        <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '1rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', fontWeight: 600 }}>
          <AlertTriangle size={24} color="#DC2626" />
          <div>
            This property has been flagged {listing.flags} time(s) by the community for suspicious activity (e.g., asking for visiting fees). Proceed with caution.
          </div>
        </div>
      )}

      <div className="detail-layout" style={{ alignItems: 'start' }}>
        
        {/* LEFT COLUMN */}
        <div>
          {/* Main Image */}
          <div style={{ width: '100%', height: '400px', borderRadius: '1.25rem', overflow: 'hidden', marginBottom: '2rem' }}>
            <img src={listing.image} alt={listing.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span style={{ background: 'var(--green-dark)', color: '#fff', padding: '0.3rem 0.8rem', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 700 }}>{listing.type}</span>
            <span style={{ background: '#E2E8F0', color: '#334155', padding: '0.3rem 0.8rem', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 700 }}>{listing.forGender}</span>
            {listing.foodIncluded && <span style={{ background: '#E2E8F0', color: '#334155', padding: '0.3rem 0.8rem', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 700 }}>🍽 Food Included</span>}
          </div>

          <h1 className="detail-main-title">{listing.title}</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--muted)', marginBottom: '2rem' }}>{listing.location}, {listing.city}</p>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem' }}>About this property</h3>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#475569', marginBottom: '3rem' }}>{listing.description}</p>

          {/* TENANT TRUTH REPORT */}
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '1.25rem', padding: '2rem', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <CheckCircle2 size={28} color="var(--green)" />
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Tenant Truth Report</h2>
            </div>
            
            {listing.reviewCount === 0 ? (
              <p style={{ color: 'var(--muted)' }}>No tenant reviews yet. Be the first to review!</p>
            ) : (
              <div className="truth-report-grid">
                <div className="truth-card">
                  <BadgeIndianRupee size={24} color="#10B981" style={{ margin: '0 auto 0.5rem' }} />
                  <div className="truth-score">{listing.depositRefundRating}/5</div>
                  <div className="truth-label">Deposit Return</div>
                </div>
                <div className="truth-card">
                  <Droplet size={24} color="#3B82F6" style={{ margin: '0 auto 0.5rem' }} />
                  <div className="truth-score">{listing.waterRating}/5</div>
                  <div className="truth-label">Water Supply</div>
                </div>
                <div className="truth-card">
                  <Shield size={24} color="#8B5CF6" style={{ margin: '0 auto 0.5rem' }} />
                  <div className="truth-score">{listing.safetyRating}/5</div>
                  <div className="truth-label">Safety</div>
                </div>
                <div className="truth-card">
                  <Star size={24} color="#F59E0B" style={{ margin: '0 auto 0.5rem' }} />
                  <div className="truth-score">{listing.overallRating}/5</div>
                  <div className="truth-label">Overall</div>
                </div>
              </div>
            )}
          </div>

          {/* Reviews List */}
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem', marginTop: '3rem' }}>Past Tenant Reviews ({reviews.length})</h3>
          {reviews.length === 0 ? (
            <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>No reviews yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
              {reviews.map(r => (
                <div key={r._id} style={{ padding: '1.5rem', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <strong style={{ fontSize: '1.05rem' }}>{r.userName}</strong>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 700, color: '#F59E0B' }}><Star size={14} fill="#F59E0B" /> {r.overall}</span>
                  </div>
                  <p style={{ color: '#475569', lineHeight: 1.5 }}>"{r.comment}"</p>
                </div>
              ))}
            </div>
          )}

          {/* Write Review Form */}
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '1.25rem', padding: '2rem', marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Leave a Truth Report</h3>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const payload = {
                userName: formData.get('userName'),
                comment: formData.get('comment'),
                overall: formData.get('overall'),
                water: formData.get('water'),
                safety: formData.get('safety'),
                depositRefund: formData.get('depositRefund')
              };
              try {
                await axios.post(`${API_BASE}/api/listings/${id}/reviews`, payload);
                alert('Review added successfully! The truth report has been updated.');
                window.location.reload();
              } catch (err) {
                alert('Failed to submit review.');
              }
            }}>
              <div className="form-grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Your Name</label>
                  <input name="userName" required placeholder="e.g. Rahul" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Overall Rating (1-5)</label>
                  <select name="overall" required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1' }}>
                    <option value="5">5 - Excellent</option><option value="4">4 - Good</option><option value="3">3 - Average</option><option value="2">2 - Poor</option><option value="1">1 - Terrible</option>
                  </select>
                </div>
              </div>
              
              <div className="form-grid-3">
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Deposit Return</label>
                  <select name="depositRefund" required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1' }}>
                    <option value="5">5 - Full Refund</option><option value="3">3 - Partial Deductions</option><option value="1">1 - Kept Deposit</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Water Supply</label>
                  <select name="water" required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1' }}>
                    <option value="5">5 - 24/7 Water</option><option value="3">3 - Occasional Cuts</option><option value="1">1 - Severe Shortage</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Safety</label>
                  <select name="safety" required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1' }}>
                    <option value="5">5 - Very Safe</option><option value="3">3 - Moderate</option><option value="1">1 - Unsafe</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Detailed Comment</label>
                <textarea name="comment" required rows="3" placeholder="Tell future tenants what it's really like..." style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #CBD5E1', resize: 'vertical' }}></textarea>
              </div>

              <button type="submit" style={{ background: 'var(--green)', color: '#fff', padding: '0.8rem 1.5rem', borderRadius: '99px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                Submit Truth Report
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN (Sticky Sidebar) */}
        <div style={{ position: 'sticky', top: '100px' }}>
          
          {/* Pricing Card */}
          <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '1.25rem', padding: '2rem', boxShadow: 'var(--shadow-md)', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--heading)' }}>
              ₹{listing.rent.toLocaleString('en-IN')}<span style={{ fontSize: '1rem', color: 'var(--muted)', fontWeight: 500 }}>/month</span>
            </div>
            <div style={{ fontSize: '1rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>
              Deposit: ₹{listing.deposit.toLocaleString('en-IN')}
            </div>

            {/* Fair Rent Meter */}
            <div style={{ background: rentStatus.bg, color: rentStatus.color, padding: '0.75rem 1rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, marginBottom: '2rem' }}>
              <rentStatus.icon size={20} />
              {rentStatus.text} 
              <span style={{ fontSize: '0.8rem', fontWeight: 500, marginLeft: 'auto', opacity: 0.8 }}>Avg: ₹{cityAvg.toLocaleString('en-IN')}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a href={`https://wa.me/91${listing.ownerPhone}?text=${whatsappText}`} target="_blank" rel="noreferrer" 
                 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', width: '100%', padding: '1rem', background: '#25D366', color: '#fff', borderRadius: '99px', fontWeight: 700, fontSize: '1.05rem', transition: 'opacity 0.2s' }}
                 onMouseOver={e => e.currentTarget.style.opacity = '0.9'} onMouseOut={e => e.currentTarget.style.opacity = '1'}>
                <MessageCircle size={20} /> WhatsApp Owner
              </a>
              
              <a href={`tel:+91${listing.ownerPhone}`} 
                 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', width: '100%', padding: '1rem', background: '#fff', border: '2px solid #E2E8F0', color: 'var(--heading)', borderRadius: '99px', fontWeight: 700, fontSize: '1.05rem', transition: 'background 0.2s' }}
                 onMouseOver={e => e.currentTarget.style.background = '#F8FAFC'} onMouseOut={e => e.currentTarget.style.background = '#fff'}>
                <Phone size={20} /> +91 {listing.ownerPhone}
              </a>
            </div>

            <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--muted)' }}>
              Listed by <strong>{listing.ownerName}</strong>
            </div>
          </div>

          {/* Report Scam Button */}
          <button onClick={handleReport} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem', background: 'transparent', border: 'none', color: '#EF4444', fontWeight: 600, cursor: 'pointer' }}>
            <ShieldAlert size={18} /> Report Suspicious Activity
          </button>

        </div>
      </div>
    </div>
  );
}
