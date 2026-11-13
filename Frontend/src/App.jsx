import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Users from './component/Users';
import Create from './component/Create';
import Update from './component/Update';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users/>}/>
          <Route path="/create" element={<Create/>}/>
          <Route path="/update/:myid" element={<Update/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App