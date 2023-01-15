import { Blocks } from "blockly";
import { FieldTextInput, FieldNumber, FieldCheckbox, FieldDropdown, FieldColour, FieldMultilineInput } from "blockly";


// -------------------------------
// EVENT RELATED CATEGORY---------
// -------------------------------

Blocks['event'] = {
  init() {
    this.appendDummyInput()
        .appendField("<event>")
        .appendField(new FieldTextInput("NAME"), "eventName")
        .appendField("Unique?")
        .appendField(new FieldCheckbox("FALSE"), "UNIQ");
    this.appendStatementInput("EVENT_CHILDS")
        .setCheck("allowed_event_childs");
    this.setColour("#006092");
    this.setTooltip("FTL Event Declaration");
    this.setHelpUrl("https://docs.google.com/document/d/1N2Nlfr-bMiKlABjVQboRg_MIec-BvQRp-_9VHN6wGgE/edit#heading=h.7cnvp7x7fika");
  }
};

Blocks['choice'] = {
  init() {
    this.appendDummyInput()
        .appendField("<choice>")
        .appendField("Hidden?")
        .appendField(new FieldCheckbox("TRUE"), "hidden");
    this.appendStatementInput("CHOICE_S")
        .setCheck("allowed_choice_childs");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#865e5b");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['event_nested'] = {
  init() {
    this.appendDummyInput()
        .appendField("<event>")
        .appendField("(nested)");
    this.appendStatementInput("EVENT_N")
        .setCheck("allowed_event_childs");
    this.setPreviousStatement(true, ["allowed_choice_childs", "allowed_eventList_childs"]);
    this.setNextStatement(true, ["allowed_choice_childs", "allowed_eventList_childs"]);
    this.setColour("#006092");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['event_load'] = {
  init() {
    this.appendDummyInput()
        .appendField("<event> Load")
        .appendField(new FieldTextInput("EVENT_NAME"), "LDEVENT");
    this.setPreviousStatement(true, "allowed_choice_childs");
    this.setNextStatement(true, "allowed_choice_childs");
    this.setColour("#006092");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['event_end'] = {
  init() {
    this.appendDummyInput()
        .appendField("<event/>");
    this.setPreviousStatement(true, "allowed_choice_childs");
    this.setColour("#006092");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['event_list'] = {
  init() {
    this.appendDummyInput()
        .appendField("<eventList> Name")
        .appendField(new FieldTextInput("LIST_NAME"), "EVLIST_NAME");
    this.appendStatementInput("EVLIST")
        .setCheck("allowed_choice_childs");
    this.setColour("#006092");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};



// -------------------------------
// CHOICE AND CHOICE ATTRIBUTES CATEGORY---------
// -------------------------------

Blocks['choice_adv'] = {
  init() {
    this.appendValueInput("ATTRIBUTES")
        .setCheck("allowed_choice_attributes")
        .appendField("<choice>")
        .appendField("Hidden?")
        .appendField(new FieldCheckbox("TRUE"), "HIDD2");
    this.appendStatementInput("CHOICE")
        .setCheck("allowed_choice_childs");
    this.appendDummyInput()
        .appendField("No Blue?")
        .appendField(new FieldCheckbox("FALSE"), "BLUE");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#865e5b");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['attri_req'] = {
  init() {
    this.appendValueInput("REQ1")
        .setCheck("allowed_choice_attributes")
        .appendField("Require")
        .appendField(new FieldTextInput("ITEM_ID"), "REQ");
    this.setOutput(true, "allowed_choice_attributes");
    this.setColour("#963a33");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['attri_lvl'] = {
  init() {
    this.appendValueInput("LVL1")
        .setCheck("allowed_choice_attributes")
        .appendField("Level")
        .appendField(new FieldNumber(0), "LVL");
    this.setOutput(true, "allowed_choice_attributes");
    this.setColour("#963a33");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['attri_maxlvl'] = {
  init() {
    this.appendValueInput("MAX")
        .setCheck("allowed_choice_attributes")
        .appendField("Max Level")
        .appendField(new FieldNumber(0), "MAX_LVL");
    this.setOutput(true, "allowed_choice_attributes");
    this.setColour("#963a33");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['attri_maxgp'] = {
  init() {
    this.appendValueInput("MAXGRP")
        .setCheck("allowed_choice_attributes")
        .appendField("Max Group")
        .appendField(new FieldNumber(0), "MAX_GROUP");
    this.setOutput(true, "allowed_choice_attributes");
    this.setColour("#963a33");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};



// -------------------------------
// TEXT RELATED CATEGORY---------
// -------------------------------

Blocks['text'] = {
  init() {
    const validate = (text) => {
      if (text.includes("cant")) {
        return this.setWarningText('Error: can\'tina');
      } else if(text.includes("kitty")){
        return this.setWarningText("Error: Catbot Vance")
      }else {
        return this.setWarningText(null);
      }
    };
    this.appendDummyInput()
        .appendField("<text>")
        .appendField(new FieldMultilineInput("Insert your EVENT text here!", validate), "textTag");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#a0a2ab");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['text_choice'] = {
  init() {
    this.appendDummyInput()
        .appendField("<text>")
        .appendField(new FieldTextInput("Insert your CHOICE text here!"), "textTag");
    this.setPreviousStatement(true, "allowed_choice_childs");
    this.setNextStatement(true, "allowed_choice_childs");
    this.setColour("#a0a2ab");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['text_txlist'] = {
  init() {
    this.appendDummyInput()
        .appendField("<text>")
        .appendField(new FieldTextInput("Insert your TEXTLIST text here!"), "textTag");
    this.setPreviousStatement(true, "allowed_text");
    this.setNextStatement(true, "allowed_text");
    this.setColour("#a0a2ab");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['text_list'] = {
  init() {
    this.appendDummyInput()
        .appendField("<textList> Name")
        .appendField(new FieldTextInput("TEXT_LIST_NAME"), "TXLT_NAME");
    this.appendStatementInput("TXLIST")
        .setCheck("allowed_text");
    this.setColour("#a0a2ab");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['text_load'] = {
  init() {
    this.appendDummyInput()
        .appendField("<text> Load")
        .appendField(new FieldTextInput("TEXT_LIST_NAME"), "TXLOAD");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#a0a2ab");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['text_load_choice'] = {
  init() {
    this.appendDummyInput()
        .appendField("<text> Load")
        .appendField(new FieldTextInput("TEXT_LIST_NAME"), "TXLOAD");
    this.setPreviousStatement(true, "allowed_choice_childs");
    this.setNextStatement(true, "allowed_choice_childs");
    this.setColour("#a0a2ab");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};



// -------------------------------
// REWARDS CATEGORY---------
// -------------------------------

Blocks['reward_auto'] = {
  init() {
    this.appendDummyInput()
        .appendField("<autoReward> Level:")
        .appendField(new FieldDropdown([
          ["HIGH","HIGH"], 
          ["MED","MED"], 
          ["LOW","LOW"], 
          ["RANDOM","RANDOM"]
        ]), "REWARD_LEVEL")
        .appendField("Type:")
        .appendField(new FieldDropdown([
          ["standard","standard"], 
          ["stuff","stuff"], 
          ["fuel","fuel"], 
          ["missiles","missiles"], 
          ["droneparts","droneparts"], 
          ["scrap_only","scrap_only"], 
          ["fuel_only","fuel_only"], 
          ["missiles_only","missiles_only"], 
          ["droneparts_only","droneparts_only"], 
          ["item","item"], 
          ["weapon","weapon"], 
          ["drone","drone"], 
          ["augment","augment"]
        ]), "REWARD_TYPE");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#084ac4");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['item_modify'] = {
  init() {
    this.appendDummyInput()
        .appendField("<item_modify> Steal?")
        .appendField(new FieldCheckbox("FALSE"), "ITEM_STEAL");
    this.appendStatementInput("ITEM_MODIFY_CHILDS")
        .setCheck("allowed_item_childs");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#084ac4");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['item'] = {
  init() {
    this.appendDummyInput()
        .appendField("<item> type:")
        .appendField(new FieldDropdown([
          ["scrap","scrap"], 
          ["fuel","fuel"], 
          ["missiles","missiles"], 
          ["drones","drones"]
        ]), "ITEM_TYPE")
        .appendField("min:")
        .appendField(new FieldNumber(0, -Infinity, Infinity, 1), "ITEM_MIN")
        .appendField("max:")
        .appendField(new FieldNumber(0, -Infinity, Infinity, 1), "ITEM_MAX");
    this.setPreviousStatement(true, "allowed_item_childs");
    this.setNextStatement(true, "allowed_item_childs");
    this.setColour("#486eb5");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};



// -------------------------------
// EQUIPMENTS CATEGORY---------
// -------------------------------

Blocks['reward_weapon'] = {
  init() {
    this.appendDummyInput()
        .appendField("<weapon> name")
        .appendField(new FieldTextInput("WEP_ITEM_ID"), "WEAPON_NAME");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#059c2d");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['reward_augment'] = {
  init() {
    this.appendDummyInput()
        .appendField("<augment> name")
        .appendField(new FieldTextInput("AUG_ITEM_ID"), "AUG_NAME");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#059c2d");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['reward_drone'] = {
  init() {
    this.appendDummyInput()
        .appendField("<drone> name")
        .appendField(new FieldTextInput("DRN_ITEM_ID"), "DRONE_NAME");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#059c2d");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['remove'] = {
  init() {
    this.appendDummyInput()
        .appendField("<remove> name")
        .appendField(new FieldTextInput("ITEM_ID"), "REMOVE_NAME");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#059c2d");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};



// -------------------------------
// CREW RELATED CATEGORY---------
// -------------------------------

Blocks['boarders'] = {
  init() {
    this.appendDummyInput()
        .appendField("<boarders> min:")
        .appendField(new FieldNumber(0, -Infinity, Infinity, 1), "MIN")
        .appendField("max:")
        .appendField(new FieldNumber(0, -Infinity, Infinity, 1), "MAX")
        .appendField("race:")
        .appendField(new FieldTextInput("random"), "RACE");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#00949c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['crew_member'] = {
  init() {
    this.appendValueInput("CREW_SKILLS")
        .setCheck("allowed_attribute_crew")
        .appendField("<crewMember> amount:")
        .appendField(new FieldNumber(0, -1, Infinity, 1), "AMOUNT")
        .appendField("race:")
        .appendField(new FieldTextInput("random"), "RACE");
    this.appendDummyInput()
        .appendField("default name:")
        .appendField(new FieldTextInput("none"), "CREW_NAME");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setInputsInline(false);
    this.setColour("#00949c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['attri_crew_skill'] = {
  init() {
    this.appendDummyInput()
        .appendField("skilled at:")
        .appendField(new FieldDropdown([
          ["weapons","weapons"], 
          ["shields","shields"], 
          ["pilot","pilot"], 
          ["engines","engines"], 
          ["combat", "combat"], 
          ["repair", "repair"], 
          ["all_skills", "all_skills"],
        ]), "SKILL_AREA")
        .appendField("skill lvl:")
        .appendField(new FieldNumber(0, 0, 2, 1), "SKILL_LVL");
    this.setOutput(true, "allowed_attribute_crew");
    this.setColour("#1aba9d");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['remove_crew'] = {
  init() {
    this.appendDummyInput()
        .appendField("<removeCrew> race:")
        .appendField(new FieldTextInput("random"), "REMOVE_RACE");
    this.appendDummyInput()
        .appendField("allow clone?")
        .appendField(new FieldCheckbox("TRUE"), "CLONE")
        .appendField("text:")
        .appendField(new FieldTextInput("Your clonebay worked / didn't work."), "CLONE_TEXT");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#00949c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
}



// -------------------------------
// SHIP RELATED CATEGORY---------
// -------------------------------

Blocks['damage'] = {
  init() {
    this.appendValueInput("DAMAGE_ATTRIBUTES")
        .setCheck("allowed_dmg_attributes")
        .appendField("<damage> amount:")
        .appendField(new FieldNumber(0, -Infinity, Infinity, 1), "DAMAGE_AMOUNT");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setInputsInline(false);
    this.setColour("#96921d");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['attri_damage_system'] = {
  init() {
    this.appendValueInput("DAMAGE_EFF")
        .setCheck("allowed_dmg_attributes")
        .appendField("system:")
        .appendField(new FieldDropdown([
          ["shields","shields"], 
          ["weapons","weapons"], 
          ["engines","engines"], 
          ["medbay", "medbay"], 
          ["clonebay", "clonebay"], 
          ["oxygen", "oxygen"], 
          ["telepporter", "telepporter"], 
          ["drones", "drones"], 
          ["cloaking", "cloaking"], 
          ["artillery", "artillery"], 
          ["hacking", "hacking"], 
          ["mind", "mind"], 
          ["pilot","pilot"], 
          ["sensors", "sensors"], 
          ["doors", "doors"], 
          ["battery", "battery"],
          ["sys-less room", "room"],
          ["random", "random"],
        ]), "DAMAGE_ROOM");
    this.setOutput(true, "allowed_dmg_attributes");
    this.setColour("#c48c04");
    this.setTooltip("");
    this.setHelpUrl("");
  }  
};

Blocks['attri_damage_effect'] = {
  init() {
    this.appendValueInput("DAMAGE_SYS")
        .setCheck("allowed_dmg_attributes")
        .appendField("extra effect:")
        .appendField(new FieldDropdown([
          ["fire","fire"], 
          ["breach","breach"], 
          ["all","all"], 
          ["random","random"], 
        ]), "DAMAGE_EFFECT");
    this.setOutput(true, "allowed_dmg_attributes");
    this.setColour("#c48c04");
    this.setTooltip("");
    this.setHelpUrl("");
  }
}

Blocks['status'] = {
  init() {
    this.appendDummyInput()
        .appendField("<status> type:")
        .appendField(new FieldDropdown([
          ["loss","loss"], 
          ["divide","divide"], 
          ["limit","limit"], 
          ["clear", "clear"], 
        ]), "STATUS_TYPE")
        .appendField("target:")
        .appendField(new FieldDropdown([
          ["player","player"], 
          ["enemy","enemy"], 
          ["all","all"], 
        ]), "STATUS_TARGET");
    this.appendDummyInput()
        .appendField("system:")
        .appendField(new FieldDropdown([
          ["shields","shields"], 
          ["weapons","weapons"], 
          ["engines","engines"], 
          ["medbay", "medbay"], 
          ["clonebay", "clonebay"], 
          ["oxygen", "oxygen"], 
          ["telepporter", "telepporter"], 
          ["drones", "drones"], 
          ["cloaking", "cloaking"], 
          ["artillery", "artillery"], 
          ["hacking", "hacking"], 
          ["mind", "mind"], 
          ["pilot","pilot"], 
          ["sensors", "sensors"], 
          ["doors", "doors"], 
          ["battery", "battery"],
        ]), "STATUS_ROOM")
        .appendField("amount:")
        .appendField(new FieldNumber(0, 0, Infinity, 1), "STATUS_AMOUNT");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#96921d");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['upgrade'] = {
  init() {
    this.appendDummyInput()
        .appendField("<upgrade> amount:")
        .appendField(new FieldNumber(0, 0, Infinity, 1), "UPG_AMOUNT")
        .appendField("system:")
        .appendField(new FieldDropdown([
          ["shields","shields"], 
          ["weapons","weapons"], 
          ["engines","engines"], 
          ["medbay", "medbay"], 
          ["clonebay", "clonebay"], 
          ["oxygen", "oxygen"], 
          ["telepporter", "telepporter"], 
          ["drones", "drones"], 
          ["cloaking", "cloaking"], 
          ["artillery", "artillery"], 
          ["hacking", "hacking"], 
          ["mind", "mind"], 
          ["pilot","pilot"], 
          ["sensors", "sensors"], 
          ["doors", "doors"], 
          ["battery", "battery"],
        ]), "UPG_SYS");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#96921d");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['system'] = {
  init() {
    this.appendDummyInput()
        .appendField("<system> name:")
        .appendField(new FieldDropdown([
          ["shields","shields"], 
          ["weapons","weapons"], 
          ["engines","engines"], 
          ["medbay", "medbay"], 
          ["clonebay", "clonebay"], 
          ["oxygen", "oxygen"], 
          ["telepporter", "telepporter"], 
          ["drones", "drones"], 
          ["cloaking", "cloaking"], 
          ["artillery", "artillery"], 
          ["hacking", "hacking"], 
          ["mind", "mind"], 
          ["pilot","pilot"], 
          ["sensors", "sensors"], 
          ["doors", "doors"], 
          ["battery", "battery"],
        ]), "SYSTEM_SYS");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#96921d");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


// -------------------------------
// MAP RELATED CATEGORY---------
// -------------------------------

Blocks['distress_beacon'] = {
  init() {
    this.appendDummyInput()
        .appendField("<distressBeacon>");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#8f0373");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['reveal_map'] = {
  init() {
    this.appendDummyInput()
        .appendField("<reveal_map>");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#8f0373");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['modify_pursuit'] = {
  init() {
    this.appendDummyInput()
        .appendField("<modifyPursuit> amount:")
        .appendField(new FieldNumber(0, 0, Infinity, 1), "PURSUIT_AMOUNT");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#8f0373");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['store'] = {
  init() {
    this.appendDummyInput()
        .appendField("<store> store name:")
        .appendField(new FieldTextInput("STORE_STANDARD"), "STORE");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#8f0373");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['quest'] = {
  init() {
    this.appendDummyInput()
        .appendField("<quest> event:")
        .appendField(new FieldTextInput("EVENT_NAME"), "QUEST_EVT");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#8f0373");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};



// -------------------------------
// BACKGROUND OBJECTS CATEGORY---------
// -------------------------------

Blocks['environment'] = {
  init() {
    this.appendDummyInput()
        .appendField("<environment> type:")
        .appendField(new FieldDropdown([
          ["sun","sun"], 
          ["nebula","nebula"], 
          ["plasma storm","storm"], 
          ["pulsar", "pulsar"], 
          ["asteroid", "asteroid"],
          ["ASB", "PDS"]
        ]), "ENV_TYPE")
        .appendField("target(for asb):")
        .appendField(new FieldDropdown([
          ["player","player"], 
          ["enemy","enemy"], 
          ["all","all"], 
        ]), "ENV_TARGET");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#530096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['img'] = {
  init() {
    this.appendDummyInput()
        .appendField("<img> back:")
        .appendField(new FieldTextInput("BG_NAME"), "IMG_BG")
        .appendField("planet:")
        .appendField(new FieldTextInput("PLANET_NONE"), "IMG_PLT");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#530096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['custom_fleet'] = {
  init() {
    this.appendDummyInput()
        .appendField("<customFleet> face right?")
        .appendField(new FieldCheckbox("FALSE"), "FLEET_R")
        .appendField("fire asb?")
        .appendField(new FieldCheckbox("TRUE"), "FLEET_FIRE")
        .appendField("auto darken?")
        .appendField(new FieldCheckbox("TRUE"), "FLEET_DARK")
    this.appendDummyInput()
        .appendField("fleet name:")
        .appendField(new FieldTextInput("CUSTOM_FLEET"), "FLEET_NAME");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#530096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};



// -------------------------------
// SHIPS TAG SECTION CATEGORY---------
// -------------------------------

Blocks['ship_load'] = {
  init() {
    this.appendDummyInput()
        .appendField("<ship> load:")
        .appendField(new FieldTextInput("SHIP_NAME"), "SHIPL_NAME")
        .appendField("hostile?")
        .appendField(new FieldCheckbox("FALSE"), "SHIPL_HOST");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#619123");
    this.setTooltip("Enemy Ship load, use 'current' to modify a loaded ship");
    this.setHelpUrl("0");
  }
};

Blocks['ship'] = {
  init() {
    this.appendDummyInput()
        .appendField("<ship> name:")
        .appendField(new FieldTextInput("NAME"), "SHIP_NAME")
        .appendField("auto_blueprint:")
        .appendField(new FieldTextInput("SHIP_NAME"), "SHIP_AUTOBP");
    this.appendStatementInput("SHIP_CHILDS")
        .setCheck("allowed_ship_childs");
    this.setColour("#619123");
    this.setTooltip("FTL Enemy Ship Declaration");
    this.setHelpUrl("https://docs.google.com/spreadsheets/d/109VMoT8rkXiPsyHAskxjN9lNm1TOs0RsFeTOyHgQ8S0/edit#gid=1389979796");
  }
};

Blocks['surrender'] = {
  init() {
    this.appendDummyInput()
        .appendField("<surrender> chance:")
        .appendField(new FieldNumber(0,0,1,0.1), "SUR_CHANCE")
        .appendField("min:")
        .appendField(new FieldNumber(0,0,Infinity,1), "SUR_MIN")
        .appendField("max:")
        .appendField(new FieldNumber(0,0,Infinity,1), "SUR_MAX")
        .appendField("use load?")
        .appendField(new FieldCheckbox("TRUE"), "SUR_IS_LOAD");
    this.appendDummyInput("LOAD_INPUT")
        .appendField("load:")
        .appendField(new FieldTextInput("EVENT_NAME"),"SUR_LOAD");
    this.setPreviousStatement(true, "allowed_ship_childs");
    this.setNextStatement(true, "allowed_ship_childs");
    this.setColour("#619123");
    this.setTooltip("");
    this.setHelpUrl("");
  },
  onchange() {
    if (this.getFieldValue("SUR_IS_LOAD") === "FALSE" && this.getFieldValue("SUR_LOAD") !== null){
      try{
        this.removeInput("LOAD_INPUT");
      }catch(e){};
      this.appendStatementInput("SUR_CHILDS")
          .setCheck("allowed_event_childs");
    }
    else if (this.getFieldValue("SUR_IS_LOAD") === "TRUE" && this.getFieldValue("SUR_LOAD") === null){
      try{
        this.removeInput("SUR_CHILDS");
      }catch(e){};
      this.appendDummyInput("LOAD_INPUT")
          .appendField("load:")
          .appendField(new FieldTextInput("EVENT_NAME"),"SUR_LOAD");
    }
  }
};

Blocks['escape'] = {
  init() {
    this.appendDummyInput()
        .appendField("<escape> chance:")
        .appendField(new FieldNumber(0,0,1,0.1), "ESC_CHANCE")
        .appendField("min:")
        .appendField(new FieldNumber(0,0,Infinity,1), "ESC_MIN")
        .appendField("max:")
        .appendField(new FieldNumber(0,0,Infinity,1), "ESC_MAX");
    this.appendDummyInput()
        .appendField("timer:")
        .appendField(new FieldNumber(0,0,Infinity,1), "ESC_TIME")
        .appendField("use load?")
        .appendField(new FieldCheckbox("TRUE"), "ESC_IS_LOAD");
    this.appendDummyInput("LOAD_INPUT")
        .appendField("load:")
        .appendField(new FieldTextInput("EVENT_NAME"),"ESC_LOAD");
    this.setPreviousStatement(true, "allowed_ship_childs");
    this.setNextStatement(true, "allowed_ship_childs");
    this.setColour("#619123");
    this.setTooltip("");
    this.setHelpUrl("");
  },
  onchange() {
    if (this.getFieldValue("ESC_IS_LOAD") === "FALSE" && this.getFieldValue("ESC_LOAD") !== null){
      try{
        this.removeInput("LOAD_INPUT");
      }catch(e){};
      this.appendStatementInput("ESC_CHILDS")
          .setCheck("allowed_event_childs");
    }
    else if (this.getFieldValue("ESC_IS_LOAD") === "TRUE" && this.getFieldValue("ESC_LOAD") === null){
      try{
        this.removeInput("ESC_CHILDS");
      }catch(e){};
      this.appendDummyInput("LOAD_INPUT")
          .appendField("load:")
          .appendField(new FieldTextInput("EVENT_NAME"),"ESC_LOAD");
    }
  }
};

Blocks['gotaway'] = {
  init() {
    this.appendDummyInput()
        .appendField("<gotaway> ")
        .appendField("use load?")
        .appendField(new FieldCheckbox("TRUE"), "GA_IS_LOAD");
    this.appendDummyInput("LOAD_INPUT")
        .appendField("load:")
        .appendField(new FieldTextInput("EVENT_NAME"),"GA_LOAD");
    this.setPreviousStatement(true, "allowed_ship_childs");
    this.setNextStatement(true, "allowed_ship_childs");
    this.setColour("#619123");
    this.setTooltip("");
    this.setHelpUrl("");
  },
  onchange() {
    if (this.getFieldValue("GA_IS_LOAD") === "FALSE" && this.getFieldValue("GA_LOAD") !== null){
      try{
        this.removeInput("LOAD_INPUT");
      }catch(e){};
      this.appendStatementInput("GA_CHILDS")
          .setCheck("allowed_event_childs");
    }
    else if (this.getFieldValue("GA_IS_LOAD") === "TRUE" && this.getFieldValue("GA_LOAD") === null){
      try{
        this.removeInput("GA_CHILDS");
      }catch(e){};
      this.appendDummyInput("LOAD_INPUT")
          .appendField("load:")
          .appendField(new FieldTextInput("EVENT_NAME"),"GA_LOAD");
    }
  }
};

Blocks['destroyed'] = {
  init() {
    this.appendDummyInput()
        .appendField("<destroyed> ")
        .appendField("use load?")
        .appendField(new FieldCheckbox("TRUE"), "DES_IS_LOAD");
    this.appendDummyInput("LOAD_INPUT")
        .appendField("load:")
        .appendField(new FieldTextInput("EVENT_NAME"),"DES_LOAD");
    this.setPreviousStatement(true, "allowed_ship_childs");
    this.setNextStatement(true, "allowed_ship_childs");
    this.setColour("#619123");
    this.setTooltip("");
    this.setHelpUrl("");
  },
  onchange() {
    if (this.getFieldValue("DES_IS_LOAD") === "FALSE" && this.getFieldValue("DES_LOAD") !== null){
      try{
        this.removeInput("LOAD_INPUT");
      }catch(e){};
      this.appendStatementInput("DES_CHILDS")
          .setCheck("allowed_event_childs");
    }
    else if (this.getFieldValue("DES_IS_LOAD") === "TRUE" && this.getFieldValue("DES_LOAD") === null){
      try{
        this.removeInput("DES_CHILDS");
      }catch(e){};
      this.appendDummyInput("LOAD_INPUT")
          .appendField("load:")
          .appendField(new FieldTextInput("EVENT_NAME"),"DES_LOAD");
    }
  }
};

Blocks['deadcrew'] = {
  init() {
    this.appendDummyInput()
        .appendField("<deadCrew> ")
        .appendField("use load?")
        .appendField(new FieldCheckbox("TRUE"), "CK_IS_LOAD");
    this.appendDummyInput("LOAD_INPUT")
        .appendField("load:")
        .appendField(new FieldTextInput("EVENT_NAME"),"CK_LOAD");
    this.setPreviousStatement(true, "allowed_ship_childs");
    this.setNextStatement(true, "allowed_ship_childs");
    this.setColour("#619123");
    this.setTooltip("");
    this.setHelpUrl("");
  },
  onchange() {
    if (this.getFieldValue("CK_IS_LOAD") === "FALSE" && this.getFieldValue("CK_LOAD") !== null){
      try{
        this.removeInput("LOAD_INPUT");
      }catch(e){};
      this.appendStatementInput("CK_CHILDS")
          .setCheck("allowed_event_childs");
    }
    else if (this.getFieldValue("CK_IS_LOAD") === "TRUE" && this.getFieldValue("CK_LOAD") === null){
      try{
        this.removeInput("CK_CHILDS");
      }catch(e){};
      this.appendDummyInput("LOAD_INPUT")
          .appendField("load:")
          .appendField(new FieldTextInput("EVENT_NAME"),"CK_LOAD");
    }
  }
};

Blocks['ship_crew'] = {
  init() {
    this.appendDummyInput()
        .appendField("<crew>")
    this.appendStatementInput("SHIP_CREW_CHILDS")
        .setCheck("allowed_shipcrew_childs");
    this.setPreviousStatement(true, "allowed_ship_childs");
    this.setNextStatement(true, "allowed_ship_childs");
    this.setColour("#619123");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['ship_crew_member'] = {
  init() {
    this.appendDummyInput()
        .appendField("<crewMember> type:")
        .appendField(new FieldTextInput("crew_id"), "SHIP_CREW")
        .appendField("prop:")
        .appendField(new FieldNumber(0,0,1,0.1), "SHIP_PROP");
    this.setPreviousStatement(true, "allowed_shipcrew_childs");
    this.setNextStatement(true, "allowed_shipcrew_childs");
    this.setColour("#619123");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['weapon_override'] = {
  init() {
    this.appendDummyInput()
        .appendField("<weaponOverride> count:")
        .appendField(new FieldNumber(0,0,Infinity,1), "WEPOR_CNT")
    this.appendStatementInput("WEPOR_CHILDS")
        .setCheck("allowed_wepor_childs");
    this.setPreviousStatement(true, "allowed_ship_childs");
    this.setNextStatement(true, "allowed_ship_childs");
    this.setColour("#619123");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['wep_override_name'] = {
  init() {
    this.appendDummyInput()
        .appendField("<name> use weapon:")
        .appendField(new FieldTextInput("WEAPON_ID"), "WEPOR_NAME");
    this.setPreviousStatement(true, "allowed_wepor_childs");
    this.setNextStatement(true, "allowed_wepor_childs");
    this.setColour("#619123");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};



// -------------------------------
// OTHERS CATEGORY---------
// -------------------------------
Blocks['comment'] = {
  init() {
    this.appendDummyInput()
        .appendField("Comment:")
        .appendField(new FieldTextInput("This is a comment!"), "COMT");
    this.setColour("0");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};




// ------------------------------------------------------------------------------||
// -----------------------------------HYPERSPACE SECTION-------------------------||
// ------------------------------------------------------------------------------||


// ====LOAD===========
//======================
Blocks['hs_load_event'] = {
  init() {
    this.appendDummyInput()
        .appendField("<loadEvent> name:")
        .appendField(new FieldTextInput("EVENT_NAME"), "HS_LOAD");
    this.appendDummyInput()
        .appendField("seeded?")
        .appendField(new FieldCheckbox('TRUE'), "LOAD_SEED")
        .appendField("ignore unique?")
        .appendField(new FieldCheckbox('FALSE'), "LOAD_NOUNIQ")
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#545991");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['hs_load_event_list'] = {
  init() {
    this.appendDummyInput()
        .appendField("<loadEventList> seeded?")
        .appendField(new FieldCheckbox("TRUE"), "LOADEVENT_SEED")
        .appendField("load first entry?")
        .appendField(new FieldCheckbox("FALSE"), "LOADEVENT_FIRST")
    this.appendDummyInput()
        .appendField("generate?")
        .appendField(new FieldCheckbox('FALSE'), "LOADEVENT_GEN")
        .appendField("ignore unique?")
        .appendField(new FieldCheckbox('FALSE'), "LOADEVENT_NOUNIQ")
        .appendField("default:")
        .appendField(new FieldTextInput("EVENT"), "LOADEVENT_DEF");
    this.appendStatementInput("LOADEVENT_CHILDS")
        .setCheck("allowed_loadevent_childs");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#545991");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['hs_load_event_list_event'] = {
  init() {
    this.appendDummyInput()
        .appendField("<event>")
        .appendField("use load?")
        .appendField(new FieldCheckbox("TRUE"), "EVLIST_IS_LOAD");
    this.appendValueInput("EV_ATTRIBUTES")
        .setCheck("allowed_choice_attributes");
    this.appendDummyInput("EVLIST_LOAD_SECTION")
        .appendField("load:")
        .appendField(new FieldTextInput("EVENT_NAME"),"EVLIST_LOAD");
    this.setPreviousStatement(true, "allowed_loadevent_childs");
    this.setNextStatement(true, "allowed_loadevent_childs");
    this.setColour("#545991");
    this.setTooltip("");
    this.setHelpUrl("");
  },
  onchange() {
    if (this.getFieldValue("EVLIST_IS_LOAD") === "FALSE" && this.getFieldValue("EVLIST_LOAD") !== null){
      try{
        this.removeInput("EVLIST_LOAD_SECTION");
      }catch(e){};
      this.appendStatementInput("EVLIST_CHILDS")
          .setCheck("allowed_event_childs");
    }
    else if (this.getFieldValue("EVLIST_IS_LOAD") === "TRUE" && this.getFieldValue("EVLIST_LOAD") === null){
      try{
        this.removeInput("EVLIST_CHILDS");
      }catch(e){};
      this.appendDummyInput("EVLIST_LOAD_SECTION")
          .appendField("load:")
          .appendField(new FieldTextInput("EVENT_NAME"),"EVLIST_LOAD");
    }
  }
};

Blocks['revisit_event'] = {
  init() {
    this.appendDummyInput()
        .appendField("<revisitEvent> name:")
        .appendField(new FieldTextInput("NOTHING"), "HS_REVISIT");
    this.appendDummyInput()
        .appendField("seeded?")
        .appendField(new FieldCheckbox('TRUE'), "REVISIT_SEED")
        .appendField("ignore unique?")
        .appendField(new FieldCheckbox('FALSE'), "REVISIT_NOUNIQ")
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#545991");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['event_alias'] = {
  init() {
    this.appendDummyInput()
        .appendField("<eventAlias> alias name:")
        .appendField(new FieldTextInput("ALIAS"), "EVENT_ALIAS")
        .appendField("for:")
        .appendField(new FieldTextInput("EVENT_NAME"), "EVENT_ALIAS_FOR");
        this.appendDummyInput()
        .appendField("jump clear?")
        .appendField(new FieldCheckbox("FALSE"), "EVENT_A_JC")
        .appendField("once?")
        .appendField(new FieldCheckbox("FALSE"), "EVENT_A_ONCE")
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#545991");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['queue_event'] = {
  init() {
    this.appendDummyInput()
        .appendField("<queueEvent> name:")
        .appendField(new FieldTextInput("EVENT_NAME"), "HS_QUEUE")
        .appendField("seeded?")
        .appendField(new FieldCheckbox('TRUE'), "QUEUE_SEED");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#545991");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blocks['restart'] = {
  init() {
  this.appendDummyInput()
      .appendField('<restartEvent>')
  this.setPreviousStatement(true, 'allowed_event_childs');
  this.setNextStatement(true, 'allowed_event_childs');
  this.setColour('#545991');
  this.setTooltip('');
  this.setHelpUrl('');
  }
};

Blocks['rename_beacon'] = {
  init() {
    this.appendDummyInput()
        .appendField("<renameBeacon> name:")
        .appendField(new FieldTextInput("ALT_NAME"), "BEAC_RENAME");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#545991");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};



// ====TRIGGER===========
//======================
Blocks['jump_event'] = {
  init() {
    this.appendDummyInput()
        .appendField("<jumpEvent> load:")
        .appendField(new FieldTextInput("EVENT_NAME"), "JUMP_EVENT");
    this.appendDummyInput()
        .appendField("label:")
        .appendField(new FieldTextInput("LABEL"), "JUMP_LABEL")
        .appendField("loop?")
        .appendField(new FieldCheckbox('FALSE'), "JUMP_LOOP")
        .appendField("priority:")
        .appendField(new FieldNumber(0,0,Infinity,1), "JUMP_PRI")
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#0e1096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['jump_event_clear'] = {
  init() {
    this.appendDummyInput()
        .appendField("<clearJumpEvent> name:")
        .appendField(new FieldTextInput("LABEL"), "JUMP_C")
        .appendField("all?")
        .appendField(new FieldCheckbox("FALSE"), "JUMP_C_ALL")
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#0e1096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['death_event'] = {
  init() {
    this.appendDummyInput()
        .appendField("<deathEvent> load:")
        .appendField(new FieldTextInput("EVENT_NAME"), "DEATH_EVENT");
    this.appendDummyInput()
        .appendField("label:")
        .appendField(new FieldTextInput("LABEL"), "DEATH_LABEL")
        .appendField("jump clear?")
        .appendField(new FieldCheckbox('FALSE'), "DEATH_JUMPC")
        .appendField("this fight?")
        .appendField(new FieldCheckbox('FALSE'), "DEATH_FIGHT")
        .appendField("priority:")
        .appendField(new FieldNumber(0,0,Infinity,1), "DEATH_PRI")
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#0e1096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['death_event_clear'] = {
  init() {
    this.appendDummyInput()
        .appendField("<clearDeathEvent> name:")
        .appendField(new FieldTextInput("LABEL"), "DEATH_C")
        .appendField("all?")
        .appendField(new FieldCheckbox("FALSE"), "DEATH_C_ALL")
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#0e1096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['triggered_event'] = {
  init() {
    this.appendDummyInput()
        .appendField("<triggeredEvent> load:")
        .appendField(new FieldTextInput("EVENT_NAME"), "TRI_LOAD")
        .appendField("label:")
        .appendField(new FieldTextInput("LABEL"), "TRI_LABEL")
    this.appendDummyInput()
        .appendField("seeded?")
        .appendField(new FieldCheckbox('FALSE'), "TRI_SEED")
        .appendField("this fight?")
        .appendField(new FieldCheckbox('FALSE'), "TRI_THIS")
        .appendField("jump clear?")
        .appendField(new FieldCheckbox('FALSE'), "TRI_JUMPC")
        .appendField("loops:")
        .appendField(new FieldNumber(0,0,Infinity,1), "TRI_LOOPS");
    this.appendStatementInput("TRI_EV_CHILDS")
        .setCheck("allowed_trigEvent_childs");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#0e1096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['triggered_event_types'] = {
  init() {
    this.appendValueInput("TRI_TYPES_ATTRI")
        .setCheck("allowed_trigEvent_attributes")
        .appendField("<")
        .appendField(new FieldDropdown([
          ["time", "time"],
          ["jumps", "jumps"],
          ["playerHull", "playerHull"],
          ["enemyHull", "enemyHull"],
          ["playerCrew", "playerCrew"],
          ["enemyCrew", "enemyCrew"],
          ["playerDeaths", "playerDeaths"],
          ["enemyDeaths", "enemyDeaths"],
        ]), "TRI_TYPE")
        .appendField("> values:");
    this.setPreviousStatement(true, "allowed_trigEvent_attributes");
    this.setNextStatement(true, "allowed_trigEvent_attributes");
    this.setColour("#01377d");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['attri_trig_event_amount'] = {
  init() {
    this.appendValueInput("TRI_TYPES_ATTRI")
        .setCheck("allowed_trigEvent_attributes")
        .appendField("amount:")
        .appendField(new FieldNumber(0,-Infinity,Infinity,1), "TRI_AMT");
    this.setOutput(true, "allowed_trigEvent_attributes");
    this.setColour("#1ac2d9");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['attri_trig_event_minmax'] = {
  init() {
    this.appendValueInput("TRI_TYPES_ATTRI")
        .setCheck("allowed_trigEvent_attributes")
        .appendField("min:")
        .appendField(new FieldNumber(0,-Infinity,Infinity,1), "TRI_MIN")
        .appendField("max:")
        .appendField(new FieldNumber(0,-Infinity,Infinity,1), "TRI_MAX");
    this.setOutput(true, "allowed_trigEvent_attributes");
    this.setColour("#1ac2d9");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['attri_trig_event_scaling'] = {
  init() {
    this.appendValueInput("TRI_TYPES_ATTRI")
        .setCheck("allowed_trigEvent_attributes")
        .appendField("scaling:")
        .appendField(new FieldNumber(0,-Infinity,Infinity,1), "TRI_SCALE");
    this.setOutput(true, "allowed_trigEvent_attributes");
    this.setColour("#1ac2d9");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['attri_trig_event_countrepair'] = {
  init() {
    this.appendValueInput("TRI_TYPES_ATTRI")
        .setCheck("allowed_trigEvent_attributes")
        .appendField("countRepairs?")
        .appendField(new FieldCheckbox("TRUE"), "TRI_CNTREP");
    this.setOutput(true, "allowed_trigEvent_attributes");
    this.setColour("#1ac2d9");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['attri_trig_event_clonebay'] = {
  init() {
    this.appendValueInput("TRI_TYPES_ATTRI")
        .setCheck("allowed_trigEvent_attributes")
        .appendField("includeClonebay?")
        .appendField(new FieldCheckbox("TRUE"), "TRI_CLONE");
    this.setOutput(true, "allowed_trigEvent_attributes");
    this.setColour("#1ac2d9");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['attri_trig_event_countnew'] = {
  init() {
    this.appendValueInput("TRI_TYPES_ATTRI")
        .setCheck("allowed_trigEvent_attributes")
        .appendField("countNewCrew?")
        .appendField(new FieldCheckbox("TRUE"), "TRI_CNTNEW");
    this.setOutput(true, "allowed_trigEvent_attributes");
    this.setColour("#1ac2d9");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['triggered_event_box'] = {
  init() {
    this.appendDummyInput()
        .appendField("<triggeredEventBox> load:")
        .appendField(new FieldTextInput("DEFAULT_TIMER"), "TRI_BOX");
    this.setPreviousStatement(true, "allowed_trigEvent_childs");
    this.setNextStatement(true, "allowed_trigEvent_childs");
    this.setColour("#01377d");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['triggered_event_sounds'] = {
  init() {
    this.appendDummyInput()
        .appendField("<timerSounds> load:")
        .appendField(new FieldTextInput("DEFAULT_TIMER_SOUNDS"), "TRI_SOUND");
    this.setPreviousStatement(true, "allowed_trigEvent_childs");
    this.setNextStatement(true, "allowed_trigEvent_childs");
    this.setColour("#01377d");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['triggered_warning'] = {
  init() {
    this.appendDummyInput()
        .appendField("<warningMessage> img:")
        .appendField(new FieldTextInput("IMG"), "TRI_WARN")
        .appendField("x:")
        .appendField(new FieldNumber(0,-Infinity,Infinity,1), "TRI_WARN_X")
        .appendField("y:")
        .appendField(new FieldNumber(0,-Infinity,Infinity,1), "TRI_WARN_Y");
    this.appendDummyInput()
        .appendField("time:")
        .appendField(new FieldNumber(0,0,Infinity,1), "TRI_WARN_TIME")
        .appendField("center?")
        .appendField(new FieldCheckbox("TRUE"), "TRI_WARN_CENTER")
        .appendField("flash?")
        .appendField(new FieldCheckbox("TRUE"), "TRI_WARN_FL")
        .appendField("add 'warning'?")
        .appendField(new FieldCheckbox("TRUE"), "TRI_WARN_WARN");
    this.appendDummyInput()
        .appendField("color:")
        .appendField(new FieldColour("#00fff0"), "TRI_WARN_COLOR")
        .appendField("sound?")
        .appendField(new FieldTextInput("sound_id"), "TRI_WARN_SOUND")
        .appendField("text:")
        .appendField(new FieldTextInput("text"), 'TRI_WARN_TEXT')
    this.setPreviousStatement(true, "allowed_trigEvent_childs");
    this.setNextStatement(true, "allowed_trigEvent_childs");
    this.setColour("#01377d");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['triggered_event_mod'] = {
  init() {
    this.appendDummyInput()
        .appendField("<triggeredEventModifier> name:")
        .appendField(new FieldTextInput("LABEL"), "TRI_MOD")
        .appendField("type:")
        .appendField(new FieldDropdown([
          ["time", "time"],
          ["jumps", "jumps"],
          ["playerHull", "playerHull"],
          ["enemyHull", "enemyHull"],
          ["playerCrew", "playerCrew"],
          ["enemyCrew", "enemyCrew"],
          ["playerDeaths", "playerDeaths"],
          ["enemyDeaths", "enemyDeaths"],
        ]), "TRI_MOD_TYPE");
    this.appendDummyInput()
    .appendField("value:")
    .appendField(new FieldNumber(0,-Infinity,Infinity,1), "TRI_MOD_VAL")
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#0e1096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['triggered_event_clear'] = {
  init() {
    this.appendDummyInput()
        .appendField("<clearTriggeredEvent> name:")
        .appendField(new FieldTextInput("LABEL"), "TRI_C")
        .appendField("all?")
        .appendField(new FieldCheckbox("FALSE"), "TRI_C_ALL")
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#0e1096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};



// ====WARP===========
//======================
Blocks['secret_sector'] = {
  init() {
    this.appendDummyInput()
        .appendField("<secretSectorWarp> ID:")
        .appendField(new FieldTextInput("SEC_ID"), "SECRET_SEC");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#821400");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['goto_flagship'] = {
  init() {
    this.appendDummyInput()
        .appendField("<goToFlagship> at base?")
        .appendField(new FieldCheckbox("TRUE"), "GOTO_BASE")
        .appendField("all fleet?")
        .appendField(new FieldCheckbox("TRUE"), "GOTO_FLEET");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#821400");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['replace_sector'] = {
  init() {
    this.appendDummyInput()
        .appendField("<replaceSector> name:")
        .appendField(new FieldTextInput("SEC_ID"), "SEC_REPLACE");
    this.appendDummyInput()
        .appendField("replace with:")
        .appendField(new FieldTextInput("SEC_ID_NEW"), "SEC_REPLACE_NEW");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#821400");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};



// ====ITEMS===========
//======================
Blocks['check_cargo'] = {
  init() {
  this.appendDummyInput()
      .appendField('<checkCargo>')
  this.setPreviousStatement(true, 'allowed_event_childs');
  this.setNextStatement(true, 'allowed_event_childs');
  this.setColour('#059c2d');
  this.setTooltip('');
  this.setHelpUrl('');
  }
};

Blocks['hidden_aug'] = {
  init() {
  this.appendDummyInput()
      .appendField('<hiddenAug> name:')
      .appendField(new FieldTextInput("AUG_ID"), "HIDD_AUG")
  this.setPreviousStatement(true, 'allowed_event_childs');
  this.setNextStatement(true, 'allowed_event_childs');
  this.setColour('#059c2d');
  this.setTooltip('');
  this.setHelpUrl('');
  }
};

Blocks['remove_item'] = {
  init() {
  this.appendDummyInput()
      .appendField('<removeItem> name:')
      .appendField(new FieldTextInput("ITEM_ID"), "HS_REMOVE")
  this.setPreviousStatement(true, 'allowed_event_childs');
  this.setNextStatement(true, 'allowed_event_childs');
  this.setColour('#059c2d');
  this.setTooltip('');
  this.setHelpUrl('');
  }
};



// ====BACKGROUND===========
//======================
Blocks['change_background'] = {
  init() {
    this.appendDummyInput()
        .appendField("<changeBackground> img id:")
        .appendField(new FieldTextInput("BACK_IMG_ID"), "CHANGE_BG");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#530096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['back_object'] = {
  init() {
    this.appendDummyInput()
        .appendField("<backgroundObject> load:")
        .appendField(new FieldTextInput("OBJ_NAME"), "BACK_OBJ");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#530096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['back_object_clear'] = {
  init() {
    this.appendDummyInput()
        .appendField("<clearBackgroundObject> name:")
        .appendField(new FieldTextInput("OBJ_NAME"), "BACK_OBJ_C")
        .appendField("all?")
        .appendField(new FieldCheckbox("FALSE"), "BACK_OBJ_C_ALL")
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#530096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['back_object_trans'] = {
  init() {
    this.appendDummyInput()
        .appendField("<transformBackgroundObject> name:")
        .appendField(new FieldTextInput("OBJ_NAME"), "BACK_OBJ_T");
    this.appendDummyInput()
        .appendField("new name:")
        .appendField(new FieldTextInput("NEW_OBJ"), "BACK_OBJ_T_NEW")
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#530096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['event_button'] = {
  init() {
    this.appendDummyInput()
        .appendField("<eventButton> load:")
        .appendField(new FieldTextInput("BTN_NAME"), "EVENT_BTN");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#530096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['event_button_clear'] = {
  init() {
    this.appendDummyInput()
        .appendField("<clearEventButton> name:")
        .appendField(new FieldTextInput("BTN_NAME"), "EVENT_BTN_C")
        .appendField("all?")
        .appendField(new FieldCheckbox("FALSE"), "EVENT_BTN_C_ALL")
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#530096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['clear_fleet'] = {
  init() {
    this.appendDummyInput()
        .appendField("<clearCustomFleet>");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#530096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['remove_nebula'] = {
  init() {
    this.appendDummyInput()
        .appendField("<removeNebula>");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#530096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['remove_hazards'] = {
  init() {
    this.appendDummyInput()
        .appendField("<removeHazerds>");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#530096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};



// ====VARIABLE===========
//======================
Blocks['hs_variable'] = {
  init() {
  this.appendValueInput("VAR_ATTRI")
      .setCheck("allowed_var_attributes")
      .appendField('<variable> operation:')
      .appendField(new FieldDropdown([
        ["set", "set"],
        ["add", "add"],
        ["mul", "mul"],
        ["div", "div"],
        ["min", "min"],
        ["max", "max"],
      ]), "VAR_OP");
  this.setPreviousStatement(true, 'allowed_event_childs');
  this.setNextStatement(true, 'allowed_event_childs');
  this.setColour('#c76d00');
  this.setTooltip('');
  this.setHelpUrl('');
  }
};

Blocks['hs_meta_variable'] = {
  init() {
  this.appendValueInput("VAR_ATTRI")
      .setCheck("allowed_var_attributes")
      .appendField('<metaVariable> operation:')
      .appendField(new FieldDropdown([
        ["set", "set"],
        ["add", "add"],
        ["mul", "mul"],
        ["div", "div"],
        ["min", "min"],
        ["max", "max"],
      ]), "VAR_OP");
  this.setPreviousStatement(true, 'allowed_event_childs');
  this.setNextStatement(true, 'allowed_event_childs');
  this.setColour('#c76d00');
  this.setTooltip('');
  this.setHelpUrl('');
  }
};

Blocks['hs_temp_variable'] = {
  init() {
  this.appendValueInput("VAR_ATTRI")
      .setCheck("allowed_var_attributes")
      .appendField('<tempVariable> operation:')
      .appendField(new FieldDropdown([
        ["set", "set"],
        ["add", "add"],
        ["mul", "mul"],
        ["div", "div"],
        ["min", "min"],
        ["max", "max"],
      ]), "VAR_OP");
  this.setPreviousStatement(true, 'allowed_event_childs');
  this.setNextStatement(true, 'allowed_event_childs');
  this.setColour('#c76d00');
  this.setTooltip('');
  this.setHelpUrl('');
  }
};

Blocks['attri_var_name'] = {
  init() {
    this.appendValueInput("VAR_NAME_ATTRI")
        .setCheck("allowed_var_attributes")
        .appendField("name:")
        .appendField(new FieldTextInput("variable_name"), "VAR_NAME");
    this.setOutput(true, "allowed_var_attributes");
    this.setColour("#c4975c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['attri_var_val'] = {
  init() {
    this.appendValueInput("VAR_VAL_ATTRI")
        .setCheck("allowed_var_attributes")
        .appendField("value:")
        .appendField(new FieldNumber(0,-Infinity,Infinity,1), "VAR_VAL");
    this.setOutput(true, "allowed_var_attributes");
    this.setColour("#c4975c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['attri_var_minmax'] = {
  init() {
    this.appendValueInput("VAR_MINMAX_ATTRI")
        .setCheck("allowed_var_attributes")
        .appendField("min:")
        .appendField(new FieldNumber(0,-Infinity,Infinity,1), "VAR_MIN")
        .appendField("max:")
        .appendField(new FieldNumber(0,-Infinity,Infinity,1), "VAR_MAX");
    this.setOutput(true, "allowed_var_attributes");
    this.setColour("#c4975c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['attri_var_var'] = {
  init() {
    this.appendValueInput("VAR_VAR_ATTRI")
        .setCheck("allowed_var_attributes")
        .appendField("var:")
        .appendField(new FieldTextInput("var_id/req"), "VAR_VAR");
    this.setOutput(true, "allowed_var_attributes");
    this.setColour("#c4975c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};



// ====BEACON===========
//======================
Blocks['hs_beacon_type'] = {
  init() {
    this.appendDummyInput()
        .appendField("<beaconType> load:")
        .appendField(new FieldTextInput("DEFAULT"), "HS_BEAC_LOAD")
    this.appendDummyInput()
        .appendField("text:")
        .appendField(new FieldTextInput("LOCATION"), "HS_BEAC_TEXT")
        .appendField("req:")
        .appendField(new FieldTextInput("ITEM_ID"), "HS_BEAC_REQ");
    this.appendDummyInput()
        .appendField("global?")
        .appendField(new FieldCheckbox("FALSE"), "HS_BEAC_GL")
        .appendField("persist after visit?")
        .appendField(new FieldCheckbox("FALSE"), "HS_BEAC_PERS")
        .appendField("overide vanilla lable?")
        .appendField(new FieldCheckbox("TRUE"), "HS_BEAC_OVR");
    this.appendDummyInput()
        .appendField("<color>")
        .appendField(new FieldColour("#00ff00"), "HS_BEAC_COLOR")
        .appendField("alpha")
        .appendField(new FieldNumber(1, 0, 1, 0.1), "HS_BEAC_ALP");
    this.appendDummyInput()
        .appendField("<undiscoveredTooltip>")
        .appendField(new FieldTextInput("This is the location of..."), "HS_BEAC_UNEXP");
    this.appendDummyInput()
        .appendField("<unvisitedTooltip>")
        .appendField(new FieldTextInput("An unvisited location."), "HS_BEAC_UNVISIT");
    this.appendDummyInput()
        .appendField("<visitedTooltip>")
        .appendField(new FieldTextInput("Explored location. Nothing left of interest."), "HS_BEAC_VISIT");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#8f0373");
    this.setTooltip("");
    this.setHelpUrl("");
  }
}

Blocks['remove_store'] = {
  init() {
    this.appendDummyInput()
        .appendField("<removeStore>")
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#8f0373");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['prevent_quest'] = {
  init() {
    this.appendDummyInput()
        .appendField("<preventQuest>")
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#8f0373");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['no_quest_text'] = {
  init() {
    this.appendDummyInput()
        .appendField("<noQuestText>")
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#8f0373");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['prevent_fleet'] = {
  init() {
    this.appendDummyInput()
        .appendField("<preventFleet>")
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#8f0373");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['prevent_boss_fleet'] = {
  init() {
    this.appendDummyInput()
        .appendField("<preventBossFleet> last standing?")
        .appendField(new FieldCheckbox("TRUE"), "NO_BOSS_FLT");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#8f0373");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['run_from_fleet'] = {
  init() {
    this.appendDummyInput()
        .appendField("<runFromFleet> closest?")
        .appendField(new FieldCheckbox("TRUE"), "RUN_CLOSE");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#8f0373");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['hs_quest'] = {
  init() {
    this.appendDummyInput()
        .appendField("<quest> event:")
        .appendField(new FieldTextInput("EVENT_NAME"), "HS_QUEST_EVT")
        .appendField("allowed parameters");
    this.appendDummyInput()
        .appendField("no nebula?")
        .appendField(new FieldCheckbox("TRUE"), "HS_QUEST_NONEB")
        .appendField("nebula?")
        .appendField(new FieldCheckbox("TRUE"), "HS_QUEST_NEB")
        .appendField("load if nebula:")
        .appendField(new FieldTextInput("same"), "HS_QUEST_LOAD");
    this.appendDummyInput()
        .appendField("this sector?")
        .appendField(new FieldCheckbox("TRUE"), "HS_QUEST_THIS")
        .appendField("next sector?")
        .appendField(new FieldCheckbox("TRUE"), "HS_QUEST_NEXT")
        .appendField("sector8?")
        .appendField(new FieldCheckbox("TRUE"), "HS_QUEST_S8")
        .appendField("last stand?")
        .appendField(new FieldCheckbox("TRUE"), "HS_QUEST_LAST");
    this.appendDummyInput()
        .appendField("add nebula for target?")
        .appendField(new FieldCheckbox("TRUE"), "HS_QUEST_MAKENEB")
        .appendField("aggresive:")
        .appendField(new FieldDropdown([
          ["none","0"], 
          ["force spawn","1"], 
          ["force current sector","2"], 
        ]), "HS_QUEST_AGG")
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#8f0373");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};



// ====CREW===========
//======================
Blocks['allow_noslot'] = {
  init() {
  this.appendDummyInput()
      .appendField('<allowNoSlot>')
  this.setPreviousStatement(true, 'allowed_event_childs');
  this.setNextStatement(true, 'allowed_event_childs');
  this.setColour('#10b2ba');
  this.setTooltip('');
  this.setHelpUrl('');
  }
};

Blocks['block_noslot'] = {
  init() {
  this.appendDummyInput()
      .appendField('<blockNoSlot>')
  this.setPreviousStatement(true, 'allowed_event_childs');
  this.setNextStatement(true, 'allowed_event_childs');
  this.setColour('#10b2ba');
  this.setTooltip('');
  this.setHelpUrl('');
  }
};

Blocks['require_crew'] = {
  init() {
  this.appendDummyInput()
      .appendField('<choiceRequiresCrew>')
  this.setPreviousStatement(true, 'allowed_event_childs');
  this.setNextStatement(true, 'allowed_event_childs');
  this.setColour('#10b2ba');
  this.setTooltip('');
  this.setHelpUrl('');
  }
};

Blocks['transform_race'] = {
  init() {
  this.appendDummyInput()
      .appendField('<transformRace> orig:')
      .appendField(new FieldTextInput("race_id"), "TRANS_ORIG")
      .appendField("new:")
      .appendField(new FieldTextInput("n_race_id"), "TRANS_NEW");
  this.setPreviousStatement(true, 'allowed_event_childs');
  this.setNextStatement(true, 'allowed_event_childs');
  this.setColour('#10b2ba');
  this.setTooltip('');
  this.setHelpUrl('');
  }
};



// ====PLAYER SHIP===========
//======================
Blocks['reset_ftl'] = {
  init() {
  this.appendDummyInput()
      .appendField('<resetFtl>')
  this.setPreviousStatement(true, 'allowed_event_childs');
  this.setNextStatement(true, 'allowed_event_childs');
  this.setColour('#96921d');
  this.setTooltip('');
  this.setHelpUrl('');
  }
};

Blocks['repair_allsys'] = {
  init() {
  this.appendDummyInput()
      .appendField('<repairAllSystems>')
  this.setPreviousStatement(true, 'allowed_event_childs');
  this.setNextStatement(true, 'allowed_event_childs');
  this.setColour('#96921d');
  this.setTooltip('');
  this.setHelpUrl('');
  }
};

Blocks['kill_boarders'] = {
  init() {
  this.appendDummyInput()
      .appendField('<killEnemyBoarders>')
  this.setPreviousStatement(true, 'allowed_event_childs');
  this.setNextStatement(true, 'allowed_event_childs');
  this.setColour('#96921d');
  this.setTooltip('');
  this.setHelpUrl('');
  }
};

Blocks['recall_boarders'] = {
  init() {
  this.appendDummyInput()
      .appendField('<recallBoarders> from')
      .appendField(new FieldDropdown([
        ["player","player"], 
        ["enemy","enemy"], 
        ["both","both"], 
      ]), "RECALL_SHIP");
  this.setPreviousStatement(true, 'allowed_event_childs');
  this.setNextStatement(true, 'allowed_event_childs');
  this.setColour('#96921d');
  this.setTooltip('');
  this.setHelpUrl('');
  }
};



// ====EMENY SHIP===========
//======================
Blocks['instant_esc'] = {
  init() {
  this.appendDummyInput()
      .appendField('<instantEscape>')
  this.setPreviousStatement(true, 'allowed_event_childs');
  this.setNextStatement(true, 'allowed_event_childs');
  this.setColour('#619123');
  this.setTooltip('');
  this.setHelpUrl('');
  }
};

Blocks['escape_load'] = {
  init() {
  this.appendDummyInput()
      .appendField('<escape> load default event?')
      .appendField(new FieldCheckbox("FALSE"), "HS_ESC")
      .appendField("force?")
      .appendField(new FieldCheckbox("FALSE"), "HS_ESC_FORCE")
  this.setPreviousStatement(true, 'allowed_event_childs');
  this.setNextStatement(true, 'allowed_event_childs');
  this.setColour('#619123');
  this.setTooltip('');
  this.setHelpUrl('');
  }
};

Blocks['surrender_load'] = {
  init() {
  this.appendDummyInput()
      .appendField('<surrender> load default event?')
      .appendField(new FieldCheckbox("FALSE"), "HS_SUR")
      .appendField("force?")
      .appendField(new FieldCheckbox("FALSE"), "HS_SUR_FORCE")
  this.setPreviousStatement(true, 'allowed_event_childs');
  this.setNextStatement(true, 'allowed_event_childs');
  this.setColour('#619123');
  this.setTooltip('');
  this.setHelpUrl('');
  }
};

Blocks['disable_surrender'] = {
  init() {
  this.appendDummyInput()
      .appendField('<disableSurrender>')
      .appendField("force?")
      .appendField(new FieldCheckbox("FALSE"), "HS_NOSUR_FORCE");
  this.setPreviousStatement(true, 'allowed_event_childs');
  this.setNextStatement(true, 'allowed_event_childs');
  this.setColour('#619123');
  this.setTooltip('');
  this.setHelpUrl('');
  }
};

Blocks['disable_esc'] = {
  init() {
  this.appendDummyInput()
      .appendField('<disableEscape>')
      .appendField("force?")
      .appendField(new FieldCheckbox("FALSE"), "HS_NOESC_FORCE");
  this.setPreviousStatement(true, 'allowed_event_childs');
  this.setNextStatement(true, 'allowed_event_childs');
  this.setColour('#619123');
  this.setTooltip('');
  this.setHelpUrl('');
  }
};

Blocks['enemy_damage'] = {
  init() {
    this.appendValueInput("DAMAGE_ATTRIBUTES")
        .setCheck("allowed_dmg_attributes")
        .appendField("<enemyDamage> amount:")
        .appendField(new FieldNumber(0, -Infinity, Infinity, 1), "DAMAGE_E_AMOUNT");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setInputsInline(false);
    this.setColour("#619123");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['attri_damage_extra'] = {
  init() {
    this.appendValueInput("DAMAGE_EXT")
        .setCheck("allowed_dmg_attributes")
        .appendField("bypass resist?")
        .appendField(new FieldCheckbox("FALSE"), "DMG_FORCE")
        .appendField("damage hull?")
        .appendField(new FieldCheckbox("TRUE"), "DMG_HULL")
    this.setOutput(true, "allowed_dmg_attributes");
    this.setColour("#c48c04");
    this.setTooltip("");
    this.setHelpUrl("");
  }
}



// ====SURGES===========
//======================
Blocks['super_drones'] = {
  init() {
    this.appendDummyInput()
        .appendField("<superDrones> for player?")
        .appendField(new FieldCheckbox("TRUE"), "SURGE_D_PLAYER")
        .appendField("name:")
        .appendField(new FieldTextInput("drn_surge_name"), "SURGE_D_NAME");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#8a8a63");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['super_barrage'] = {
  init() {
    this.appendDummyInput()
        .appendField("<superBarrage> for player?")
        .appendField(new FieldCheckbox("TRUE"), "SURGE_B_PLAYER")
        .appendField("name:")
        .appendField(new FieldTextInput("surge_name"), "SURGE_B_NAME");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#8a8a63");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['super_shields'] = {
  init() {
    this.appendDummyInput()
        .appendField("<superShields> for player?")
        .appendField(new FieldCheckbox("TRUE"), "SURGE_S_PLAYER")
        .appendField("amount:")
        .appendField(new FieldNumber(0,12,Infinity,1), "SURGE_S_AMT")
        .appendField("add:")
        .appendField(new FieldNumber(0,0,Infinity,1), "SURGE_S_ADD");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#8a8a63");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['super_drones_clear'] = {
  init() {
    this.appendDummyInput()
        .appendField("<clearSuperDrones> for player?")
        .appendField(new FieldCheckbox("TRUE"), "SURGE_DC_PLAYER");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#8a8a63");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};



// ====UNLOCKS===========
//======================
Blocks['unlock_ship'] = {
  init() {
    this.appendDummyInput()
        .appendField("<unlockCustomShip> silent?")
        .appendField(new FieldCheckbox("TRUE"), "UNLOCK_S")
        .appendField("ship req:")
        .appendField(new FieldTextInput("PLAYER_SHIP"), "UNLOCK_REQ");
    this.appendDummyInput()
        .appendField("unlocked ship:")
        .appendField(new FieldTextInput("PLAYER_SHIP_ID"), "UNLOCK_SHIP")
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#679967");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['achievement'] = {
  init() {
    this.appendDummyInput()
        .appendField("<achievement> silent?")
        .appendField(new FieldCheckbox("TRUE"), "ACH_S")
        .appendField("ID:")
        .appendField(new FieldTextInput("ACH_ID"), "ACH_ID");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#679967");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};



// ====MISC===========
//======================
Blocks['disableScrapScore'] = {
  init() {
    this.appendDummyInput()
        .appendField("<disableScrapScore>");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#101f2c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['disableScrapAugments'] = {
  init() {
    this.appendDummyInput()
        .appendField("<disableScrapAugments>");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#101f2c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['playSound'] = {
  init() {
    this.appendDummyInput()
        .appendField("<playSound> name:")
        .appendField(new FieldTextInput("sound_eff"), "SOUND");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#101f2c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['playMusic'] = {
  init() {
    this.appendDummyInput()
        .appendField("<playMusic> name:")
        .appendField(new FieldTextInput("track_name"), "MUSIC");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#101f2c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['win'] = {
  init() {
    this.appendDummyInput()
        .appendField("<win> text:")
        .appendField(new FieldTextInput("You win"), "WIN_TEXT");
    this.appendDummyInput()
        .appendField("credits text:")
        .appendField(new FieldTextInput("def_text_id"), "WIN_CR_TEXT")
        .appendField("credits background:")
        .appendField(new FieldTextInput("IMG_ID"), "WIN_CRBG");
    this.appendDummyInput()
        .appendField("sound:")
        .appendField(new FieldTextInput("victory"), "WIN_SOUND")
        .appendField("music:")
        .appendField(new FieldTextInput("title"), "WIN_MUSIC");
    this.appendDummyInput()
        .appendField("achievement:")
        .appendField(new FieldTextInput("ach_id"), "WIN_ACH");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#101f2c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blocks['lose'] = {
  init() {
    this.appendDummyInput()
        .appendField("<lose> text:")
        .appendField(new FieldTextInput("You lost"), "L_TEXT");
    this.appendDummyInput()
        .appendField("sound:")
        .appendField(new FieldTextInput("none"), "L_SOUND");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#101f2c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};




