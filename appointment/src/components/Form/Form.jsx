import React, { useState } from 'react'
import './Form.css'

export default function Form() {
  const [viewList, setViewList] = useState([]);
  const [Appointment, setappointment] = useState({
    name: "",
    hospital: "",
    phone: "",
    gender: "",
    date: "",
    doctor: "",
    subject: ""

  });

  const handleInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setappointment({ ...Appointment, [key]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmpty = Object.values(Appointment).some((values) => values.trim() === "");

    if (isEmpty) {
      alert("All fields are required!!")
    } else {
      console.log("Appointment Booked:", Appointment);
      let arr = [...viewList];
      arr.push(Appointment);
      setViewList(arr);
      // console.log(Appointment);
    }

  };

  return (

    <div className='nav-div'>
      {/* ✅ Navbar */}
      <nav className="navbar">
        <h1>🏥 CityCare Hospital</h1>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Appointments</a></li>
          <li><a href="#">Doctors</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
      

    <div className="main">
      <div className='form-box'>
        <form action="" >
          <h2>Book Appointment</h2>
          <div className="form">

            <label htmlFor="name">Full Name</label>
            <input onChange={handleInput} value={Appointment.name} type="text" name='name' />

            <label htmlFor="">Hospital Name</label>
            <input onChange={handleInput} value={Appointment.hospital} type="text" name='hospital' />

            <label htmlFor="contact">Contact</label>
            <input onChange={handleInput} value={Appointment.phone} maxLength={"10"} type="tel" name="phone" />

            <div className='gender'>
              <input onChange={handleInput} value="male" type="radio" name="gender" />
              <label htmlFor="gender">Male</label>

              <input onChange={handleInput} value="female" type="radio" name="gender" />
              <label htmlFor="gender">Female</label>
            </div>

            <label htmlFor="date">Appointment Date</label>
            <input onChange={handleInput} value={Appointment.date} type="date" name="date" />

            <label htmlFor="doctor option">Doctor</label>
            <select onChange={handleInput} value={Appointment.doctor} name="doctor">
              <option value="">-- Select Doctor --</option>
              <option value="Dr. Vikram Desai">Dr. Vikram Desai</option>
              <option value="Dr. Pooja Khanna">Dr. Pooja Khanna</option>
              <option value="Dr. Arjun Reddy">Dr. Arjun Reddy</option>
              <option value="Dr. Sneha Nair">Dr. Sneha Nair</option>
            </select>


            <label htmlFor="subject">Subject-Line</label>
            <textarea onChange={handleInput} value={Appointment.subject} name="subject" id=""></textarea>
            <button type='submit' onClick={handleSubmit}>Submit Appointment</button>
          </div>
        </form>
      </div>

      <div className="detail-box">
        {
          viewList.map((form, index) => <div key={index}>
            <div key={index} className="detail-card">
              <p><strong>Patient Name:</strong> {form.name}</p>
              <p><strong>Hospital:</strong> {form.hospital}</p>
              <p><strong>Contact:</strong> {form.phone}</p>
              <p><strong>Gender:</strong> {form.gender}</p>
              <p><strong>Date:</strong> {new Date(form.date).toLocaleDateString("en-GB")}</p>
              <p><strong>Doctor:</strong> {form.doctor}</p>
              <p><strong>Subject:</strong> {form.subject}</p>
              <hr />
            </div>
          </div>)
        }

      </div>
    </div>
    </div>
  )
}
