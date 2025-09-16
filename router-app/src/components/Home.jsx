
import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar';

export default function Home({ products, setCartList }) {
  const navigate = useNavigate();
   const [user,setUser]=useState({});
  
      const getUser=()=>{
          const str = localStorage.getItem("user") ?? "{}";
          const res = JSON.parse(str);
          setUser(res);
      }
  
      useEffect(()=>{
        navigate("/home")
          getUser()

      },[])
  return (
  
    <div>
      <Navbar/>
      <h2>Home Page</h2>
      <div className="product-view">
        {products.map((product, index) =>
          <div key={index} className="product-detail">

            <h3>{product.title}</h3>
            <h3>{product.price}</h3>
            <p>{product.category}</p>

            <button onClick={() => navigate("/products", { state: product })}>
              View
            </button>

            <button onClick={() => {
              setCartList(prev => [...prev, product])
              navigate("/carts")
            }}>
              ++
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
