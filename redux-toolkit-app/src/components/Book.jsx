import {useDispatch,useSelector} from 'react-redux'
import {addBook,removeBook,updateBook} from "../slices/Bookslice";
import { useRef } from 'react';
 
 export default function Book() {
    const dispatch=useDispatch();
    const {total,book}=useSelector((state)=>state.Book)
    const inputRef=useRef();
   return (
     <div> 
        <input type="text" placeholder='enter book name..' ref={inputRef}  />
        <button onClick={()=>{
            const value=inputRef.current.value;
            dispatch(addBook({title:value}))
            inputRef.current.value="";
        }}>Add Book</button>
       <h1>total books:{total}</h1>
       {
        book.map((b,index)=><p key={index}>{b.title}
        <button onClick={()=>{dispatch(removeBook(index))}}>-</button>
        </p>)
        
       }
     </div>
   )
 }
 