import React, { useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom';
import Bar from '../Bar/Bar';
function Ledger() {
const loction = useLocation()
const {LedgerData,NameData}=loction.state || {};
const [unique,setunique]=useState([])
const [normal,setnormal]=useState([])
const [DrSum,setDrSum]=useState(0)
const [CrSum,setCrSum]=useState(0)
const [Diff,setDiff]=useState(0)
const [state,setstate]=useState("")
const [LedgerName,setLedgerName]=useState("cash")
localStorage.setItem("valueA","ledger")
useEffect(()=>{
  const names=[...new Set(LedgerData.map(item=>item.Name))]
  setunique(names)
  LedgerData.forEach(element => {
    if (element.Name===LedgerName) {
      setnormal(prevnormal=>[...prevnormal,element])
      if (element.Entry==="DR") {
        setDrSum(prevDrSum=>prevDrSum+element.Amount)
      }else{
        setCrSum(prevCrSum=>prevCrSum+element.Amount)
      }
    }
  });
},[LedgerName])
useEffect(()=>{
  if (DrSum||CrSum) {
    if(DrSum>=CrSum){
      setDiff(Math.round(DrSum-CrSum))
      setstate("DR")
    }
    else if(CrSum>=DrSum){
      setDiff(Math.round(CrSum-DrSum))
      setstate("CR")
    }else{
      setDiff(0)
      setstate("")
    }
  }
},[DrSum,CrSum])
  return (
    <div>
      <Bar  Username="" Active="true" Name={NameData} Locate="journal" />
      <div className="row col-12">
        <div className="ledger-box col-md-6 col-12">
        <div className='row col-12'>
        {
          unique.map((element,index)=>(
              <div className="col-md-6 col-12 name-box" key={index}>
                <div className="name-l row">
                  <h4 className=' col-10'>{element}</h4>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" style={{padding:"0px"}} className=" col-2 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16" onClick={()=>{
                    
                    if(LedgerName!==element){
                      setnormal([])
                      setDrSum(0)
                      setCrSum(0)
                      setDiff(0)
                      setstate("")
                      setLedgerName(element);
                    }
                  }}>
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
                  </svg>
                </div>
              </div>
          ))
        }
        </div>
        </div>
        <div className="ledger-box col-12 col-md-6" style={{overflow:"hidden"}}>
          <div className=" row">
            <h3 className='led-name col-8'>{LedgerName} A/C</h3>
            <div className="col-4 box-balance"><h3>{Diff} {state} </h3></div>
          </div>
          <div className="row mt-4 single-ledger">
            <div className="col-1"><h4>NO</h4></div>
            <div className="col-5"><h4>CODE NO</h4></div>
            <div className="col-3"><h4>DR</h4></div>
            <div className="col-3"><h4>CR</h4></div>
          </div>
          <div className="single-ledger-view">
            {
                normal.map(item=>(
                  <div className="row mt-2" onClick={()=>{console.log(item.id);
                  }}>
                    <div className="col-1"><h4></h4></div>
                    <div className="col-5"><h4>{item.Codeid}</h4></div>
                    <div className="col-3"><h4>{item.Entry=="DR"?item.Amount:""}</h4></div>
                    <div className="col-3"><h4>{item.Entry=="CR"?item.Amount:""}</h4></div>
                  </div>
                ))
            }
            <div className="row mt-4 single-ledger">
              <div className="col-6"><h4>TOTAL</h4></div>
              <div className="col-3"><h4>{DrSum}</h4></div>
              <div className="col-3"><h4>{CrSum}</h4></div>
            </div>
          </div>

          <button className="navbtn col-12 " onClick={()=>{navigate(-1)}}><h3>ADD TRIALBALANCE</h3> </button>
        </div>
      </div>
    </div>
  )
}

export default Ledger