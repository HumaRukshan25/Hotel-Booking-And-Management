import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/bookedhotels.css";


const API_BASE = "http://127.0.0.1:8000";

const BookedHotels = () => {
  const [bookedHotels, setBookedHotels] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;
    fetchBookings();
  }, [userId]);

  const fetchBookings = async () => {
    try {
      const bookingRes = await axios.get(`${API_BASE}/bookings/user/${userId}`);
      const bookings = bookingRes.data;

      const bookingWithHotelDetails = await Promise.all(
        bookings.map(async (b) => {
          const hotelRes = await axios.get(`${API_BASE}/hotels/${b.hotel_id}`);

          return {
            ...b,
            hotel_name: hotelRes.data.name,
            location: hotelRes.data.location,
            price: hotelRes.data.price,
            rating: hotelRes.data.rating,
            imageUrl: hotelRes.data.imageUrl
          };
        })
      );

      setBookedHotels(bookingWithHotelDetails);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch booked hotels");
    }
  };

  const deleteBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await axios.delete(`${API_BASE}/bookings/${bookingId}`);
      alert("Booking cancelled successfully");
      setBookedHotels(bookedHotels.filter((b) => b.id !== bookingId));
    } catch (error) {
      alert("Failed to delete booking");
    }
  };

  // ✅ Calculate total payable amount
  const totalAmount = bookedHotels.reduce((total, booking) => {
    const checkIn = new Date(booking.check_in);
    const checkOut = new Date(booking.check_out);

    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const subtotal = booking.price * nights;

    return total + subtotal;
  }, 0);

  return (
    <div className="bookings-container">
      <h2>🛎️ My Booked Hotels</h2>

      {bookedHotels.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookedHotels.map((booking) => {
          const checkIn = new Date(booking.check_in);
          const checkOut = new Date(booking.check_out);

          const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
          const subtotal = booking.price * nights;

          return (
            <div className="hotel-card" key={booking.id}>
              <h3>{booking.hotel_name}</h3>

              {booking.imageUrl && (
                <img src={booking.imageUrl} alt="hotel-img"
                  style={{ width: "100%", height: "180px", borderRadius: "8px" }} />
              )}

              <p><strong>Location:</strong> {booking.location}</p>
              <p><strong>Price per night:</strong> ₹{booking.price}</p>
              <p><strong>Rating:</strong> ⭐ {booking.rating}</p>
              <p><strong>Check-in:</strong> {booking.check_in.split("T")[0]}</p>
              <p><strong>Check-out:</strong> {booking.check_out.split("T")[0]}</p>

              {/* ✅ Subtotal Display */}
              <p><strong>Subtotal ({nights} nights):</strong> ₹{subtotal}</p>

              <button className="delete-btn" onClick={() => deleteBooking(booking.id)}>
                Cancel Booking ❌
              </button>
            </div>
          );
        })
      )}

      {/* ✅ Total Amount */}
      {bookedHotels.length > 0 && (
        <h3 style={{ marginTop: "20px", textAlign: "center" }}>
          ✅ Total Amount to Pay: <span style={{ color: "green" }}>₹{totalAmount}</span>
        </h3>
      )}
    </div>
  );
};

export default BookedHotels;

