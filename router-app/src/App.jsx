// import React from 'react'
// import { Link, Routes, Route } from 'react-router-dom'
// import Home from './components/Home'
// import About from './components/About'
// import Projects from './components/Projects'
// import Contact from './components/Contact'
// // import { products } from './json/Products'
// import ProductDetail from './components/ProductDetail'
// import { useState } from 'react'
// import Cart from './components/Cart'
// import { products } from './json/Products'

// export default function App() {
//     const [cartList,setCartList]=useState([]);
//     return (
//         <>
//             <nav>
//                 <Link to={"/about"}>About</Link>
//                 <Link to={"/projects"}>Projects</Link>
//                 <Link to={"/contact"}>Contact</Link>
//                  <Link to={"/carts"}>Cart</Link>

//             </nav>
//             <Routes>
//                 <Route path='/' element={<Home products={products} setCartlist={setCartList} />} />
//                 <Route path='/about' element={<About />} />
//                 <Route path='/projects' element={<Projects />} />
//                 <Route path='/contact' element={<Contact />} />
//                 <Route path='/products' element={<ProductDetail />} />
//                  <Route path='/carts' element={<Cart cartlist={cartList} setCartList={setCartList} />} />
//             </Routes>
//         </>

//     )
// }

import React, { useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ProductDetail from './components/ProductDetail'
import Cart from './components/Cart'
import { products } from './json/Products'

export default function App() {
  const [cartList, setCartList] = useState([])

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/carts">Cart</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home products={products} setCartList={setCartList} />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<ProductDetail />} />
        <Route path="/carts" element={<Cart cartList={cartList} setCartList={setCartList} />} />
      </Routes>
    </>
  )
}

