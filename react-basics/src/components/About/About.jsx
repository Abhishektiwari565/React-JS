import React from 'react'
import './About.css'

export default function About(props) {
  const {name,bio,avatar_url,location}=props.user
  return (
  <section className='main-section'>
    <div className='about'>
        <h1>Hello I'm {name}</h1>
        <h2>Full Stack developer</h2>
        <p>{bio}</p>
        <p>{location}</p>
        <button><a href="https://www.linkedin.com/in/abhishek-tiwari-65b25034b
">Hire me</a></button>
        <button>Resume</button>
    </div>
    <div className='img'>
        <img src={avatar_url} alt="" />
    </div>
  </section>
  )
}
