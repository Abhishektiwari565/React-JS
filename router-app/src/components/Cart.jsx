// import React from 'react'

// export default function Cart({cartList,setCartList}) {

//      const removeCartDetail=(index)=>{
//         const arr=[...cartList];
//         arr.splice(index,1);
//         setCartList(arr);
//      }
//   return (
//     <div>
//       {
//         cartList.map((cart,index)=>
//             <div key={index} className="cartDetail">
//                 <p>{cart.title}</p>
//                  <button onClick={()=>removeCartDetail(index)}>Delete</button>
//             </div>

           
//         )
//       }
//     </div>
//   )
// }
import React from 'react'

export default function Cart({ cartList, setCartList }) {
  const removeCartDetail = (index) => {
    const arr = [...cartList];
    arr.splice(index, 1);
    setCartList(arr);
  }

  return (
    <div>
{
        cartList.map((cart, index) =>
          <div key={index} className="cartDetail">
            <p>{cart.title}</p>
            <button onClick={() => removeCartDetail(index)}>Delete</button>
          </div>
        )
      }
    </div>
  )
}
