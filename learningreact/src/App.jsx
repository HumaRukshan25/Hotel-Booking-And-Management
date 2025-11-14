import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import AdminPortal from './components/Admin/AdminPortal'
import UsersPortal from './components/Users/UsersPortal'
import UserSignup from './components/Users/UserSignup'
import ForgotPassword from './components/Users/forgotpassword'
import ResetPassword from './components/Users/ResetPassword'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      
      <Route element={<LandingPage/>} path="/" />
      <Route element={<AdminPortal/>} path='/adminportal/*'/>
      <Route element={<UsersPortal/>} path='/usersportal/*' />
  
      <Route path="/usersignup" element={<UserSignup />} />

      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

    </Routes>
    </BrowserRouter> 


    </>

  )
}

export default App