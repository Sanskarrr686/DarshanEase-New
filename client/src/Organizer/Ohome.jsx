import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import Onavbar from './Onavbar';

function Ohome() {
  const [temples, setTemples] = useState([]);
  const [darshans, setDarshans] = useState([]);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      navigate('/organizer/login'); // redirect if not logged in
      return;
    }

    axios
      .get(`http://localhost:7000/organizer/gettemple/${user.id}`)
      .then((res) => setTemples(res.data))
      .catch((err) => console.error('Error fetching temples:', err));

    axios
      .get(`http://localhost:7000/organizer/getdarshans/${user.id}`)
      .then((res) => setDarshans(res.data))
      .catch((err) => console.error('Error fetching darshans:', err));

    axios
      .get(`http://localhost:7000/organizer/getorganizerbookings/${user.id}`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error('Error fetching bookings:', err));
  }, [navigate]);

  const stats = [
    { label: 'Temples', value: temples.length, color: '#0d9488' },
    { label: 'Darshans', value: darshans.length, color: '#fb923c' },
    { label: 'Bookings', value: bookings.length, color: '#22c55e' },
  ];

  const maxValue = Math.max(...stats.map((stat) => stat.value), 1);

  return (
    <div>
      <Onavbar />
      <h3 className="text-3xl font-semibold mb-6 text-center mt-4">Dashboard</h3>
      <Card body className="mx-auto p-6" style={{ backgroundColor: '#f3f4f6', width: '85%' }}>
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              to="/organizer/bookings"
              className="rounded-xl p-6 text-center shadow-lg transition hover:-translate-y-1"
              style={{ backgroundColor: '#ffffff' }}
            >
              <p className="text-sm font-light text-gray-500">{stat.label}</p>
              <p className="text-4xl font-bold" style={{ color: stat.color }}>
                {stat.value}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <div className="text-sm font-semibold text-gray-600 mb-2">Recent activity overview</div>
          <div className="w-full rounded-xl overflow-hidden border border-gray-200 bg-white" style={{ minHeight: '180px' }}>
            <div className="flex h-full">
              {stats.map((stat) => (
                <div key={stat.label} className="flex-1 flex items-end flex-col p-4">
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-3 rounded-full"
                      style={{
                        width: `${(stat.value / maxValue) * 100}%`,
                        backgroundColor: stat.color,
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 mt-2">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
      <Footer />
    </div>
  );
}

export default Ohome;
