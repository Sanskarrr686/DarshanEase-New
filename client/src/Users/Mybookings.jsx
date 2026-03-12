import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import Unavbar from './Unavbar';
import Footer from '../Components/Footer';

function Mybookings() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?.id) {
      return;
    }

    axios
      .get(`http://localhost:7000/user/getbookings/${user.id}`)
      .then((response) => {
        setItems(response.data || []);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
      });
  }, []);

  const calculateStatus = (Delivery) => {
    const currentDate = new Date();
    const formattedDeliveryDate = new Date(Delivery);
    return formattedDeliveryDate >= currentDate ? 'upcoming' : 'completed';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Unavbar />
      <div className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-center text-4xl font-semibold mb-6">My Bookings</h1>
        {items.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">You have no bookings yet.</p>
        ) : (
          items.map((item) => {
            const status = calculateStatus(item.date);
            return (
              <Card
                key={item._id}
                className="mb-6 shadow-lg"
                style={{ borderRadius: '16px' }}
              >
                <div className="flex flex-wrap gap-4 px-6 py-5 items-center">
                  <img
                    src={`http://localhost:7000/organizer/${item.templeImage}`}
                    alt={item.templeName}
                    style={{ height: '100px', borderRadius: '10px' }}
                  />
                  <div>
                    <p className="text-xs uppercase text-gray-500">Booking</p>
                    <p className="font-semibold text-lg">{item._id.slice(0, 10)}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-gray-500">Temple</p>
                    <p className="font-semibold">{item.templeName}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-gray-500">Darshan</p>
                    <p className="font-semibold">{item.darshanName}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-gray-500">Date</p>
                    <p>{item.BookingDate}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-gray-500">Timing</p>
                    <p>
                      {item.open}-{item.close}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-gray-500">Tickets</p>
                    <p>{item.quantity}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-gray-500">Amount</p>
                    <p>₹{item.totalamount}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-gray-500">Status</p>
                    <p>{status}</p>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Mybookings;
