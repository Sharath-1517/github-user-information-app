import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from '../Home'
import DisplayUser from '../DisplayUser'

const Routers = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/userDetails' element={<DisplayUser />}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default Routers;