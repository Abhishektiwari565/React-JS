import { Route,Routes } from "react-router-dom";
import './App.css'
import PrivateRoute from "./components/PrivateRoute";
import SignIn from "./components/SignIn";
import Cart from "./components/Cart";
import { useState } from "react";
import Home from './components/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

   <Routes>
        <Route path='/' element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>} />
        <Route path='/signin' element={
            <PrivateRoute>
              <SignIn />
            </PrivateRoute>
          } />
        <Route path='/cart' element={<PrivateRoute>
          <Cart />
        </PrivateRoute>} />
      </Routes>
    </>
  )
}

export default App
