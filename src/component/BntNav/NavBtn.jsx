import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
function NavBtn({Ledgerone,Name}) {
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
            navigate(-1)
        }}><h3>Journal</h3> </button>
        <button className="navbtn col-3" disabled={loc==="ledger"?true:false} onClick={()=>{
            navigate('/Ledger',{state:{LedgerData:Ledgerone,NameData:Name}})
          }}><h3>Ledger</h3> </button>
        <button className="navbtn col-3"  onClick={()=>{
          console.log(loc);
        }}><h3>Trial</h3></button>
    </div>
  )
}

export default NavBtn
