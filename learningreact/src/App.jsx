import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import AdminPortal from './components/Admin/AdminPortal'
import UsersPortal from './components/Users/UsersPortal'
import UserSignup from './components/Users/UserSignup'
import ForgotPassword from './components/Users/forgotpassword'
import ResetPassword from './components/Users/ResetPassword'
import Help from './pages/Help'
import FAQ from './pages/FAQ'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import HotelsFooter from './pages/HotelsFooter'
import ContactFooter from './pages/ContactFooter'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route element={<LandingPage />} path="/" />
          <Route element={<AdminPortal />} path='/adminportal/*' />
          <Route element={<UsersPortal />} path='/usersportal/*' />

          <Route path="/usersignup" element={<UserSignup />} />

          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* added below routes for footer */}
          <Route path="/help" element={<Help />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/hotels" element={<HotelsFooter />} />
          <Route path="/contacts" element={<ContactFooter />} />


        </Routes>
      </BrowserRouter>


    </>

  )
}

export default App