
import React, { useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ProductDetail from './components/ProductDetail'
import Cart from './components/Cart'
import { products } from './json/Products'
import SignIn from './components/SignIn'
import PrivateRoute from './components/PrivateRoute'
import './App.css'

export default function App() {
  const [cartList, setCartList] = useState([])

  return (
    <>
      
      <Routes>
        <Route path="/" element={<PrivateRoute products={products} setCartList={setCartList} />} />
        <Route path="/home" element={<Home products={products} setCartList={setCartList} />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<ProductDetail />} />
        <Route path="/carts" element={<Cart cartList={cartList} setCartList={setCartList} />} />
      </Routes>
    </>
  )
}

