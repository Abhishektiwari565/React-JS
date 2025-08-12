// import {useState} from 'react'
// import './class.css'

// export default function Class() {
//     const [classData,setClassData]=useState([{
//         Faculty:"Akhil sir",student:"Abhishek Tiwari",course:"FSD"
// }])

// const [Faculty,setFaculty]=useState("");
// const [student,setStudent]=useState("");
// const [course,setCourse]=useState("");
// const [index,setIndex]=useState(0);

// const addClassData=()=>{
//   const newData={
//     Faculty:Faculty,
//     student:student,
//     course:course,
//   }
//   setClassData([...classData,newData])
// }

// const removeClassData=(i)=>{
//   const temp=[...classData];
//   temp.splice(i,1);
//   setClassData(temp)
// }

// const editClassData=(i)=>{
//   setIndex(i);
//   setFaculty(classData[i].Faculty);
//   setStudent(classData[i].student);
//   setCourse(classData[i].course);
// }
//   return (
//    <>
//    <input type="text" placeholder='Enter Faculty name...'className='input'
//    value={Faculty}
//    onChange={(e)=>setFaculty(e.target.value)}
//    />
//    <input type="text" placeholder='Enter student name...'className='input'
//    value={student}
//    onChange={(e)=>setStudent(e.target.value)}
//    />
//    <input type="text" placeholder='Enter course name...'className='input'
//    value={course}
//    onChange={(e)=>setCourse(e.target.value)}
//    />
//    <button className='add-btn' onClick={addClassData}>Add</button>
//    <button onClick={()=>{
//     const temp=[...classData]
//     temp[index].Faculty=Faculty;
//     temp[index].student=student;
//      temp[index].course=course;
//      setClassData(temp);
//    }}>Update</button>
//    {
//     classData.map((data,index)=>{
//         return(
//         <div>
//           <p>
//         {"Faculty name:"+data.Faculty}
//         {"Student name:"+data.student}
//         {"Course name:"+data.course}
//         <button className='remove-class' onClick={()=>removeClassData(index)}>delete</button>
//         <button className='edit-class' onClick={()=>editClassData(index)}>edit</button>
//         </p>
//         </div>
//         );
//     })
//    }
//    </>
//   )
// }

import { useState } from 'react';
import './Class.css';

export default function Class() {
  const [classData, setClassData] = useState([
    { Faculty: "Akhil sir", student: "Abhishek Tiwari", course: "FSD" }
  ]);

  const [Faculty, setFaculty] = useState("");
  const [student, setStudent] = useState("");
  const [course, setCourse] = useState("");
  const [index, setIndex] = useState(0);

  const addClassData = () => {
    const newData = { Faculty, student, course };
    setClassData([...classData, newData]);
    setFaculty(""); setStudent(""); setCourse("");
  };

  const removeClassData = (i) => {
    const temp = [...classData];
    temp.splice(i, 1);
    setClassData(temp);
  };

  const editClassData = (i) => {
    setIndex(i);
    setFaculty(classData[i].Faculty);
    setStudent(classData[i].student);
    setCourse(classData[i].course);
  };

  return (
    <div>
     {/* Navbar */}
      <nav className="navbar">
        <h1>📚 Classroom Manager</h1>
      </nav>
      

    <div className="class-container">
      <h2>Classroom Data</h2>
      <div className="form-section">
        <input
          type="text"
          placeholder="Enter Faculty name..."
          className="input"
          value={Faculty}
          onChange={(e) => setFaculty(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter student name..."
          className="input"
          value={student}
          onChange={(e) => setStudent(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter course name..."
          className="input"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
        <div className="btn-group">
          <button className="add-btn" onClick={()=>{
            if(Faculty=="" && student=="" && course==""){
              alert("Enter all fields")
            }else if(Faculty=="" && student==""){
              alert("enter faculty and student name");
            } else if(Faculty=="" && course==""){
              alert("enter faculty and course name");
            } else if(course=="" && student==""){
              alert("enter course and student name");
            }
            else if(Faculty==""){
              alert("enter faculty name");
            }else if(student==""){
              alert("enter student name");
            }else if(course==""){
              alert("enter course name");
            }
            
            else{
              addClassData();
            }
            }
          }>Add</button>
          <button className="update-btn" onClick={() => {
            const temp = [...classData];
            temp[index].Faculty = Faculty;
            temp[index].student = student;
            temp[index].course = course;
            setClassData(temp);
            setFaculty(""); setStudent(""); setCourse("");
          }}>Update</button>
        </div>
      </div>

      <div className="list-section">
        {classData.map((data, i) => (
          <div className="card" >
            <p><strong>Faculty:</strong> {data.Faculty}</p>
            <p><strong>Student:</strong> {data.student}</p>
            <p><strong>Course:</strong> {data.course}</p>
            <div className="card-buttons">
              <button className="remove-class" onClick={() => removeClassData(i)}>Delete</button>
              <button className="edit-class" onClick={() => editClassData(i)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  
  );
}

