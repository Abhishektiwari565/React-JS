import React, { useEffect, useState } from 'react'
import About from '../../components/About/About'
import axios from 'axios'

export default function Home() {
  const [githubData,setGithubData]=useState({})
  // to call api one time.
  useEffect(()=>{
    fetchApi().then((data)=>setGithubData(data));
  },[]);
   const fetchApi=async()=>{
      const res=await axios.get("https://api.github.com/users/abhishektiwari565");
      return res.data;
    }
  return (
    <div>
      <About user={githubData}/>
    </div>
  )
}
