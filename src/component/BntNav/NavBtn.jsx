import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
function NavBtn({Ledgerone,Name,user,Trial}) {
  const [loc,setloc]=useState("")
  useEffect(()=>{
    const loc=localStorage.getItem("valueA")
    setloc(loc);
  },[])
  const navigate=useNavigate()
  return (
    <div className='row col-12 justify-content-evenly'>
        <button className="navbtn col-4" disabled={loc==="journal"?true:false} onClick={()=>{
            localStorage.setItem("valueA","journal")
            navigate('/projectview',{state:{Projectname:Name,Email:user,Trial:Trial}})
        }}><h3>Journal</h3> </button>
        <button className="navbtn col-3" disabled={loc==="ledger"?true:false} onClick={()=>{
            navigate('/Ledger',{state:{LedgerData:Ledgerone,NameData:Name,user:user}})
          }}><h3>Ledger</h3> </button>
        <button className="navbtn col-3" disabled={loc==="TrialBalance"?true:false} onClick={()=>{
         navigate('/TrialBalance',{state:{LedgerData:Ledgerone,NameData:Name,user:user,Trial:Trial}})
        }}><h3>Trial</h3></button>
    </div>
  )
}

export default NavBtn
