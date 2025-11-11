import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../assets/styles/readhotel.css";

const API_BASE = "http://127.0.0.1:8000";

const ReadHotels = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [showDesc, setShowDesc] = useState(false);
  const [loadingBooking, setLoadingBooking] = useState(false);

  // ✅ Added: store check-in & check-out date from input
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const navigate = useNavigate();

  const user_id = localStorage.getItem("userId");
  const role = (localStorage.getItem("role") || "").toLowerCase();
  const isAdmin = role === "admin";

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const resp = await axios.get(`${API_BASE}/hotels/${id}`);
        setHotel(resp.data);
      } catch (error) {
        console.error(error);
        navigate(isAdmin ? "/adminportal/hotels" : "/usersportal/hotels");
      }
    };
    fetchHotel();
  }, [id, isAdmin, navigate]);

  if (!hotel) return <div>Loading hotel...</div>;


  // ✅ Add description here
  const { name, location, price, rating, imageUrl, description } = hotel;


  const backBtn = () => {
    navigate(isAdmin ? "/adminportal/hotels" : "/usersportal/hotels");
  };

  const bookHotel = async () => {
    if (!user_id) {
      alert("User not logged in — userId not found.");
      return;
    }

    // ✅ Validate check-in & check-out
    if (!checkIn || !checkOut) {
      alert("Please select both check-in and check-out dates.");
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      alert("Checkout date must be after check-in date.");
      return;
    }

    try {
      setLoadingBooking(true);

      const bookingData = {
        user_id: user_id,
        hotel_id: id,
        check_in: checkIn,
        check_out: checkOut,
      };

      const resp = await axios.post(`${API_BASE}/bookings/`, bookingData);
      alert(`Hotel booked successfully! Booking ID: ${resp.data.id}`);
    } catch (error) {
      console.error(error);
      alert("Failed to book hotel.");
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
        <div className="title">Location: {location}</div>
        <div className="title">Price: ₹{price}</div>
        <div className="title">Rating: ⭐ {rating}</div>


        <button className="clr" onClick={() => setShowDesc(!showDesc)}>
          {showDesc ? "Hide Description" : "Show Description"}
        </button>

        {showDesc && (
          <p style={{ marginTop: "10px", lineHeight: "1.5", color: "#444" }}>
            <strong>Description:</strong> {description ? description : "No description available"}
          </p>
        )}


        {/* ✅ USER Selects Dates Here */}
        {!isAdmin && (
          <div style={{ marginTop: "15px" }}>
            <label><strong>Select Check-in:</strong></label>
            <input
              type="date"
              value={checkIn}
              min={new Date().toISOString().split("T")[0]}   // ✅ Restrict past dates
              onChange={(e) => {
                setCheckIn(e.target.value);
                setCheckOut(""); // reset checkout when check-in changes
              }}
              required
            />

            <label><strong>Select Check-out:</strong></label>
            <input
              type="date"
              value={checkOut}
              min={checkIn || new Date().toISOString().split("T")[0]} // ✅ min date = check-in
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
          </div>
        )}



        <div style={{ marginTop: "12px", display: "flex", gap: "10px" }}>
          <button onClick={backBtn}>Back</button>

          {!isAdmin && (
            <button
              onClick={bookHotel}
              style={{ backgroundColor: "green", color: "white" }}
              disabled={loadingBooking}
            >
              {loadingBooking ? "Booking..." : "Book Hotel"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadHotels;



