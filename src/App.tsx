import {useState, useEffect} from 'react'
import './App.css'

function EventSimText(): JSX.Element{
  return(
    <span className='text'>aaaaaaaaaaaaaaa</span>
  )
}

function EventSimChoices(): JSX.Element {
  return(
    <ol>
      <li>choice</li>
    </ol>
  )  
}

function EventSimMsgBox(): JSX.Element {
  return(
    <div className='message'>aaaaaaa</div>
  )
}

export default function App(): JSX.Element{

  return(
    <div className="eventBox">
        <div className="corners">
          <div className="main_event">
            <EventSimText />
            <EventSimMsgBox />
            <EventSimChoices />
          </div>
        </div>
    </div>
  )  
}

