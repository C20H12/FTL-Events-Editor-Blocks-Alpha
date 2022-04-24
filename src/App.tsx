import {useState, useEffect} from 'react'
import './App.css'

function EventSimBox(): JSX.Element{
  return(
    <div className="eventBox">
        <div className="corners">
          <div className="main_event">
            
          </div>
        </div>
    </div>
  )
}

export default function App(): JSX.Element{


  return(
    <>
      <EventSimBox />
    </>
  )  
}

