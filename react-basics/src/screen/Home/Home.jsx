import React, { useEffect, useState } from 'react'
import About from '../../components/About/About'
import axios from 'axios'
import Projects from '../../components/Projects/Projects'
import Contact from '../../components/Contact/Contact'

export default function Home() {
  const [githubData,setGithubData]=useState({})
  const [repos,setRepos]=useState([])
  
  // to call api one time.
  useEffect(()=>{
    fetchApi().then((data)=>setGithubData(data));
    reposApi().then((data)=>setRepos(data))
  },[]);

  //api for about section
   const fetchApi=async()=>{
      const res=await axios.get("https://api.github.com/users/abhishektiwari565");
      return res.data;
    }
    //api for project section
    const reposApi=async()=>{
      const res=await axios.get("https://api.github.com/users/Abhishektiwari565/repos")
      return res.data;
    }
  return (
    <div>
      <About user={githubData}/>
      <Projects repos={repos}/>
      <Contact/>
    </div>
  )
}
