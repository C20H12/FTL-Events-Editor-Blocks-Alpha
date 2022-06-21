import { useState, useEffect, useMemo } from "react";

import EventWindow from "./EventWindow";
import XMLInputBox from "./XMLInputBox";
import XMLControl from "./XMLControl";

import { defaultEvent1 } from "./defaultData";
import xmlToObj from "./xmlToObj";

export default function App() {
  const [wholeXml, setWholeXml] = useState(`<FTL>${defaultEvent1}</FTL>`);

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(wholeXml, "text/xml");

  const [allEventNames, setAllEventNames] = useState<string[]>([]);

  const [reload, setReload] = useState(1);

  const [currentSelectedEvent, setCurrentSelectedEvent] = useState("WELCOME");
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
    }
  }, [wholeXml]);

  useEffect(() => {
    setHasDuplicatedEvents(false);
    allEventNames.forEach((eventName, i, thisArr) => {
      if (thisArr.indexOf(eventName) !== i) {
        setHasDuplicatedEvents(true);
      }
    });
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

      <XMLControl
        setReload={setReload}
        reload={reload}
        allEventNames={allEventNames}
        setCurrentSelectedEvent={setCurrentSelectedEvent}
      />
    </>
  );
}

