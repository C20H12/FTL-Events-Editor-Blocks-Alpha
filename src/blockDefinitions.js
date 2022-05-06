import * as Blockly from "blockly";
import {ContinuousToolbox, ContinuousFlyout, ContinuousMetrics} from '@blockly/continuous-toolbox';

// -------------------------------
// EVENT RELATED CATEGORY---------
// -------------------------------
Blockly.Blocks['event'] = {
  init() {
    this.appendDummyInput()
        .appendField("<event>")
        .appendField(new Blockly.FieldTextInput("NAME"), "eventName")
        .appendField("Unique?")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "UNIQ");
    this.appendStatementInput("EVENT_CHILDS")
        .setCheck("allowed_event_childs");
    this.setColour("#006092");
    this.setTooltip("FTL Event Declaration");
    this.setHelpUrl("https://docs.google.com/document/d/1N2Nlfr-bMiKlABjVQboRg_MIec-BvQRp-_9VHN6wGgE/edit#heading=h.7cnvp7x7fika");
  }
};

Blockly.Blocks['choice'] = {
  init() {
    this.appendDummyInput()
        .appendField("<choice>")
        .appendField("Hidden?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "hidden");
    this.appendStatementInput("CHOICE_S")
        .setCheck("allowed_choice_childs");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#865e5b");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['event_nested'] = {
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

Blockly.Blocks['event_load'] = {
  init() {
    this.appendDummyInput()
        .appendField("<event> Load")
        .appendField(new Blockly.FieldTextInput("EVENT_NAME"), "LDEVENT");
    this.setPreviousStatement(true, "allowed_choice_childs");
    this.setNextStatement(true, "allowed_choice_childs");
    this.setColour("#006092");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['event_end'] = {
  init() {
    this.appendDummyInput()
        .appendField("<event/>");
    this.setPreviousStatement(true, "allowed_choice_childs");
    this.setColour("#006092");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['event_list'] = {
  init() {
    this.appendDummyInput()
        .appendField("<eventList> Name")
        .appendField(new Blockly.FieldTextInput("LIST_NAME"), "EVLIST_NAME");
    this.appendStatementInput("EVLIST")
        .setCheck("allowed_choice_childs");
    this.setColour("#006092");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// generators------------------------
Blockly.JavaScript['event'] = block => {
  let text_eventname = block.getFieldValue('eventName');
  let statements_name = Blockly.JavaScript.statementToCode(block, 'EVENT_CHILDS');
  let checkbox_uniq = block.getFieldValue('UNIQ') === 'TRUE';
  let code = '';
  if (checkbox_uniq){
    code = `<event name="${text_eventname.toUpperCase()}" unique="${checkbox_uniq}">\n${statements_name}</event>\n`;
  }else{
    code = `<event name="${text_eventname.toUpperCase()}">\n${statements_name}</event>\n`;
  }
  return code;
};

Blockly.JavaScript['choice'] = block => {
  let checkbox_hidden = block.getFieldValue('hidden') === 'TRUE';
  let statements_name = Blockly.JavaScript.statementToCode(block, 'CHOICE_S');
  let code = '';
  if (checkbox_hidden){
    code = `<choice hidden="${checkbox_hidden}">\n${statements_name}</choice>
`;
  }else{
    code = `<choice>\n${statements_name}</choice>\n`;
  }
  return code;
};

Blockly.JavaScript['event_nested'] = block => {
  let statements_name = Blockly.JavaScript.statementToCode(block, 'EVENT_N');
  let code = `<event>\n${statements_name}</event>\n`;
  return code;
}

Blockly.JavaScript['event_load'] = block => {
  let text_ldevent = block.getFieldValue('LDEVENT');
  let code = `<event load="${text_ldevent.toUpperCase()}"/>\n`;
  return code;
};

Blockly.JavaScript['event_end'] = function(_block) {
  let code = '<event/>\n';
  return code;
};

Blockly.JavaScript['event_list'] = block => {
  let text_evlist_name = block.getFieldValue('EVLIST_NAME');
  let statements_evlist = Blockly.JavaScript.statementToCode(block, 'EVLIST');
  let code = `<eventList name="${text_evlist_name.toUpperCase()}">\n${statements_evlist}</eventList>\n`;
  return code;
};



// -------------------------------
// CHOICE AND CHOICE ATTRIBUTES CATEGORY---------
// -------------------------------

Blockly.Blocks['choice_adv'] = {
  init() {
    this.appendValueInput("ATTRIBUTES")
        .setCheck("allowed_choice_attributes")
        .appendField("<choice>")
        .appendField("Hidden?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "HIDD2");
    this.appendStatementInput("CHOICE")
        .setCheck("allowed_choice_childs");
    this.appendDummyInput()
        .appendField("No Blue?")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "BLUE");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#865e5b");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['attri_req'] = {
  init() {
    this.appendValueInput("REQ1")
        .setCheck("allowed_choice_attributes")
        .appendField("Require")
        .appendField(new Blockly.FieldTextInput("ITEM_ID"), "REQ");
    this.setOutput(true, "allowed_choice_attributes");
    this.setColour("#963a33");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['attri_lvl'] = {
  init() {
    this.appendValueInput("LVL1")
        .setCheck("allowed_choice_attributes")
        .appendField("Level")
        .appendField(new Blockly.FieldNumber(0), "LVL");
    this.setOutput(true, "allowed_choice_attributes");
    this.setColour("#963a33");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['attri_maxlvl'] = {
  init() {
    this.appendValueInput("MAX")
        .setCheck("allowed_choice_attributes")
        .appendField("Max Level")
        .appendField(new Blockly.FieldNumber(0), "MAX_LVL");
    this.setOutput(true, "allowed_choice_attributes");
    this.setColour("#963a33");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['attri_maxgp'] = {
  init() {
    this.appendValueInput("MAXGRP")
        .setCheck("allowed_choice_attributes")
        .appendField("Max Group")
        .appendField(new Blockly.FieldNumber(0), "MAX_GROUP");
    this.setOutput(true, "allowed_choice_attributes");
    this.setColour("#963a33");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

//generators-----------------------
Blockly.JavaScript['choice_adv'] = block => {
  let value_attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC);
  let checkbox_hidd2 = block.getFieldValue('HIDD2') === 'TRUE';
  let statements_choice = Blockly.JavaScript.statementToCode(block, 'CHOICE');
  let checkbox_blue = block.getFieldValue('BLUE') === 'TRUE';
  let code = '';
  if (checkbox_blue&&checkbox_hidd2){
    code = `<choice hidden="${checkbox_hidd2}" blue="${!checkbox_blue}"${value_attributes}>\n${statements_choice}</choice>\n`;
  }else if (!checkbox_blue&&checkbox_hidd2){
    code = `<choice hidden="${checkbox_hidd2}"${value_attributes}>\n${statements_choice}</choice>\n`;
  }else if (checkbox_blue&&!checkbox_hidd2){
    code = `<choice blue="${!checkbox_hidd2}"${value_attributes}>\n${statements_choice}</choice>\n`;
  }else{
    code = `<choice${value_attributes}>\n${statements_choice}</choice>\n`;
  }
  return code;
};

Blockly.JavaScript['attri_req'] = block => {
  let text_req = block.getFieldValue('REQ');
  let value_req1 = Blockly.JavaScript.valueToCode(block, 'REQ1', Blockly.JavaScript.ORDER_ATOMIC);
  let code = ` req="${text_req}"${value_req1}`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['attri_lvl'] = block => {
  let number_lvl = block.getFieldValue('LVL');
  let value_lvl1 = Blockly.JavaScript.valueToCode(block, 'LVL1', Blockly.JavaScript.ORDER_ATOMIC);
  let code = ` lvl="${number_lvl}"${value_lvl1}`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['attri_maxlvl'] = block => {
  let number_max_lvl = block.getFieldValue('MAX_LVL');
  let value_max = Blockly.JavaScript.valueToCode(block, 'MAX', Blockly.JavaScript.ORDER_ATOMIC);
  let code = ` max_lvl="${number_max_lvl}"${value_max}`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['attri_maxgp'] = block => {
  let number_max_group = block.getFieldValue('MAX_GROUP');
  let value_maxgrp = Blockly.JavaScript.valueToCode(block, 'MAXGRP', Blockly.JavaScript.ORDER_ATOMIC);
  let code = ` max_group="${number_max_group}"${value_maxgrp}`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};



// -------------------------------
// TEXT RELATED CATEGORY---------
// -------------------------------

Blockly.Blocks['text'] = {
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
        .appendField(new Blockly.FieldTextInput("Insert your EVENT text here!", validate), "textTag");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#a0a2ab");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['text_choice'] = {
  init() {
    this.appendDummyInput()
        .appendField("<text>")
        .appendField(new Blockly.FieldTextInput("Insert your CHOICE text here!"), "textTag");
    this.setPreviousStatement(true, "allowed_choice_childs");
    this.setNextStatement(true, "allowed_choice_childs");
    this.setColour("#a0a2ab");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['text_txlist'] = {
  init() {
    this.appendDummyInput()
        .appendField("<text>")
        .appendField(new Blockly.FieldTextInput("Insert your TEXTLIST text here!"), "textTag");
    this.setPreviousStatement(true, "allowed_text");
    this.setNextStatement(true, "allowed_text");
    this.setColour("#a0a2ab");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['text_list'] = {
  init() {
    this.appendDummyInput()
        .appendField("<textList> Name")
        .appendField(new Blockly.FieldTextInput("TEXT_LIST_NAME"), "TXLT_NAME");
    this.appendStatementInput("TXLIST")
        .setCheck("allowed_text");
    this.setColour("#a0a2ab");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['text_load'] = {
  init() {
    this.appendDummyInput()
        .appendField("<text> Load")
        .appendField(new Blockly.FieldTextInput("TEXT_LIST_NAME"), "TXLOAD");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#a0a2ab");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['text_load_choice'] = {
  init() {
    this.appendDummyInput()
        .appendField("<text> Load")
        .appendField(new Blockly.FieldTextInput("TEXT_LIST_NAME"), "TXLOAD");
    this.setPreviousStatement(true, "allowed_choice_childs");
    this.setNextStatement(true, "allowed_choice_childs");
    this.setColour("#a0a2ab");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// generators--------------------
Blockly.JavaScript['text'] = block => {
  let text_texttag = block.getFieldValue('textTag');
  let code = `<text>${text_texttag}</text>\n`;
  return code;
};

Blockly.JavaScript['text_choice'] = block => {
  let text_texttag = block.getFieldValue('textTag');
  let code = `<text>${text_texttag}</text>\n`;
  return code;
};

Blockly.JavaScript['text_txlist'] = block => {
  let text_texttag = block.getFieldValue('textTag');
  let code = `<text>${text_texttag}</text>\n`;
  return code;
};

Blockly.JavaScript['text_list'] = block => {
  let text_txlt_name = block.getFieldValue('TXLT_NAME');
  let statements_txlist = Blockly.JavaScript.statementToCode(block, 'TXLIST');
  let code = `<textList name="${text_txlt_name.toUpperCase()}">\n${statements_txlist}</textList>\n`;
  return code;
};

Blockly.JavaScript['text_load'] = block => {
  let text_txload = block.getFieldValue('TXLOAD');
  let code = `<text load="${text_txload.toUpperCase()}"/>\n`;
  return code;
};

Blockly.JavaScript['text_load_choice'] = block => {
  let text_txload = block.getFieldValue('TXLOAD');
  let code = `<text load="${text_txload.toUpperCase()}"/>\n`;
  return code;
};



// -------------------------------
// REWARDS CATEGORY---------
// -------------------------------

Blockly.Blocks['reward_auto'] = {
  init() {
    this.appendDummyInput()
        .appendField("<autoReward> Level:")
        .appendField(new Blockly.FieldDropdown([
          ["HIGH","HIGH"], 
          ["MED","MED"], 
          ["LOW","LOW"], 
          ["RANDOM","RANDOM"]
        ]), "REWARD_LEVEL")
        .appendField("Type:")
        .appendField(new Blockly.FieldDropdown([
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

Blockly.Blocks['item_modify'] = {
  init() {
    this.appendDummyInput()
        .appendField("<item_modify> Steal?")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "ITEM_STEAL");
    this.appendStatementInput("ITEM_MODIFY_CHILDS")
        .setCheck("allowed_item_childs");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#084ac4");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['item'] = {
  init() {
    this.appendDummyInput()
        .appendField("<item> type:")
        .appendField(new Blockly.FieldDropdown([
          ["scrap","scrap"], 
          ["fuel","fuel"], 
          ["missiles","missiles"], 
          ["drones","drones"]
        ]), "ITEM_TYPE")
        .appendField("min:")
        .appendField(new Blockly.FieldNumber(0, -Infinity, Infinity, 1), "ITEM_MIN")
        .appendField("max:")
        .appendField(new Blockly.FieldNumber(0, -Infinity, Infinity, 1), "ITEM_MAX");
    this.setPreviousStatement(true, "allowed_item_childs");
    this.setNextStatement(true, "allowed_item_childs");
    this.setColour("#486eb5");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// generators--------------------
Blockly.JavaScript['reward_auto'] = block => {
  let dropdown_reward_level = block.getFieldValue('REWARD_LEVEL');
  let dropdown_reward_type = block.getFieldValue('REWARD_TYPE');
  let code = `<autoReward level="${dropdown_reward_level}">${dropdown_reward_type}</autoReward>\n`;
  return code;
};

Blockly.JavaScript['item_modify'] = block => {
  let checkbox_item_steal = block.getFieldValue('ITEM_STEAL') === 'TRUE';
  let statements_item_modify_childs = Blockly.JavaScript.statementToCode(block, 'ITEM_MODIFY_CHILDS');
  let code;
  if (checkbox_item_steal){
    code = `<item_modify steal="true">\n${statements_item_modify_childs}</item_modify>\n`;    
  }else{
    code = `<item_modify>\n${statements_item_modify_childs}</item_modify>\n`;
  }
  return code;
};

Blockly.JavaScript['item'] = block => {
  let dropdown_item_type = block.getFieldValue('ITEM_TYPE');
  let number_item_max = block.getFieldValue('ITEM_MAX');
  let number_item_min = block.getFieldValue('ITEM_MIN');
  let code = `<item type="${dropdown_item_type}" min="${number_item_min}" max="${number_item_max}"/>
`;
  return code;
};



// -------------------------------
// EQUIPMENTS CATEGORY---------
// -------------------------------

Blockly.Blocks['reward_weapon'] = {
  init() {
    this.appendDummyInput()
        .appendField("<weapon> name")
        .appendField(new Blockly.FieldTextInput("WEP_ITEM_ID"), "WEAPON_NAME");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#059c2d");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['reward_augment'] = {
  init() {
    this.appendDummyInput()
        .appendField("<augment> name")
        .appendField(new Blockly.FieldTextInput("AUG_ITEM_ID"), "AUG_NAME");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#059c2d");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['reward_drone'] = {
  init() {
    this.appendDummyInput()
        .appendField("<drone> name")
        .appendField(new Blockly.FieldTextInput("DRN_ITEM_ID"), "DRONE_NAME");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#059c2d");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['remove'] = {
  init() {
    this.appendDummyInput()
        .appendField("<remove> name")
        .appendField(new Blockly.FieldTextInput("ITEM_ID"), "REMOVE_NAME");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#059c2d");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// generators-----------------

Blockly.JavaScript['reward_weapon'] = block => {
  let text_weapon_name = block.getFieldValue('WEAPON_NAME');
  let code = `<weapon name="${text_weapon_name}" />\n`;
  return code;
};

Blockly.JavaScript['reward_augment'] = block => {
  let text_weapon_name = block.getFieldValue('AUG_NAME');
  let code = `<augment name="${text_weapon_name}" />\n`;
  return code;
};

Blockly.JavaScript['reward_drone'] = block => {
  let text_weapon_name = block.getFieldValue('DRONE_NAME');
  let code = `<drone name="${text_weapon_name}" />\n`;
  return code;
};

Blockly.JavaScript['remove'] = block => {
  let text_remove_name = block.getFieldValue('REMOVE_NAME');
  let code = `<remove name="${text_remove_name}" />\n`;
  return code;
};



// -------------------------------
// CREW RELATED CATEGORY---------
// -------------------------------

Blockly.Blocks['boarders'] = {
  init() {
    this.appendDummyInput()
        .appendField("<boarders> min:")
        .appendField(new Blockly.FieldNumber(0, -Infinity, Infinity, 1), "MIN")
        .appendField("max:")
        .appendField(new Blockly.FieldNumber(0, -Infinity, Infinity, 1), "MAX")
        .appendField("race:")
        .appendField(new Blockly.FieldTextInput("random"), "RACE");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#00949c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['crew_member'] = {
  init() {
    this.appendValueInput("CREW_SKILLS")
        .setCheck("allowed_attribute_crew")
        .appendField("<crewMember> amount:")
        .appendField(new Blockly.FieldNumber(0, -1, Infinity, 1), "AMOUNT")
        .appendField("race:")
        .appendField(new Blockly.FieldTextInput("random"), "RACE");
    this.appendDummyInput()
        .appendField("default name:")
        .appendField(new Blockly.FieldTextInput("none"), "CREW_NAME");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setInputsInline(false);
    this.setColour("#00949c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['attri_crew_skill'] = {
  init() {
    this.appendDummyInput()
        .appendField("skilled at:")
        .appendField(new Blockly.FieldDropdown([
          ["weapons","weapons"], 
          ["shields","shields"], 
          ["pilot","pilot"], 
          ["engines","engines"], 
          ["combat", "combat"], 
          ["repair", "repair"], 
          ["all_skills", "all_skills"],
        ]), "SKILL_AREA")
        .appendField("skill lvl:")
        .appendField(new Blockly.FieldNumber(0, 0, 2, 1), "SKILL_LVL");
    this.setOutput(true, "allowed_attribute_crew");
    this.setColour("#1aba9d");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['remove_crew'] = {
  init() {
    this.appendDummyInput()
        .appendField("<removeCrew> race:")
        .appendField(new Blockly.FieldTextInput("random"), "REMOVE_RACE");
    this.appendDummyInput()
        .appendField("allow clone?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "CLONE")
        .appendField("text:")
        .appendField(new Blockly.FieldTextInput("Your clonebay worked / didn't work."), "CLONE_TEXT");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#00949c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
}

//generators-------------------
Blockly.JavaScript['boarders'] = block => {
  let number_min = block.getFieldValue('MIN');
  let number_max = block.getFieldValue('MAX');
  let text_race = block.getFieldValue('RACE');
  let code = `<boarders min="${number_min}" max="${number_max}" class="${text_race}"/>\n`;
  return code;
};

Blockly.JavaScript['crew_member'] = block => {
  let number_amount = block.getFieldValue("AMOUNT");
  let text_race = block.getFieldValue('RACE');
  let value_attributes = Blockly.JavaScript.valueToCode(block, 'CREW_SKILLS', Blockly.JavaScript.ORDER_ATOMIC);
  let text_crew_name = block.getFieldValue("CREW_NAME");
  if (number_amount==-1) text_race = "traitor";

  let code;
  if (text_crew_name=="none"){
    code = `<crewMember amount="${number_amount}" class="${text_race}" ${value_attributes}/>\n`;
  }else{
    code = `<crewMember amount="${number_amount}" class="${text_race}" ${value_attributes}>${text_crew_name}</crewMember>\n`;
  }
  return code;
};

Blockly.JavaScript['attri_crew_skill'] = block => {
  let dropdown_skill = block.getFieldValue("SKILL_AREA");
  let number_skill_lvl = block.getFieldValue('SKILL_LVL');
  let code = `${dropdown_skill}="${number_skill_lvl}"`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['remove_crew'] = block => {
  let text_race_remove = block.getFieldValue("REMOVE_RACE");
  let checkbox_clone = block.getFieldValue("CLONE");
  let text_clone_text = block.getFieldValue("CLONE_TEXT");
  let code = `<removeCrew class="${text_race_remove}">
  <clone>${checkbox_clone.toLowerCase()}</clone>
  <text>${text_clone_text}</text>\n</removeCrew>\n`;
  return code;
}



// -------------------------------
// SHIP RELATED CATEGORY---------
// -------------------------------

Blockly.Blocks['damage'] = {
  init() {
    this.appendValueInput("DAMAGE_ATTRIBUTES")
        .setCheck("allowed_dmg_attributes")
        .appendField("<damage> amount:")
        .appendField(new Blockly.FieldNumber(0, -Infinity, Infinity, 1), "DAMAGE_AMOUNT");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setInputsInline(false);
    this.setColour("#96921d");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['attri_damage_system'] = {
  init() {
    this.appendValueInput("DAMAGE_EFF")
        .setCheck("allowed_dmg_attributes")
        .appendField("system:")
        .appendField(new Blockly.FieldDropdown([
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

Blockly.Blocks['attri_damage_effect'] = {
  init() {
    this.appendValueInput("DAMAGE_SYS")
        .setCheck("allowed_dmg_attributes")
        .appendField("extra effect:")
        .appendField(new Blockly.FieldDropdown([
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

Blockly.Blocks['status'] = {
  init() {
    this.appendDummyInput()
        .appendField("<status> type:")
        .appendField(new Blockly.FieldDropdown([
          ["loss","loss"], 
          ["divide","divide"], 
          ["limit","limit"], 
          ["clear", "clear"], 
        ]), "STATUS_TYPE")
        .appendField("target:")
        .appendField(new Blockly.FieldDropdown([
          ["player","player"], 
          ["enemy","enemy"], 
          ["all","all"], 
        ]), "STATUS_TARGET");
    this.appendDummyInput()
        .appendField("system:")
        .appendField(new Blockly.FieldDropdown([
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
        .appendField(new Blockly.FieldNumber(0, 0, Infinity, 1), "STATUS_AMOUNT");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#96921d");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['upgrade'] = {
  init() {
    this.appendDummyInput()
        .appendField("<upgrade> amount:")
        .appendField(new Blockly.FieldNumber(0, 0, Infinity, 1), "UPG_AMOUNT")
        .appendField("system:")
        .appendField(new Blockly.FieldDropdown([
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

Blockly.Blocks['system'] = {
  init() {
    this.appendDummyInput()
        .appendField("<system> name:")
        .appendField(new Blockly.FieldDropdown([
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

// generators-------

Blockly.JavaScript['damage'] = block => {
  let number_dmg_amount = block.getFieldValue("DAMAGE_AMOUNT");
  let value_dmg_attributes = Blockly.JavaScript.valueToCode(block, 'DAMAGE_ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC);
  let code = `<damage amount="${number_dmg_amount}" ${value_dmg_attributes}/>\n`;
  return code;
};

Blockly.JavaScript['attri_damage_system'] = block => {
  let dropdown_damage_room = block.getFieldValue("DAMAGE_ROOM");
  let value_more_attributes = Blockly.JavaScript.valueToCode(block, 'DAMAGE_EFF', Blockly.JavaScript.ORDER_ATOMIC);
  let code = `system="${dropdown_damage_room}" ${value_more_attributes}`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['attri_damage_effect'] = block => {
  let dropdown_damage_eff = block.getFieldValue("DAMAGE_EFFECT");
  let value_more_attributes = Blockly.JavaScript.valueToCode(block, 'DAMAGE_SYS', Blockly.JavaScript.ORDER_ATOMIC);
  let code = `effect="${dropdown_damage_eff}" ${value_more_attributes}`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['status'] = block => {
  let dropdown_type = block.getFieldValue('STATUS_TYPE');
  let dropdown_target = block.getFieldValue('STATUS_TARGET');
  let dropdown_sys = block.getFieldValue('STATUS_ROOM');
  let number_amount = block.getFieldValue('STATUS_AMOUNT')
  let code = `<status type="${dropdown_type}" target="${dropdown_target}" system="${dropdown_sys}" amount="${number_amount}"/>\n`;
  return code;
};

Blockly.JavaScript['upgrade'] = block => {
  let number_upg_amount = block.getFieldValue('UPG_AMOUNT');
  let dropdown_upg_sys = block.getFieldValue('UPG_SYS');
  let code = `<upgrade amount="${number_upg_amount}" system="${dropdown_upg_sys}"/>\n`;
  return code;
};

Blockly.JavaScript['system'] = block => {
  let dropdown_sys_sys = block.getFieldValue('SYSTEM_SYS');
  let code = `<system name="${dropdown_sys_sys}"/>\n`;
  return code;
};



// -------------------------------
// MAP RELATED CATEGORY---------
// -------------------------------

Blockly.Blocks['distress_beacon'] = {
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

Blockly.Blocks['reveal_map'] = {
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

Blockly.Blocks['modify_pursuit'] = {
  init() {
    this.appendDummyInput()
        .appendField("<modifyPursuit> amount:")
        .appendField(new Blockly.FieldNumber(0, 0, Infinity, 1), "PURSUIT_AMOUNT");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#8f0373");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['store'] = {
  init() {
    this.appendDummyInput()
        .appendField("<store> store name:")
        .appendField(new Blockly.FieldTextInput("STORE_STANDARD"), "STORE");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#8f0373");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['quest'] = {
  init() {
    this.appendDummyInput()
        .appendField("<quest> event:")
        .appendField(new Blockly.FieldTextInput("EVENT_NAME"), "QUEST_EVT");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#8f0373");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// generators----------
Blockly.JavaScript['distress_beacon'] = _block => {
  let code = `<distressBeacon />\n`;
  return code;
};

Blockly.JavaScript['reveal_map'] = _block => {
  let code = `<reveal_map />\n`;
  return code;
};

Blockly.JavaScript['modify_pursuit'] = block => {
  let number_pursuit_amt = block.getFieldValue('PURSUIT_AMOUNT');
  let code = `<modifyPursuit amount="${number_pursuit_amt}"/>\n`;
  return code;
};

Blockly.JavaScript['store'] = block => {
  let text_store_name = block.getFieldValue('STORE');
  let code = `<store>${text_store_name}</store>\n`;
  return code;
};

Blockly.JavaScript['quest'] = block => {
  let text_questevent = block.getFieldValue('QUEST_EVT');
  let code = `<quest event="${text_questevent}"/>\n`;
  return code;
};



// -------------------------------
// BACKGROUND OBJECTS CATEGORY---------
// -------------------------------

Blockly.Blocks['environment'] = {
  init() {
    this.appendDummyInput()
        .appendField("<environment> type:")
        .appendField(new Blockly.FieldDropdown([
          ["sun","sun"], 
          ["nebula","nebula"], 
          ["plasma storm","storm"], 
          ["pulsar", "pulsar"], 
          ["asteroid", "asteroid"],
          ["ASB", "PDS"]
        ]), "ENV_TYPE")
        .appendField("target(for asb):")
        .appendField(new Blockly.FieldDropdown([
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

Blockly.Blocks['img'] = {
  init() {
    this.appendDummyInput()
        .appendField("<img> back:")
        .appendField(new Blockly.FieldTextInput("BG_NAME"), "IMG_BG")
        .appendField("planet:")
        .appendField(new Blockly.FieldTextInput("PLANET_NONE"), "IMG_PLT");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#530096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['custom_fleet'] = {
  init() {
    this.appendDummyInput()
        .appendField("<customFleet> face right?")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "FLEET_R")
        .appendField("fire asb?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "FLEET_FIRE")
        .appendField("auto darken?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "FLEET_DARK")
    this.appendDummyInput()
        .appendField("fleet name:")
        .appendField(new Blockly.FieldTextInput("CUSTOM_FLEET"), "FLEET_NAME");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#530096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// generators----------
Blockly.JavaScript['environment'] = block => {
  let dropdown_envtype = block.getFieldValue('ENV_TYPE');
  let dropdown_envtarget = block.getFieldValue('ENV_TARGET')
  let code;
  if (dropdown_envtype=="PDS"){
    code = `<environment type="${dropdown_envtype}" target="${dropdown_envtarget}"/>\n`;
  }else{
    code = `<environment type="${dropdown_envtype}"/>\n`;
  }
  return code;
};

Blockly.JavaScript['img'] = block => {
  let text_bg = block.getFieldValue('IMG_BG');
  let text_planet = block.getFieldValue('IMG_PLT')
  let code = `<img back="${text_bg}" planet="${text_planet}"/>\n`;
  return code;
};

Blockly.JavaScript['custom_fleet'] = block => {
  let checkbox_right = block.getFieldValue('FLEET_R').toLowerCase();
  let checkbox_fire = block.getFieldValue("FLEET_FIRE").toLowerCase();
  let checkbox_dark = block.getFieldValue('FLEET_DARK').toLowerCase();
  let text_fleet_name = block.getFieldValue("FLEET_NAME")
  let code = `<customFleet right="${checkbox_right}" firing="${checkbox_fire}" autoDarkening="${checkbox_dark}">\n  ${text_fleet_name}\n</customFleet>\n`;;
  return code;
};



// -------------------------------
// SHIPS TAG SECTION CATEGORY---------
// -------------------------------

Blockly.Blocks['ship_load'] = {
  init() {
    this.appendDummyInput()
        .appendField("<ship> load:")
        .appendField(new Blockly.FieldTextInput("SHIP_NAME"), "SHIPL_NAME")
        .appendField("hostile?")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "SHIPL_HOST");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#619123");
    this.setTooltip("Enemy Ship load, use 'current' to modify a loaded ship");
    this.setHelpUrl("0");
  }
};

Blockly.Blocks['ship'] = {
  init() {
    this.appendDummyInput()
        .appendField("<ship> name:")
        .appendField(new Blockly.FieldTextInput("NAME"), "SHIP_NAME")
        .appendField("auto_blueprint:")
        .appendField(new Blockly.FieldTextInput("SHIP_NAME"), "SHIP_AUTOBP");
    this.appendStatementInput("SHIP_CHILDS")
        .setCheck("allowed_ship_childs");
    this.setColour("#619123");
    this.setTooltip("FTL Enemy Ship Declaration");
    this.setHelpUrl("https://docs.google.com/spreadsheets/d/109VMoT8rkXiPsyHAskxjN9lNm1TOs0RsFeTOyHgQ8S0/edit#gid=1389979796");
  }
};

Blockly.Blocks['surrender'] = {
  init() {
    this.appendDummyInput()
        .appendField("<surrender> chance:")
        .appendField(new Blockly.FieldNumber(0,0,1,0.1), "SUR_CHANCE")
        .appendField("min:")
        .appendField(new Blockly.FieldNumber(0,0,Infinity,1), "SUR_MIN")
        .appendField("max:")
        .appendField(new Blockly.FieldNumber(0,0,Infinity,1), "SUR_MAX")
        .appendField("use load?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "SUR_IS_LOAD");
    this.appendDummyInput("LOAD_INPUT")
        .appendField("load:")
        .appendField(new Blockly.FieldTextInput("EVENT_NAME"),"SUR_LOAD");
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
          .appendField(new Blockly.FieldTextInput("EVENT_NAME"),"SUR_LOAD");
    }
  }
};

Blockly.Blocks['escape'] = {
  init() {
    this.appendDummyInput()
        .appendField("<escape> chance:")
        .appendField(new Blockly.FieldNumber(0,0,1,0.1), "ESC_CHANCE")
        .appendField("min:")
        .appendField(new Blockly.FieldNumber(0,0,Infinity,1), "ESC_MIN")
        .appendField("max:")
        .appendField(new Blockly.FieldNumber(0,0,Infinity,1), "ESC_MAX");
    this.appendDummyInput()
        .appendField("timer:")
        .appendField(new Blockly.FieldNumber(0,0,Infinity,1), "ESC_TIME")
        .appendField("use load?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "ESC_IS_LOAD");
    this.appendDummyInput("LOAD_INPUT")
        .appendField("load:")
        .appendField(new Blockly.FieldTextInput("EVENT_NAME"),"ESC_LOAD");
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
          .appendField(new Blockly.FieldTextInput("EVENT_NAME"),"ESC_LOAD");
    }
  }
};

Blockly.Blocks['gotaway'] = {
  init() {
    this.appendDummyInput()
        .appendField("<gotaway> ")
        .appendField("use load?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "GA_IS_LOAD");
    this.appendDummyInput("LOAD_INPUT")
        .appendField("load:")
        .appendField(new Blockly.FieldTextInput("EVENT_NAME"),"GA_LOAD");
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
          .appendField(new Blockly.FieldTextInput("EVENT_NAME"),"GA_LOAD");
    }
  }
};

Blockly.Blocks['destroyed'] = {
  init() {
    this.appendDummyInput()
        .appendField("<destroyed> ")
        .appendField("use load?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "DES_IS_LOAD");
    this.appendDummyInput("LOAD_INPUT")
        .appendField("load:")
        .appendField(new Blockly.FieldTextInput("EVENT_NAME"),"DES_LOAD");
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
          .appendField(new Blockly.FieldTextInput("EVENT_NAME"),"DES_LOAD");
    }
  }
};

Blockly.Blocks['deadcrew'] = {
  init() {
    this.appendDummyInput()
        .appendField("<deadCrew> ")
        .appendField("use load?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "CK_IS_LOAD");
    this.appendDummyInput("LOAD_INPUT")
        .appendField("load:")
        .appendField(new Blockly.FieldTextInput("EVENT_NAME"),"CK_LOAD");
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
          .appendField(new Blockly.FieldTextInput("EVENT_NAME"),"CK_LOAD");
    }
  }
};

Blockly.Blocks['ship_crew'] = {
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

Blockly.Blocks['ship_crew_member'] = {
  init() {
    this.appendDummyInput()
        .appendField("<crewMember> type:")
        .appendField(new Blockly.FieldTextInput("crew_id"), "SHIP_CREW")
        .appendField("prop:")
        .appendField(new Blockly.FieldNumber(0,0,1,0.1), "SHIP_PROP");
    this.setPreviousStatement(true, "allowed_shipcrew_childs");
    this.setNextStatement(true, "allowed_shipcrew_childs");
    this.setColour("#619123");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['weapon_override'] = {
  init() {
    this.appendDummyInput()
        .appendField("<weaponOverride> count:")
        .appendField(new Blockly.FieldNumber(0,0,Infinity,1), "WEPOR_CNT")
    this.appendStatementInput("WEPOR_CHILDS")
        .setCheck("allowed_wepor_childs");
    this.setPreviousStatement(true, "allowed_ship_childs");
    this.setNextStatement(true, "allowed_ship_childs");
    this.setColour("#619123");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['wep_override_name'] = {
  init() {
    this.appendDummyInput()
        .appendField("<name> use weapon:")
        .appendField(new Blockly.FieldTextInput("WEAPON_ID"), "WEPOR_NAME");
    this.setPreviousStatement(true, "allowed_wepor_childs");
    this.setNextStatement(true, "allowed_wepor_childs");
    this.setColour("#619123");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// generators--------------
Blockly.JavaScript['ship_load'] = block => {
  let text_shipname = block.getFieldValue('SHIPL_NAME');
  let cb_host = block.getFieldValue('SHIPL_HOST')==="TRUE";
  let code;
  if (text_shipname.toLowerCase()==="current")
    code = `<ship hostile="${cb_host}"/>\n`;
  else code = `<ship load="${text_shipname}" hostile="${cb_host}"/>\n`;
  return code;
};

Blockly.JavaScript['ship'] = block => {
  let text_shipname = block.getFieldValue('SHIP_NAME');
  let statements_childs = Blockly.JavaScript.statementToCode(block, 'SHIP_CHILDS');
  let text_autobp = block.getFieldValue('SHIP_AUTOBP');
  let code = `<ship name="${text_shipname}" auto_blueprint="${text_autobp}">\n${statements_childs}</ship>\n`;
  return code;
};

Blockly.JavaScript['surrender'] = block => {
  let num_chance = block.getFieldValue('SUR_CHANCE');
  let num_min = block.getFieldValue('SUR_MIN');
  let num_max = block.getFieldValue("SUR_MAX");
  let cb_is_load = block.getFieldValue("SUR_IS_LOAD") === "TRUE";
  let text_load_event = block.getFieldValue("SUR_LOAD");
  let statements_sur_event = Blockly.JavaScript.statementToCode(block, 'SUR_CHILDS');
  let code;
  if (cb_is_load){
    code = `<surrender chance="${num_chance}" min="${num_min}" max="${num_max}" load="${text_load_event}"/>\n`;
  }else{
    code = `<surrender chance="${num_chance}" min="${num_min}" max="${num_max}">\n${statements_sur_event}</surrender>\n`;
  }
  return code;
};

Blockly.JavaScript['escape'] = block => {
  let num_chance = block.getFieldValue('ESC_CHANCE');
  let num_min = block.getFieldValue('ESC_MIN');
  let num_max = block.getFieldValue("ESC_MAX");
  let num_time = block.getFieldValue("ESC_TIME")
  let cb_is_load = block.getFieldValue("ESC_IS_LOAD") === "TRUE";
  let text_load_event = block.getFieldValue("ESC_LOAD");
  let statements_sur_event = Blockly.JavaScript.statementToCode(block, 'ESC_CHILDS');
  let code;
  if (cb_is_load){
    code = `<escape chance="${num_chance}" min="${num_min}" max="${num_max}" timer="${num_time}" load="${text_load_event}"/>\n`;
  }else{
    code = `<escape chance="${num_chance}" min="${num_min}" max="${num_max}" timer="${num_time}">\n${statements_sur_event}</escape>\n`;
  }
  return code;
};

Blockly.JavaScript['gotaway'] = block => {
  let cb_is_load = block.getFieldValue("GA_IS_LOAD") === "TRUE";
  let text_load_event = block.getFieldValue("GA_LOAD");
  let statements_sur_event = Blockly.JavaScript.statementToCode(block, 'GA_CHILDS');
  let code;
  if (cb_is_load){
    code = `<gotaway load="${text_load_event}"/>\n`;
  }else{
    code = `<gotaway>\n${statements_sur_event}</gotaway>\n`;
  }
  return code;
};

Blockly.JavaScript['destroyed'] = block => {
  let cb_is_load = block.getFieldValue("DES_IS_LOAD") === "TRUE";
  let text_load_event = block.getFieldValue("DES_LOAD");
  let statements_sur_event = Blockly.JavaScript.statementToCode(block, 'DES_CHILDS');
  let code;
  if (cb_is_load){
    code = `<destroyed load="${text_load_event}"/>\n`;
  }else{
    code = `<destroyed>\n${statements_sur_event}</destroyed>\n`;
  }
  return code;
};

Blockly.JavaScript['deadcrew'] = block => {
  let cb_is_load = block.getFieldValue("CK_IS_LOAD") === "TRUE";
  let text_load_event = block.getFieldValue("CK_LOAD");
  let statements_sur_event = Blockly.JavaScript.statementToCode(block, 'CK_CHILDS');
  let code;
  if (cb_is_load){
    code = `<deadCrew load="${text_load_event}"/>\n`;
  }else{
    code = `<deadCrew>\n${statements_sur_event}</deadCrew>\n`;
  }
  return code;
};

Blockly.JavaScript['ship_crew'] = block => {
  let statements_shipcrew_childs = Blockly.JavaScript.statementToCode(block, 'SHIP_CREW_CHILDS');
  let code = `<crew>\n${statements_shipcrew_childs}</crew>\n`;    
  return code;
};

Blockly.JavaScript['ship_crew_member'] = block => {
  let text_type = block.getFieldValue('SHIP_CREW');
  let num_prop = block.getFieldValue('SHIP_PROP');
  let code = `<crewMember type="${text_type}" prop="${num_prop}"/>\n`;
  return code;
};

Blockly.JavaScript['weapon_override'] = block => {
  let statements_wepor_childs = Blockly.JavaScript.statementToCode(block, 'WEPOR_CHILDS');
  let num_wepor_cnt = block.getFieldValue("WEPOR_CNT");
  let code = `<weaponOverride count="${num_wepor_cnt}">\n${statements_wepor_childs}</weaponOverride>\n`;    
  return code;
};

Blockly.JavaScript['wep_override_name'] = block => {
  let text_wepor_name = block.getFieldValue('WEPOR_NAME');
  let code = `<name>${text_wepor_name}</name>\n`;
  return code;
};



// -------------------------------
// OTHERS CATEGORY---------
// -------------------------------
Blockly.Blocks['comment'] = {
  init() {
    this.appendDummyInput()
        .appendField("Comment:")
        .appendField(new Blockly.FieldTextInput("This is a comment!"), "COMT");
    this.setColour("0");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.JavaScript['comment'] = block => {
  let text_comt = block.getFieldValue('COMT');
  let code = `<!--${text_comt}-->\n`;
  return code;
};



// ------------------------------------------------------------------------------||
// -----------------------------------HYPERSPACE SECTION-------------------------||
// ------------------------------------------------------------------------------||


// ====LOAD===========
//======================
Blockly.Blocks['hs_load_event'] = {
  init() {
    this.appendDummyInput()
        .appendField("<loadEvent> name:")
        .appendField(new Blockly.FieldTextInput("EVENT_NAME"), "HS_LOAD");
    this.appendDummyInput()
        .appendField("seeded?")
        .appendField(new Blockly.FieldCheckbox('TRUE'), "LOAD_SEED")
        .appendField("ignore unique?")
        .appendField(new Blockly.FieldCheckbox('FALSE'), "LOAD_NOUNIQ")
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#545991");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hs_load_event_list'] = {
  init() {
    this.appendDummyInput()
        .appendField("<loadEventList> seeded?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "LOADEVENT_SEED")
        .appendField("load first entry?")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "LOADEVENT_FIRST")
    this.appendDummyInput()
        .appendField("generate?")
        .appendField(new Blockly.FieldCheckbox('FALSE'), "LOADEVENT_GEN")
        .appendField("ignore unique?")
        .appendField(new Blockly.FieldCheckbox('FALSE'), "LOADEVENT_NOUNIQ")
        .appendField("default:")
        .appendField(new Blockly.FieldTextInput("EVENT"), "LOADEVENT_DEF");
    this.appendStatementInput("LOADEVENT_CHILDS")
        .setCheck("allowed_loadevent_childs");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#545991");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hs_load_event_list_event'] = {
  init() {
    this.appendDummyInput()
        .appendField("<event>")
        .appendField("use load?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "EVLIST_IS_LOAD");
    this.appendValueInput("EV_ATTRIBUTES")
        .setCheck("allowed_choice_attributes");
    this.appendDummyInput("EVLIST_LOAD_SECTION")
        .appendField("load:")
        .appendField(new Blockly.FieldTextInput("EVENT_NAME"),"EVLIST_LOAD");
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
          .appendField(new Blockly.FieldTextInput("EVENT_NAME"),"EVLIST_LOAD");
    }
  }
};

Blockly.Blocks['revisit_event'] = {
  init() {
    this.appendDummyInput()
        .appendField("<revisitEvent> name:")
        .appendField(new Blockly.FieldTextInput("NOTHING"), "HS_REVISIT");
    this.appendDummyInput()
        .appendField("seeded?")
        .appendField(new Blockly.FieldCheckbox('TRUE'), "REVISIT_SEED")
        .appendField("ignore unique?")
        .appendField(new Blockly.FieldCheckbox('FALSE'), "REVISIT_NOUNIQ")
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#545991");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['event_alias'] = {
  init() {
    this.appendDummyInput()
        .appendField("<eventAlias> alias name:")
        .appendField(new Blockly.FieldTextInput("ALIAS"), "EVENT_ALIAS")
        .appendField("for:")
        .appendField(new Blockly.FieldTextInput("EVENT_NAME"), "EVENT_ALIAS_FOR");
        this.appendDummyInput()
        .appendField("jump clear?")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "EVENT_A_JC")
        .appendField("once?")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "EVENT_A_ONCE")
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#545991");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['queue_event'] = {
  init() {
    this.appendDummyInput()
        .appendField("<queueEvent> name:")
        .appendField(new Blockly.FieldTextInput("EVENT_NAME"), "HS_QUEUE")
        .appendField("seeded?")
        .appendField(new Blockly.FieldCheckbox('TRUE'), "QUEUE_SEED");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#545991");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['restart'] = {
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

Blockly.Blocks['rename_beacon'] = {
  init() {
    this.appendDummyInput()
        .appendField("<renameBeacon> name:")
        .appendField(new Blockly.FieldTextInput("ALT_NAME"), "BEAC_RENAME");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#545991");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

//generators---------------
Blockly.JavaScript['hs_load_event'] = block => {
  let text_loadName = block.getFieldValue('HS_LOAD');
  let cb_loadSeed = block.getFieldValue('LOAD_SEED')==="TRUE";
  let cb_loadNoUniq = block.getFieldValue('LOAD_NOUNIQ')==="TRUE";
  let code = `<loadEvent seeded="${cb_loadSeed}" ignoreUnique="${cb_loadNoUniq}">${text_loadName}</loadEvent>\n`;
  return code;
};

Blockly.JavaScript['hs_load_event_list'] = block => {
  let cb_seed = block.getFieldValue('LOADEVENT_SEED')==="TRUE";
  let cb_first = block.getFieldValue('LOADEVENT_FIRST')==="TRUE";
  let cb_gen = block.getFieldValue('LOADEVENT_GEN')==="TRUE";
  let cb_noUniq = block.getFieldValue('LOADEVENT_NOUNIQ')==="TRUE";
  let text_default = block.getFieldValue('LOADEVENT_DEF');
  let statements_childs = Blockly.JavaScript.statementToCode(block, 'LOADEVENT_CHILDS');
  let code = `<loadEventList seeded="${cb_seed}" first="${cb_first}" default="${text_default}"
               generate="${cb_gen}" ignoreUnique="${cb_noUniq}">\n${statements_childs}</loadEventList>\n`;
  return code;
};

Blockly.JavaScript['hs_load_event_list_event'] = block => {
  let cb_is_load = block.getFieldValue("EVLIST_IS_LOAD") === "TRUE";
  let text_load_event = block.getFieldValue("EVLIST_LOAD");
  let value_ev_attri = Blockly.JavaScript.valueToCode(block, 'EV_ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC);
  let statements_evlist_ev = Blockly.JavaScript.statementToCode(block, 'EVLIST_CHILDS');
  let code;
  if (cb_is_load){
    code = `<event name="${text_load_event}"${value_ev_attri}/>\n`;
  }else{
    code = `<event${value_ev_attri}>\n${statements_evlist_ev}</event>\n`;
  }
  return code;
};

Blockly.JavaScript['revisit_event'] = block => {
  let text_loadName = block.getFieldValue('HS_REVISIT');
  let cb_loadSeed = block.getFieldValue('REVISIT_SEED')==="TRUE";
  let cb_loadNoUniq = block.getFieldValue('REVISIT_NOUNIQ')==="TRUE";
  let code = `<revisitEvent seeded="${cb_loadSeed}" ignoreUnique="${cb_loadNoUniq}">${text_loadName}</revisitEvent>\n`;
  return code;
};

Blockly.JavaScript['event_alias'] = block => {
  let text_aliasName = block.getFieldValue('EVENT_ALIAS');
  let text_aliasFor = block.getFieldValue("EVENT_ALIAS_FOR");
  let cb_jumpC = block.getFieldValue('EVENT_A_JC')==="TRUE";
  let cb_once = block.getFieldValue('EVENT_A_ONCE')==="TRUE";
  let code = `<eventAlias name="${text_aliasName}" jumpClear="${cb_jumpC}" once="${cb_once}">${text_aliasFor}</eventAlias>\n`;
  return code;
};

Blockly.JavaScript['queue_event'] = block => {
  let text_queueName = block.getFieldValue('HS_QUEUE');
  let cb_queueSeed = block.getFieldValue('QUEUE_SEED')==="TRUE";
  let code = `<queueEvent seeded="${cb_queueSeed}">${text_queueName}</queueEvent>\n`;
  return code;
};

Blockly.JavaScript['restart'] = _block => {
  let code = '<restartEvent />\n';
  return code;
};

Blockly.JavaScript['rename_beacon'] = block => {
  let text_rename = block.getFieldValue('BEAC_RENAME');
  let code = `<renameBeacon>${text_rename}</renameBeacon>\n`;
  return code;
};



// ====TRIGGER===========
//======================
Blockly.Blocks['jump_event'] = {
  init() {
    this.appendDummyInput()
        .appendField("<jumpEvent> load:")
        .appendField(new Blockly.FieldTextInput("EVENT_NAME"), "JUMP_EVENT");
    this.appendDummyInput()
        .appendField("label:")
        .appendField(new Blockly.FieldTextInput("LABEL"), "JUMP_LABEL")
        .appendField("loop?")
        .appendField(new Blockly.FieldCheckbox('FALSE'), "JUMP_LOOP")
        .appendField("priority:")
        .appendField(new Blockly.FieldNumber(0,0,Infinity,1), "JUMP_PRI")
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#0e1096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['jump_event_clear'] = {
  init() {
    this.appendDummyInput()
        .appendField("<clearJumpEvent> name:")
        .appendField(new Blockly.FieldTextInput("LABEL"), "JUMP_C")
        .appendField("all?")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "JUMP_C_ALL")
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#0e1096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['death_event'] = {
  init() {
    this.appendDummyInput()
        .appendField("<deathEvent> load:")
        .appendField(new Blockly.FieldTextInput("EVENT_NAME"), "DEATH_EVENT");
    this.appendDummyInput()
        .appendField("label:")
        .appendField(new Blockly.FieldTextInput("LABEL"), "DEATH_LABEL")
        .appendField("jump clear?")
        .appendField(new Blockly.FieldCheckbox('FALSE'), "DEATH_JUMPC")
        .appendField("this fight?")
        .appendField(new Blockly.FieldCheckbox('FALSE'), "DEATH_FIGHT")
        .appendField("priority:")
        .appendField(new Blockly.FieldNumber(0,0,Infinity,1), "DEATH_PRI")
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#0e1096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['death_event_clear'] = {
  init() {
    this.appendDummyInput()
        .appendField("<clearDeathEvent> name:")
        .appendField(new Blockly.FieldTextInput("LABEL"), "DEATH_C")
        .appendField("all?")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "DEATH_C_ALL")
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#0e1096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['triggered_event'] = {
  init() {
    this.appendDummyInput()
        .appendField("<triggeredEvent> load:")
        .appendField(new Blockly.FieldTextInput("EVENT_NAME"), "TRI_LOAD")
        .appendField("label:")
        .appendField(new Blockly.FieldTextInput("LABEL"), "TRI_LABEL")
    this.appendDummyInput()
        .appendField("seeded?")
        .appendField(new Blockly.FieldCheckbox('FALSE'), "TRI_SEED")
        .appendField("this fight?")
        .appendField(new Blockly.FieldCheckbox('FALSE'), "TRI_THIS")
        .appendField("jump clear?")
        .appendField(new Blockly.FieldCheckbox('FALSE'), "TRI_JUMPC")
        .appendField("loops:")
        .appendField(new Blockly.FieldNumber(0,0,Infinity,1), "TRI_LOOPS");
    this.appendStatementInput("TRI_EV_CHILDS")
        .setCheck("allowed_trigEvent_childs");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#0e1096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['triggered_event_types'] = {
  init() {
    this.appendValueInput("TRI_TYPES_ATTRI")
        .setCheck("allowed_trigEvent_attributes")
        .appendField("<")
        .appendField(new Blockly.FieldDropdown([
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
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#01377d");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['attri_trig_event_amount'] = {
  init() {
    this.appendValueInput("TRI_TYPES_ATTRI")
        .setCheck("allowed_trigEvent_attributes")
        .appendField("amount:")
        .appendField(new Blockly.FieldNumber(0,-Infinity,Infinity,1), "TRI_AMT");
    this.setOutput(true, "allowed_trigEvent_attributes");
    this.setColour("#1ac2d9");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['attri_trig_event_minmax'] = {
  init() {
    this.appendValueInput("TRI_TYPES_ATTRI")
        .setCheck("allowed_trigEvent_attributes")
        .appendField("min:")
        .appendField(new Blockly.FieldNumber(0,-Infinity,Infinity,1), "TRI_MIN")
        .appendField("max:")
        .appendField(new Blockly.FieldNumber(0,-Infinity,Infinity,1), "TRI_MAX");
    this.setOutput(true, "allowed_trigEvent_attributes");
    this.setColour("#1ac2d9");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['attri_trig_event_scaling'] = {
  init() {
    this.appendValueInput("TRI_TYPES_ATTRI")
        .setCheck("allowed_trigEvent_attributes")
        .appendField("scaling:")
        .appendField(new Blockly.FieldNumber(0,-Infinity,Infinity,1), "TRI_SCALE");
    this.setOutput(true, "allowed_trigEvent_attributes");
    this.setColour("#1ac2d9");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['attri_trig_event_countrepair'] = {
  init() {
    this.appendValueInput("TRI_TYPES_ATTRI")
        .setCheck("allowed_trigEvent_attributes")
        .appendField("countRepairs?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "TRI_CNTREP");
    this.setOutput(true, "allowed_trigEvent_attributes");
    this.setColour("#1ac2d9");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['attri_trig_event_clonebay'] = {
  init() {
    this.appendValueInput("TRI_TYPES_ATTRI")
        .setCheck("allowed_trigEvent_attributes")
        .appendField("includeClonebay?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "TRI_CLONE");
    this.setOutput(true, "allowed_trigEvent_attributes");
    this.setColour("#1ac2d9");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['attri_trig_event_countnew'] = {
  init() {
    this.appendValueInput("TRI_TYPES_ATTRI")
        .setCheck("allowed_trigEvent_attributes")
        .appendField("countNewCrew?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "TRI_CNTNEW");
    this.setOutput(true, "allowed_trigEvent_attributes");
    this.setColour("#1ac2d9");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['triggered_event_box'] = {
  init() {
    this.appendDummyInput()
        .appendField("<triggeredEventBox> load:")
        .appendField(new Blockly.FieldTextInput("DEFAULT_TIMER"), "TRI_BOX");
    this.setPreviousStatement(true, "allowed_trigEvent_childs");
    this.setNextStatement(true, "allowed_trigEvent_childs");
    this.setColour("#01377d");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['triggered_event_sounds'] = {
  init() {
    this.appendDummyInput()
        .appendField("<timerSounds> load:")
        .appendField(new Blockly.FieldTextInput("DEFAULT_TIMER_SOUNDS"), "TRI_SOUND");
    this.setPreviousStatement(true, "allowed_trigEvent_childs");
    this.setNextStatement(true, "allowed_trigEvent_childs");
    this.setColour("#01377d");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['triggered_warning'] = {
  init() {
    this.appendDummyInput()
        .appendField("<warningMessage> img:")
        .appendField(new Blockly.FieldTextInput("IMG"), "TRI_WARN")
        .appendField("x:")
        .appendField(new Blockly.FieldNumber(0,-Infinity,Infinity,1), "TRI_WARN_X")
        .appendField("y:")
        .appendField(new Blockly.FieldNumber(0,-Infinity,Infinity,1), "TRI_WARN_Y");
    this.appendDummyInput()
        .appendField("time:")
        .appendField(new Blockly.FieldNumber(0,0,Infinity,1), "TRI_WARN_TIME")
        .appendField("center?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "TRI_WARN_CENTER")
        .appendField("flash?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "TRI_WARN_FL")
        .appendField("add 'warning'?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "TRI_WARN_WARN");
    this.appendDummyInput()
        .appendField("color:")
        .appendField(new Blockly.FieldColour("#00fff0"), "TRI_WARN_COLOR")
        .appendField("sound?")
        .appendField(new Blockly.FieldTextInput("sound_id"), "TRI_WARN_SOUND")
        .appendField("text:")
        .appendField(new Blockly.FieldTextInput("text"), 'TRI_WARN_TEXT')
    this.setPreviousStatement(true, "allowed_trigEvent_childs");
    this.setNextStatement(true, "allowed_trigEvent_childs");
    this.setColour("#01377d");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['triggered_event_mod'] = {
  init() {
    this.appendDummyInput()
        .appendField("<triggeredEventModifier> name:")
        .appendField(new Blockly.FieldTextInput("LABEL"), "TRI_MOD")
        .appendField("type:")
        .appendField(new Blockly.FieldDropdown([
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
    .appendField(new Blockly.FieldNumber(0,-Infinity,Infinity,1), "TRI_MOD_VAL")
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#0e1096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['triggered_event_clear'] = {
  init() {
    this.appendDummyInput()
        .appendField("<clearTriggeredEvent> name:")
        .appendField(new Blockly.FieldTextInput("LABEL"), "TRI_C")
        .appendField("all?")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "TRI_C_ALL")
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#0e1096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// generators--------------
Blockly.JavaScript['jump_event'] = block => {
  let text_jumpEvName = block.getFieldValue('JUMP_EVENT');
  let text_jumpEvLabel = block.getFieldValue('JUMP_LABEL');
  let cb_loop = block.getFieldValue('JUMP_LOOP')==="TRUE";
  let num_prio = block.getFieldValue('JUMP_PRI');
  let code = `<jumpEvent name="${text_jumpEvLabel}" loop="${cb_loop}" priority="${num_prio}">${text_jumpEvName}</jumpEvent>\n`;
  return code;
};

Blockly.JavaScript['jump_event_clear'] = block => {
  let text_jumpEvName = block.getFieldValue('JUMP_C');
  let cb_jumpEvClear_all = block.getFieldValue("JUMP_C_ALL")==="TRUE";
  let code;
  if (cb_jumpEvClear_all)
  code = `<clearJumpEvent />\n`;
  else
  code = `<clearJumpEvent name="${text_jumpEvName}"/>\n`;
  return code;
};

Blockly.JavaScript['death_event'] = block => {
  let text_deathEvName = block.getFieldValue('DEATH_EVENT');
  let text_deathEvLabel = block.getFieldValue('DEATH_LABEL');
  let cb_jumpc = block.getFieldValue('DEATH_JUMPC')==="TRUE";
  let cb_thisfight = block.getFieldValue('DEATH_FIGHT')==="TRUE";
  let num_prio = block.getFieldValue('DEATH_PRI');
  let code = `<deathEvent name="${text_deathEvLabel}" jumpClear="${cb_jumpc}" thisFight="${cb_thisfight}" priority="${num_prio}">${text_deathEvName}</deathEvent>\n`;
  return code;
};

Blockly.JavaScript['death_event_clear'] = block => {
  let text_deathEvName = block.getFieldValue('DEATH_C');
  let cb_deathEvClear_all = block.getFieldValue("DEATH_C_ALL")==="TRUE";
  let code;
  if (cb_deathEvClear_all)
  code = `<clearDeathEvent />\n`;
  else
  code = `<clearDeathEvent name="${text_deathEvName}"/>\n`;
  return code;
};

Blockly.JavaScript['triggered_event'] = block => {
  let text_trigEvName = block.getFieldValue('TRI_LOAD');
  let text_trigEvLabel = block.getFieldValue('TRI_LABEL');
  let cb_tri_seed = block.getFieldValue('TRI_SEED')==="TRUE";
  let cb_jumpc = block.getFieldValue('TRI_JUMPC')==="TRUE";
  let cb_thisfight = block.getFieldValue('TRI_THIS')==="TRUE";
  let num_loops = block.getFieldValue('TRI_LOOPS');
  let statements_childs = Blockly.JavaScript.statementToCode(block, "TRI_EV_CHILDS");
  let code = `<triggeredEvent name="${text_trigEvLabel}" event="${text_trigEvName}" seeded="${cb_tri_seed}" thisFight="${cb_thisfight}" 
                clearOnJump="${cb_jumpc}" loops="${num_loops}">\n${statements_childs}</triggeredEvent>\n`;
  return code;
};

Blockly.JavaScript['triggered_event_types'] = block => {
  let dd_type = block.getFieldValue('TRI_TYPE');
  let value_trig_attris = Blockly.JavaScript.valueToCode(block, "TRI_TYPES_ATTRI", Blockly.JavaScript.ORDER_ATOMIC)
  let code = `<${dd_type} ${value_trig_attris}/>\n`;
  return code;
};

Blockly.JavaScript['attri_trig_event_amount'] = block => {
  let num_amt = block.getFieldValue('TRI_AMT');
  let value_trig_attris = Blockly.JavaScript.valueToCode(block, "TRI_TYPES_ATTRI", Blockly.JavaScript.ORDER_ATOMIC);
  let code = `amount="${num_amt}" ${value_trig_attris}`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['attri_trig_event_minmax'] = block => {
  let num_min = block.getFieldValue('TRI_MIN');
  let num_max = block.getFieldValue('TRI_MAX');
  let value_trig_attris = Blockly.JavaScript.valueToCode(block, "TRI_TYPES_ATTRI", Blockly.JavaScript.ORDER_ATOMIC);
  let code = `min="${num_min}" max="${num_max}" ${value_trig_attris}`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['attri_trig_event_scaling'] = block => {
  let num_scale = block.getFieldValue('TRI_SCALE');
  let value_trig_attris = Blockly.JavaScript.valueToCode(block, "TRI_TYPES_ATTRI", Blockly.JavaScript.ORDER_ATOMIC);
  let code = `scaling="${num_scale}" ${value_trig_attris}`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['attri_trig_event_countrepair'] = block => {
  let cb_cntrep = block.getFieldValue('TRI_CNTREP')==="TRUE";
  let value_trig_attris = Blockly.JavaScript.valueToCode(block, "TRI_TYPES_ATTRI", Blockly.JavaScript.ORDER_ATOMIC);
  let code = `countRepairs="${cb_cntrep}" ${value_trig_attris}`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['attri_trig_event_clonebay'] = block => {
  let cb_clone = block.getFieldValue('TRI_CLONE')==="TRUE";
  let value_trig_attris = Blockly.JavaScript.valueToCode(block, "TRI_TYPES_ATTRI", Blockly.JavaScript.ORDER_ATOMIC);
  let code = `includeClonebay="${cb_clone}" ${value_trig_attris}`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['attri_trig_event_countnew'] = block => {
  let cb_cntnew = block.getFieldValue('TRI_CNTNEW')==="TRUE";
  let value_trig_attris = Blockly.JavaScript.valueToCode(block, "TRI_TYPES_ATTRI", Blockly.JavaScript.ORDER_ATOMIC);
  let code = `countNewCrew="${cb_cntnew}" ${value_trig_attris}`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['triggered_event_box'] = block => {
  let text_trigEvBoxName = block.getFieldValue('TRI_BOX');
  let code = `<triggeredEventBox load="${text_trigEvBoxName}"/>`;
  return code;
};

Blockly.JavaScript['triggered_event_sounds'] = block => {
  let text_trigEvSoundName = block.getFieldValue('TRI_SOUND');
  let code = `<timerSounds load="${text_trigEvSoundName}"/>\n`;
  return code;
};

Blockly.JavaScript['triggered_warning'] = (block) => {
  let text_img = block.getFieldValue("TRI_WARN");
  let num_x = block.getFieldValue('TRI_WARN_X');
  let num_y = block.getFieldValue('TRI_WARN_Y');
  let num_time = block.getFieldValue('TRI_WARN_TIME');
  let cb_center = block.getFieldValue('TRI_WARN_CENTER') === 'TRUE';
  let cb_flash = block.getFieldValue('TRI_WARN_FL') === 'TRUE';
  let cb_warn = block.getFieldValue('TRI_WARN_WARN') === 'TRUE';
  let color = block.getFieldValue('TRI_WARN_COLOR');
  let rgbGrn = parseInt(color.substring(3,5), 16);
  let rgbRed = parseInt(color.substring(1,3), 16);
  let rgbBlue = parseInt(color.substring(5,7), 16);
  let text_sound = block.getFieldValue("TRI_WARN_SOUND")
  let text = block.getFieldValue('TRI_WARN_TEXT');
  let code;
  if (text_img === "IMG"){
    code = `<warningMessage x="${num_x}" y="${num_y}" time="${num_time}" centerText="${cb_center}"
               flash="${cb_flash}" useWarningLine="${cb_warn}" r="${rgbRed}" g="${rgbGrn}" b="${rgbBlue}" sound="${text_sound}">
    ${text}\n</warningMessage>\n`;
  }else{
    code = `<warningMessage image="${text_img}" x="${num_x}" y="${num_y}" time="${num_time}" centerText="${cb_center}"
               flash="${cb_flash}" useWarningLine="${cb_warn}" r="${rgbRed}" g="${rgbGrn}" b="${rgbBlue}" sound="${text_sound}"/>\n`;
  }
  return code;
};

Blockly.JavaScript['triggered_event_mod'] = block => {
  let text_trigEvName = block.getFieldValue('TRI_MOD');
  let dd_triEvType = block.getFieldValue("TRI_MOD_TYPE");
  let num_val = block.getFieldValue("TRI_MOD_VAL");
  let code = `<triggeredEventModifier name="${text_trigEvName}" ${dd_triEvType}="${num_val}"/>\n`;
  return code;
};

Blockly.JavaScript['triggered_event_clear'] = block => {
  let text_trigEvName = block.getFieldValue('TRI_C');
  let cb_trigEvClear_all = block.getFieldValue("TRI_C_ALL")==="TRUE";
  let code;
  if (cb_trigEvClear_all)
  code = `<clearTriggeredEvent />\n`;
  else
  code = `<clearTriggeredEvent name="${text_trigEvName}"/>\n`;
  return code;
};



// ====WARP===========
//======================
Blockly.Blocks['secret_sector'] = {
  init() {
    this.appendDummyInput()
        .appendField("<secretSectorWarp> ID:")
        .appendField(new Blockly.FieldTextInput("SEC_ID"), "SECRET_SEC");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#821400");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['goto_flagship'] = {
  init() {
    this.appendDummyInput()
        .appendField("<goToFlagship> at base?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "GOTO_BASE")
        .appendField("all fleet?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "GOTO_FLEET");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#821400");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['replace_sector'] = {
  init() {
    this.appendDummyInput()
        .appendField("<replaceSector> name:")
        .appendField(new Blockly.FieldTextInput("SEC_ID"), "SEC_REPLACE");
    this.appendDummyInput()
        .appendField("replace with:")
        .appendField(new Blockly.FieldTextInput("SEC_ID_NEW"), "SEC_REPLACE_NEW");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#821400");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// generators----------
Blockly.JavaScript['secret_sector'] = block => {
  let text_sec_id = block.getFieldValue('SECRET_SEC');
  let code = `<secretSectorWarp>${text_sec_id}</secretSectorWarp>\n`;
  return code;
};

Blockly.JavaScript['goto_flagship'] = block => {
  let cb_gotoBase = block.getFieldValue('GOTO_BASE')==="TRUE";
  let cb_gotoFleet = block.getFieldValue("GOTO_FLEET")==="TRUE";
  let code = `<goToFlagship atBase="${cb_gotoBase}" allFleet="${cb_gotoFleet}"/>\n`;
  return code;
};

Blockly.JavaScript['replace_sector'] = block => {
  let text_secReplace = block.getFieldValue('SEC_REPLACE');
  let text_secReplaceNew = block.getFieldValue("SEC_REPLACE_NEW");
  let code = `<replaceSector name="${text_secReplace}">${text_secReplaceNew}</replaceSector>\n`;
  return code;
};



// ====ITEMS===========
//======================
Blockly.Blocks['check_cargo'] = {
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

Blockly.Blocks['hidden_aug'] = {
  init() {
  this.appendDummyInput()
      .appendField('<hiddenAug> name:')
      .appendField(new Blockly.FieldTextInput("AUG_ID"), "HIDD_AUG")
  this.setPreviousStatement(true, 'allowed_event_childs');
  this.setNextStatement(true, 'allowed_event_childs');
  this.setColour('#059c2d');
  this.setTooltip('');
  this.setHelpUrl('');
  }
};

Blockly.Blocks['remove_item'] = {
  init() {
  this.appendDummyInput()
      .appendField('<removeItem> name:')
      .appendField(new Blockly.FieldTextInput("ITEM_ID"), "HS_REMOVE")
  this.setPreviousStatement(true, 'allowed_event_childs');
  this.setNextStatement(true, 'allowed_event_childs');
  this.setColour('#059c2d');
  this.setTooltip('');
  this.setHelpUrl('');
  }
};

// generators--------------
Blockly.JavaScript['check_cargo'] = _block => {
  let code = '<checkCargo />\n';
  return code;
};

Blockly.JavaScript['hidden_aug'] = block => {
  let text_id = block.getFieldValue("HIDD_AUG");
  let code = `<hiddenAug>${text_id}</hiddenAug>\n`;
  return code;
};

Blockly.JavaScript['remove_item'] = block => {
  let text_id = block.getFieldValue("HS_REMOVE");
  let code = `<removeItem>${text_id}</removeItem>\n`;
  return code;
};


// ====BACKGROUND===========
//======================
Blockly.Blocks['change_background'] = {
  init() {
    this.appendDummyInput()
        .appendField("<changeBackground> img id:")
        .appendField(new Blockly.FieldTextInput("BACK_IMG_ID"), "CHANGE_BG");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#530096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['back_object'] = {
  init() {
    this.appendDummyInput()
        .appendField("<backgroundObject> load:")
        .appendField(new Blockly.FieldTextInput("OBJ_NAME"), "BACK_OBJ");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#530096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['back_object_clear'] = {
  init() {
    this.appendDummyInput()
        .appendField("<clearBackgroundObject> name:")
        .appendField(new Blockly.FieldTextInput("OBJ_NAME"), "BACK_OBJ_C")
        .appendField("all?")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "BACK_OBJ_C_ALL")
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#530096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['back_object_trans'] = {
  init() {
    this.appendDummyInput()
        .appendField("<transformBackgroundObject> name:")
        .appendField(new Blockly.FieldTextInput("OBJ_NAME"), "BACK_OBJ_T");
    this.appendDummyInput()
        .appendField("new name:")
        .appendField(new Blockly.FieldTextInput("NEW_OBJ"), "BACK_OBJ_T_NEW")
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#530096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['event_button'] = {
  init() {
    this.appendDummyInput()
        .appendField("<eventButton> load:")
        .appendField(new Blockly.FieldTextInput("BTN_NAME"), "EVENT_BTN");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#530096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['event_button_clear'] = {
  init() {
    this.appendDummyInput()
        .appendField("<clearEventButton> name:")
        .appendField(new Blockly.FieldTextInput("BTN_NAME"), "EVENT_BTN_C")
        .appendField("all?")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "EVENT_BTN_C_ALL")
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#530096");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['clear_fleet'] = {
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

Blockly.Blocks['remove_nebula'] = {
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

Blockly.Blocks['remove_hazards'] = {
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

// generators-------------
Blockly.JavaScript['change_background'] = block => {
  let text_changeBg = block.getFieldValue('CHANGE_BG');
  let code = `<changeBackground>${text_changeBg}</changeBackground>\n`;
  return code;
};

Blockly.JavaScript['back_object'] = block => {
  let text_objName = block.getFieldValue('BACK_OBJ');
  let code = `<backgroundObject load="${text_objName}"/>\n`;
  return code;
};

Blockly.JavaScript['back_object_clear'] = block => {
  let text_objName = block.getFieldValue('BACK_OBJ_C');
  let cb_objClear_all = block.getFieldValue("BACK_OBJ_C_ALL")==="TRUE";
  let code;
  if (cb_objClear_all)
  code = `<clearBackgroundObject />\n`;
  else
  code = `<clearBackgroundObject name="${text_objName}"/>\n`;
  return code;
};

Blockly.JavaScript['back_object_trans'] = block => {
  let text_objName = block.getFieldValue('BACK_OBJ_T');
  let text_objNameNew = block.getFieldValue("BACK_OBJ_T_NEW");
  let code = `<transformBackgroundObject name="${text_objName}">${text_objNameNew}</transformBackgroundObject>\n`;
  return code;
};

Blockly.JavaScript['event_button'] = block => {
  let text_evtBtnName = block.getFieldValue('EVENT_BTN');
  let code = `<eventButton load="${text_evtBtnName}"/>\n`;
  return code;
};

Blockly.JavaScript['event_button_clear'] = block => {
  let text_evtBtnName = block.getFieldValue('EVENT_BTN_C');
  let cb_btnClear_all = block.getFieldValue("EVENT_BTN_C_ALL")==="TRUE";
  let code;
  if (cb_btnClear_all)
    code = `<clearEventButton />\n`;
  else
    code = `<clearEventButton name="${text_evtBtnName}"/>\n`;
  return code;
};

Blockly.JavaScript['clear_fleet'] = _block => {
  let code = `<clearCustomFleet />\n`;
  return code;
};

Blockly.JavaScript['remove_nebula'] = _block => {
  let code = `<removeNebula />\n`;
  return code;
};

Blockly.JavaScript['remove_hazards'] = _block => {
  let code = `<removeHazards />\n`;
  return code;
};



// ====VARIABLE===========
//======================
Blockly.Blocks['hs_variable'] = {
  init() {
  this.appendValueInput("VAR_ATTRI")
      .setCheck("allowed_var_attributes")
      .appendField('<variable> operation:')
      .appendField(new Blockly.FieldDropdown([
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

Blockly.Blocks['hs_meta_variable'] = {
  init() {
  this.appendValueInput("VAR_ATTRI")
      .setCheck("allowed_var_attributes")
      .appendField('<metaVariable> operation:')
      .appendField(new Blockly.FieldDropdown([
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

Blockly.Blocks['hs_temp_variable'] = {
  init() {
  this.appendValueInput("VAR_ATTRI")
      .setCheck("allowed_var_attributes")
      .appendField('<tempVariable> operation:')
      .appendField(new Blockly.FieldDropdown([
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

Blockly.Blocks['attri_var_val'] = {
  init() {
    this.appendValueInput("VAR_VAL_ATTRI")
        .setCheck("allowed_var_attributes")
        .appendField("value:")
        .appendField(new Blockly.FieldNumber(0,-Infinity,Infinity,1), "VAR_VAL");
    this.setOutput(true, "allowed_var_attributes");
    this.setColour("#c4975c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['attri_var_minmax'] = {
  init() {
    this.appendValueInput("VAR_MINMAX_ATTRI")
        .setCheck("allowed_var_attributes")
        .appendField("min:")
        .appendField(new Blockly.FieldNumber(0,-Infinity,Infinity,1), "VAR_MIN")
        .appendField("max:")
        .appendField(new Blockly.FieldNumber(0,-Infinity,Infinity,1), "VAR_MAX");
    this.setOutput(true, "allowed_var_attributes");
    this.setColour("#c4975c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['attri_var_var'] = {
  init() {
    this.appendValueInput("VAR_VAR_ATTRI")
        .setCheck("allowed_var_attributes")
        .appendField("var:")
        .appendField(new Blockly.FieldTextInput("var_id/req"), "VAR_VAR");
    this.setOutput(true, "allowed_var_attributes");
    this.setColour("#c4975c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// generators-------------
Blockly.JavaScript['hs_variable'] = block => {
  let dd_op = block.getFieldValue("VAR_OP");
  let value_var_attributes = Blockly.JavaScript.valueToCode(block, 'VAR_ATTRI', Blockly.JavaScript.ORDER_ATOMIC);
  let code = `<variable op="${dd_op}" ${value_var_attributes}/>\n`;
  return code;
};

Blockly.JavaScript['hs_meta_variable'] = block => {
  let dd_op = block.getFieldValue("VAR_OP");
  let value_var_attributes = Blockly.JavaScript.valueToCode(block, 'VAR_ATTRI', Blockly.JavaScript.ORDER_ATOMIC);
  let code = `<metaVariable op="${dd_op}" ${value_var_attributes}/>\n`;
  return code;
};

Blockly.JavaScript['hs_temp_variable'] = block => {
  let dd_op = block.getFieldValue("VAR_OP");
  let value_var_attributes = Blockly.JavaScript.valueToCode(block, 'VAR_ATTRI', Blockly.JavaScript.ORDER_ATOMIC);
  let code = `<tempVariable op="${dd_op}" ${value_var_attributes}/>\n`;
  return code;
};

Blockly.JavaScript['attri_var_val'] = block => {
  let num_val = block.getFieldValue("VAR_VAL");
  let value_more_attributes = Blockly.JavaScript.valueToCode(block, 'VAR_VAL_ATTRI', Blockly.JavaScript.ORDER_ATOMIC);
  let code = `val="${num_val}" ${value_more_attributes}`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['attri_var_minmax'] = block => {
  let num_min = block.getFieldValue("VAR_MIN");
  let num_max = block.getFieldValue("VAR_MAX");
  let value_more_attributes = Blockly.JavaScript.valueToCode(block, 'VAR_MINMAX_ATTRI', Blockly.JavaScript.ORDER_ATOMIC);
  let code = `min="${num_min}" max="${num_max}" ${value_more_attributes}`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['attri_var_var'] = block => {
  let text_val = block.getFieldValue("VAR_VAR");
  let value_more_attributes = Blockly.JavaScript.valueToCode(block, 'VAR_VAR_ATTRI', Blockly.JavaScript.ORDER_ATOMIC);
  let code = `var="${text_val}" ${value_more_attributes}`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};



// ====BEACON===========
//======================
Blockly.Blocks['hs_beacon_type'] = {
  init() {
    this.appendDummyInput()
        .appendField("<beaconType> load:")
        .appendField(new Blockly.FieldTextInput("DEFAULT"), "HS_BEAC_LOAD")
    this.appendDummyInput()
        .appendField("text:")
        .appendField(new Blockly.FieldTextInput("LOCATION"), "HS_BEAC_TEXT")
        .appendField("req:")
        .appendField(new Blockly.FieldTextInput("ITEM_ID"), "HS_BEAC_REQ");
    this.appendDummyInput()
        .appendField("global?")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "HS_BEAC_GL")
        .appendField("persist after visit?")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "HS_BEAC_PERS")
        .appendField("overide vanilla lable?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "HS_BEAC_OVR");
    this.appendDummyInput()
        .appendField("<color>")
        .appendField(new Blockly.FieldColour("#00ff00"), "HS_BEAC_COLOR")
        .appendField("alpha")
        .appendField(new Blockly.FieldNumber(1, 0, 1, 0.1), "HS_BEAC_ALP");
    this.appendDummyInput()
        .appendField("<undiscoveredTooltip>")
        .appendField(new Blockly.FieldTextInput("This is the location of..."), "HS_BEAC_UNEXP");
    this.appendDummyInput()
        .appendField("<unvisitedTooltip>")
        .appendField(new Blockly.FieldTextInput("An unvisited location."), "HS_BEAC_UNVISIT");
    this.appendDummyInput()
        .appendField("<visitedTooltip>")
        .appendField(new Blockly.FieldTextInput("Explored location. Nothing left of interest."), "HS_BEAC_VISIT");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#8f0373");
    this.setTooltip("");
    this.setHelpUrl("");
  }
}

Blockly.Blocks['remove_store'] = {
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

Blockly.Blocks['prevent_quest'] = {
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

Blockly.Blocks['no_quest_text'] = {
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

Blockly.Blocks['prevent_fleet'] = {
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

Blockly.Blocks['prevent_boss_fleet'] = {
  init() {
    this.appendDummyInput()
        .appendField("<preventBossFleet> last standing?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "NO_BOSS_FLT");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#8f0373");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['run_from_fleet'] = {
  init() {
    this.appendDummyInput()
        .appendField("<runFromFleet> closest?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "RUN_CLOSE");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#8f0373");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['hs_quest'] = {
  init() {
    this.appendDummyInput()
        .appendField("<quest> event:")
        .appendField(new Blockly.FieldTextInput("EVENT_NAME"), "HS_QUEST_EVT")
        .appendField("allowed parameters");
    this.appendDummyInput()
        .appendField("no nebula?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "HS_QUEST_NONEB")
        .appendField("nebula?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "HS_QUEST_NEB")
        .appendField("load if nebula:")
        .appendField(new Blockly.FieldTextInput("same"), "HS_QUEST_LOAD");
    this.appendDummyInput()
        .appendField("this sector?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "HS_QUEST_THIS")
        .appendField("next sector?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "HS_QUEST_NEXT")
        .appendField("sector8?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "HS_QUEST_S8")
        .appendField("last stand?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "HS_QUEST_LAST");
    this.appendDummyInput()
        .appendField("add nebula for target?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "HS_QUEST_MAKENEB")
        .appendField("aggresive:")
        .appendField(new Blockly.FieldDropdown([
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

// geneerators-----------
Blockly.JavaScript['hs_beacon_type'] = (block) => {
  let text_hs_beac_load = block.getFieldValue("HS_BEAC_LOAD");
  let text_hs_beac_text = block.getFieldValue('HS_BEAC_TEXT');
  let text_hs_beac_req = block.getFieldValue('HS_BEAC_REQ');
  let checkbox_hs_beac_gl = block.getFieldValue('HS_BEAC_GL') === 'TRUE';
  let checkbox_hs_beac_pers = block.getFieldValue('HS_BEAC_PERS') === 'TRUE';
  let checkbox_hs_beac_ovr = block.getFieldValue('HS_BEAC_OVR') === 'TRUE';
  let colour_hs_beac = block.getFieldValue('HS_BEAC_COLOR');
  let rgbRed = colour_hs_beac.substring(1,3);
  let rgbGrn = colour_hs_beac.substring(3,5);
  let rgbBlue = colour_hs_beac.substring(5,7);
  let colour_hs_beac_alpha = block.getFieldValue("HS_BEAC_ALP")
  let text_hs_beac_unexp = block.getFieldValue('HS_BEAC_UNEXP');
  let text_hs_beac_unvisit = block.getFieldValue('HS_BEAC_UNVISIT');
  let text_hs_beac_visit = block.getFieldValue('HS_BEAC_VISIT');
  let code;
  if (text_hs_beac_load==="DEFAULT") code = 
  `<beaconType text="${text_hs_beac_text}" req="${text_hs_beac_req}" global="${checkbox_hs_beac_gl}"
            persist="${checkbox_hs_beac_pers}" hideVanillaLabel="${checkbox_hs_beac_ovr}">
  <color r="${parseInt(rgbRed,16)}" g="${parseInt(rgbGrn,16)}" b="${parseInt(rgbBlue,16)}" a="${colour_hs_beac_alpha}" />
  <undiscoveredTooltip>${text_hs_beac_unexp}</undiscoveredTooltip>
  <unvisitedTooltip>${text_hs_beac_unvisit}</unvisitedTooltip>
  <visitedTooltip>${text_hs_beac_visit}</visitedTooltip>
</beaconType>\n`;
  else code = `<beaconType load="${text_hs_beac_load}" />\n`;
  return code;
};

Blockly.JavaScript['remove_store'] = _block => {
  let code = `<removeStore />\n`;
  return code;
};

Blockly.JavaScript['prevent_quest'] = _block => {
  let code = `<preventQuest />\n`;
  return code;
};

Blockly.JavaScript['no_quest_text'] = _block => {
  let code = `<noQuestText />\n`;
  return code;
};

Blockly.JavaScript['prevent_fleet'] = _block => {
  let code = `<preventFleet />\n`;
  return code;
};

Blockly.JavaScript['prevent_boss_fleet'] = block => {
  let cb_last = block.getFieldValue('NO_BOSS_FLT')==="TRUE";
  let code = `<preventBossFleet forever="${cb_last}"/>\n`;
  return code;
};

Blockly.JavaScript['run_from_fleet'] = block => {
  let cb_run = block.getFieldValue('RUN_CLOSE')==="TRUE";
  let code = `<runFromFleet closest="${cb_run}"/>\n`;
  return code;
};

Blockly.JavaScript['hs_quest'] = block => {
  let text_questevent = block.getFieldValue('HS_QUEST_EVT');
  let cb_noneb = block.getFieldValue("HS_QUEST_NONEB")==="TRUE";
  let cb_neb = block.getFieldValue("HS_QUEST_NEB")==="TRUE";
  let text_load = block.getFieldValue("HS_QUEST_LOAD");
  let cb_this = block.getFieldValue("HS_QUEST_THIS")==="TRUE";
  let cb_next = block.getFieldValue("HS_QUEST_NEXT")==="TRUE";
  let cb_s8 = block.getFieldValue("HS_QUEST_S8")==="TRUE";
  let cb_last = block.getFieldValue("HS_QUEST_LAST")==="TRUE";
  let cb_makeneb = block.getFieldValue("HS_QUEST_MAKENEB")==="TRUE";
  let dd_agg = block.getFieldValue("HS_QUEST_AGG");
  let code;
  if (text_load.toLowerCase()==="same"){
    code = 
`<quest event="${text_questevent}">
  <nonNebulaBeacon>${cb_noneb}</nonNebulaBeacon>
  <nebulaBeacon>${cb_neb}</nebulaBeacon>
  <currentSector>${cb_this}</currentSector>
  <nextSector>${cb_next}</nextSector>
  <sectorEight>${cb_s8}</sectorEight>
  <lastStand>${cb_last}</lastStand> 
  <createNebula>${cb_makeneb}</createNebula>
  <aggressive>${dd_agg}</aggressive>
</quest>\n`;
  }else{
    code = 
`<quest event="${text_questevent}">
  <nonNebulaBeacon>${cb_noneb}</nonNebulaBeacon>
  <nebulaBeacon>${cb_neb}</nebulaBeacon>
  <currentSector>${cb_this}</currentSector>
  <nextSector>${cb_next}</nextSector>
  <sectorEight>${cb_s8}</sectorEight>
  <lastStand>${cb_last}</lastStand> 
  <createNebula>${cb_makeneb}</createNebula>
  <nebulaEvent>${text_load}</nebulaEvent>
  <aggressive>${dd_agg}</aggressive>
</quest>\n`;
  }
  return code;
};



// ====CREW===========
//======================
Blockly.Blocks['allow_noslot'] = {
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

Blockly.Blocks['block_noslot'] = {
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

Blockly.Blocks['require_crew'] = {
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

Blockly.Blocks['transform_race'] = {
  init() {
  this.appendDummyInput()
      .appendField('<transformRace> orig:')
      .appendField(new Blockly.FieldTextInput("race_id"), "TRANS_ORIG")
      .appendField("new:")
      .appendField(new Blockly.FieldTextInput("n_race_id"), "TRANS_NEW");
  this.setPreviousStatement(true, 'allowed_event_childs');
  this.setNextStatement(true, 'allowed_event_childs');
  this.setColour('#10b2ba');
  this.setTooltip('');
  this.setHelpUrl('');
  }
};

// generators----------------
Blockly.JavaScript['allow_noslot'] = _block => {
  let code = '<allowNoSlot />\n';
  return code;
};

Blockly.JavaScript['block_noslot'] = _block => {
  let code = '<blockNoSlot />\n';
  return code;
};

Blockly.JavaScript['require_crew'] = _block => {
  let code = '<choiceRequiresCrew />\n';
  return code;
};

Blockly.JavaScript['transform_race'] = block => {
  let text_orig = block.getFieldValue("TRANS_ORIG");
  let text_new = block.getFieldValue("TRANS_NEW");
  let code = `<transformRace class="${text_orig}">${text_new}</transformRace>\n`;
  return code;
};



// ====PLAYER SHIP===========
//======================
Blockly.Blocks['reset_ftl'] = {
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

Blockly.Blocks['repair_allsys'] = {
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

Blockly.Blocks['kill_boarders'] = {
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

Blockly.Blocks['recall_boarders'] = {
  init() {
  this.appendDummyInput()
      .appendField('<recallBoarders> from')
      .appendField(new Blockly.FieldDropdown([
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

//generators---------------
Blockly.JavaScript['reset_ftl'] = _block => {
  let code = '<resetFtl />\n';
  return code;
};

Blockly.JavaScript['repair_allsys'] = _block => {
  let code = '<repairAllSystems />\n';
  return code;
};

Blockly.JavaScript['kill_boarders'] = _block => {
  let code = '<killEnemyBoarders />\n';
  return code;
};

Blockly.JavaScript['recall_boarders'] = block => {
  let dd_ship = block.getFieldValue("RECALL_SHIP");
  let code = `<recallBoarders ship="${dd_ship}"/>\n`;
  return code;
};



// ====EMENY SHIP===========
//======================
Blockly.Blocks['instant_esc'] = {
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

Blockly.Blocks['escape_load'] = {
  init() {
  this.appendDummyInput()
      .appendField('<escape> load default event?')
      .appendField(new Blockly.FieldCheckbox("FALSE"), "HS_ESC")
      .appendField("force?")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "HS_ESC_FORCE")
  this.setPreviousStatement(true, 'allowed_event_childs');
  this.setNextStatement(true, 'allowed_event_childs');
  this.setColour('#619123');
  this.setTooltip('');
  this.setHelpUrl('');
  }
};

Blockly.Blocks['surrender_load'] = {
  init() {
  this.appendDummyInput()
      .appendField('<surrender> load default event?')
      .appendField(new Blockly.FieldCheckbox("FALSE"), "HS_SUR")
      .appendField("force?")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "HS_SUR_FORCE")
  this.setPreviousStatement(true, 'allowed_event_childs');
  this.setNextStatement(true, 'allowed_event_childs');
  this.setColour('#619123');
  this.setTooltip('');
  this.setHelpUrl('');
  }
};

Blockly.Blocks['disable_surrender'] = {
  init() {
  this.appendDummyInput()
      .appendField('<disableSurrender>')
      .appendField("force?")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "HS_NOSUR_FORCE");
  this.setPreviousStatement(true, 'allowed_event_childs');
  this.setNextStatement(true, 'allowed_event_childs');
  this.setColour('#619123');
  this.setTooltip('');
  this.setHelpUrl('');
  }
};

Blockly.Blocks['disable_esc'] = {
  init() {
  this.appendDummyInput()
      .appendField('<disableEscape>')
      .appendField("force?")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "HS_NOESC_FORCE");
  this.setPreviousStatement(true, 'allowed_event_childs');
  this.setNextStatement(true, 'allowed_event_childs');
  this.setColour('#619123');
  this.setTooltip('');
  this.setHelpUrl('');
  }
};

Blockly.Blocks['enemy_damage'] = {
  init() {
    this.appendValueInput("DAMAGE_ATTRIBUTES")
        .setCheck("allowed_dmg_attributes")
        .appendField("<enemyDamage> amount:")
        .appendField(new Blockly.FieldNumber(0, -Infinity, Infinity, 1), "DAMAGE_E_AMOUNT");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setInputsInline(false);
    this.setColour("#619123");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['attri_damage_extra'] = {
  init() {
    this.appendValueInput("DAMAGE_EXT")
        .setCheck("allowed_dmg_attributes")
        .appendField("bypass resist?")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "DMG_FORCE")
        .appendField("damage hull?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "DMG_HULL")
    this.setOutput(true, "allowed_dmg_attributes");
    this.setColour("#c48c04");
    this.setTooltip("");
    this.setHelpUrl("");
  }
}


//generators------------
Blockly.JavaScript['instant_esc'] = _block => {
  let code = '<instantEscape />\n';
  return code;
};

Blockly.JavaScript['escape_load'] = block => {
  let cb_loadevent = block.getFieldValue("HS_ESC")==="TRUE";
  let cb_force = block.getFieldValue("HS_ESC_FORCE")==="TRUE";
  let code;
  if (cb_loadevent) code = `<loadEscape force="${cb_force}"/>\n`;
  else code = '<escape />\n';
  return code;
};

Blockly.JavaScript['surrender_load'] = block => {
  let cb_loadevent = block.getFieldValue("HS_SUR")==="TRUE";
  let cb_force = block.getFieldValue("HS_SUR_FORCE")==="TRUE";
  let code; 
  if (cb_loadevent) code = `<loadSurrender force="${cb_force}"/>\n`;
  else code = '<surrender />\n';
  return code;
};

Blockly.JavaScript['disable_surrender'] = block => {
  let cb_force = block.getFieldValue("HS_NOSUR_FORCE")==="TRUE";
  let code = `<disableSurrender force="${cb_force}"/>\n`;
  return code;
};

Blockly.JavaScript['disable_esc'] = block => {
  let cb_force = block.getFieldValue("HS_NOESC_FORCE")==="TRUE";
  let code = `<disableEscape force="${cb_force}"/>\n`;
  return code;
};

Blockly.JavaScript['enemy_damage'] = block => {
  let number_dmg_amount = block.getFieldValue("DAMAGE_E_AMOUNT");
  let value_dmg_attributes = Blockly.JavaScript.valueToCode(block, 'DAMAGE_ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC);
  let code = `<enemyDamage amount="${number_dmg_amount}" ${value_dmg_attributes}/>\n`;
  return code;
};

Blockly.JavaScript['attri_damage_extra'] = block => {
  let cbforce = block.getFieldValue("DMG_FORCE")==="TRUE";
  let cb_hull = block.getFieldValue("DMG_HULL")==="TRUE";
  let value_more_attributes = Blockly.JavaScript.valueToCode(block, 'DAMAGE_EXT', Blockly.JavaScript.ORDER_ATOMIC);
  let code = `force="${cbforce}" damageHull="${cb_hull}" ${value_more_attributes}`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};



// ====SURGES===========
//======================
Blockly.Blocks['super_drones'] = {
  init() {
    this.appendDummyInput()
        .appendField("<superDrones> for player?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "SURGE_D_PLAYER")
        .appendField("name:")
        .appendField(new Blockly.FieldTextInput("drn_surge_name"), "SURGE_D_NAME");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#8a8a63");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['super_barrage'] = {
  init() {
    this.appendDummyInput()
        .appendField("<superBarrage> for player?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "SURGE_B_PLAYER")
        .appendField("name:")
        .appendField(new Blockly.FieldTextInput("surge_name"), "SURGE_B_NAME");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#8a8a63");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['super_shields'] = {
  init() {
    this.appendDummyInput()
        .appendField("<superShields> for player?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "SURGE_S_PLAYER")
        .appendField("amount:")
        .appendField(new Blockly.FieldNumber(0,12,Infinity,1), "SURGE_S_AMT")
        .appendField("add:")
        .appendField(new Blockly.FieldNumber(0,0,Infinity,1), "SURGE_S_ADD");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#8a8a63");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['super_drones_clear'] = {
  init() {
    this.appendDummyInput()
        .appendField("<clearSuperDrones> for player?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "SURGE_DC_PLAYER");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#8a8a63");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// generators-----------
Blockly.JavaScript['super_drones'] = block => {
  let cb_player = block.getFieldValue('SURGE_D_PLAYER')==="TRUE";
  let text_name = block.getFieldValue("SURGE_D_NAME");
  let code = `<superDrones player="${cb_player}" name="${text_name}"/>\n`;
  return code;
};

Blockly.JavaScript['super_barrage'] = block => {
  let cb_player = block.getFieldValue('SURGE_B_PLAYER')==="TRUE";
  let text_name = block.getFieldValue("SURGE_B_NAME");
  let code = `<superBarrage player="${cb_player}" name="${text_name}"/>\n`;
  return code;
};

Blockly.JavaScript['super_shields'] = block => {
  let cb_player = block.getFieldValue('SURGE_S_PLAYER')==="TRUE";
  let num_amount = block.getFieldValue("SURGE_S_AMT");
  let num_add = block.getFieldValue("SURGE_S_ADD");
  let code = `<superShields player="${cb_player}" amount="${num_amount}" add="${num_add}"/>\n`;
  return code;
};

Blockly.JavaScript['super_drones_clear'] = block => {
  let cb_player = block.getFieldValue('SURGE_DC_PLAYER')==="TRUE";
  let code = `<clearSuperDrones player="${cb_player}" />\n`;
  return code;
};



// ====UNLOCKS===========
//======================
Blockly.Blocks['unlock_ship'] = {
  init() {
    this.appendDummyInput()
        .appendField("<unlockCustomShip> silent?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "UNLOCK_S")
        .appendField("ship req:")
        .appendField(new Blockly.FieldTextInput("PLAYER_SHIP"), "UNLOCK_REQ");
    this.appendDummyInput()
        .appendField("unlocked ship:")
        .appendField(new Blockly.FieldTextInput("PLAYER_SHIP_ID"), "UNLOCK_SHIP")
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#679967");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['achievement'] = {
  init() {
    this.appendDummyInput()
        .appendField("<achievement> silent?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "ACH_S")
        .appendField("ID:")
        .appendField(new Blockly.FieldTextInput("ACH_ID"), "ACH_ID");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#679967");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// generators------------
Blockly.JavaScript['unlock_ship'] = block => {
  let cb_silent = block.getFieldValue('UNLOCK_S')==="TRUE";
  let text_reqShip = block.getFieldValue("UNLOCK_REQ");
  let text_ship = block.getFieldValue("UNLOCK_SHIP");
  let code = `<unlockCustomShip silent="${cb_silent}" shipReq="${text_reqShip}">${text_ship}</unlockCustomShip>\n`;
  return code;
};

Blockly.JavaScript['achievement'] = block => {
  let cb_silent = block.getFieldValue('ACH_S')==="TRUE";
  let text_ach_id = block.getFieldValue("ACH_ID");
  let code = `<achievement silent="${cb_silent}">${text_ach_id}</achievement>\n`;
  return code;
};



// ====MISC===========
//======================
Blockly.Blocks['disableScrapScore'] = {
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

Blockly.Blocks['disableScrapAugments'] = {
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

Blockly.Blocks['playSound'] = {
  init() {
    this.appendDummyInput()
        .appendField("<playSound> name:")
        .appendField(new Blockly.FieldTextInput("sound_eff"), "SOUND");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#101f2c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['playMusic'] = {
  init() {
    this.appendDummyInput()
        .appendField("<playMusic> name:")
        .appendField(new Blockly.FieldTextInput("track_name"), "MUSIC");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#101f2c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['win'] = {
  init() {
    this.appendDummyInput()
        .appendField("<win> text:")
        .appendField(new Blockly.FieldTextInput("You win"), "WIN_TEXT");
    this.appendDummyInput()
        .appendField("credits text:")
        .appendField(new Blockly.FieldTextInput("def_text_id"), "WIN_CR_TEXT")
        .appendField("credits background:")
        .appendField(new Blockly.FieldTextInput("IMG_ID"), "WIN_CRBG");
    this.appendDummyInput()
        .appendField("sound:")
        .appendField(new Blockly.FieldTextInput("victory"), "WIN_SOUND")
        .appendField("music:")
        .appendField(new Blockly.FieldTextInput("title"), "WIN_MUSIC");
    this.appendDummyInput()
        .appendField("achievement:")
        .appendField(new Blockly.FieldTextInput("ach_id"), "WIN_ACH");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#101f2c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['lose'] = {
  init() {
    this.appendDummyInput()
        .appendField("<lose> text:")
        .appendField(new Blockly.FieldTextInput("You lost"), "L_TEXT");
    this.appendDummyInput()
        .appendField("sound:")
        .appendField(new Blockly.FieldTextInput("none"), "L_SOUND");
    this.setPreviousStatement(true, "allowed_event_childs");
    this.setNextStatement(true, "allowed_event_childs");
    this.setColour("#101f2c");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

//generators------------
Blockly.JavaScript['disableScrapScore'] = _block => {
  let code = `<disableScrapScore />\n`;
  return code;
};

Blockly.JavaScript['disableScrapAugments'] = _block => {
  let code = `<disableScrapAugments />\n`;
  return code;
};

Blockly.JavaScript['playSound'] = block => {
  let text_sound_name = block.getFieldValue('SOUND');
  let code = `<playSound>${text_sound_name}</playSound>\n`;
  return code;
};

Blockly.JavaScript['playMusic'] = block => {
  let text_music_name = block.getFieldValue('MUSIC');
  let code = `<playMusic>${text_music_name}</playMusic>\n`;
  return code;
};

Blockly.JavaScript['win'] = block => {
  let w_text = block.getFieldValue("WIN_TEXT");
  let w_cr_text = block.getFieldValue("WIN_CR_TEXT");
  let WIN_CRBG = block.getFieldValue("WIN_CRBG");
  let WIN_MUSIC = block.getFieldValue("WIN_MUSIC");
  let WIN_SOUND = block.getFieldValue("WIN_SOUND");
  let WIN_ACH = block.getFieldValue("WIN_ACH");
  let code = `<win text="${w_text}" creditsText="${w_cr_text}" creditsBackground="${WIN_CRBG}" 
      sound="${WIN_SOUND}" music="${WIN_MUSIC}" ach="${WIN_ACH}" />\n`;
  return code;
};

Blockly.JavaScript['lose'] = block => {
  let l_text = block.getFieldValue("L_TEXT");
  let l_sound = block.getFieldValue("L_SOUND");
  let code = `<lose text="${l_text}" sound="${l_sound}" />\n`;
  return code;
};



//==================================================================
//injection----------------------------------------------------------
import { toolbox } from "./toolbox";

const workspace = Blockly.inject('blocklyDiv',  {
  plugins: {
    'toolbox': ContinuousToolbox,
    'flyoutsVerticalToolbox': ContinuousFlyout,
    'metricsManager': ContinuousMetrics,
  },
  toolbox: toolbox,
  zoom:{
    controls: true,
    wheel: false,
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2,
    pinch: true
  },
  move:{
    scrollbars: {
      horizontal: true,
      vertical: true
    },
    drag: true,
    wheel: true,
  },
  trashcan: true
});




// real time update handler
function dynamicUpdater(_event) {
  let allcode = Blockly.JavaScript.workspaceToCode(workspace);
  document.getElementById('outputArea').value = allcode;
}
workspace.addChangeListener(dynamicUpdater);



// saving and loading handlers
function saveFile(fileName,urlFile){
  const a = document.createElement("a");
  a.style = "display: none";
  document.body.appendChild(a);
  a.href = urlFile;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(urlFile);
  a.remove();
}

document.querySelector("#saveAsBlocks").addEventListener("click", ()=>{
  const xml = Blockly.Xml.workspaceToDom(workspace);
  const xmlString = Blockly.Xml.domToPrettyText(xml);

  const blobData = new Blob([xmlString], {type: "text/xml"});
  const blobUrl = window.URL.createObjectURL(blobData);
  saveFile("blocks_workspace.xml", blobUrl);
});

document.querySelector("#saveOutput").addEventListener("click", ()=>{
  const outputXmlString = document.querySelector("#outputArea").value || "<empty/>";

  const blobData = new Blob([outputXmlString], {type: "text/plain"});
  const blobUrl = window.URL.createObjectURL(blobData);
  saveFile("events_generated.xml.append", blobUrl);
});

document.querySelector("#loadBlocks").addEventListener("change", async (event)=>{
  const file = event.target.files.item(0)
  const text = await file.text();
  
  let xml = Blockly.Xml.textToDom(text);
  Blockly.Xml.domToWorkspace(xml,workspace);
  document.querySelector("#loadBlocks").value = "";
});
