import { useState } from 'react'
import './App.css'
import Ball from './components/Ball'

function App() {

  return (
    <>
      <div id="title">
        <label>Cogisum</label>  
      </div>
      <div id="balls">
        <Ball position={1} value={1}></Ball>
        <Ball position={2} value={1}></Ball>
        <Ball position={3} value={1}></Ball>
        <button className='myButton' >NOWA GRA</button>
      </div>     
    </>
  )
}

export default App
