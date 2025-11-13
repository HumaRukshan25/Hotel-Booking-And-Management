// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../assets/styles/bookedhotels.css";

// const API_BASE = "http://127.0.0.1:8000";

// const BookedHotels = () => {
//   const [bookedHotels, setBookedHotels] = useState([]);
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     if (!userId) return;
//     fetchBookings();
//   }, [userId]);

//   const fetchBookings = async () => {
//     try {
//       const bookingRes = await axios.get(`${API_BASE}/bookings/user/${userId}`);
//       const bookings = bookingRes.data;

//       const bookingWithHotelDetails = await Promise.all(
//         bookings.map(async (b) => {
//           const hotelRes = await axios.get(`${API_BASE}/hotels/${b.hotel_id}`);

//           return {
//             ...b,
//             hotel_name: hotelRes.data.name,
//             location: hotelRes.data.location,
//             price: hotelRes.data.price,
//             rating: hotelRes.data.rating,
//             imageUrl: hotelRes.data.imageUrl
//           };
//         })
//       );

//       setBookedHotels(bookingWithHotelDetails);
//     } catch (error) {
//       console.error(error);
//       alert("Failed to fetch booked hotels");
//     }
//   };

//   const deleteBooking = async (bookingId) => {
//     if (!window.confirm("Are you sure you want to cancel this booking?")) return;

//     try {
//       await axios.delete(`${API_BASE}/bookings/${bookingId}`);
//       alert("Booking cancelled successfully");
//       setBookedHotels(bookedHotels.filter((b) => b.id !== bookingId));
//     } catch (error) {
//       alert("Failed to delete booking");
//     }
//   };

//   // ✅ Calculate total payable amount
//   const totalAmount = bookedHotels.reduce((total, booking) => {
//     const checkIn = new Date(booking.check_in);
//     const checkOut = new Date(booking.check_out);

//     const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
//     const subtotal = booking.price * nights;

//     return total + subtotal;
//   }, 0);

//   // ✅ Razorpay Payment Function
//   const handlePayment = async () => {
//     try {
//       const orderRes = await axios.post(`${API_BASE}/create_order/`, {
//         amount: totalAmount,
//       });

//       const options = {
//         key: "RAZORPAY_KEY_ID",   // 👉 Replace with your Razorpay Key ID
//         amount: orderRes.data.amount,
//         currency: "INR",
//         name: "Hotel Booking",
//         description: "Hotel Booking Payment",
//         order_id: orderRes.data.id,

//         handler: function (response) {
//           alert("✅ Payment Successful!");
//           console.log("Payment ID:", response.razorpay_payment_id);
//           console.log("Order ID:", response.razorpay_order_id);
//         },

//         theme: { color: "#4CAF50" },
//       };

//       const razor = new window.Razorpay(options);
//       razor.open();

//     } catch (error) {
//       alert("Payment failed!");
//     }
//   };


//   return (
//     <div className="bookings-container">
//       <h2>🛎️ My Booked Hotels</h2>

//       {bookedHotels.length === 0 ? (
//         <p>No bookings found.</p>
//       ) : (
//         bookedHotels.map((booking) => {
//           const checkIn = new Date(booking.check_in);
//           const checkOut = new Date(booking.check_out);

//           const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
//           const subtotal = booking.price * nights;

//           return (
//             <div className="hotel-card" key={booking.id}>
//               <h3>{booking.hotel_name}</h3>

//               {booking.imageUrl && (
//                 <img src={booking.imageUrl} alt="hotel-img"
//                   style={{ width: "100%", height: "180px", borderRadius: "8px" }} />
//               )}

//               <p><strong>Location:</strong> {booking.location}</p>
//               <p><strong>Price per night:</strong> ₹{booking.price}</p>
//               <p><strong>Rating:</strong> ⭐ {booking.rating}</p>
//               <p><strong>Check-in:</strong> {booking.check_in.split("T")[0]}</p>
//               <p><strong>Check-out:</strong> {booking.check_out.split("T")[0]}</p>

//               <p><strong>Subtotal ({nights} nights):</strong> ₹{subtotal}</p>

//               <button className="delete-btn" onClick={() => deleteBooking(booking.id)}>
//                 Cancel Booking ❌
//               </button>
//             </div>
//           );
//         })
//       )}

//       {bookedHotels.length > 0 && (
//         <>
//           <h3 style={{ marginTop: "20px", textAlign: "center" }}>
//             ✅ Total Amount to Pay: <span style={{ color: "green" }}>₹{totalAmount}</span>
//           </h3>

//           <button className="pay-btn" onClick={handlePayment}>
//             💳 Pay Now
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default BookedHotels;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/bookedhotels.css";

const API_BASE = "http://127.0.0.1:8000";

const BookedHotels = () => {
  const [bookedHotels, setBookedHotels] = useState([]);
  const [paidBookings, setPaidBookings] = useState([]);
  const [isTotalPaid, setIsTotalPaid] = useState(false);
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
            imageUrl: hotelRes.data.imageUrl,
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
      setPaidBookings((prev) => prev.filter((id) => id !== bookingId));
    } catch (error) {
      alert("Failed to delete booking");
    }
  };

  // ✅ Calculate subtotal for each booking
  const getSubtotal = (booking) => {
    const checkIn = new Date(booking.check_in);
    const checkOut = new Date(booking.check_out);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    return booking.price * nights;
  };

  // ✅ Total amount should include only unpaid bookings
  const totalAmount = bookedHotels.reduce((total, booking) => {
    if (!paidBookings.includes(booking.id)) {
      total += getSubtotal(booking);
    }
    return total;
  }, 0);

  // ✅ Individual booking payment
  const handleIndividualPayment = (bookingId, amount) => {
    const confirmPay = window.confirm(`Proceed to pay ₹${amount} for this booking?`);
    if (confirmPay) {
      setTimeout(() => {
        alert("✅ Payment Successful for this booking!");
        setPaidBookings((prev) => [...prev, bookingId]);
      }, 1000);
    } else {
      alert("❌ Payment Cancelled.");
    }
  };

  // ✅ Total payment
  const handleTotalPayment = () => {
    const confirmPay = window.confirm(`Proceed to pay total ₹${totalAmount}?`);
    if (confirmPay) {
      setTimeout(() => {
        alert("✅ Total Payment Successful!");
        setIsTotalPaid(true);
        setPaidBookings(bookedHotels.map((b) => b.id));
      }, 1000);
    } else {
      alert("❌ Payment Cancelled.");
    }
  };

  return (
    <div className="bookings-container">
      <h2>🛎️ My Booked Hotels</h2>

      {bookedHotels.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookedHotels.map((booking) => {
          const subtotal = getSubtotal(booking);
          const isPaid = paidBookings.includes(booking.id);

          return (
            <div className="hotel-card" key={booking.id}>
              <h3>{booking.hotel_name}</h3>

              {booking.imageUrl && (
                <img
                  src={booking.imageUrl}
                  alt="hotel-img"
                  style={{ width: "100%", height: "180px", borderRadius: "8px" }}
                />
              )}

              <p><strong>Location:</strong> {booking.location}</p>
              <p><strong>Price per night:</strong> ₹{booking.price}</p>
              <p><strong>Rating:</strong> ⭐ {booking.rating}</p>
              <p><strong>Check-in:</strong> {booking.check_in.split("T")[0]}</p>
              <p><strong>Check-out:</strong> {booking.check_out.split("T")[0]}</p>
              <p><strong>Subtotal:</strong> ₹{subtotal}</p>

              {!isPaid ? (
                <button
                  className="pay-btn"
                  onClick={() => handleIndividualPayment(booking.id, subtotal)}
                >
                  💳 Pay ₹{subtotal}
                </button>
              ) : (
                <p style={{ color: "green", fontWeight: "bold" }}>✅ Payment Done</p>
              )}

              <button className="delete-btn" onClick={() => deleteBooking(booking.id)}>
                Cancel Booking ❌
              </button>
            </div>
          );
        })
      )}

      {/* ✅ Show total payment only if unpaid bookings exist */}
      {bookedHotels.length > 0 && totalAmount > 0 && !isTotalPaid && (
        <>
          <h3 style={{ marginTop: "20px", textAlign: "center" }}>
            💰 Total Amount to Pay: <span style={{ color: "green" }}>₹{totalAmount}</span>
          </h3>

          <button className="pay-btn" onClick={handleTotalPayment}>
            💳 Pay Total Amount
          </button>
        </>
      )}

      {/* ✅ All payments done */}
      {bookedHotels.length > 0 && totalAmount === 0 && (
        <h3 style={{ color: "green", textAlign: "center", marginTop: "20px" }}>
          ✅ All Payments Completed! Enjoy your stay!
        </h3>
      )}
    </div>
  );
};

export default BookedHotels;
