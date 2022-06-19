type eventObject = {
  eventName: string | null;
  eventText: string;

  eventExtras?: {
    autoRewards?: {
      type: string;
      level: string;
    };
    itemModify?: Array<{
      type: string ;
      min: number;
      max: number;
    }>;
    equipment?: {
      type: string;
    }
    boarders?: {
      min: number;
      max: number;
      race: string;
    };
    damage?: {
      amount: number;
      system: Array<{
        name: string;
        effect?: string;
      } | null>;
    }
  };

  eventChoices: Array<{
    choiceText: string;
    choiceNextEvent: eventObject | null | string;
    choiceHidden: boolean;
    choiceReq: string | null;
    choiceLvl: number|null;
    choiceMaxGrp: number|null;
  }>;
  err: string[];
};

export default function xmlToObj(xml: string): eventObject | null | string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');

  const eventLoad = doc.documentElement.getAttribute("load");
  const eventLoadHs= doc.querySelector(":root>loadEvent")?.textContent;
  if (eventLoad != null) return eventLoad;
  if (eventLoadHs != null) return eventLoadHs;
  if (doc.documentElement.children.length === 0) return null;


  const choiceErrors: string[] = [];
  const eventChoices: eventObject['eventChoices'] = [
    ...doc.querySelectorAll(':root>choice'),
  ].map((choice, idx) => {
    let text: string | null | undefined = choice.querySelector('text')?.textContent;
    let nextEvent: string | null | undefined = choice.querySelector('event')?.outerHTML;
    const req = choice.getAttribute("req");
    const lvl = choice.getAttribute("lvl");
    const maxGrp = choice.getAttribute("max_group");

    if (text == null) {
      choiceErrors.push('ChoiceError: No choice text! \n At choice: ' + (idx + 1));
      text = '';
    }
    if (nextEvent == null) {
      choiceErrors.push('ChoiceError: No next event! \n At choice: ' + (idx + 1));
      nextEvent = '<event/>';
    }

    return {
      choiceText: text,
      choiceNextEvent: xmlToObj(nextEvent),
      choiceHidden: choice.getAttribute('hidden') === 'true',
      choiceReq: req,
      choiceLvl: lvl == null ? null : parseInt(lvl, 10),
      choiceMaxGrp: maxGrp == null ? null : parseInt(maxGrp, 10),
    };
  }).sort((c1, c2) => {
    let maxGrp1 = c1.choiceMaxGrp;
    let maxGrp2 = c2.choiceMaxGrp;
    if (maxGrp1 == null) 
      maxGrp1 = -Number.MAX_VALUE;
    if (maxGrp2 == null)
      maxGrp2 = -Number.MAX_VALUE;
    return maxGrp1 - maxGrp2
  })

  if (eventChoices.length === 0) {
    eventChoices.push({
      choiceText: 'Continue...',
      choiceNextEvent: null,
      choiceHidden: false,
      choiceReq: null,
      choiceLvl: null,
      choiceMaxGrp: null,
    });
  };


  const obj: eventObject = {
    eventName:  doc.documentElement.getAttribute('name'),
    eventText: doc.querySelector(':root>text')?.textContent || "",
    eventChoices,
    err: [],
    eventExtras: {},
  };


  const autoRewardsTag = doc.querySelector(":root>autoReward");
  const itemModTags = doc.querySelectorAll(":root>item_modify>item");
  const anyEquipmentTag = doc.querySelector(":root>weapon, :root>drone, :root>augment");
  const boardersTag = doc.querySelector(":root>boarders");
  const damageTags = doc.querySelectorAll(":root>damage");

  if (autoRewardsTag != null){
    obj.eventExtras!.autoRewards = {
      level: autoRewardsTag.getAttribute("level") ?? '',
      type: autoRewardsTag?.textContent ?? '',
    };
  }

  if (itemModTags.length > 0) {
    obj.eventExtras!.itemModify = [...itemModTags].map(itemMod => {
      return {
        type: itemMod.getAttribute("type") ?? "",
        min: parseInt(itemMod.getAttribute("min") ?? '', 10),
        max: parseInt(itemMod.getAttribute("max") ?? '', 10)
      }
    })
  }

  if (anyEquipmentTag != null) {
    obj.eventExtras!.equipment = {
      type: anyEquipmentTag.tagName,
    };
  }

  if (boardersTag != null) {
    obj.eventExtras!.boarders = {
      min: parseInt(boardersTag.getAttribute("min") ?? '', 10),
      max: parseInt(boardersTag.getAttribute("max") ?? '', 10),
      race: boardersTag.getAttribute("class") || "",
    }
  }

  if (damageTags.length > 0) {
    const damageTagsArr = [...damageTags];
    obj.eventExtras!.damage = {
      amount: damageTagsArr.map(elem => {
        return parseInt(elem.getAttribute("amount") ?? '', 10);
      }).reduce((prev, next) => prev + next, 0),

      system: damageTagsArr.map(elem => {
        const systemName = elem.getAttribute("system");
        const systemEffect = elem.getAttribute("effect");
        if (systemName == null) return null;
        if (systemEffect == null) return {
          name: systemName,
        };
        return {
          name: systemName,
          effect: systemEffect,
        };
      }),
    }
  }

  obj.err = [...errorCheck(obj, doc), ...choiceErrors];

  return obj;
}

// todo - add crew and remove crew and remove equipment

function errorCheck(object: eventObject, parsedDoc: Document): string[] {
  const errors: string[] = [];

  if (parsedDoc.querySelector('parsererror') != null)
    errors.push('XMLSyntaxError: See below for details!');
  if (parsedDoc.documentElement.nodeName !== 'event')
    errors.push('StructureError: Event does not begin with an event tag!');

  if (object.eventText === '') 
    errors.push('EventError: Event has no text!');

  if (object.eventExtras != null) {

    if (object.eventExtras.autoRewards != null) {
      const allowedTypes = [
        "standard",
        "stuff",
        "fuel",
        "missiles",
        "droneparts",
        "scrap_only",
        "fuel_only",
        "missiles_only",
        "droneparts_only",
        "item",
        "weapon",
        "drone",
        "augment",
      ];
      const allowedLevels = ["LOW", "MED", "HIGH", "RANDOM"];

      if (object.eventExtras.autoRewards.type === '') {
        errors.push('EventError: AutoRewards type is empty!');
      }
      if (!allowedTypes.includes(object.eventExtras.autoRewards.type)) {
        errors.push('EventError: AutoRewards type is not one of the allowed types!');
      }
      if (!allowedLevels.includes(object.eventExtras.autoRewards.level)) {
        errors.push('EventError: AutoRewards level is not one of the allowed levels!');
      }
    }


    if (object.eventExtras.itemModify != null) {
      const allowedTypes = [
        "scrap",
        "fuel",
        "missiles",
        "drones",
      ]
      if (object.eventExtras.itemModify.length === 0) {
        errors.push('EventError: ItemModify is empty!');
      }
      object.eventExtras.itemModify.forEach((itemMod, i, thisArr) => {
        if (itemMod.type === '') {
          errors.push('EventError: ItemModify type is empty!');
        }
        if (!allowedTypes.includes(itemMod.type)) {
          errors.push('EventError: ItemModify type is not one of the allowed types!');
        }
        if (isNaN(itemMod.min)) {
          errors.push('EventError: ItemModify min is not a number!');
        }
        if (isNaN(itemMod.max)) {
          errors.push('EventError: ItemModify max is not a number!');
        }
        if (itemMod.min > itemMod.max) {
          errors.push('EventError: ItemModify min is greater than max!');
        }
        if (i > 0 && thisArr[i - 1].type === itemMod.type) {
          errors.push('EventError: ItemModify type is not unique!');
        }
      })
    }


    if (object.eventExtras.equipment != null) {
      const allowedTypes = [
        "weapon",
        "drone",
        "augment",
      ]
      if (object.eventExtras.equipment.type === '') {
        errors.push('EventError: Equipment type is empty!');
      }
      if (!allowedTypes.includes(object.eventExtras.equipment.type)) {
        errors.push('EventError: Equipment type is not one of the allowed types!');
      }
    }


    if (object.eventExtras.boarders != null) {
      if (isNaN(object.eventExtras.boarders.min)) {
        errors.push('EventError: Boarders min is not a number!');
      }
      if (isNaN(object.eventExtras.boarders.max)) {
        errors.push('EventError: Boarders max is not a number!');
      }
      if (object.eventExtras.boarders.min > object.eventExtras.boarders.max) {
        errors.push('EventError: Boarders min is greater than max!');
      }
      if (object.eventExtras.boarders.race === '') {
        errors.push("Event Error: Boarders race is empty!")
      }
    }


    if (object.eventExtras.damage != null) {
      if (isNaN(object.eventExtras.damage.amount)) {
        errors.push("EventError: Damage amount is not a number!")
      }
      object.eventExtras.damage.system.forEach(system => {
        const allowedSystems = [
          "shields",
          "weapons",
          "engines",
          "medbay",
          "clonebay",
          "oxygen",
          "teleporter",
          "drones",
          "cloaking",
          "artillery",
          "hacking",
          "mind",
          "pilot",
          "sensors",
          "doors",
          "battery",
          "room",
          "random",
        ];
        const allowedEffects = [
          "fire",
          "breach",
          "all",
          "random",
        ];
        if (system == null) return;
        if (!allowedSystems.includes(system.name)) {
          errors.push("EventError: Damage system is not one of the allowed systems!");
        };
        if (system.effect != null && !allowedEffects.includes(system.effect)) {
          errors.push("EventError: Damage system effect is not one of the allowed effects!");
        }
      });
    }
    
  }

  return errors;
}
