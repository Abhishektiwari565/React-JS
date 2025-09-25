
import { useState } from 'react';
import { data } from '../assets/data.js';

export default function Home() {
  const [search, setSearch] = useState("");
  const [sortOrder,setSortOrder]=useState(null);
  const [category,setCategory]=useState("all");
  let filteredData = [...data];

  if (search) {
    filteredData = filteredData.filter(product =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  if(sortOrder!=null){
      filteredData=filteredData.sort((a,b)=>sortOrder ? a.price-b.price : b.price-a.price);
    }

    if(category!=="all"){
      filteredData=filteredData.filter(product=>product.category.toLowerCase().includes(category.toLowerCase()));
    }

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title"
        onChange={(e) => setSearch(e.target.value)}
      />
      <input type="text" placeholder='search by category' onChange={(e)=>{setCategory(e.target.value)}} />
      <button onClick={()=>{
        setSortOrder(sortOrder ?false:true)
      }}>Sort</button>
      <button onClick={()=>{
        setSearch("");
        setCategory("all");
        setSortOrder(null);
      }}>clear</button>

      <div className="products">
        {
          filteredData.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.title}</h3>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
              <p>Rating: {product.rating}/5</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}
