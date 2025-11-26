import React, { useState, useEffect } from 'react'


export default function Album() {
  const [articles, setarticles] = useState([])

  const fetchNews = ()=>{
    fetch("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=ae2db4ba443a46219eac7bfe1e468fb5")
    .then(res =>res.json())
  .then(data => setarticles(data.articles));
  }
  

  useEffect(() => { fetchNews() }, [])
  return (
    <div>
      <div className="container">
        <div className="row  row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-3 ">
          {articles
          .filter((article) => article.urlToImage)
          .map((data, index) => (
           <div className="col">
          <div className="card shadow-sm">
            <img src={data.urlToImage} alt="" />
            <div className="card-body">
              <h5>{data.title}</h5>
              <p className="card-text">{data.description}</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-info "><a className='text-decoration: none' href={data.url}>learn more</a></button>
                </div>
              </div>
            </div>
          </div>
        </div>
          ))} 
        </div>
      </div>


    </div>
  )
}
// qhKS*E4z5rAN5Fd
// api key ae2db4ba443a46219eac7bfe1e468fb5