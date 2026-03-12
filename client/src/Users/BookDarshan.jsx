import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Unavbar from './Unavbar';
import './user.css'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:7000';

function BookDarshan() {
  const [item, setItem] = useState(null);
  const [selectedDarshan, setSelectedDarshan] = useState('normal');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phno: '',
  });
  const [quantity, setQuantity] = useState(1);
  const [availableSlots, setAvailableSlots] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE}/user/darshan/${id}`)
      .then((resp) => {
        setItem(resp.data);
        setAvailableSlots(resp.data?.slots ?? null);
      })
      .catch((error) => {
        console.error('Failed to fetch darshan slot:', error);
      });
  }, [id]);

  const increase = () => {
    if (availableSlots !== null && quantity >= availableSlots) return;
    setQuantity((prev) => prev + 1);
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeDarshan = (e) => {
    setSelectedDarshan(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!item) {
      alert('Darshan information is still loading.');
      return;
    }

    if (availableSlots !== null && quantity > availableSlots) {
      alert(`Only ${availableSlots} slot${availableSlots === 1 ? '' : 's'} remaining.`);
      return;
    }

    const pricePerTicket = Number(item.prices?.[selectedDarshan] ?? 0);
    const convenienceFee = 45;
    const totalAmount = pricePerTicket * quantity + convenienceFee;

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user?.id) {
      alert('Please login before booking.');
      return;
    }

    const updatedFormData = {
      ...formData,
      userId: user.id,
      userName: user.name,
      userEmail: formData.email,
      quantity,
      totalamount: totalAmount,
      organizerName: item.organizerName,
      organizerId: item.organizerId,
      description: item.description,
      templeName: item.templeName,
      darshanName: item.darshanName,
      location: item.location,
      templeImage: item.templeImage,
      prices: item.prices,
      open: item.open,
      close: item.close,
      darshanId: item._id,
      templeId: item.temple?._id,
      pricePerTicket,
      darshanType: selectedDarshan,
    };

    try {
      await axios.post(`${API_BASE}/user/userbooking`, updatedFormData);
      setAvailableSlots((prev) => (prev !== null ? Math.max(0, prev - quantity) : null));
      setItem((prev) => (prev ? { ...prev, slots: Math.max(0, (prev.slots ?? 0) - quantity) } : prev));
      setQuantity(1);
      setFormData({ name: '', email: '', phno: '' });
      alert('Booking confirmed');
      navigate('/mybookings');
    } catch (error) {
      console.error('Error booking:', error);
      alert(error.response?.data?.message || 'Unable to complete booking.');
    }
  };

  const pricePerTicket = Number(item?.prices?.[selectedDarshan] ?? 0);
  const convenienceFee = 45;
  const displayTotal = pricePerTicket * quantity + convenienceFee;
  const limitedSlots = availableSlots !== null;
  const isSoldOut = limitedSlots && availableSlots <= 0;

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Unavbar />
      <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
        <div className="max-w-md mx-auto mt-8 p-6 border rounded shadow-lg bg-white" style={{ width: '100%', maxWidth: '520px' }}>
          <h2 className="text-3xl font-semibold mb-4 text-center">Confirm Your Booking</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-2">Phone (optional)</label>
                <input
                  type="tel"
                  name="phno"
                  value={formData.phno}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Select Darshan</label>
              <select
                value={selectedDarshan}
                onChange={handleChangeDarshan}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="normal">Normal Darshan</option>
                <option value="vip">VIP Darshan</option>
              </select>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700 font-medium">Quantity</span>
                {limitedSlots ? (
                  <span className="text-sm text-green-600">Available: {availableSlots}</span>
                ) : (
                  <span className="text-sm text-gray-500">Unlimited slots</span>
                )}
              </div>
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={decrease}
                  disabled={quantity <= 1}
                  className="w-10 h-10 rounded-full bg-gray-200 text-xl font-bold disabled:opacity-50"
                >
                  -
                </button>
                <span className="text-2xl">{quantity}</span>
                <button
                  type="button"
                  onClick={increase}
                  disabled={isSoldOut}
                  className="w-10 h-10 rounded-full bg-gray-200 text-xl font-bold disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-700">
                <span>Price per ticket</span>
                <span>INR {pricePerTicket.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Convenience fee</span>
                <span>INR {convenienceFee}</span>
              </div>
              <hr />
              <div className="flex justify-between text-xl font-semibold">
                <span>Total amount</span>
                <span>INR {displayTotal.toFixed(2)}</span>
              </div>
            </div>
            <div className="mb-4 text-sm text-gray-600">
              <p>Temple: {item?.templeName || 'Loading...'}</p>
              <p>
                Slot: {item?.darshanName || 'Loading...'} • {item?.open} - {item?.close}
              </p>
            </div>
            <button
              type="submit"
              style={{ width: '100%' }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
              disabled={isSoldOut}
            >
              {isSoldOut ? 'Sold out' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookDarshan;
