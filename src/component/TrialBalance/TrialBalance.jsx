import React, { useEffect, useState } from 'react'
import Bar from '../Bar/Bar'
import { useLocation } from 'react-router-dom';
function TrialBalance() {
    const loction = useLocation()
    const {LedgerData,NameData,user,Trial}=loction.state || {};
    const [DrSum,setDrSum]=useState(0)
    const [CrSum,setCrSum]=useState(0)
    localStorage.setItem("valueA","TrialBalance")
    useEffect(()=>{
      Trial.forEach(element => {
        const Num=parseFloat(element.Amount)
        element.state==="DR"?setDrSum(prevDrSum=>prevDrSum+Num):setCrSum(prevCrSum=>prevCrSum+Num)
      });
    },[Trial])
  return ( 
    <div>
        <Bar  Username="" Active="true" Name={NameData} Ledgerzero={LedgerData} user={user} Trial={Trial}/>
        <div className="col-12 screen-trial">
            <div className="row scroll-trial">
                <h2 className="col-12 trial-hed">Trial Balance Of {NameData} </h2>
                
                <div className="col-6 mt-4"><h3>Name Of A/C</h3></div>
                <div className="col-3 mt-4"><h3>DR</h3></div>
                <div className="col-3 mt-4"><h3>CR</h3></div>
            </div>
            <div className="row real-scroll">
            {
              Trial&&Trial.map((item)=>(
                <div className="row mt-2" onClick={()=>{alert(item.id)}}>
                  <div className="col-6"><h4 className='ms-1' style={{textTransform:"capitalize"}}>{item.Name}</h4></div>
                  {item.state==="DR"?<div className="col-3"><h4 className='ms-3'>{item.Amount}</h4></div>:<div className="col-3"><h4 className='ms-3'>-</h4></div>}
                  {item.state==="CR"?<div className="col-3"><h4 className='ms-3'>{item.Amount}</h4></div>:<div className="col-3"><h4 className='ms-3'>-</h4></div>}
                </div>
              ))
            }
            </div>
            <div className="row scroll-bottom">
                <div className="col-6"><h3>Total</h3></div>
                <div className="col-3"><h3>{DrSum}</h3></div>
                <div className="col-3"><h3>{CrSum}</h3></div>
            </div>
        </div>
    </div>
  )
}

export default TrialBalance