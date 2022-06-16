type eventObject = {
  eventName: string | null;
  eventText: string;

  eventExtras?: {
    autoRewards?: {
      type: string;
      level: number;
    };
    itemModify?: {
      type: string;
      min: number;
      max: number;
    };
    borders?: {
      min: number;
      max: number;
      race: string;
    };
  };

  eventChoices: Array<{
    choiceText: string;
    choiceNextEvent: eventObject | null;
    choiceHidden: boolean;
    choiceReq: string | null;
    choiceLvl: number | null;
    choiceMaxGrp: number | null;
  }>;
  err: string[];
};

export function xmlToObj(xml: string): eventObject | null {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "text/xml");

  if (doc.documentElement.children.length === 0) return null;

  const errors: string[] = [];

  const eventName: string | null = doc.documentElement.getAttribute("name");
  let eventText: string | null | undefined = doc.querySelector(":root>text")?.textContent;

  const eventChoices: eventObject["eventChoices"] = [
    ...doc.querySelectorAll(":root>choice"),
  ]
    .map(choice => {
      let text = choice.querySelector("text")?.textContent;
      let nextEvent = choice.querySelector("event")?.outerHTML;
      const req = choice.getAttribute("req");
      const lvl = choice.getAttribute("lvl");
      const maxGrp = choice.getAttribute("max_group");

      if (text == null) {
        errors.push("ChoiceError: no choice text!");
        text = "";
      }
      if (nextEvent == null) {
        errors.push("ChoiceError: no next event!");
        nextEvent = "<event/>";
      }
      return {
        choiceText: text,
        choiceNextEvent: xmlToObj(nextEvent),
        choiceHidden: choice.getAttribute("hidden") === "true",
        choiceReq: req,
        choiceLvl: lvl == null ? null : parseInt(lvl, 10),
        choiceMaxGrp: maxGrp == null ? null : parseInt(maxGrp, 10),
      };
    })
    .sort((c1, c2) => {
      let maxGrp1 = c1.choiceMaxGrp;
      let maxGrp2 = c2.choiceMaxGrp;
      if (maxGrp1 == null) maxGrp1 = -Infinity;
      if (maxGrp2 == null) maxGrp2 = -Infinity;
      return maxGrp1 - maxGrp2;
    });

  if (doc.querySelector("parsererror") != null)
    errors.push("XMLSyntaxError: see below for details!");
  if (doc.documentElement.nodeName !== "event")
    errors.push("StructureError: Event does not begin with an event tag!");
  if (eventText == null) {
    eventText = "NULL";
    errors.push("EventError: Event has no text!");
  }

  if (eventChoices.length === 0) {
    eventChoices.push({
      choiceText: "Continue...",
      choiceNextEvent: null,
      choiceHidden: false,
      choiceReq: null,
      choiceLvl: null,
      choiceMaxGrp: null,
    });
  }

  const obj: eventObject = {
    eventName,
    eventText,
    eventChoices,
    err: errors,
  };

  return obj;
}
