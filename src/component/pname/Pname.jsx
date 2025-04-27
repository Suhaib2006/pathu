import app from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { getFirestore } from 'firebase/firestore'
import { addDoc,doc } from 'firebase/firestore'
import Bar from '../Bar/Bar'
import { useNavigate } from 'react-router-dom'
function Allproject({Email,Password}) {
  const navigate=useNavigate()
  const [creat,setcreat]=useState(false)
  const [newname,setnewname] = useState("")
  const [newprojectname,setnewprojectname] = useState("")
  const [projectname,setprojectname] = useState("")
  const [proname,setproname]=useState([])
  const ProjectName=()=>setcreat(!creat)
  const db=getFirestore(app)
  useEffect(()=>{
    const fetchdata = async()=>{
      try{
        const UserRef = await getDocs(collection(db,"user's",Email,Password))
        const nameofuser=  UserRef.docs.map((doc)=>({
          Id:doc.id,
          ...doc.data()
        }))
        setnewname(nameofuser[0].Name)
        const proref = await getDocs(collection(db,"user's",Email,"project"))
        const nameofproject=  proref.docs.map((doc)=>({
          Id:doc.id,
          ...doc.data()
        }))
        setproname(nameofproject)
  
      }catch(e){
        console.log(e)
      }
    }
    fetchdata()
    localStorage.setItem("valueA","journal")
    localStorage.setItem("User",newname)
    
  },[Email,creat]);

  const AddProjectName = async()=>{
    if(newprojectname){
      const Ref2 = doc(db,"user's",Email)
      const drRef2=collection(Ref2,"project")
      addDoc(drRef2,{
        Name:newprojectname,
        Date: new Date()
      })
      setnewprojectname("") 
      ProjectName()
    }
  }

  return (
      <div className=' all-p-name'>
          <Bar  Username="none" Active="true" Name={newname} />
          <div className="col-12 col-md-10 data-scroll row">
            <div className="col-6 col-md-3 col-lg-3 p-name" >
            <div style={{border:"3px solid gold"}}  onClick={ProjectName}>
                <svg xmlns="http://www.w3.org/2000/svg" width="55" height="60" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                </svg>
                <h3 className="new-p">Create a new project</h3>
            </div>
           </div>
            {
              proname && proname.map((element)=>(
                <div className="col-6 col-md-4 col-lg-3 p-name" key={element.id} onClick={()=>{
                  setprojectname(element.Name)
                  navigate("/projectview",{state:{Email:newname,Projectname:element.Name}})
                  }}>
                    <div style={{border:"3px solid white"}}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="45" height="50" fill="currentColor" className="bi bi-journal-richtext" viewBox="0 0 16 16">
                        <path d="M7.5 3.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m-.861 1.542 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047L11 4.75V7a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 7v-.5s1.54-1.274 1.639-1.208M5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
                        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
                        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
                      </svg>
                      <h3 className="new-p">{element.Name}<br/></h3>
                      <h6 className="new-p">
                        {
                          element.Date
                          ? new Date(element.Date.seconds * 1000).toLocaleString()
                          : "No date available"
                        }
                      </h6>
                    </div>
                </div>
              ))
            }
        </div>
        
        <div className={creat?'newproject-on col-6':'newproject-off col-6'}>
          <div className="new-project-div">
            <h4 className='poject-place mt-4 ms-4'>Create a new project</h4>
            <svg style={{color:"gold"}} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x-circle-fill mt-4 me-4" viewBox="0 0 16 16" onClick={ProjectName}>
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
            </svg>
          </div>
          <div>
            <h3 className="poject-place-new ms-4 mt-5">Let's start with a name for your project </h3>
            <div className="col-11 mt-3">
              <input className='input-p-name ms-4' type="text" value={newprojectname} onChange={(e)=>{setnewprojectname(e.target.value)}} />
              <button className='btn-add-p col-3' onClick={AddProjectName}>Continue</button>
            </div>
          </div>
        </div>
    </div>
    
  )
}

export default Allproject