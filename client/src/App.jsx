import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getCurrentUser } from './features/auth/authThunks';

import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import ProductsPage from './pages/ProductsPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import Footer from './components/Footer/Footer'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import MyOrders from './pages/MyOrders'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
  
  const dispatch = useDispatch();

  useEffect(() => {
   const token = localStorage.getItem("sepy-token");

   if (token) {
    dispatch(getCurrentUser());
   }
  }, [dispatch]);



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
          <Route path='order-confirmation/:id' element={<OrderConfirmation/>} />
          <Route path='/my-orders' element={<MyOrders/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>

      </div>
      <Footer/>
    </Router>
  )
}

export default App
