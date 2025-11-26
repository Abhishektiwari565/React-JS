import React, { useContext, useState } from 'react'
import { CounterContext } from '../Context/CounterProvider'

export default function Todo() {
  const {todos, addTodo,removeTodo} = useContext(CounterContext)
  const [input,setInput]=useState("");
  const handleInput=()=>{
   if(input.trim()!==""){
     addTodo(input);
    setInput("")
   }
  }
  return (
    <div>
      <div>
        <input type="text" placeholder='enter here' value={input} onChange={(e)=>setInput(e.target.value)} />
        <button onClick={() =>handleInput()}>add</button>
      </div>
      {
        todos.map((todo, index) => <div key={index}>
          {
            todo.title
          }
          <button onClick={()=>removeTodo(index)}>--</button>
        </div>)
      }
    </div>
  )
}
