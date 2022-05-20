import {useState, useEffect} from 'react'
import './App.css';
import EventWindow from './EventWindow';
import * as defaultData from './defaultData.json';


export default function App(){


  const [eventXml, setEventXml] = useState(defaultData.defaultEvent1);
  

  return(
    <>
      <div className="eventBox">
          <div className="corners">
            <div className="main_event">
              <EventWindow xml={eventXml} />
            </div>
          </div>
      </div>
      <XMLInputBox  xmlValue={eventXml} setXmlFunction={setEventXml} />
    </>
  )  
}

function XMLInputBox(props: {setXmlFunction: Function, xmlValue: string}) {
  const {setXmlFunction, xmlValue} = props;
  const [xmlErr, setXmlErr] = useState("Errors will appear here:");
  
  const parser = new DOMParser;
  useEffect(() => {
    const parsedXml = parser.parseFromString(xmlValue, "text/xml");
    setXmlErr(parsedXml.querySelector("parsererror>div")?.textContent || "No Errors");
  }, [xmlValue])

  return(
    <div className="xmlinput">
      <textarea 
        id="eventEmuInput" 
        placeholder="EMULATE EVENT HERE" 
        wrap='off'
        onChange={e => {
          const xmlString = (e.target as HTMLTextAreaElement).value;
          setXmlFunction(xmlString);
        }}
      />
      <div className='xmlErr'>
        {xmlErr.split(' ').map((elem, i, thisArr) => {
          if (elem === 'error' && thisArr[i+1] === "on") return <span key={i} className='e'>{elem.toUpperCase() + ': '}</span>;
          if (elem === "line" || elem === "column") return <span key={i} className='lnCol'>{elem +' '+ thisArr[i+1]+' '}</span>;
          if (thisArr[i-1] === "line" || thisArr[i-1] === "column") return;
          return elem + ' ';
        })}
      </div>
    </div>
  )
}