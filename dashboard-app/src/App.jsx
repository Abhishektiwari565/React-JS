import React from 'react'
import Navbar from './assets/components/Navbar/Navbar'
import Middle from './assets/components/Middle/Middle'
import Home from './assets/components/Home/Home'
import HeroSection from './assets/components/HeroSection/HeroSection'

export default function App() {
  return (
    <div className='container'>
      <Navbar/>
      <Middle/>
      <Home/>
      <HeroSection/>
    </div>
  )
}
