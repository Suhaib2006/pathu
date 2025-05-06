import React from 'react'
import { useLocation } from 'react-router-dom'
import Allproject from '../pname/Pname';
function First() {
  const Location =useLocation()
  const {Email,Password}=Location.state || {};
  localStorage.setItem("Email",Email)
  localStorage.setItem("Password",Password)
  return (
    <div>
      {(Email==null)? <div><h3> Data is not founded</h3> </div>: <Allproject Email={Email} Password={Password} /> }
    </div>
  )
}

export default First