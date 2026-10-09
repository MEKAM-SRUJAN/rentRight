import React, { useState } from 'react';
import axios from 'axios';
import { X, Lock, Mail, User, Phone } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'Tenant'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const res = await axios.post(
  `https://rentright-1fdc.onrender.com${endpoint}`,
  formData
);
      setLoading(false);
      onLoginSuccess(res.data);
      onClose();
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Authentication failed. Please try again.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 className="modal-title" style={{ margin: 0 }}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <X size={20} style={{ cursor: 'pointer', color: '#6B7280' }} onClick={onClose} />
        </div>

        {error && (
          <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '0.75rem 1rem', borderRadius: '0.75rem', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label className="select-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Rahul Sharma"
                  required
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                  value={formData.name}
                  onChange={handleChange}
                />
                <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="select-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                required
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                value={formData.email}
                onChange={handleChange}
              />
              <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
            </div>
          </div>

          <div className="form-group">
            <label className="select-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                required
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                value={formData.password}
                onChange={handleChange}
              />
              <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
            </div>
          </div>

          {!isLogin && (
            <>
              <div className="form-group">
                <label className="select-label">Phone Number</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="phone"
                    placeholder="9876543210"
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <Phone size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                </div>
              </div>

              <div className="form-group">
                <label className="select-label">I am a</label>
                <select name="role" className="rating-select" value={formData.role} onChange={handleChange}>
                  <option value="Tenant">Tenant / House Hunter</option>
                  <option value="Owner">Property Owner / Landlord</option>
                </select>
              </div>
            </>
          )}

          <button type="submit" className="btn-post" style={{ width: '100%', marginTop: '1rem', padding: '0.8rem' }} disabled={loading}>
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Register Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#6B7280' }}>
          {isLogin ? "Don't have an account? " : 'Already registered? '}
          <span
            style={{ color: '#E59F3E', fontWeight: 700, cursor: 'pointer' }}
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </span>
        </div>
      </div>
    </div>
  );
}
