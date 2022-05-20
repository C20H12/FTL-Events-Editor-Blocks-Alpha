import { useState } from "react";

export default function EventWindow(props: { xml: string }) {
  const { xml } = props;
  const parser = new DOMParser();
  const pXml = parser.parseFromString(xml, "text/xml");

  const eventText = pXml?.querySelector("text")?.textContent;
  const eventChoices = Array.from(pXml?.querySelectorAll(":root>choice"));

  return (
    <div>
      <EventSimText text={eventText || "Error Detected."} />
      <EventSimChoices choicesArr={eventChoices} />
    </div>
  );
}

function EventSimText(props: { text: string }) {
  return <span className="text">{props.text}</span>;
}

function EventSimChoices(props: { choicesArr: Element[] }) {
  const { choicesArr } = props;

  const [shouldGotoNextEvent, setShouldGotoNextEvent] = useState(false);

  const handleChoiceSelect = () => {
    if (choicesArr[0].childNodes) setShouldGotoNextEvent(bool => !bool);
  };

  if (shouldGotoNextEvent)
    return (
      <EventWindow
        xml={choicesArr[0].querySelector("event")?.outerHTML || "<event/>"}
      />
    );

  return (
    <ol>
      {choicesArr.map((elem: Element, i) => {
        const text = elem.querySelector("text");
        return (
          <li key={i} onClick={handleChoiceSelect}>
            {text?.textContent}
          </li>
        );
      })}
    </ol>
  );
}

function EventSimMsgBox() {
  return (
    <>
      <br />
      <div className="message">aaaaaaaaaaaaaaaaaaaaaaaaaa</div>
    </>
  );
}
