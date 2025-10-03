import React, { useContext } from 'react'
import { CounterContext } from '../Context/CounterProvider'

export default function Todo() {
    const [todos,addTodo]=useContext(CounterContext)
  return (
    <div>
      <div>
        <input type="text" placeholder='enter here' />
      </div>
      <div>
        {
            todos.map((todo,index)=><div key={index}>
                {
                    todo.title
                }
            </div>)
                
            
        }
      </div>
    </div>
  )
}
