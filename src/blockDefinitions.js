import Blockly from "blockly";

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
        .setCheck(null);
    this.setColour(230);
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
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
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
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

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
        .appendField(new Blockly.FieldTextInput("Insert your text here!", validate), "textTag");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['event_load'] = {
  init() {
    this.appendDummyInput()
        .appendField("<event> Load")
        .appendField(new Blockly.FieldTextInput("EVENT_NAME"), "LDEVENT");
    this.setPreviousStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['event_end'] = {
  init() {
    this.appendDummyInput()
        .appendField("<event/>");
    this.setPreviousStatement(true, null);
    this.setColour(230);
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
        .setCheck(null);
    this.setColour(230);
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
};

Blockly.JavaScript['text'] = block => {
  let text_texttag = block.getFieldValue('textTag');
  let code = `<text>${text_texttag}</text>\n`;
  return code;
};

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
        .setCheck(null)
        .appendField("<choice>")
        .appendField("Hidden?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "HIDD2");
    this.appendStatementInput("CHOICE")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("No Blue?")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "BLUE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['attri_req'] = {
  init() {
    this.appendValueInput("REQ1")
        .setCheck(null)
        .appendField("Require")
        .appendField(new Blockly.FieldTextInput("ITEM_ID"), "REQ");
    this.setOutput(true, null);
    this.setColour(330);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['attri_lvl'] = {
  init() {
    this.appendValueInput("LVL1")
        .setCheck(null)
        .appendField("Level")
        .appendField(new Blockly.FieldNumber(0), "LVL");
    this.setOutput(true, null);
    this.setColour(330);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['attri_maxlvl'] = {
  init() {
    this.appendValueInput("MAX")
        .setCheck(null)
        .appendField("Max Level")
        .appendField(new Blockly.FieldNumber(0), "MAX_LVL");
    this.setOutput(true, null);
    this.setColour(330);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['attri_maxgp'] = {
  init() {
    this.appendValueInput("MAXGRP")
        .setCheck(null)
        .appendField("Max Group")
        .appendField(new Blockly.FieldNumber(0), "MAX_GROUP");
    this.setOutput(true, null);
    this.setColour(330);
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

Blockly.Blocks['text_list'] = {
  init() {
    this.appendDummyInput()
        .appendField("<textList> Name")
        .appendField(new Blockly.FieldTextInput("TEXT_LIST_NAME"), "TXLT_NAME");
    this.appendStatementInput("TXLIST")
        .setCheck(null);
    this.setColour(120);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['text_load'] = {
  init() {
    this.appendDummyInput()
        .appendField("<text> Load")
        .appendField(new Blockly.FieldTextInput("TEXT_LIST_NAME"), "TXLOAD");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// generators--------------------
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
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
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
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
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
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
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



// -------------------------------
// EQUIPMENTS CATEGORY---------
// -------------------------------

Blockly.Blocks['reward_weapon'] = {
  init() {
    this.appendDummyInput()
        .appendField("<weapon> name")
        .appendField(new Blockly.FieldTextInput("WEP_ITEM_ID"), "WEAPON_NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(90);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['reward_augment'] = {
  init() {
    this.appendDummyInput()
        .appendField("<augment> name")
        .appendField(new Blockly.FieldTextInput("AUG_ITEM_ID"), "AUG_NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(90);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['reward_drone'] = {
  init() {
    this.appendDummyInput()
        .appendField("<drone> name")
        .appendField(new Blockly.FieldTextInput("DRN_ITEM_ID"), "DRONE_NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(90);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['remove'] = {
  init() {
    this.appendDummyInput()
        .appendField("<remove> name")
        .appendField(new Blockly.FieldTextInput("ITEM_ID"), "REMOVE_NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(90);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// generators-----------------
Blockly.JavaScript['item'] = block => {
  let dropdown_item_type = block.getFieldValue('ITEM_TYPE');
  let number_item_max = block.getFieldValue('ITEM_MAX');
  let number_item_min = block.getFieldValue('ITEM_MIN');
  let code = `<item type="${dropdown_item_type}" min="${number_item_min}" max="${number_item_max}"/>
`;
  return code;
};

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
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['crew_member'] = {
  init() {
    this.appendValueInput("CREW_SKILLS")
        .setCheck(null)
        .appendField("<crewMember> amount:")
        .appendField(new Blockly.FieldNumber(0, -1, Infinity, 1), "AMOUNT")
        .appendField("race:")
        .appendField(new Blockly.FieldTextInput("random"), "RACE");
    this.appendDummyInput()
        .appendField("default name:")
        .appendField(new Blockly.FieldTextInput("none"), "CREW_NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(false);
    this.setColour(160);
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
    this.setOutput(true, null);
    this.setColour(330);
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
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
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
        .setCheck(null)
        .appendField("<damage> amount:")
        .appendField(new Blockly.FieldNumber(0, -Infinity, Infinity, 1), "DAMAGE_AMOUNT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(false);
    this.setColour(260);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['attri_damage_system'] = {
  init() {
    this.appendValueInput("DAMAGE_EFF")
        .setCheck(null)
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
    this.setOutput(true, null);
    this.setColour(330);
    this.setTooltip("");
    this.setHelpUrl("");
  }  
};

Blockly.Blocks['attri_damage_effect'] = {
  init() {
    this.appendValueInput("DAMAGE_SYS")
        .setCheck(null)
        .appendField("extra effect:")
        .appendField(new Blockly.FieldDropdown([
          ["fire","fire"], 
          ["breach","breach"], 
          ["all","all"], 
          ["random","random"], 
        ]), "DAMAGE_EFFECT");
    this.setOutput(true, null);
    this.setColour(330);
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
        ]), "STATUS_TARGET")
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
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
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
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
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
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

// generators-------

Blockly.JavaScript['damage'] = block => {
  let number_dmg_amount = block.getFieldValue("DAMAGE_AMOUNT");
  let value_dmg_attributes = Blockly.JavaScript.valueToCode(block, 'DAMAGE_ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC);
  let code = `<damage amount="${number_dmg_amount}" ${value_dmg_attributes}/>`;
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
  let code = `system="${dropdown_damage_eff}" ${value_more_attributes}`;
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
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['reveal_map'] = {
  init() {
    this.appendDummyInput()
        .appendField("<reveal_map>");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['modify_pursuit'] = {
  init() {
    this.appendDummyInput()
        .appendField("<modifyPursuit> amount:")
        .appendField(new Blockly.FieldNumber(0, 0, Infinity, 1), "PURSUIT_AMOUNT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['store'] = {
  init() {
    this.appendDummyInput()
        .appendField("<store> store name:")
        .appendField(new Blockly.FieldTextInput("STORE_STANDARD"), "STORE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['quest'] = {
  init() {
    this.appendDummyInput()
        .appendField("<quest> event:")
        .appendField(new Blockly.FieldTextInput("EVENT_NAME"), "QUEST_EVT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
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
  let code = `<modifyPursuit amount="${number_pursuit_amt}">\n`;
  return code;
};

Blockly.JavaScript['store'] = block => {
  let text_store_name = block.getFieldValue('STORE');
  let code = `<store>${text_store_name}</store>\n`;
  return code;
};

Blockly.JavaScript['quest'] = block => {
  let text_questevent = block.getFieldValue('QUEST_EVT');
  let code = `<quest event="${text_questevent}">\n`;
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
        .appendField("target (only for asb):")
        .appendField(new Blockly.FieldDropdown([
          ["player","player"], 
          ["enemy","enemy"], 
          ["all","all"], 
        ]), "ENV_TARGET");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(200);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['img'] = {
  init() {
    this.appendDummyInput()
        .appendField("<img> back:")
        .appendField(new Blockly.FieldTextInput("BACKGROUND_NAME"), "IMG_BG")
        .appendField("planet:")
        .appendField(new Blockly.FieldTextInput("PLANET_NONE"), "IMG_PLT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(200);
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
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(200);
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
    code = `<environment type="${dropdown_envtype}" target="${dropdown_envtarget}">\n`;
  }else{
    code = `<environment type="${dropdown_envtype}">\n`;
  }
  return code;
};

Blockly.JavaScript['img'] = block => {
  let text_bg = block.getFieldValue('IMG_BG');
  let text_planet = block.getFieldValue('IMG_PLT')
  let code = `<img back="${text_bg}" planet="${text_planet}">\n`;
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


//==================================================================
//injection----------------------------------------------------------
import { toolbox } from "./toolbox";
const workspace = Blockly.inject('blocklyDiv',  {toolbox: toolbox});




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

  const blobData = new Blob([outputXmlString], {type: "text/xml"});
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
