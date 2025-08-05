import {useState} from 'react'

export default function Hooks() {
    const [count,setcount]=useState(0);
    let add=()=>{
      add=count;
      add++;
      setcount(add);

    }
  return (
   <div>
    <h3>{count}</h3>
    <button onClick={add}>+1</button>
   </div>
  )
}
