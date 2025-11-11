import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/styles/hotels.css";

const API_BASE = "http://127.0.0.1:8000";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/adminportal");

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
    isAdmin
      ? navigate(`/adminportal/readhotel/${id}`)
      : navigate(`/usersportal/readhotel/${id}`);
  };

  const updateHotel = (id) => {
    navigate(`/adminportal/updatehotel/${id}`);
  };

  const deleteHotel = async (id, name) => {
    const ok = window.confirm(`Do you want to delete ${name}?`);
    if (!ok) return;

    try {
      await axios.delete(`${API_BASE}/hotels/${id}`);
      setHotels((prev) => prev.filter((h) => h.id !== id));
      alert(`${name} deleted`);
    } catch (error) {
      alert("Failed to delete hotel");
    }
  };

  if (loading) return <div>Loading hotels...</div>;
  if (error) return <div>{error}</div>;


  return (
    <div className="hotels-container">

      {/* ✅ Add Hotel button only for Admin */}
      {isAdmin && (
        <div style={{ textAlign: "right", marginBottom: "20px" }}>
          <button
            style={{
              padding: "10px 18px",
              background: "green",
              color: "white",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/adminportal/addhotel")}
          >
            ➕ Add Hotel
          </button>
        </div>
      )}

      {hotels.length === 0 ? (
        <div>No hotels available</div>
      ) : (
        hotels.map((hotel) => {
          const { id, name, imageUrl, location: hotelLocation, price, rating, description } = hotel;

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

                <div style={{ marginTop: 12, display: "flex", gap: "8px" }}>
                  <button onClick={() => readHotel(id)}>View</button>

                  {isAdmin && (
                    <>
                      <button
                        onClick={() => updateHotel(id)}
                        style={{ background: "orange", color: "white" }}
                      >
                        Update
                      </button>
                      <button
                        onClick={() => deleteHotel(id, name)}
                        style={{ background: "red", color: "white" }}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );

};

export default Hotels;



