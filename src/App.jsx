import React from 'react'
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import './App.css'
import Login from './component/login/login'
import Register from './component/register/register'
import Allproject from './component/mainscreen/mainscreen'
import ProjectView from './component/projectview/ProjectView'
import Ledger from './component/Ledger/Ledger'
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/reg' element={<Register />} />
        <Route path='/project' element={<Allproject />} />
        <Route path='/projectview' element={<ProjectView />} />
        <Route path='/Ledger' element={<Ledger />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
