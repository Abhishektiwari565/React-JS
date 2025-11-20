import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser ,getUser} from '../slices/userSlice'
import {useNavigate} from 'react-router'

export default function UserHomePage() {
    const navigate=useNavigate();
    let { users, currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser());
        dispatch(fetchUser());
    }, [])
    return (
         
       <div>    
        <h2>User:{currentUser.email}</h2>
          <div className='w-100 bg-black'>
               <ol className="list-group list-group-numbered">
                {users.map((user, index) => {
                    if(user.email!=currentUser.email){
                          return<li key={index} onClick={()=>navigate("/chat",{state:user})} className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{user.email}</div>
                            Cras justo odio
                        </div>
                        <span className="badge bg-primary rounded-pill">14</span>
                    </li>
                    }
                    return <></>
                }
                  
                )}
            </ol>
         </div>
       </div>
        

    )
}
