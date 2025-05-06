import React from 'react'
import NavBtn from "../BntNav/NavBtn"
import { useNavigate } from 'react-router-dom';
function Bar({Username,Active,Ledgerzero,Name,user,Trial}) {
  const navigate=useNavigate()
  const Email=localStorage.getItem("Email")
  const Password=localStorage.getItem("Password")
  return (
    <div className='bg-screen row img-home'  >
        <div className="col-md-6 col-12 " style={{display:"flex",justifyContent:"space-evenly"}}>
        { 
          Active=="true"?
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className=" back-btn mt-3 ms-5  bi bi-arrow-bar-left" viewBox="0 0 16 16" onClick={()=>{
            navigate('/project',{state:{Email:Email,Password:Password}})
          }}>
            <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5"/>
          </svg>:""
        }
        <h3 className='project-hld'>{Active=="true"?`${Name} Project`:"Ledger"} .</h3>
        </div>
        <div className="col-md-6 col-12 " style={{display:"flex",justifyContent:"space-evenly"}}>
          <h3 className='project-hld'> {Username!=""?"":<NavBtn Ledgerone={Ledgerzero} Name={Name} user={user} Trial={Trial}/>}</h3>
        </div>
    </div>
  )
}

export default Bar