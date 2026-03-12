import React from 'react';
import { Link } from 'react-router-dom';

const options = [
  {
    role: 'User',
    path: '/usignup',
    description: 'Explore temples, browse slots, and book your darshan tickets in seconds.',
    accent: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
  },
  {
    role: 'Organizer',
    path: '/organizer/signup',
    description: 'Manage temples, create darshan slots, and monitor bookings.',
    accent: 'linear-gradient(135deg, #f59e0b, #ef4444)',
  },
  {
    role: 'Admin',
    path: '/admin/signup',
    description: 'Approve organizers, review donations, and secure the platform.',
    accent: 'linear-gradient(135deg, #c026d3, #9333ea)',
  },
];

function SignupSelection() {
  return (
    <div style={{ paddingTop: '120px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 16px' }}>
        <h1 style={{ textAlign: 'center', fontSize: '2.4rem', marginBottom: '12px' }}>Create your DarshanEase account</h1>
        <p style={{ textAlign: 'center', color: '#475569', marginBottom: '40px' }}>
          Pick the role that matches your purpose, then complete the tailored signup flow.
        </p>
        <div
          style={{
            display: 'grid',
            gap: '24px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          }}
        >
          {options.map((option) => (
            <Link
              to={option.path}
              key={option.role}
              style={{
                textDecoration: 'none',
                borderRadius: '16px',
                boxShadow: '0 20px 50px rgba(15,23,42,0.14)',
                padding: '24px',
                minHeight: '220px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                color: '#f1f5f9',
                backgroundImage: option.accent,
              }}
            >
              <div>
                <p style={{ letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.7rem', marginBottom: '12px' }}>
                  {option.role}
                </p>
                <h2 style={{ fontSize: '1.9rem', margin: '0 0 12px' }}>{option.role} Signup</h2>
                <p style={{ color: 'rgba(241,245,249,0.9)', marginBottom: '18px' }}>{option.description}</p>
              </div>
              <span style={{ fontWeight: 600 }}>Continue to signup ?</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SignupSelection;
