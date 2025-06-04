import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { UserContextProvider } from '../Context/UserContext'
import UserProtectWrapper from '../components/ui/UserProtectWrapper.jsx'

import Home from '../pages/Home.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import NotFound from '../pages/NotFound.jsx'
import ScanAndPay from '../pages/ScanAndPay.jsx'
import QrCode from '../pages/QrCode.jsx'
import Account from '../pages/Account.jsx'
import FindUser from '../pages/FindUser.jsx'

const LoginWrapper = () => {
  return (
    <UserContextProvider>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/" 
            element={
              <UserProtectWrapper>
                <Home />
              </UserProtectWrapper>
            } 
          />
          <Route path="/scan-and-pay" element={
            <UserProtectWrapper>
              <ScanAndPay />
            </UserProtectWrapper>
          } />
          <Route path="/qr-code" element={
            <UserProtectWrapper>
              <QrCode />
            </UserProtectWrapper>
          } />
          <Route path="/account" element={
            <UserProtectWrapper>
              <Account />
            </UserProtectWrapper>
          } />
          <Route path="/find-user" element={
            <UserProtectWrapper>
              <FindUser />
            </UserProtectWrapper>
          } />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </UserContextProvider>
  )
}

export default LoginWrapper