import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import SplashScreen from './components/ui/SplashScreen';
import LoginWrapper from './layout/LoginWrapper';

const App = () => {
  const [fire, setFire] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFire(true)
    }, 1300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Router>
      <div className="min-h-screen">
        {
          fire ? 
          <LoginWrapper/> 
          :
            <div
              className="flex items-center justify-center w-full z-50"
              style={{ height: "100vh"  , width: "100vw"}}
            >
              <SplashScreen />
            </div>
        }
      </div>
    </Router>
  )
}

export default App
