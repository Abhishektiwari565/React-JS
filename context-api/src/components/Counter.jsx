import React, { useContext } from 'react'
import { CounterContext } from '../Context/CounterProvider'

export default function Counter() {
    const { count, increment } = useContext(CounterContext);
    console.log(count);
    return (
        <>
            <h1>{count}</h1>
            <button onClick={increment}>++</button>
           </>
    )
}