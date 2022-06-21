import React, { useEffect, useState } from "react";
import { eventObject } from "./xmlToObj";

type state<t> = React.Dispatch<React.SetStateAction<t>>;

export default function EventWindow(props: {
  eventXmlObject: eventObject | null | string;
  setEventXmlObject: state<eventObject | null | string>;
  setLoadNextEvent: state<string>;
  cannotFindNext: string;
  hasXmlSyntaxErr: boolean;
  hasDuplicatedEvents: boolean;
}) {
  const {
    eventXmlObject,
    setEventXmlObject,
    setLoadNextEvent,
    cannotFindNext,
    hasXmlSyntaxErr,
    hasDuplicatedEvents,
  } = props;

  const [isEnd, setIsEnd] = useState(false);
  const [eventError, setEventError] = useState<string[]>([]);
  const [normalEvent, setNormalEvent] = useState<eventObject>();

  useEffect(() => {
    setIsEnd(false);
    setEventError([]);

    if (typeof eventXmlObject === "string") {
      setLoadNextEvent(eventXmlObject);
    } else if (eventXmlObject == null) {
      setIsEnd(true);
    } else if (eventXmlObject.err.length > 0) {
      setEventError(eventXmlObject.err);
    } else {
      setNormalEvent(eventXmlObject);
    }
  }, [eventXmlObject]);


  if (cannotFindNext !== "can find next" || hasXmlSyntaxErr || hasDuplicatedEvents) {
    return (
      <>
        <span className="text error" style={{ fontSize: "2em" }}>
          {"Error!\n"}
        </span>
        <span className="text error">
          {(() => {
            if (cannotFindNext !== "can find next") {
              return `ReferenceError: Cannot find next event to load. \n -- Loading "${cannotFindNext}"\n`;
            }
            if (hasXmlSyntaxErr) {
              return `XMLSyntaxError: See below for details!\n`;
            }
            if (hasDuplicatedEvents) {
              return `Structure Error: Raw event markup contains duplicated event names!\n`;
            }
          })()}
        </span>
      </>
    );
  }

  return (
    <>
      {(() => {
        if (isEnd) {
          return <span className="text end">End Of Event</span>;
        }
        if (eventError.length > 0) {
          return (
            <>
              <span className="text error" style={{ fontSize: "2em" }}>
                {"Error!\n"}
              </span>
              {eventError.map((error, i) => {
                return (
                  <span className="text error" key={i}>
                    {error}
                  </span>
                );
              })}
            </>
          );
        }
        if (normalEvent != null) {
          return (
            <>
              <span className="text">{normalEvent.eventText}</span>

              <ol className="choices">
                {normalEvent.eventChoices.map((choice, i) => {
                  return (
                    <li
                      key={i}
                      onClick={() => setEventXmlObject(choice.choiceNextEvent)}
                      data-choice-index={i}
                    >
                      {choice.choiceText}
                    </li>
                  );
                })}
              </ol>
            </>
          );
        }
      })()}
    </>
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
