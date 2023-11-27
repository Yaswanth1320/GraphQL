import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useAuthDispatch } from '../Context/auth'

function Home() {

  const dispatch = useAuthDispatch()
  const navigate = useNavigate()

  function logout(){
    dispatch({type:'LOGOUT'})
    navigate('/login')
  }

  return (
    <div className='navbar'>
        <div className="logo">WeChat</div>
        <div className="links">
          <Link to='/register'>Register</Link>
          <Link to='/login'>Login</Link>
          <button className='logout-btn' onClick={logout}>Logout</button>
        </div>
    </div>
  )
}

export default Home
