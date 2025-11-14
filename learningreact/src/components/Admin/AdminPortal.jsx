import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../Home'
import Hotels from '../Hotels'
import Navbar from '../Navbar'
import AddUsers from './AddUsers'
import Contact from '../Contact'
import ReadHotels from '../ReadHotels'
import UpdateHotel from '../UpdateHotel';   // ✅ Correct import
import AddHotel from '../AddHotel'
import Users from '../Users'
import UpdateUser from './UpdateUser'
import Footer from '../Footer'

const AdminPortal = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/addusers' element={<AddUsers />} />
        <Route path='/users' element={<Users />} />
        <Route path='/hotels' element={<Hotels />} />
        <Route path="readhotel/:id" element={<ReadHotels />} />
        <Route path="updatehotel/:id" element={<UpdateHotel />} />
        <Route path="addhotel" element={<AddHotel />} />
        <Route path='/contacts' element={<Contact />} />
        <Route path="/updateuser/:id" element={<UpdateUser />} />

      </Routes>
      <Footer/>
    </>
  )
}

export default AdminPortal
