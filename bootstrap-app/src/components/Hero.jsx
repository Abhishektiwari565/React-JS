import React from 'react'

export default function Hero() {
  return (
    <div>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Latest Business Headlines</h1>
            <p className="lead text-muted">
              Stay updated with the most recent stories in business, finance, and the global economy. Handpicked articles from trusted sources, all in one place.
            </p>
            <p>
              <a href="#" className="btn btn-primary my-2">
                🔍 Explore News
              </a>
              <a href="#" className="btn btn-secondary my-2 ms-3">
                ⭐ Save Articles
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
