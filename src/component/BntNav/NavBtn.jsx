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
    <div className='row col-12 justify-content-evenly '>
        <div className=" col-2 navbtn" disabled={loc==="journal"?true:false} onClick={()=>{
            localStorage.setItem("valueA","journal")
            navigate('/projectview',{state:{Projectname:Name,Email:user,Trial:Trial}})
        }}><h4>Journal</h4> </div>
        <div className="navbtn col-2" disabled={loc==="ledger"?true:false} onClick={()=>{
            navigate('/Ledger',{state:{LedgerData:Ledgerone,NameData:Name,user:user}})
          }}><h4>Ledger</h4> </div>
        <div className="navbtn col-2" disabled={loc==="TrialBalance"?true:false} onClick={()=>{
         navigate('/TrialBalance',{state:{LedgerData:Ledgerone,NameData:Name,user:user,Trial:Trial}})
        }}>
          <h4>Trial</h4>
        </div>
        <div className="navbtn col-2" onClick={()=>{
          navigate('/TrialBalance',{state:{LedgerData:Ledgerone,NameData:Name,user:user,Trial:Trial}})
         }}>
          <h4>Payroll</h4>
        </div>
        <div className="navbtn col-2" disabled={loc==="TrialBalance"?true:false} onClick={()=>{
         navigate('/TrialBalance',{state:{LedgerData:Ledgerone,NameData:Name,user:user,Trial:Trial}})
        }}>
          <h4>Stock</h4>
        </div>
    </div>
  )
}

export default NavBtn
