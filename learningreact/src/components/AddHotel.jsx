// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../assets/styles/addhotel.css"

// const API_BASE = "http://127.0.0.1:8000";

// const AddHotel = () => {
//   const [form, setForm] = useState({
//     name: "",
//     location: "",
//     price: "",
//     rating: "",
//     description: "",
//     imageUrl: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await axios.post(`${API_BASE}/hotels/`, form);
//       alert("✅ Hotel added successfully!");
//       navigate("/adminportal/hotels");
//     } catch (error) {
//       console.error(error);
//       alert("❌ Failed to add hotel");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="form-page">

//       <h2 >Add New Hotel</h2>

//       <div className="form-container">
       
//         <form onSubmit={handleSubmit} className="hotel-form">
//           <input
//             type="text"
//             name="name"
//             placeholder="Hotel Name"
//             required
//             value={form.name}
//             onChange={handleChange}
//           />

//           <input
//             type="text"
//             name="location"
//             placeholder="Location"
//             required
//             value={form.location}
//             onChange={handleChange}
//           />

//           <input
//             type="number"
//             name="price"
//             placeholder="Price per night"
//             required
//             value={form.price}
//             onChange={handleChange}
//           />

//           <input
//             type="number"
//             name="rating"
//             placeholder="Rating (1-5)"
//             required
//             value={form.rating}
//             onChange={handleChange}
//           />

//           <textarea
//             name="description"
//             placeholder="Description"
//             rows="3"
//             required
//             value={form.description}
//             onChange={handleChange}
//           ></textarea>

//           <input
//             type="text"
//             name="imageUrl"
//             placeholder="Image URL"
//             required
//             value={form.imageUrl}
//             onChange={handleChange}
//           />

//           <button type="submit" disabled={loading}>
//             {loading ? "Saving..." : "Add Hotel"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );

// };

// export default AddHotel;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/styles/addhotel.css";

const API_BASE = "http://127.0.0.1:8000";

const AddHotel = () => {
  const [form, setForm] = useState({
    name: "",
    location: "",
    price: "",
    rating: "",
    description: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API_BASE}/hotels/`, form);
      alert("✅ Hotel added successfully!");
      navigate("/adminportal/hotels");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to add hotel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="card">
        <h2>Add New Hotel</h2>

        <form onSubmit={handleSubmit} className="hotel-form">
          <input
            type="text"
            name="name"
            placeholder="Hotel Name"
            required
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            required
            value={form.location}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price per night"
            required
            value={form.price}
            onChange={handleChange}
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating (1-5)"
            required
            value={form.rating}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            rows="3"
            required
            value={form.description}
            onChange={handleChange}
          ></textarea>
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            required
            value={form.imageUrl}
            onChange={handleChange}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Add Hotel"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHotel;
