import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/hotels.css";

const API_BASE = "http://127.0.0.1:8000";

const HotelsFooter = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadHotels = async () => {
      try {
        const response = await axios.get(`${API_BASE}/hotels/`);
        setHotels(response.data || []);
      } catch (error) {
        setError("Failed to load hotels");
      } finally {
        setLoading(false);
      }
    };
    loadHotels();
  }, []);

  const readHotel = (id) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      alert("Please login or signup first to view hotel details!");
      window.location.href = "/";
      return;
    }

    window.location.href = `/usersportal/readhotel/${id}`;
  };

  if (loading) return <div>Loading hotels...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="hotels-container">

      {hotels.length === 0 ? (
        <div>No hotels available</div>
      ) : (
        hotels.map((hotel) => {
          const {
            id,
            name,
            imageUrl,
            location: hotelLocation,
            price,
            rating,
            description,
          } = hotel;

          return (
            <div className="hotel-card" key={id}>
              <div className="hotel-image">
                <img src={imageUrl} alt={name} />
              </div>

              <div className="hotel-info">
                <h3>{name}</h3>
                <p><strong>Location:</strong> {hotelLocation}</p>
                <p><strong>Price:</strong> ₹{price}</p>
                <p><strong>Rating:</strong> {rating} ⭐</p>
                <p><strong>Description:</strong> {description}</p>

                <button
                  onClick={() => readHotel(id)}
                  style={{
                    marginTop: "12px",
                    background: "#007bff",
                    color: "white",
                    padding: "8px 14px",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default HotelsFooter;
