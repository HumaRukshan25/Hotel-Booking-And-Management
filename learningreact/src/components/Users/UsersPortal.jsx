import React from 'react';
import Navbar from '../Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from '../Home';
import Hotels from '../Hotels';
import Contact from '../Contact';
import ReadHotels from '../ReadHotels';
import BookedHotels from '../BookedHotels';
import Footer from '../Footer';

const UsersPortal = () => {
  return (
    <>
      <Navbar />
      <Routes>

        <Route element={<Home />} path='/' />
        <Route element={<Hotels />} path='/hotels' />
        <Route path="readhotel/:id" element={<ReadHotels />} />
        <Route element={<BookedHotels />} path='/booked-hotels' />
        <Route element={<Contact />} path='/contacts' />


      </Routes>
        <Footer/>
    </>
  );
}

export default UsersPortal;
