import {useState, useEffect} from 'react'
import './App.css'

function XMLInputBox(props:any): JSX.Element {

  if (props.is) {
    const inputValue: string = (document.querySelector("#eventEmuInput") as HTMLInputElement).value || "aaa";
    return (
      <div>
        <h1>{inputValue}</h1>
        <button onClick={props.setfunction}>back</button>
      </div>
    )
  }

  return(
    <div className="xmlinput">
      <textarea id="eventEmuInput" placeholder="EMULATE EVENT HERE"></textarea>
      <button onClick={props.setfunction}>RENDER EVENT</button>
    </div>
  )
}

function EventSimText(): JSX.Element{
  return(
    <span className='text'>aaaaaassssssssssssssssssssssssssssaaaaaaaaa</span>
  )
}

function EventSimChoices(): JSX.Element {
  return(
    <ol>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
      <li>choice</li>
    </ol>
  )  
}

function EventSimMsgBox(): JSX.Element {
  return(
    <>
      <br/>
      <div className='message'>aaaaaaaaaaaaaaaaaaaaaaaaaa</div>
    </>
  )
}

export default function App(): JSX.Element{

  const [isClicked, setIsClicked]: [boolean,Function] = useState(false);
  
  const handleRenderEventClick = ()=>{
    setIsClicked((x: boolean) => !x);
  }
  
  

  return(
    <>
      <div className="eventBox">
          <div className="corners">
            <div className="main_event">
              <EventSimText />
              <EventSimMsgBox />
              <EventSimChoices />
            </div>
          </div>
      </div>
      <XMLInputBox setfunction={handleRenderEventClick} is={isClicked}/>
    </>
  )  
}

