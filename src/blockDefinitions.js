import Blockly from "blockly";

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
    this.setTooltip("aaa");
    this.setHelpUrl("");
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


Blockly.Blocks['reward_auto'] = {
  init() {
    this.appendDummyInput()
        .appendField("<autoReward> Level:")
        .appendField(new Blockly.FieldDropdown([["HIGH","HIGH"], ["MED","MED"], ["LOW","LOW"], ["RANDOM","RANDOM"]]), "REWARD_LEVEL")
        .appendField(">Type:")
        .appendField(new Blockly.FieldDropdown([["standard","standard"], ["stuff","stuff"], ["fuel","fuel"], ["missiles","missiles"], ["droneparts","droneparts"], ["scrap_only","scrap_only"], ["fuel_only","fuel_only"], ["missiles_only","missiles_only"], ["droneparts_only","droneparts_only"], ["item","item"], ["weapon","weapon"], ["drone","drone"], ["augment","augment"]]), "REWARD_TYPE");
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
        .appendField(new Blockly.FieldDropdown([["scrap","scrap"], ["fuel","fuel"], ["missiles","missiles"], ["drones","drones"]]), "ITEM_TYPE")
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

//injection----------------------------------------------------------

import { toolbox } from "./toolbox";
const workspace = Blockly.inject('blocklyDiv',  {toolbox: toolbox});

//generation definitions--------------------------------------------------------

Blockly.JavaScript['event'] = block => {
  let text_eventname = block.getFieldValue('eventName');
  let statements_name = Blockly.JavaScript.statementToCode(block, 'EVENT_CHILDS');
  let checkbox_uniq = block.getFieldValue('UNIQ') === 'TRUE';
  let code = '';
  if (checkbox_uniq){
    code = `<event name="${text_eventname.toUpperCase()}" unique="${checkbox_uniq}">
${statements_name}</event>
`;
  }else{
    code = `<event name="${text_eventname.toUpperCase()}">
${statements_name}</event>
`;
  }
  return code;
};
Blockly.JavaScript['choice'] = block => {
  let checkbox_hidden = block.getFieldValue('hidden') === 'TRUE';
  let statements_name = Blockly.JavaScript.statementToCode(block, 'CHOICE_S');
  let code = '';
  if (checkbox_hidden){
    code = `<choice hidden="${checkbox_hidden}">
${statements_name}</choice>
`;
  }else{
    code = `<choice>
${statements_name}</choice>
`;
  }
  return code;
};

Blockly.JavaScript['event_nested'] = block => {
  let statements_name = Blockly.JavaScript.statementToCode(block, 'EVENT_N');
  let code = `<event>
${statements_name}</event>
`;
  return code;
};

Blockly.JavaScript['text'] = block => {
  let text_texttag = block.getFieldValue('textTag');
  let code = `<text>${text_texttag}</text>
`;
  return code;
};

Blockly.JavaScript['event_load'] = block => {
  let text_ldevent = block.getFieldValue('LDEVENT');
  let code = `<event load="${text_ldevent.toUpperCase()}"/>
`
  return code;
};

Blockly.JavaScript['event_end'] = function(_block) {
  let code = '<event/>\n';
  return code;
};

Blockly.JavaScript['event_list'] = block => {
  let text_evlist_name = block.getFieldValue('EVLIST_NAME');
  let statements_evlist = Blockly.JavaScript.statementToCode(block, 'EVLIST');
  let code = `<eventList name="${text_evlist_name.toUpperCase()}">
${statements_evlist}</eventList>`;
  return code;
};

Blockly.JavaScript['choice_adv'] = block => {
  let value_attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC);
  let checkbox_hidd2 = block.getFieldValue('HIDD2') === 'TRUE';
  let statements_choice = Blockly.JavaScript.statementToCode(block, 'CHOICE');
  let checkbox_blue = block.getFieldValue('BLUE') === 'TRUE';
  let code = '';
  if (checkbox_blue&&checkbox_hidd2){
    code = `<choice hidden="${checkbox_hidd2}" blue="${!checkbox_blue}"${value_attributes}>
${statements_choice}</choice>
`
  }else if (!checkbox_blue&&checkbox_hidd2){
    code = `<choice hidden="${checkbox_hidd2}"${value_attributes}>
${statements_choice}</choice>
`
  }else if (checkbox_blue&&!checkbox_hidd2){
    code = `<choice blue="${!checkbox_hidd2}"${value_attributes}>
${statements_choice}</choice>
`
  }else{
    code = `<choice${value_attributes}>
${statements_choice}</choice>
`
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


Blockly.JavaScript['text_list'] = block => {
  let text_txlt_name = block.getFieldValue('TXLT_NAME');
  let statements_txlist = Blockly.JavaScript.statementToCode(block, 'TXLIST');
  let code = `<textList name="${text_txlt_name.toUpperCase()}">
${statements_txlist}</textList>
`;
  return code;
};

Blockly.JavaScript['text_load'] = block => {
  let text_txload = block.getFieldValue('TXLOAD');
  let code = `<text load="${text_txload.toUpperCase()}"/>
`;
  return code;
};


Blockly.JavaScript['reward_auto'] = block => {
  let dropdown_reward_level = block.getFieldValue('REWARD_LEVEL');
  let dropdown_reward_type = block.getFieldValue('REWARD_TYPE');
  let code = `<autoReward level="${dropdown_reward_level}">${dropdown_reward_type}</autoReward>
`;
  return code;
};


Blockly.JavaScript['item_modify'] = block => {
  let checkbox_item_steal = block.getFieldValue('ITEM_STEAL') === 'TRUE';
  let statements_item_modify_childs = Blockly.JavaScript.statementToCode(block, 'ITEM_MODIFY_CHILDS');
  let code;
  if (checkbox_item_steal){
    code = `<item_modify steal="true">
${statements_item_modify_childs}</item_modify>
`;    
  }else{
    code = `<item_modify>
${statements_item_modify_childs}</item_modify>
`;
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

Blockly.JavaScript['boarders'] = block => {
  let number_min = block.getFieldValue('MIN');
  let number_max = block.getFieldValue('MAX');
  let text_race = block.getFieldValue('RACE');
  let code = `<boarders min="${number_min}" max="${number_max}" class="${text_race}"/>
`;
  return code;
};


Blockly.JavaScript['comment'] = block => {
  let text_comt = block.getFieldValue('COMT');
  let code = `<!--${text_comt}-->
`;
  return code;
};

function dynamicUpdater(_event) {
  let allcode = Blockly.JavaScript.workspaceToCode(workspace);
  document.getElementById('outputArea').value = allcode;
}

// function save(){
//   let xml = Blockly.Xml.workspaceToDom(workspace);
//   let xmlString = Blockly.Xml.domToPrettyText(xml);
//   document.getElementById('outputArea2').value = xmlString;
// }

// function load(){
//   try{
//     let input = document.getElementById('outputArea2').value
//     let xml = Blockly.Xml.textToDom(input);
//     Blockly.Xml.domToWorkspace(xml,workspace);
//   }catch(error){
//     alert(error)
//   }
  
// }

workspace.addChangeListener(dynamicUpdater);
