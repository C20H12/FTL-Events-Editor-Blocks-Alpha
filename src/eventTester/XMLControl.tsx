import React from "react";

export default function XMLControl(props: {
  setReload: React.Dispatch<React.SetStateAction<number>>;
  reload: number;
  allEventNames: string[];
  setCurrentSelectedEvent: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { setReload, reload, allEventNames, setCurrentSelectedEvent } = props;

  return (
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
  );
}
