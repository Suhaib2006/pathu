import React, { useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom';
import app from '../firebase';
import Bar from '../Bar/Bar';
import { getFirestore,collection, addDoc,orderBy,getDocs,query,updateDoc,doc } from 'firebase/firestore';
function Ledger() {
const loction = useLocation()
const {LedgerData,NameData,user}=loction.state || {};
const [unique,setunique]=useState([])
const [normal,setnormal]=useState([{}])
const [DrSum,setDrSum]=useState(0)
const [CrSum,setCrSum]=useState(0)
const [Diff,setDiff]=useState(0)
const [state,setstate]=useState("")
const [LedgerName,setLedgerName]=useState("cash")
const db=getFirestore(app)
localStorage.setItem("valueA","ledger")
const [OnOff,setOnOff]=useState(false)
const [TrialData,setTrialData]=useState([])
useEffect(()=>{
  const trialdata=async()=>{
    const querySnapshot =collection(db,user,NameData,"trial");
    const order= await getDocs(query(querySnapshot, orderBy("Date","asc")));
    const fetchedData = order.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })); 
    setTrialData(fetchedData)
    fetchedData.forEach(element => {
      if(element.Name===LedgerName)setOnOff(true)
    });
  }
  trialdata()
  
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
      setDiff(DrSum-CrSum)
      setstate("DR")
    }
    else if(CrSum>=DrSum){
      setDiff(CrSum-DrSum)
      setstate("CR")
    }else{
      setDiff(0)
      setstate("")
    }
  }

},[DrSum,CrSum])

//trail data set
const AddTrialData=async()=>{
  
    try{
      if(!OnOff){
        const drRef=collection(db,user,NameData,"trial")
        addDoc(drRef,{
          Name:LedgerName,
          Amount:Diff,
          state:state,
          Date: new Date()
        })
        setOnOff(true)
      }else{
        update(LedgerName)
      }
    }catch(e){
      alert(e)
    }
  
}
//trail data udate
const update=async(data)=>{
  TrialData.forEach(async(element) => {
    if(element.Name===data){
      const docRef=doc(db,user,NameData,"trial",element.id)
      updateDoc(docRef, {
        Amount:Diff , // field you want to update
      });
     alert("update")
    }
  });
}
    

  return (
    <div>
      <Bar  Username="" Active="true" Name={NameData} Ledgerzero={LedgerData} user={user} Trial={TrialData} />
      <div className="row col-12">
        <div className="ledger-box col-md-6 col-12">
        <div className='row col-12'>
        {
          unique.map((element,index)=>(
              <div className="col-md-6 col-12 name-box" key={index}>
                <div className={element!==LedgerName?"name-l row":"name-l row l-bor"} onClick={()=>{
                    
                    if(LedgerName!==element){
                      setnormal([])
                      setDrSum(0)
                      setCrSum(0)
                      setDiff(0)
                      setstate("")
                      setLedgerName(element);
                      setOnOff(false)
                    }
                  }}>
                  <h4 className=' col-10'>{element}</h4>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" style={{padding:"0px"}} className=" col-2 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16" onClick={()=>{
                    
                    if(LedgerName!==element){
                      setnormal([])
                      setDrSum(0)
                      setCrSum(0)
                      setDiff(0)
                      setstate("")
                      setLedgerName(element);
                      setOnOff(false)
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
        <div className="ledger-box col-12 col-md-6" style={{overflow:"hidden"}} >
          <div className=" row">
            <h3 className='led-name col-7'>{LedgerName}</h3>
            <div className="col-5 box-balance"><h4 className='mt-2'>{Diff} {state} </h4></div>
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

          <button className="navbtn col-12 " onClick={AddTrialData} onKeyDown={(e) =>{ if(e.key === "Enter") AddTrialData()}}><h3 className='mt-1'><b>{!OnOff?"ADD DATA":"UPDATE DATA"}</b></h3> </button>
        </div>
      </div>
    </div>
  )
}

export default Ledger