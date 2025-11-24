// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import axios from "axios";
// import "../assets/styles/readhotel.css";

// const API_BASE = "http://127.0.0.1:8000";

// const ReadHotels = () => {
//   const { id } = useParams();
//   const [hotel, setHotel] = useState(null);
//   const [showDesc, setShowDesc] = useState(false);
//   const [loadingBooking, setLoadingBooking] = useState(false);
//   const [checkIn, setCheckIn] = useState("");
//   const [checkOut, setCheckOut] = useState("");

//   const navigate = useNavigate();
//   const location = useLocation();

//   // ✅ Detect role based on route path
//   const isAdmin = location.pathname.startsWith("/adminportal");

//   useEffect(() => {
//     const fetchHotel = async () => {
//       try {
//         const resp = await axios.get(`${API_BASE}/hotels/${id}`);
//         setHotel(resp.data);
//       } catch (error) {
//         console.error("Error fetching hotel:", error);
//         navigate(isAdmin ? "/adminportal/hotels" : "/usersportal/hotels");
//       }
//     };
//     fetchHotel();
//   }, [id, isAdmin, navigate]);

//   if (!hotel) return <div>Loading hotel...</div>;

//   const { name, location: hotelLocation, price, rating, imageUrl, description } = hotel;

//   const backBtn = () => {
//     navigate(isAdmin ? "/adminportal/hotels" : "/usersportal/hotels");
//   };

//   const renderStars = (rating) => {
//     const stars = [];

//     // ⭐ Round .5 and above UP
//     const rounded = Math.round(rating);

//     // ⭐ Full gold stars
//     for (let i = 0; i < rounded; i++) {
//       stars.push(
//         <span key={i} style={{ color: "#FFD700", fontSize: "20px" }}>★</span>
//       );
//     }

//     // ⭐ Grey empty stars
//     for (let i = rounded; i < 5; i++) {
//       stars.push(
//         <span key={"e" + i} style={{ color: "#ccc", fontSize: "20px" }}>★</span>
//       );
//     }

//     return stars;
//   };



//   const bookHotel = async () => {
//     const user_id = localStorage.getItem("userId");
//     if (!user_id) {
//       alert("User not logged in — userId not found.");
//       return;
//     }

//     if (!checkIn || !checkOut) {
//       alert("Please select both check-in and check-out dates.");
//       return;
//     }

//     if (new Date(checkOut) <= new Date(checkIn)) {
//       alert("Checkout date must be after check-in date.");
//       return;
//     }

//     try {
//       setLoadingBooking(true);
//       const bookingData = {
//         user_id,
//         hotel_id: id,
//         check_in: checkIn,
//         check_out: checkOut,
//       };
//       const resp = await axios.post(`${API_BASE}/bookings/`, bookingData);
//       alert(`Hotel booked successfully! Booking ID: ${resp.data.id}`);
//     } catch (error) {
//       console.error("Booking failed:", error);
//       alert("Failed to book hotel.");
//     } finally {
//       setLoadingBooking(false);
//     }
//   };

//   return (
//     <div className="cards">
//       <div className="image">
//         {imageUrl && <img src={imageUrl} alt={name} />}
//         <h2>{name}</h2>
//       </div>

//       <div className="right">
//         <div className="title">Location: {hotelLocation}</div>
//         <div className="title">Price: ₹{price}</div>
//         <div className="star-rating">
//           Rating:{renderStars(rating)}
//           <span style={{ color: "#555", marginLeft: "4px" }}>({rating})</span>
//         </div>



//         <button className="clr" onClick={() => setShowDesc(!showDesc)}>
//           {showDesc ? "Hide Description" : "Show Description"}
//         </button>

//         {showDesc && (
//           <p style={{ marginTop: "10px", lineHeight: "1.5", color: "#444" }}>
//             <strong>Description:</strong>{" "}
//             {description ? description : "No description available"}
//           </p>
//         )}

//         {/* ✅ Date inputs only for users */}
//         {!isAdmin && (
//           <div style={{ marginTop: "15px" }}>
//             <label>
//               <strong>Select Check-in:</strong>
//             </label>
//             <input
//               type="date"
//               value={checkIn}
//               min={new Date().toISOString().split("T")[0]}
//               onChange={(e) => {
//                 setCheckIn(e.target.value);
//                 setCheckOut("");
//               }}
//               required
//             />

//             <label>
//               <strong>Select Check-out:</strong>
//             </label>
//             <input
//               type="date"
//               value={checkOut}
//               min={checkIn || new Date().toISOString().split("T")[0]}
//               onChange={(e) => setCheckOut(e.target.value)}
//               required
//             />
//           </div>
//         )}

//         <div style={{ marginTop: "12px", display: "flex", gap: "10px" }}>
//           <button onClick={backBtn}>Back</button>

//           {!isAdmin && (
//             <button
//               onClick={bookHotel}
//               style={{ backgroundColor: "green", color: "white" }}
//               disabled={loadingBooking}
//             >
//               {loadingBooking ? "Booking..." : "Book Hotel"}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReadHotels;



import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import "../assets/styles/readhotel.css";

const API_BASE = "http://127.0.0.1:8000";

const ReadHotels = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [showDesc, setShowDesc] = useState(false);
  const [loadingBooking, setLoadingBooking] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/adminportal");

  // ===========================
  // Fetch hotel details
  // ===========================
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const resp = await axios.get(`${API_BASE}/hotels/${id}`);
        setHotel(resp.data);
      } catch (error) {
        navigate(isAdmin ? "/adminportal/hotels" : "/usersportal/hotels");
      }
    };
    fetchHotel();
  }, [id, isAdmin, navigate]);

  if (!hotel) return <h2>Loading hotel...</h2>;

  const { name, location: hotelLocation, price, rating, imageUrl, description } = hotel;

  // ===========================
  // Back button
  // ===========================
  const backBtn = () => {
    navigate(isAdmin ? "/adminportal/hotels" : "/usersportal/hotels");
  };

  // ===========================
  // Render star rating
  // ===========================
  const renderStars = (rating) => {
    const stars = [];
    const rounded = Math.round(rating);

    for (let i = 0; i < rounded; i++) {
      stars.push(
        <span key={i} style={{ color: "#FFD700", fontSize: "20px" }}>
          ★
        </span>
      );
    }
    for (let i = rounded; i < 5; i++) {
      stars.push(
        <span key={"e" + i} style={{ color: "#ccc", fontSize: "20px" }}>
          ★
        </span>
      );
    }
    return stars;
  };

  // ==================================================
  // 🚀 CONFIRM BOOKING — Includes new DATE MATCH + OVERLAP LOGIC
  // ==================================================
  const confirmBooking = async () => {
    const user_id = localStorage.getItem("userId");
    const username = localStorage.getItem("username");

    if (!user_id) {
      alert("User not logged in!");
      return;
    }

    if (!checkIn || !checkOut) {
      alert("Please select both check-in and check-out dates.");
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      alert("Checkout must be after check-in.");
      return;
    }

    // ==================================================
    // ✅ UPDATED OVERLAP LOGIC (YOUR REQUIREMENT)
    // ==================================================
    try {
      const existing = await axios.get(`${API_BASE}/bookings/user/${user_id}`);

      const newStart = new Date(checkIn);
      const newEnd = new Date(checkOut);

      const overlap = existing.data.some((b) => {
        const oldStart = new Date(b.check_in);
        const oldEnd = new Date(b.check_out);

        // ❌ Case 1: Same check-in date
        if (newStart.getTime() === oldStart.getTime()) return true;

        // ❌ Case 2: Same check-out date
        if (newEnd.getTime() === oldEnd.getTime()) return true;

        // ❌ Case 3: New check-in equals old checkout date
        if (newStart.getTime() === oldEnd.getTime()) return true;

        // ❌ Case 4: New checkout equals old check-in date
        if (newEnd.getTime() === oldStart.getTime()) return true;

        // ❌ Case 5: Normal overlap (inside range)
        return newStart < oldEnd && oldStart < newEnd;
      });

      if (overlap) {
        alert(
          "❌ You already have a booking where the dates match or overlap! Select a different date."
        );
        return;
      }
    } catch (err) {
      console.error("Error checking booking:", err);
    }

    const usernameDisplay = username || "User";

    const ok = window.confirm(
      `${usernameDisplay} is booking "${name}" for ₹${price}.\nFrom ${checkIn} To ${checkOut}\n\nDo you want to continue?`
    );

    if (!ok) return;

    setShowPopup(true);
  };

  // ==================================================
  // 🚀 FINAL BOOKING — API Call
  // ==================================================
  const bookHotel = async () => {
    const user_id = localStorage.getItem("userId");

    if (!user_id) {
      alert("User not logged in!");
      return;
    }

    try {
      setLoadingBooking(true);

      const bookingData = {
        user_id,
        hotel_id: id,
        check_in: checkIn,
        check_out: checkOut,
      };

      const resp = await axios.post(`${API_BASE}/bookings/`, bookingData);

      alert(`✔ Booking successful! Booking ID: ${resp.data.id}`);
      setShowPopup(false);
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed — please try again.");
    } finally {
      setLoadingBooking(false);
    }
  };

  return (
    <div className="cards">
      <div className="image">
        {imageUrl && <img src={imageUrl} alt={name} />}
        <h2>{name}</h2>
      </div>

      <div className="right">
        <div className="title">Location: {hotelLocation}</div>
        <div className="title">Price: ₹{price}</div>

        <div className="star-rating">Rating: {renderStars(rating)}</div>

        <button className="clr" onClick={() => setShowDesc(!showDesc)}>
          {showDesc ? "Hide Description" : "Show Description"}
        </button>

        {showDesc && (
          <p style={{ marginTop: "10px" }}>
            <strong>Description:</strong> {description || "No description"}
          </p>
        )}

        {/* Only show date inputs for users (not admin) */}
        {!isAdmin && (
          <div style={{ marginTop: "15px" }}>
            <label>
              <strong>Select Check-in:</strong>
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
                setCheckOut("");
              }}
            />

            <label>
              <strong>Select Check-out:</strong>
            </label>
            <input
              type="date"
              value={checkOut}
              min={checkIn}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        )}

        {/* Buttons */}
        <div style={{ marginTop: "12px", display: "flex", gap: "10px" }}>
          <button onClick={backBtn}>Back</button>

          {!isAdmin && (
            <button
              onClick={confirmBooking}
              style={{ backgroundColor: "green", color: "white" }}
              disabled={loadingBooking}
            >
              {loadingBooking ? "Booking..." : "Book Hotel"}
            </button>
          )}
        </div>
      </div>

      {/* Booking Popup */}
      {showPopup && (
        <div className="booking-popup-overlay">
          <div className="booking-popup">
            <h3>Confirm Booking</h3>
            <p>
              Are you sure you want to book <strong>{name}</strong>
              <br />
              for <strong>₹{price}</strong>?
              <br />
              From: <strong>{checkIn}</strong> To: <strong>{checkOut}</strong>
            </p>

            <div className="popup-buttons">
              <button className="popup-ok" onClick={bookHotel}>
                OK
              </button>
              <button
                className="popup-cancel"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadHotels;

