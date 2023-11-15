import React,{useState} from 'react'

export default function Login() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = (e) =>{
       e.preventDefault()
        console.log(email,password)
    }
  return (
    <div className='container'>
      <h5>Login</h5>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="email" 
        placeholder="eamil"
        value={email}
        onChange={ (e) => setEmail(e.target.value) }
        required
        /><br/>
        <input type="password"
        placeholder="password"
        value={password}
        onChange={ (e) => setPassword(e.target.value) } 
         /><br/>
         <button className='btn #9c27b0 purple' type='submit'>Login</button>
      </form>
    </div>
  )
}
