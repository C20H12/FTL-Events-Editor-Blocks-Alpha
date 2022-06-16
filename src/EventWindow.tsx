import React, { useEffect, useRef, useState } from "react";

type state<t> = React.Dispatch<React.SetStateAction<t>>;

export default function EventWindow(props: { xml: string }) {
  const { xml } = props;
  const parser = new DOMParser();
  const parsedXML = parser.parseFromString(xml, "text/xml");

  const [currentEvent, setCurrentEvent] = useState(
    parsedXML.documentElement as Element
  );

  const [eventText, setEventText] = useState("");
  const [eventChoices, setEventChoices] = useState([]);

  const [error, setError] = useState(false);
  const [end, setEnd] = useState(false);

  useEffect(() => {
    setCurrentEvent(parsedXML.documentElement as Element);
    setError(false);
    setEnd(false);
  }, [xml]);

  useEffect(() => {
    const eventText = currentEvent.querySelector("text")?.textContent;
    if (eventText == null){
      setEnd(true);
      setEventText("//**// End of Event //**//");
    } else setEventText(eventText);

    setEventChoices(Array.from(currentEvent.querySelectorAll("text~choice")));
  }, [currentEvent]);

  return (
    <div>
      {error ? (
        <span className="text">{"//**// Event Error //**//"}</span>
      ) : (
        <span className="text">{eventText}</span>
      )}
      {error || end ? 
      null
      :
      <EventSimChoices
        choicesArr={eventChoices}
        setNextEvent={setCurrentEvent}
        setHasError={setError}
      />
}
    </div>
  );
}

function EventSimChoices(props: {
  choicesArr: Element[];
  setNextEvent: state<Element>;
  setHasError: state<boolean>;
}) {
  const { choicesArr, setNextEvent, setHasError } = props;

  return (
    <ol>
      {choicesArr.length === 0 ? (
        <li>Continue...</li>
      ) : (
        choicesArr.map((elem: Element, i) => {
          const text = elem.querySelector("text");
          return (
            <li
              key={i}
              onClick={e => {
                const idx = parseInt(
                  (e.target as HTMLElement).dataset.choiceIndex!,
                  10
                );
                const nextEvent = choicesArr[idx]?.querySelector("event");
                if (nextEvent == null) return setHasError(true);
                setNextEvent(nextEvent);
              }}
              data-choice-index={i}
            >
              {text?.textContent || ""}
            </li>
          );
        })
      )}
    </ol>
  );
}

// function EventSimMsgBox() {
//   return (
//     <>
//       <br />
//       <div className="message">aaaaaaaaaaaaaaaaaaaaaaaaaa</div>
//     </>
//   );
// }
