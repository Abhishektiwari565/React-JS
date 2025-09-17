
// import {useState,useEffect} from 'react'
// import { useNavigate } from 'react-router-dom'
// import Navbar from './Navbar';

// export default function Home({ products, setCartList }) {
//   const navigate = useNavigate();
//    const [user,setUser]=useState({});
  
//       const getUser=()=>{
//           const str = localStorage.getItem("user") ?? "{}";
//           const res = JSON.parse(str);
//           setUser(res);
//       }
  
//       useEffect(()=>{
//         navigate("/home")
//           getUser()

//       },[])
//   return (
  
//     <div>
//       <Navbar/>
//       <h2>Home Page</h2>
//       <div className="product-view">
//         {products.map((product, index) =>
//           <div key={index} className="product-detail">

//             <h3>{product.title}</h3>
//             <h3>{product.price}</h3>
//             <p>{product.category}</p>

//             <button onClick={() => navigate("/products", { state: product })}>
//               View
//             </button>

//             <button onClick={() => {
//               setCartList(prev => [...prev, product])
//               navigate("/carts")
//             }}>
//               ++
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

export default function Home({ products, setCartList }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const getUser = () => {
    const str = localStorage.getItem("user") ?? "{}";
    const res = JSON.parse(str);
    setUser(res);
  }

  useEffect(() => {
    navigate("/home")
    getUser()
  }, [])

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
     
      {/* Products Section */}
      <div className="container">
        <div className="row g-4">
          {products.map((product, index) => (
            <div key={index} className="col-md-4 col-lg-3">
              <div className="card shadow-lg h-100">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                  style={{ height: '200px', objectFit: 'contain', padding: '10px' }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text text-muted">{product.category}</p>
                  <h6 className="fw-bold text-success">₹{product.price}</h6>
                  <div className="d-flex justify-content-center gap-2 mt-3">
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => navigate("/products", { state: product })}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        setCartList(prev => [...prev, product])
                        navigate("/carts")
                      }}
                    >
                      Add to Cart
                    </button>
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
