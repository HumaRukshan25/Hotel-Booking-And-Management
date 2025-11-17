import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/styles/hotels.css";

const API_BASE = "http://127.0.0.1:8000";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filterLocation, setFilterLocation] = useState("");
  const [searchName, setSearchName] = useState(""); // hotel name search
  const [sortOption, setSortOption] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/adminportal");

  useEffect(() => {
    const loadHotels = async () => {
      try {
        const response = await axios.get(`${API_BASE}/hotels/`);
        setHotels(response.data || []);
        setFilteredHotels(response.data || []);
      } catch (error) {
        setError("Failed to load hotels");
      } finally {
        setLoading(false);
      }
    };
    loadHotels();
  }, []);

  // Filter by location AND hotel name
  useEffect(() => {
    let temp = [...hotels];

    if (filterLocation) {
      temp = temp.filter((h) =>
        h.location.toLowerCase().includes(filterLocation.toLowerCase())
      );
    }

    if (searchName) {
      temp = temp.filter((h) =>
        h.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }


    // Sorting
    if (sortOption === "priceLow") temp.sort((a, b) => a.price - b.price);
    else if (sortOption === "priceHigh") temp.sort((a, b) => b.price - a.price);
    else if (sortOption === "ratingHigh") temp.sort((a, b) => b.rating - a.rating);
    else if (sortOption === "ratingLow") temp.sort((a, b) => a.rating - b.rating);

    setFilteredHotels(temp);
  }, [filterLocation, searchName, sortOption, hotels]);

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
    <div className="hotels-page">
      {/* Admin: Add Hotel Button */}
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

      {/* Filter/Search & Sort Controls on Top */}
      <div className="filter-sort-container">
        <input
          type="text"
          placeholder="Search by hotel name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by location"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="ratingHigh">Rating: High to Low</option>
          <option value="ratingLow">Rating: Low to High</option>
        </select>
      </div>

      {/* Hotel List */}
      <div className="hotels-container">
        {filteredHotels.length === 0 ? (
          <div>No hotels available</div>
        ) : (
          filteredHotels.map((hotel) => {
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
                        <button style={{ background: "orange", color: "white" }} onClick={() => updateHotel(id)}>Update</button>
                        <button style={{ background: "red", color: "white" }} onClick={() => deleteHotel(id, name)}>Delete</button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );

};

export default Hotels;


