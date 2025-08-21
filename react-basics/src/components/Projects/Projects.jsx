import React from 'react'
import './Projects.css'

export default function Projects(props) {
    const reposData=props.repos;
  return (
    <>
   <section className='project-section'>
    <div className="repo-detail">
        <h1 className='title'>Projects</h1>
        {
            reposData.map((repo)=>{
                const {name,language,html_url}=repo
                return <div className="box">
                    <h2>{name}</h2>
                    <div className='btn-section'>
                        <button>{language ?? "unknown"}</button>
                        <button><a href={html_url}>link</a></button>
                    </div>
                </div>
            })
        }
    </div>
   </section>
    </>
    
  )
}
