import React from 'react'
import { useState } from 'react'


function Register() {
    const [variables, setVariables] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
      })
    
      function submitForm(){
        console.log(variables)
      }

  return (
    <div className="signup-form">
            <div className='min-nav'>
                <p>Sign Up</p>
                <p>Log Inp</p>
            </div>
            <div className='details'>
              <div className='same'>
              <i className="fa-solid fa-user"></i><input type="text" value={variables.username} onChange={(e) => setVariables({...variables, username: e.target.value})} className='user' placeholder='Username' />
              </div>
              <div className='same'>
              <i className="fa-solid fa-envelope"></i><input type="email" value={variables.email} onChange={(e) => setVariables({...variables, email: e.target.value})} className='email' placeholder='Email address' />
              </div>
              <div className='same'>
              <i className="fa-solid fa-lock"></i><input type="password" value={variables.password} onChange={(e) => setVariables({...variables, password: e.target.value})} className='pass' placeholder='Password' />
              </div>
              <div className="same">
              <i className="fa-solid fa-check"></i><input type="password" value={variables.confirmPassword} onChange={(e) => setVariables({...variables, confirmPassword: e.target.value})}  className='confirm' placeholder='Confirm Password' />
              </div>
            </div>
            <button onClick={submitForm} className='signup-btn'><i className="fa-solid fa-arrow-right"></i></button>
            <p>Forget password ?</p>
        </div>
  )
}

export default Register
