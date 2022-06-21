import React, {useState, useEffect} from 'react'

type state<t> = React.Dispatch<React.SetStateAction<t>>;

export default function XMLInputBox(props: {
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
