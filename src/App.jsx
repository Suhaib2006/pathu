import React from 'react'
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import './App.css'
import Login from './component/login/login'
import Register from './component/register/register'
import ProjectView from './component/projectview/ProjectView'
import Ledger from './component/Ledger/Ledger'
import TrialBalance from './component/TrialBalance/TrialBalance'
import First from './component/mainscreen/mainscreen' 
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/reg' element={<Register />} />
        <Route path='/project' element={<First />} />
        <Route path='/projectview' element={<ProjectView />} />
        <Route path='/Ledger' element={<Ledger />} />
        <Route path='/TrialBalance' element={<TrialBalance />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
