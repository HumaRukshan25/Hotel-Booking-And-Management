import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/styles/updatehotel.css"

const API_BASE = "http://127.0.0.1:8000";

const UpdateHotel = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState({
    name: "",
    location: "",
    imageUrl: "",
    price: "",
    rating: "",
    description: ""
  });

  const [loading, setLoading] = useState(true);

  // ✅ Load the existing hotel details
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`${API_BASE}/hotels/${id}`);
        setHotel(response.data);
      } catch (error) {
        alert("Failed to load hotel details");
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  // ✅ Form input change handler
  const handleChange = (e) => {
    setHotel({ ...hotel, [e.target.name]: e.target.value });
  };

  // ✅ Submit updated details
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API_BASE}/hotels/${id}`, hotel);
      alert("Hotel updated successfully!");
      navigate("/adminportal"); // redirect back to hotel list
    } catch (error) {
      alert("Failed to update hotel");
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="form-container">
      <div className="card">
        <h2>Update Hotel</h2>
        <form onSubmit={handleUpdate} className="hotel-form">

          <input
            type="text"
            name="name"
            placeholder="Enter Hotel Name"
            value={hotel.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Enter Location"
            value={hotel.location}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="imageUrl"
            placeholder="Enter Hotel Image URL"
            value={hotel.imageUrl}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Enter Price"
            value={hotel.price}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Enter Rating"
            value={hotel.rating}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Enter Description"
            value={hotel.description}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" style={{ background: "orange", color: "white" }}>
            Update Hotel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateHotel;
