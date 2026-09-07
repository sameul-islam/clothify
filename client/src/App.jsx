import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import ProductsPage from './pages/ProductsPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import Footer from './components/Footer/Footer'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'

const App = () => {
  return (
    <Router>
      <div>
        <Navbar/>

        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/products' element={<ProductsPage/>} />
          <Route path='/product/:slug' element={<ProductDetailsPage/>} />
          <Route path='/cart' element={ <Cart/> } />
          <Route path='/checkout' element={<Checkout/>} />
          <Route path='order-confirmation' element={<OrderConfirmation/>} />
        </Routes>

      </div>
      <Footer/>
    </Router>
  )
}

export default App
