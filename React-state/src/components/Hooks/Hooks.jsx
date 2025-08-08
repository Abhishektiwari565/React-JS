import {useState} from 'react'

export default function Counter() {
    const [count,setcount]=useState(0);
    
    const add=()=>{
      let temp=count;
      temp++;
      setcount(temp);
    }

    const sub=()=>{
      let temp=count;
      temp--;
      setcount(temp);
    }

    const mul=()=>{
      let temp=count;
      temp*=2;
      setcount(temp);
    }

    const divide=()=>{
      let temp=count;
      temp/=2;
      setcount(temp);
    }

  return (
   <div>
    <h3>{count}</h3>
    <button onClick={add}>+1</button>
    <button onClick={sub}>-1</button>
    <button onClick={mul}>2X</button>
    <button onClick={divide}>/2</button>
   </div>
  )
}
