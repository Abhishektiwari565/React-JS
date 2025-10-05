import React, { createContext,useContext,useState } from 'react'
export const CounterContext = createContext();

export default function CounterProvider({children}) {
     const [count,setCount]=useState(0);
    const [todos,setTodos]=useState([{title:"Read a book" ,isCompleted:false}]);

     const increment=()=>{
        setCount(count+1)
     }

     const addTodo=(title)=>{
      //   let arr=[...todos];
      //   arr.push({title:title,isCompleted:false});
      //   setTodos(arr);
      setTodos((prev) => [...prev, { id: 1, title: title, isCompleted: false }]);
     }

     const removeTodo=(index)=>{
      let arr=[...todos];
      arr.splice(index,1);
      setTodos(arr);
     }
  return( <CounterContext.Provider value={{count,increment,todos,addTodo,removeTodo}}>
    {children}
  </CounterContext.Provider>
  )
    
}
