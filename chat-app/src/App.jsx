import './App.css'
import ChatPage from './components/chatpage/ChatPage.jsx'
import SignIn from './components/SignIn.jsx'
import SignUp from './components/SignUp'
import UserHomePage from './components/UserHomePage.jsx'
import {Route,Routes} from 'react-router'


function App() {
  return (
    <>
     <Routes>
      <Route path='/' element={<SignIn/>} />
       <Route path='/signup' element={<SignUp/>} />
        <Route path='/home' element={<UserHomePage/>} />
        <Route path='/chat' element={<ChatPage/>} />
      
      
      
     </Routes>
    </>
  )
}

export default App
