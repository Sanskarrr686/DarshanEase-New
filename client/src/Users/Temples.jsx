import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Components/navbar.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:7000';

const Temples = () => {
  const [darshans, setDarshans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDarshans = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE}/organizer/getdarshans`);
        setDarshans(response.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load darshan slots right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchDarshans();
  }, []);

  return (
    <section
      className="content"
      style={{ backgroundColor: 'whitesmoke', paddingBottom: '50px', paddingTop: '20px' }}
      id="temples"
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
        <h1 className="text-center mb-6">Temples & Darshan Slots</h1>
        {loading ? (
          <p className="text-center">Loading available slots...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : darshans.length === 0 ? (
          <p className="text-center">No darshan slots are available right now.</p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {darshans.map((slot) => {
              const imageUrl = slot.templeImage
                ? `${API_BASE}/organizer/${slot.templeImage}`
                : 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1300&q=80';
              const availableSlots = typeof slot.slots === 'number' ? slot.slots : null;
              const isSoldOut = availableSlots !== null && availableSlots <= 0;

              return (
                <div
                  key={slot._id}
                  style={{
                    borderRadius: '18px',
                    overflow: 'hidden',
                    background: '#fff',
                    boxShadow: '0 15px 35px rgba(15,23,42,0.12)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ height: '200px', overflow: 'hidden' }}>
                    <img
                      src={imageUrl}
                      alt={slot.templeName}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{slot.templeName}</h3>
                    <p style={{ margin: '8px 0 4px', color: '#475569' }}>{slot.location}</p>
                    <p style={{ margin: 0, fontWeight: '600' }}>{slot.darshanName}</p>
                    <p style={{ margin: '6px 0' }}>
                      {slot.open} - {slot.close}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Normal: INR {slot.prices?.normal ?? 0}</span>
                      <span>VIP: INR {slot.prices?.vip ?? 0}</span>
                    </div>
                    <p style={{ margin: '8px 0', color: isSoldOut ? '#dc2626' : '#16a34a', fontWeight: '600' }}>
                      {isSoldOut ? 'Sold out' : `Slots left: ${availableSlots ?? 'Unlimited'}`}
                    </p>
                    <div style={{ marginTop: 'auto' }}>
                      <Link
                        to={`/bookdarshan/${slot._id}`}
                        style={{
                          padding: '10px 16px',
                          borderRadius: '10px',
                          background: isSoldOut ? '#9ca3af' : '#2563eb',
                          color: '#fff',
                          textDecoration: 'none',
                          textAlign: 'center',
                          display: 'inline-block',
                        }}
                        aria-disabled={isSoldOut}
                      >
                        {isSoldOut ? 'Sold out' : 'Book Slot'}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Temples;
