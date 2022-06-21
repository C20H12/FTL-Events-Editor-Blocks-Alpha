import { useState, useEffect, useMemo } from "react";
import "./App.css";
import EventWindow from "./EventWindow";
import * as defaultData from "./defaultData.json";
import xmlToObj from "./xmlToObj";

type state<t> = React.Dispatch<React.SetStateAction<t>>;

export default function App() {
  const [wholeXml, setWholeXml] = useState(
    `<FTL>${defaultData.defaultEvent1}</FTL>`
  );

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(wholeXml, "text/xml");

  const [allEventNames, setAllEventNames] = useState<string[]>([]);

  const [reload, setReload] = useState(1);

  const [currentSelectedEvent, setCurrentSelectedEvent] = useState("");
  const [currentEventRaw, setCurrentEventRaw] = useState(
    xmlDoc.documentElement.innerHTML
  );

  const convertedEvent = useMemo(
    () => xmlToObj(currentEventRaw),
    [currentEventRaw]
  );
  const [currentEvent, setCurrentEvent] = useState(convertedEvent);

  const [cannotFindNext, setCannotFindNext] = useState("can find next");
  const [hasXmlSyntaxErr, setHasXmlSyntaxErr] = useState(false);
  const [hasDuplicatedEvents, setHasDuplicatedEvents] = useState(false);

  useEffect(() => {
    const event = xmlDoc.querySelector(
      `:root>event[name="${currentSelectedEvent}"]`
    );

    setCannotFindNext("can find next");
    if (event == null) {
      setCannotFindNext(currentSelectedEvent);
      return;
    }

    setCurrentEventRaw(event.outerHTML);
    setCurrentEvent(convertedEvent);
  }, [wholeXml, reload, convertedEvent, currentSelectedEvent]);

  useEffect(() => {
    setAllEventNames(
      [...xmlDoc.querySelectorAll(":root>event")].map(
        event => event.getAttribute("name") ?? "no name"
      )
    );

    setHasXmlSyntaxErr(false);
    if (xmlDoc.querySelector("parsererror") != null) {
      setHasXmlSyntaxErr(true);
    };
  }, [wholeXml]);

  useEffect(() => {
    setHasDuplicatedEvents(false);
    allEventNames.forEach((eventName, i, thisArr) => {
      if (thisArr.indexOf(eventName) !== i) {
        setHasDuplicatedEvents(true);
      }
    })
  }, [allEventNames]);


  return (
    <>
      <div className="eventBox">
        <div className="corners">
          <div className="main_event">
            <EventWindow
              eventXmlObject={currentEvent}
              setEventXmlObject={setCurrentEvent}
              setLoadNextEvent={setCurrentSelectedEvent}
              cannotFindNext={cannotFindNext}
              hasXmlSyntaxErr={hasXmlSyntaxErr}
              hasDuplicatedEvents={hasDuplicatedEvents}
            />
          </div>
        </div>
      </div>

      <XMLInputBox xmlValue={wholeXml} setXmlFunction={setWholeXml} />

      <div className="xmlControl">
        <button
          className="reload"
          onClick={() => {
            setReload(reload + 1);
          }}
        >
          Reload Event | Run: {reload}
        </button>
        <h3 style={{ fontFamily: "Sans-serif" }}>Click to Run an Event:</h3>
        {allEventNames
          .filter(name => name !== "no name")
          .map((name, i) => {
            return (
              <button
                key={i}
                onClick={() => {
                  setCurrentSelectedEvent(name);
                }}
                className="entryPoint"
              >
                {name}
              </button>
            );
          })}
      </div>
    </>
  );
}

function XMLInputBox(props: {
  setXmlFunction: state<string>;
  xmlValue: string;
}) {
  const { setXmlFunction, xmlValue } = props;
  const [xmlErr, setXmlErr] = useState("Errors will appear here:");

  const parser = new DOMParser();
  useEffect(() => {
    const parsedXml = parser.parseFromString(xmlValue, "text/xml");
    setXmlErr(
      parsedXml.querySelector("parsererror>div")?.textContent || "No XML Errors"
    );
  }, [xmlValue]);

  return (
    <div className="xmlinput">
      <textarea
        id="eventEmuInput"
        placeholder="EMULATE EVENT HERE"
        wrap="off"
        onChange={e => {
          setXmlFunction(
            `<FTL xmlns:mod="foo" xmlns:mod-append="bbb" xmlns:mod-overwrite="eee">
              ${(e.target as HTMLTextAreaElement).value}
            </FTL>`
          );
        }}
      />
      <div className="xmlErr">
        {xmlErr.split(" ").map((elem, i, thisArr) => {
          if (elem === "error" && thisArr[i + 1] === "on")
            return (
              <span key={i} className="e">
                {elem.toUpperCase() + ": "}
              </span>
            );
          if (elem === "line" || elem === "column")
            return (
              <span key={i} className="lnCol">
                {elem + " " + thisArr[i + 1] + " "}
              </span>
            );
          if (thisArr[i - 1] === "line" || thisArr[i - 1] === "column") return;
          return elem + " ";
        })}
      </div>
    </div>
  );
}

