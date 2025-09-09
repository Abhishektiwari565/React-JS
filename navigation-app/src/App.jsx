import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'

export default function App() {
  return (
    <>

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="#">About</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="#">Projects</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="#">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
<Routes>
  <Route path='/' element={<Login/>}></Route>
  <Route path='/Home' element={<Home/>}></Route>
  <Route path='/About' element={<About/>}></Route>
  <Route path='/Projects' element={<Projects/>}></Route>
  <Route path='/Contact' element={<Contact/>}></Route>
</Routes>
    
    </>
  )
}
