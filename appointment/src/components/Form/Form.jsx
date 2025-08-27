import React, { useState } from 'react'
import './Form.css'

export default function Form() {
  const [Appointment,setappointment]=useState({
    name:"",
    hospital:"",
    phone:"",
    gender:"",
    date:"",
    doctor:"",
    subject:""

  });

  const handleInput=(e)=>{
    const key=e.target.name;
    const value=e.target.value;
    setappointment({...Appointment,[key]:value});
  }

    const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment Booked:", Appointment);
    alert(`Appointment booked for ${Appointment.name} with ${Appointment.doctor}`);
  };

  return (
    <div>
        <form action="" className='form-box'>
            <h2>Book Appointment</h2>
            <div className="form">

                <label htmlFor="name">Full Name</label>
                <input onChange={handleInput} value={Appointment.name} type="text" name='name' />

                <label htmlFor="">Hospital Name</label>
                <input onChange={handleInput} value={Appointment.hospital}  type="text" name='hospital' />

                <label htmlFor="contact">Contact</label>
                <input onChange={handleInput} value={Appointment.phone} type="tel" name="phone" />

                <div className='gender'>
                <input onChange={handleInput} value="male" type="radio" name="gender" />
                 <label htmlFor="gender">Male</label>

                  <input onChange={handleInput} value="female"  type="radio" name="gender" />
                 <label htmlFor="gender">Female</label>
                </div>

                <label htmlFor="date">Appointment Date</label>
                <input onChange={handleInput} value={Appointment.date}  type="date" name="date" />

                  <label htmlFor="doctor option">Doctor</label>
                 <select onChange={handleInput} value={Appointment.doctor} name="doctor">
                     <option value="">-- Select Doctor --</option>
                    <option value="Dr. Vikram Desai">Dr. Vikram Desai</option>
                    <option value="Dr. Pooja Khanna">Dr. Pooja Khanna</option>
                    <option value="Dr. Arjun Reddy">Dr. Arjun Reddy</option>
                    <option value="Dr. Sneha Nair">Dr. Sneha Nair</option>
</select>


                   <label htmlFor="subject">Subject-Line</label>
                  <textarea onChange={handleInput} value={Appointment.subject}  name="subject" id=""></textarea>

                  <button type='submit' onClick={handleSubmit}>Submit Appointment</button>
            </div>
        </form>
      
    </div>
  )
}
