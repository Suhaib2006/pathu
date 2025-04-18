import React from 'react'
import { useLocation } from 'react-router-dom'
import Allproject from '../pname/Pname';
function openp() {
  const Location =useLocation()
  const {Email,Password}=Location.state || {};
  return (
    <>
      {(Email==null)? <div><h3> Data is not founded</h3> </div>: <Allproject Email={Email} Password={Password} /> }
    </>
  )
}

export default openp