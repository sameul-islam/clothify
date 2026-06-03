import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <Router>
      <div>
        <Navbar/>

        <Routes>
          <Route path='/' element={<Home/>} />
        </Routes>

      </div>
      <Footer/>
    </Router>
  )
}

export default App
