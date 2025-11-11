import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import '../assets/styles/navbar.css'

const Navbar = () => {
  let location = useLocation()
  let path = location.pathname
  let bool = path.startsWith('/adminportal')

  return (


    <>
      <div className="navbar">
        <div className="logo"></div>
        <div className="links">
          {bool ?
            <ul>
              <li><NavLink to="/adminportal">Home</NavLink></li>
              <li><NavLink to="/adminportal/hotels">Hotels</NavLink></li>
              <li><NavLink to="/adminportal/addusers">Add users</NavLink></li> 
              <li><NavLink to="/adminportal/users">Users</NavLink></li> 
              <li><NavLink to="/">Logout</NavLink></li>
            </ul>
            :
            <ul>
              <li><NavLink to="/usersportal" >HOME</NavLink></li>
              <li><NavLink to="/usersportal/hotels">Hotels</NavLink></li>
              <li><a href="/usersportal/booked-hotels">My Bookings</a></li>
              <li><NavLink to="/usersportal/contacts">Contacts</NavLink></li>
              <li><NavLink to="/">Logout</NavLink></li>
            </ul>
          }
        </div>
      </div>
    </>
  )
}

export default Navbar
