
import React,{ useEffect, useState,useRef } from 'react'
import app from '../firebase'
import { getFirestore,doc, deleteDoc } from 'firebase/firestore'
import { collection,addDoc,getDocs,query,orderBy} from 'firebase/firestore'
import Bar from '../Bar/Bar'
import { useLocation } from 'react-router-dom'
function ProjectView() {
  const [codeid,setcodeid]=useState("")
  const inputRefsone = useRef([]);
  const inputRefstwo = useRef([]);
  const [inputarrayDr,setinputarrayDr]=useState([{Name:"",Amount:""},{Name:"",Amount:""},{Name:"",Amount:""},{Name:"",Amount:""}])
  const [inputarrayCr,setinputarrayCr]=useState([{Name:"",Amount:""},{Name:"",Amount:""},{Name:"",Amount:""},{Name:"",Amount:""}])
  const db = getFirestore(app)
  const [controlmenu,setcontrolmenu]=useState(true)
  const [ones,setones]=useState(true)
  const [Ledger,setLedger]=useState([])
  const [Entry,setEntry]=useState([])
  const loction = useLocation()
  localStorage.setItem("valueA","journal")
  const {Email,Projectname}=loction.state||{};
  useEffect(()=>{
    const fetchData = async () => {
      try {         
          const querySnapshottwo = collection(db,Email,Projectname,"ledger");
          const qtwo = await getDocs(query(querySnapshottwo, orderBy("Date", "asc")));
          const fetchedDatatwo = qtwo.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
          }));
          setLedger(fetchedDatatwo)

        if (ones) {
          const querySnapshot =collection(db,Email,Projectname,"Code");
          const q = await getDocs(query(querySnapshot, orderBy("Date","desc")));
          const fetchedData = q.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
          })); 
          fetchedData.forEach( async(element)=> {
            const ordereachentry=collection(db,Email,Projectname,"journal",element.Codeid,"Entry")
            const journalDr =await getDocs(query(ordereachentry, orderBy("Ind","asc")))
            const fetchedDataone = journalDr.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setEntry(prevEntry=>[...prevEntry,fetchedDataone])
          });
          setones(!ones)
        }
        else if(!ones&&codeid){
          const journalDr =await getDocs(collection(db,Email,Projectname,"journal",codeid,"Entry"))
          const fetchedDataone = journalDr.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setEntry(prevEntry=>[fetchedDataone,...prevEntry])
          
        }
        setcodeid("")
        
      } catch (error) {
          console.error("Error fetching data:", error);
      }

      
  };
  fetchData();
  localStorage.setItem("valueA","journal")
  },[Projectname,controlmenu])

  const AddDataInProject =async()=>{
    try{

      if (Email && codeid){
        inputarrayDr.forEach((element,index) => {
          if ((element.Name!=="") && codeid) {
            const drRef1=collection(db,Email,Projectname,"ledger")
            const drRef2=collection(db,Email,Projectname,"journal",codeid,"Entry")
            const datobj={
              Name:element.Name.toLowerCase().trim(),
              Amount:parseFloat(element.Amount,10),
              Entry:"DR",
              Ind:index,
              Codeid:codeid.toUpperCase().trim(),
              Date: new Date()
          }
        addDoc(drRef2,datobj)
        addDoc(drRef1,datobj)
      }
    });
        inputarrayCr.forEach((element,index) => {
          if ((element.Name!=="") && codeid) {
            const drRef1=collection(db,Email,Projectname,"ledger")
            const drRef2=collection(db,Email,Projectname,"journal",codeid,"Entry")
            const dataobj={
              Name:element.Name.toLowerCase().trim(),
              Amount:parseFloat(element.Amount,10),
              Entry:"CR",
              Ind:index,
              Codeid:codeid.toUpperCase().trim(),
              Date: new Date()
            }
            addDoc(drRef2,dataobj)
            addDoc(drRef1,dataobj)
          }
        });

        const drRef3=collection(db,Email,Projectname,"Code")
        addDoc(drRef3,{
          Codeid:codeid.toUpperCase().trim(),
          Date: new Date()
        })
        
        
      }
      setcontrolmenu(!controlmenu)
      setinputarrayDr([{Name:"",Amount:""},{Name:"",Amount:""},{Name:"",Amount:""},{Name:"",Amount:""}])
      setinputarrayCr([{Name:"",Amount:""},{Name:"",Amount:""},{Name:"",Amount:""},{Name:"",Amount:""}])
      inputRefsone.current[0].focus()
    }catch(e){
      console.log(e);
      alert(e)
    }
    
  }
  
  //focus changing
  const handleKeyDownOne = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // prevent form submission
      const nextInput = inputRefstwo.current[index];
      if (nextInput) {
        nextInput.focus();
      }
      else if(index==8){
        AddDataInProject
      }
    }
  };
  const handleKeyDownTwo = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // prevent form submission
      const nextInput = inputRefsone.current[index+1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };
  //data deleting
  const DeleteData=async(JournalEntry,deleteindex)=>{
    try{
      const CodeId=JournalEntry[0].Codeid
      JournalEntry.forEach(async(element)=>{
        deleteDoc(doc(db,Email,Projectname,"journal",CodeId,"Entry",element.id));
      })
      Ledger.forEach(async(element)=>{
        if(element.Codeid==CodeId){
          deleteDoc(doc(db,Email,Projectname,"ledger",element.id));
        }
      })
      const querySnapshot =collection(db,Email,Projectname,"Code");
      const q = await getDocs(query(querySnapshot, orderBy("Date","asc")));
      const fetchedData = q.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })); 
      fetchedData.forEach(async(element)=>{
        if(element.Codeid==CodeId){
          deleteDoc(doc(db,Email,Projectname,"Code",element.id));
        }
      })
      alert("deleted successfully");
      //delete
      const fill=Entry.filter(arr=>JSON.stringify(arr)!==JSON.stringify(JournalEntry))
      setEntry(fill)
      setcontrolmenu(!controlmenu)
    }catch(e){
      console.error("journal:-",e);
    }
  }
  //data updating
  const EditData=(JournalEntry)=>{
    alert("EditData")
  }
  return (
    <div className='project-all-data-on'>
        <div className='col-12 project-bar'>
           <Bar  Username="" Active="true" Name={Projectname} Ledgerzero={Ledger}  />
        </div>
          <div className="row">
            <div className="col-md-6 col-12  journal journal-input">
              <h3 className='mt-5 mb-5'></h3>
              <div className="row col-12" style={{display:"contents"}} onClick={()=>{console.log(Entry);
              }}>
              {
                inputarrayDr.map((element,index)=>(
                  <div className="col-12 col-md-10 input-row mt-1" key={index}>
                    <div className="col-8 input-row-sub">
                      <input type="text" placeholder='Ac Name' value={element.Name} onChange={(e)=>{
                        setinputarrayDr((prevData)=>
                          prevData.map((item,i)=>i===index?{...item,Name:e.target.value}:item
                        ))
                      }}
                      ref={(el) => (inputRefsone.current[index] = el)}
                      onKeyDown={(e) => handleKeyDownOne(e, index)}/>
                    </div>
                    <div className="col-4 input-row-sub ms-1">
                      <input type="number" placeholder='Amount' value={element.Amount} onChange={(e)=>{
                        setinputarrayDr((prevData)=>
                          prevData.map((item,i)=>i===index?{...item,Amount:e.target.value}:item
                        ))
                      }}
                      ref={(el) => (inputRefstwo.current[index] = el)}
                      onKeyDown={(e) => handleKeyDownTwo(e, index)}/>
                    </div>
                  </div>
                ))
              }
              <h3 className='mt-2 '  onClick={()=>{}}>To</h3>
              {
                inputarrayCr.map((element,index)=>(
                  <div className="col-12 col-md-10 input-row mt-1" key={index}>
                    <div className="col-8 input-row-sub">
                      <input type="text" placeholder='Ac Name' value={element.Name} onChange={(e)=>{
                        setinputarrayCr((prevData)=>
                          prevData.map((item,i)=>i===index?{...item,Name:e.target.value}:item
                        ))
                      }}
                      ref={(el) => (inputRefsone.current[index+4] = el)}
                      onKeyDown={(e) => handleKeyDownOne(e, index+4)}/>
                    </div>
                    <div className="col-4 input-row-sub ms-1">
                      <input type="number" placeholder='Amount' value={element.Amount} onChange={(e)=>{
                        setinputarrayCr((prevData)=>
                          prevData.map((item,i)=>i===index?{...item,Amount:e.target.value}:item
                        ))
                      }}
                      ref={(el) => (inputRefstwo.current[index+4] = el)}
                      onKeyDown={(e) => handleKeyDownTwo(e, index+4)}/>
                    </div>
                  </div>
                ))
              }
              </div>
              <div className="col-12 col-md-10 row">
                <div className="col-5 mt-3 input-row-sub ms-1">
                  <input className=' mb-5' type="text" placeholder='Code' value={codeid} onChange={(e)=>setcodeid(e.target.value.toUpperCase())}
                  ref={(el) => (inputRefsone.current[8] = el)}
                  onKeyDown={(e) => handleKeyDownOne(e, 8)}/>
                </div>
                <div className="col-5 next-btn mt-3 ms-5" onClick={()=>{ AddDataInProject()}}>
                  <h3 >-Naxt-</h3>
                </div>
              </div>
            </div>
            {
              Entry.length>=1?
              <div className="col-md-6 col-12 journal journal-view"> 
             {
               
                Entry.map((val,index)=>(
                  <div style={{borderBottom: "3px dotted orange",position:"relative"}} key={val.id}>
                    
                    {
                      val.map((elem,index)=>(
                        <div className="row col-12 "  key={`${elem.id}-${index}`}>
                          <div className="col-8">{elem.Entry==="DR"?<h4 className='text-start entry-names'>{elem.Name} a/c dr</h4>:""}</div>
                          <div className="col-3">{elem.Entry==="DR"?<h4 className='text-start entry-names'>{elem.Amount}</h4>:""}</div>
                          <div className="col-1"></div>
                        </div>
                      ))
                    }{
                      val.map((elem,index)=>(
                        <div className="row col-12 "  key={`${elem.id}-${index}`}>
                          <div className="col-1"></div>
                          <div className="col-8">{elem.Entry==="CR"?<h4 className='text-start entry-names'>to {elem.Name} a/c</h4>:""}</div>
                          <div className="col-3">{elem.Entry==="CR"?<h4 className='text-start entry-names'>{elem.Amount}</h4>:""}</div>
                        </div>
                      ))
                    }
                    <div className="row  icon-box">
                      <div className="col-9">
                      </div>
                      <div className="col-3 icon row">
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="mt-2 col-6 bi bi-trash3-fill" viewBox="0 0 25 16" onClick={()=>DeleteData(val,index)}>
                              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                          </svg>
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="mt-2 col-6 bi bi-pencil-square" viewBox="0 0 16 16" onClick={()=>EditData(val)}>
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                              <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                          </svg>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>:
            <div className="col-md-6 col-12 journal journal-view"> 
              <h4 className='project-hld mb-2' style={{color:"white"}}>Hello  <label style={{color:"orange"}}>{Email}</label></h4>
              <h4 className='project-hld' style={{color:"white"}}>Wellcome to your <br /> <label style={{color:"orange"}}>{Projectname}</label> project</h4>
            </div>
            }
          
        </div>
      </div>
  )
}

export default ProjectView