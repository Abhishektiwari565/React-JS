// import {useDispatch,useSelector} from 'react-redux'
// import {addBook,fetchProducts,removeBook,updateBook} from "../slices/Bookslice";
// import { useEffect, useRef } from 'react';
// import { fetchProducts } from '../slices/Bookslice';
 
//  export default function Book() {
//     const dispatch=useDispatch();
//     const {total,book}=useSelector((state)=>state.Book)
//     const inputRef=useRef();

//     useEffect(()=>{
//       dispatch(fetchProducts())
//     },[])
//    return (
//      <div> 
//         <input type="text" placeholder='enter book name..' ref={inputRef}  />
//         <button onClick={()=>{
//             const value=inputRef.current.value;
//             dispatch(addBook({title:value}))
//             inputRef.current.value="";
//         }}>Add Book</button>
//        <h1>total books:{total}</h1>
//        {
//         book.map((b,index)=><p key={index}>{b.title}
//         <button onClick={()=>{dispatch(removeBook(index))}}>-</button>
//         </p>)
//        }
//      </div>
//    )
//  }
 import { useDispatch, useSelector } from 'react-redux';
import { addBook, removeBook, fetchProducts } from "../slices/Bookslice";
import { useEffect, useRef } from 'react';

export default function Book() {
  const dispatch = useDispatch();
  const { total, book, isLoading, products, error } = useSelector((state) => state.Book);
  const inputRef = useRef();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div> 
      <input type="text" placeholder='enter book name..' ref={inputRef} />
      <button onClick={() => {
        const value = inputRef.current.value.trim();
        if (value) {
          dispatch(addBook({ title: value }));
          inputRef.current.value = "";
        }
      }}>Add Book</button>

      <h1>Total Books: {total}</h1>

      {book.map((b, index) => (
        <p key={index}>
          {b.title}
          <button onClick={() => dispatch(removeBook(index))}>-</button>
        </p>
      ))}

      <hr />

      <h2>📦 API Products</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {products && products.slice(0, 10).map((p) => (
        <div key={p.id}>
          <p>{p.title}</p>
        </div>
      ))}
    </div>
  );
}
