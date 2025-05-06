
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection,doc } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import app from '../firebase.js'
import { createUserWithEmailAndPassword } from 'firebase/auth';
function register() {

    const auth = getAuth(app)
    const store= getFirestore(app)
    const navigate=useNavigate()
    const [name,setname]=useState('')
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const [confirm,setconfirm ]=useState('')
    const [message,setmessage ]=useState('')
    
  
  
  const UserRegister= async(e)=>{
    e.preventDefault()
    try{
      if(email&&(password==confirm)){
        createUserWithEmailAndPassword(auth,email,password).then(()=>{
          const Ref2 = doc(store,"user's",email)
          const drRef2=collection(Ref2,password)
          addDoc(drRef2,{
          Name:name,
          Email:email,
          Password:password,
          Date: new Date()
        })
        })
        alert("Thanks for ou")
      }
      navigate('/')
    }catch(e){
        console.error(e);
        setmessage(e.message)
    }
  }
  return (
    <div className='row img-all'  >
        <div className="col-12 col-md-6 real-view">
          <h1>Hello,Friend!</h1>
          <h4>Enter our personal details <br /> and start journey with us</h4>
        </div>
        <div className="col-12 col-md-5 img-bg">
          <div className="login-name mt-3 ms-2">
              <h2>Sing In</h2>
            </div>
            <div className="mt-3">

              <div className="input-area ">
                <div className='label'>
                  <h4 className="name">Name</h4>
                </div>
                <input className='inp col-12' type="text" name='name' placeholder='Name' onChange={(e)=>setname(e.target.value)} value={name} />
              </div>
            
              <div className="input-area mt-2">
                <div className='label'>
                  <h4 className="name ">Email</h4>
                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23"  fill="currentColor" className="bi bi-envelope-at-fill icon-m" viewBox="0 0 16 16">
                    <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671"/>
                    <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791"/>
                  </svg>
                </div>
                <input className='inp col-12 ' type="email" name='email' placeholder='Email' onChange={(e)=>setemail(e.target.value)} value={email}/>
              </div>

              <div className="input-area mt-2 ">
                <div className='label'>
                  <h4 className="name mt-2">Password</h4>
                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="mt-2 bi bi-lock-fill icon-p" viewBox="0 0 16 16">
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>
                  </svg>
                </div>
                <input className='inp col-12' type="password" name='password' placeholder='Password' onChange={(e)=>setpassword(e.target.value)} value={password}/>
              </div>
              <div className="input-area mt-2 ">
                <div className='label'>
                  <h4 className="name mt-2"> confirm Password</h4>
                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="mt-2 bi bi-lock-fill icon-p" viewBox="0 0 16 16">
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>
                  </svg>
                </div>
                <input className='inp col-12' type="password" name='password' placeholder='Password' onChange={(e)=>setconfirm(e.target.value)} value={confirm}/>
              </div>
              <div className="erorr-messa">
                <label className="erorr-msg mt-2 ms-1">{message}</label>
              </div>
              <div >
                <button type="button" className="login-btn" onClick={UserRegister}>
                  <h5>Register</h5>
                </button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default register