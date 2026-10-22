import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ListingCard from '../components/ListingCard';
import PostListingModal from '../components/PostListingModal';
import AuthModal from '../components/AuthModal';
import { useNavigate } from 'react-router-dom';
import {
  Search, ShieldCheck, MessageSquare, UserCheck,
  AlertTriangle, CheckCircle2, User, LogOut,
  ChevronLeft, ChevronRight, SlidersHorizontal
} from 'lucide-react';

const LIMIT = 9; // cards per page

export default function Home() {
  // ── cached listings helper ──────────────────────────────
  const getCachedData = () => {
    try {
      const cached = sessionStorage.getItem('rentright_cached_listings');
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  };
  const cachedData = getCachedData();

  // ── state ──────────────────────────────────────────────
  const [listings, setListings] = useState(cachedData?.listings || []);
  const [total, setTotal]       = useState(cachedData?.total || 0);
  const [totalPages, setTotalPages] = useState(cachedData?.totalPages || 1);
  const [page, setPage]         = useState(1);
  const [loading, setLoading]   = useState(!cachedData);
  const [serverWakingUp, setServerWakingUp] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  // hero search bar (quick search)
  const [heroSearch, setHeroSearch] = useState('');
  const [heroMaxRent, setHeroMaxRent] = useState('');
  const [heroGender, setHeroGender]   = useState('Anyone');
  const [heroFood, setHeroFood]       = useState(false);

  // sidebar filters (applied state)
  const [filters, setFilters] = useState({
    search: '', maxRent: '', forGender: 'Anyone', food: false
  });
  // sidebar draft (before Apply)
  const [draft, setDraft] = useState({
    search: '', maxRent: '', forGender: 'Anyone', food: false
  });

  const [showSidebar, setShowSidebar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen]   = useState(false);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('rentright_user');
    return saved ? JSON.parse(saved) : null;
  });

  const navigate = useNavigate();

  // ── fetch ───────────────────────────────────────────────
  const fetchListings = useCallback(async (filtersToUse, pageNum) => {
    setLoading(true);
    setFetchError(false);

    // If server takes >2.5s, it is likely a Render cold start
    const wakeTimer = setTimeout(() => {
      setServerWakingUp(true);
    }, 2500);

    try {
      const params = { page: pageNum, limit: LIMIT };
      if (filtersToUse.search)                          params.search    = filtersToUse.search;
      if (filtersToUse.maxRent)                         params.maxRent   = filtersToUse.maxRent;
      if (filtersToUse.forGender !== 'Anyone')          params.forGender = filtersToUse.forGender;
      if (filtersToUse.food)                            params.food      = true;

      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

      const res = await axios.get(`${API_BASE}/api/listings`, { params });
      setListings(res.data.listings);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages);

      // Cache page 1 default results for instantaneous loads next time
      if (pageNum === 1 && !filtersToUse.search && !filtersToUse.maxRent && filtersToUse.forGender === 'Anyone' && !filtersToUse.food) {
        try {
          sessionStorage.setItem('rentright_cached_listings', JSON.stringify({
            listings: res.data.listings,
            total: res.data.total,
            totalPages: res.data.totalPages
          }));
        } catch (_) {}
      }
    } catch (err) {
      console.error('Error fetching listings:', err);
      setFetchError(true);
    } finally {
      clearTimeout(wakeTimer);
      setLoading(false);
      setServerWakingUp(false);
    }
  }, []);

  // initial load
  useEffect(() => { fetchListings(filters, 1); }, []);

  // when page changes keep same filters
  const goToPage = (p) => {
    setPage(p);
    fetchListings(filters, p);
    document.getElementById('places')?.scrollIntoView({ behavior: 'smooth' });
  };

  // ── handlers ───────────────────────────────────────────
  // hero search → apply as filters, reset to page 1
  const handleHeroSearch = (e) => {
    e.preventDefault();
    const newFilters = { search: heroSearch, maxRent: heroMaxRent, forGender: heroGender, food: heroFood };
    setFilters(newFilters);
    setDraft(newFilters);
    setPage(1);
    fetchListings(newFilters, 1);
    document.getElementById('places')?.scrollIntoView({ behavior: 'smooth' });
  };

  // sidebar apply
  const handleApplySidebar = () => {
    setFilters({ ...draft });
    setPage(1);
    fetchListings(draft, 1);
  };

  // sidebar clear
  const handleClearSidebar = () => {
    const empty = { search: '', maxRent: '', forGender: 'Anyone', food: false };
    setDraft(empty);
    setFilters(empty);
    setHeroSearch(''); setHeroMaxRent(''); setHeroGender('Anyone'); setHeroFood(false);
    setPage(1);
    fetchListings(empty, 1);
  };

  const handleCreateListing = async (data) => {
    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.post(`${API_BASE}/api/listings`, data);
      setIsModalOpen(false);
      fetchListings(filters, 1);
      setPage(1);
      document.getElementById('places')?.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      alert('Failed to create listing: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('rentright_user', JSON.stringify(userData));
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('rentright_user');
  };

  const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  // ── pagination helper ──────────────────────────────────
  const pages = () => {
    const arr = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) arr.push(i);
    } else {
      arr.push(1);
      if (page > 4) arr.push('…');
      for (let i = Math.max(2, page - 2); i <= Math.min(totalPages - 1, page + 2); i++) arr.push(i);
      if (page < totalPages - 3) arr.push('…');
      arr.push(totalPages);
    }
    return arr;
  };

  const isFiltered = filters.search || filters.maxRent || filters.forGender !== 'Anyone' || filters.food;

  // ── render ─────────────────────────────────────────────
  return (
    <div>
      {/* ───── NAVBAR ───── */}
      <nav className="navbar">
        <div className="brand-logo" onClick={() => navigate('/')}>Rent<span>Right</span></div>
        <div className="nav-actions">
          <span className="nav-link" onClick={() => scroll('how-it-works')}>How it works</span>
          <span className="nav-link" onClick={() => scroll('why-us')}>Why RentRight</span>
          <span className="nav-link" onClick={() => scroll('places')}>Find a place</span>

          {user ? (
            <>
              <span style={{ fontSize: '.88rem', fontWeight: 700, color: 'var(--green)', display: 'flex', alignItems: 'center', gap: '.35rem' }}>
                <User size={15} /> Hi, {user.name.split(' ')[0]}
              </span>
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '.2rem', fontSize: '.82rem' }}>
                <LogOut size={13} /> Logout
              </button>
            </>
          ) : (
            <span className="nav-link" style={{ color: 'var(--gold)', fontWeight: 700 }} onClick={() => setIsAuthOpen(true)}>
              Login / Sign Up
            </span>
          )}

          <button className="btn-post" onClick={() => setIsModalOpen(true)}>Post free listing</button>
        </div>
      </nav>

      {/* ───── HERO ───── */}
      <section className="hero-section">
        <div className="hero-subtitle">DIRECT TENANT-TO-OWNER RENTALS · ZERO BROKERAGE</div>
        <h1 className="hero-title">Know the place before<br />you pay the deposit.</h1>
        <p className="hero-description">
          Honest reviews from past tenants on water, safety and whether they actually got their deposit back.
        </p>

        <form onSubmit={handleHeroSearch} className="search-bar-container" style={{ maxWidth: '600px' }}>
          <div className="search-input-group" style={{ borderRight: 'none' }}>
            <input
              type="text"
              placeholder="Search by city, area, or PG name…"
              value={heroSearch}
              onChange={(e) => setHeroSearch(e.target.value)}
              style={{ fontSize: '1rem', padding: '0.75rem 1rem' }}
            />
          </div>
          <button type="submit" className="btn-search" style={{ padding: '0.8rem 2rem' }}>Search</button>
        </form>
      </section>

      {/* ───── LISTINGS SECTION ───── */}
      <div id="places" className="container">

        {/* Top bar */}
        <div className="listings-header">
          <div>
            <div className="listings-count-title">
              {isFiltered
                ? `${total} results found`
                : `${total} places available`}
            </div>
            <div className="listings-count-sub">
              {isFiltered ? 'Showing filtered results · ' : ''}
              Page {page} of {totalPages} · {LIMIT} per page
            </div>
          </div>
          <div style={{ display: 'flex', gap: '.75rem', alignItems: 'center' }}>
            {isFiltered && (
              <button className="btn-clear-filter" style={{ width: 'auto', padding: '.45rem 1.1rem' }} onClick={handleClearSidebar}>
                Clear filters
              </button>
            )}
            <button
              className="btn-post"
              style={{ background: showSidebar ? 'var(--green-dark)' : 'var(--green)', display: 'flex', alignItems: 'center', gap: '.4rem' }}
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <SlidersHorizontal size={15} />
              {showSidebar ? 'Hide filters' : 'Show filters'}
            </button>
          </div>
        </div>

        <div className="listings-shell">

          {/* ─── SIDEBAR FILTERS ─── */}
          {showSidebar && (
            <aside className="filter-sidebar">
              <h3>Filter Listings</h3>

              <div className="filter-group">
                <label className="filter-label">Search keyword</label>
                <input
                  type="text"
                  className="filter-input"
                  placeholder="e.g. Koramangala"
                  value={draft.search}
                  onChange={(e) => setDraft({ ...draft, search: e.target.value })}
                />
              </div>

              <div className="filter-group">
                <label className="filter-label">Max Rent (₹/mo)</label>
                <input
                  type="number"
                  className="filter-input"
                  placeholder="e.g. 15000"
                  value={draft.maxRent}
                  onChange={(e) => setDraft({ ...draft, maxRent: e.target.value })}
                />
              </div>

              <div className="filter-group">
                <label className="filter-label">Gender Preference</label>
                <select
                  className="filter-select"
                  value={draft.forGender}
                  onChange={(e) => setDraft({ ...draft, forGender: e.target.value })}
                >
                  <option value="Anyone">Anyone</option>
                  <option value="Girls">Girls only</option>
                  <option value="Boys">Boys only</option>
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">Property Type</label>
                <select className="filter-select">
                  <option>All types</option>
                  <option>PG</option>
                  <option>Flat</option>
                  <option>Room</option>
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-checkbox-row">
                  <input
                    type="checkbox"
                    checked={draft.food}
                    onChange={(e) => setDraft({ ...draft, food: e.target.checked })}
                  />
                  Food included
                </label>
              </div>

              <button className="btn-apply-filter" onClick={handleApplySidebar}>Apply Filters</button>
              <button className="btn-clear-filter" onClick={handleClearSidebar}>Clear All</button>
            </aside>
          )}

          {/* ─── GRID ─── */}
          <div className="listings-main">
            {serverWakingUp && (
              <div className="server-wake-notice">
                <div className="server-wake-spinner" />
                <div>
                  <strong>Waking up cloud server...</strong> On free-tier hosting (Render), the backend spins down after 15 minutes of inactivity and takes ~30–45s to boot up. Your verified listings are loading!
                </div>
              </div>
            )}

            {fetchError && listings.length === 0 && (
              <div className="no-results" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <AlertTriangle size={36} color="#DC2626" style={{ margin: '0 auto 1rem' }} />
                <h3>Unable to connect to server</h3>
                <p style={{ marginBottom: '1.25rem' }}>The backend server might still be waking up. Please give it a few seconds and try again.</p>
                <button
                  className="btn-post"
                  onClick={() => fetchListings(filters, page)}
                >
                  Retry Loading
                </button>
              </div>
            )}

            <div className="listings-grid">
              {loading && listings.length === 0 ? (
                // Display 6 animated skeleton cards while waiting
                Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className="skeleton-card">
                    <div className="skeleton-img" />
                    <div className="skeleton-body">
                      <div className="skeleton-line title" />
                      <div className="skeleton-line sub" />
                      <div className="skeleton-line price" />
                    </div>
                  </div>
                ))
              ) : listings.length === 0 && !loading && !fetchError ? (
                <div className="no-results">
                  <h3>No properties found</h3>
                  <p>Try adjusting your filters or searching a different area.</p>
                </div>
              ) : (
                listings.map((item) => (
                  <div key={item._id} onClick={() => navigate(`/listings/${item._id}`)}>
                    <ListingCard listing={item} />
                  </div>
                ))
              )}
            </div>

            {/* ─── PAGINATION ─── */}
            {totalPages > 1 && (
              <div className="pagination-wrapper">
                <button className="pg-btn" disabled={page === 1} onClick={() => goToPage(page - 1)}>
                  <ChevronLeft size={16} />
                </button>

                {pages().map((p, i) =>
                  p === '…' ? (
                    <span key={i} className="pg-info">…</span>
                  ) : (
                    <button
                      key={p}
                      className={`pg-btn${p === page ? ' active' : ''}`}
                      onClick={() => goToPage(p)}
                    >
                      {p}
                    </button>
                  )
                )}

                <button className="pg-btn" disabled={page === totalPages} onClick={() => goToPage(page + 1)}>
                  <ChevronRight size={16} />
                </button>

                <span className="pg-info">{total} total</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ───── HOW IT WORKS ───── */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="section-tag">SIMPLE &amp; TRANSPARENT</div>
        <h2 className="section-title-large">How RentRight Works</h2>
        <div className="steps-grid">
          {[
            { Icon: Search, n: '1', title: 'Search Verified Places', desc: 'Browse PGs, independent rooms and flats across major Indian cities with zero brokerage.' },
            { Icon: MessageSquare, n: '2', title: 'Read Honest Reviews', desc: 'Real ratings on water availability, safety, owner behaviour, and deposit return reliability.' },
            { Icon: UserCheck, n: '3', title: 'Contact Owners Directly', desc: 'Speak directly with verified property owners — no middlemen, no hidden commissions.' },
          ].map(({ Icon, n, title, desc }) => (
            <div className="step-card" key={n}>
              <div className="step-icon-circle"><Icon size={26} /></div>
              <h3 className="step-title">{n}. {title}</h3>
              <p className="step-desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── WHY US ───── */}
      <section id="why-us" className="why-us-section">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="section-tag">WHY TENANTS TRUST US</div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--green)' }}>
            Designed to Protect Tenants
          </h2>
        </div>
        <div className="features-grid">
          {[
            { Icon: ShieldCheck, title: 'Deposit Guarantee Reviews', desc: 'Know if previous tenants received their full security deposit back on time before signing.' },
            { Icon: AlertTriangle, title: 'Community Scam Reporting', desc: 'Properties with suspicious activity or fake listings get flagged by our alert system.' },
            { Icon: CheckCircle2, title: 'Verified Amenities & Water', desc: 'Detailed ratings on water supply consistency, food quality, and security measures.' },
          ].map(({ Icon, title, desc }) => (
            <div className="feature-box" key={title}>
              <div className="feature-icon-box"><Icon size={24} /></div>
              <div className="feature-info">
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───── MODALS ───── */}
      <PostListingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onListingCreated={handleCreateListing} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLoginSuccess={handleLoginSuccess} />

      {/* ───── FOOTER ───── */}
      <footer className="pro-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Rent<span>Right</span></h3>
            <p>India's premier broker-free rental platform empowering tenants with authentic ratings, scam-protection, and direct owner listings.</p>
          </div>
          <div className="footer-col">
            <h4>Popular Searches</h4>
            <ul className="footer-links">
              {['Bangalore', 'Hyderabad', 'Pune', 'Gurgaon', 'Mumbai'].map(city => (
                <li key={city} onClick={() => { setHeroSearch(city); handleClearSidebar(); setDraft(d => ({...d, search: city})); handleApplySidebar(); scroll('places'); }}>
                  Rentals in {city}
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul className="footer-links">
              <li onClick={() => setIsModalOpen(true)}>Post Property for Free</li>
              <li>Rental Agreements</li>
              <li>Tenant Review Portal</li>
              <li>Scam Alert System</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul className="footer-links">
              <li onClick={() => setIsAuthOpen(true)}>Login / Sign Up</li>
              <li onClick={() => scroll('how-it-works')}>How It Works</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Contact Support</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} RentRight Technologies Pvt Ltd. All rights reserved.</div>
          <div className="footer-sublinks">
            <span>Privacy Policy</span>
            <span>Terms &amp; Conditions</span>
            <span>Security</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
