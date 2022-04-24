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
  init: function() {
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
  init: function() {
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
  init: function() {
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
  init: function() {
    this.appendDummyInput()
        .appendField("<event/>");
    this.setPreviousStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['event_load'] = {
  init: function() {
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
  init: function() {
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
  init: function() {
    this.appendValueInput("ATTRIBUTES")
        .setCheck(null)
        .appendField("<choice>")
        .appendField("Hidden?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "HIDD2");
    this.appendStatementInput("CHOICE")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("No Blue?")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "BLUE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['attri_req'] = {
  init: function() {
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
  init: function() {
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
  init: function() {
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
  init: function() {
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
  init: function() {
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
  init: function() {
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
  init: function() {
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
  init: function() {
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
  init: function() {
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
  init: function() {
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
  init: function() {
    this.appendDummyInput()
        .appendField("Comment:")
        .appendField(new Blockly.FieldTextInput("This is a comment!"), "COMT");
    this.setColour("0");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


//generation definitions--------------------------------------------------------

import { toolbox } from "./toolbox";

var workspace = Blockly.inject('blocklyDiv',  {toolbox: toolbox});

Blockly.JavaScript['event'] = function(block) {
  var text_eventname = block.getFieldValue('eventName');
  var statements_name = Blockly.JavaScript.statementToCode(block, 'EVENT_CHILDS');
  var checkbox_uniq = block.getFieldValue('UNIQ') === 'TRUE';
  var code = '';
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
Blockly.JavaScript['choice'] = function(block) {
  var checkbox_hidden = block.getFieldValue('hidden') === 'TRUE';
  var statements_name = Blockly.JavaScript.statementToCode(block, 'CHOICE_S');
  var code = '';
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

Blockly.JavaScript['event_nested'] = function(block) {
  var statements_name = Blockly.JavaScript.statementToCode(block, 'EVENT_N');
  var code = `<event>
${statements_name}</event>
`;
  return code;
};

Blockly.JavaScript['text'] = function(block) {
  var text_texttag = block.getFieldValue('textTag');
  var code = `<text>${text_texttag}</text>
`;
  return code;
};

Blockly.JavaScript['event_load'] = function(block) {
  var text_ldevent = block.getFieldValue('LDEVENT');
  var code = `<event load="${text_ldevent.toUpperCase()}"/>
`
  return code;
};

Blockly.JavaScript['event_end'] = function(_block) {
  var code = '<event/>\n';
  return code;
};

Blockly.JavaScript['event_list'] = function(block) {
  var text_evlist_name = block.getFieldValue('EVLIST_NAME');
  var statements_evlist = Blockly.JavaScript.statementToCode(block, 'EVLIST');
  var code = `<eventList name="${text_evlist_name.toUpperCase()}">
${statements_evlist}</eventList>`;
  return code;
};

Blockly.JavaScript['choice_adv'] = function(block) {
  var value_attributes = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTES', Blockly.JavaScript.ORDER_ATOMIC);
  var checkbox_hidd2 = block.getFieldValue('HIDD2') === 'TRUE';
  var statements_choice = Blockly.JavaScript.statementToCode(block, 'CHOICE');
  var checkbox_blue = block.getFieldValue('BLUE') === 'TRUE';
  var code = '';
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

Blockly.JavaScript['attri_req'] = function(block) {
  var text_req = block.getFieldValue('REQ');
  var value_req1 = Blockly.JavaScript.valueToCode(block, 'REQ1', Blockly.JavaScript.ORDER_ATOMIC);
  var code = ` req="${text_req}"${value_req1}`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['attri_lvl'] = function(block) {
  var number_lvl = block.getFieldValue('LVL');
  var value_lvl1 = Blockly.JavaScript.valueToCode(block, 'LVL1', Blockly.JavaScript.ORDER_ATOMIC);
  var code = ` lvl="${number_lvl}"${value_lvl1}`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['attri_maxlvl'] = function(block) {
  var number_max_lvl = block.getFieldValue('MAX_LVL');
  var value_max = Blockly.JavaScript.valueToCode(block, 'MAX', Blockly.JavaScript.ORDER_ATOMIC);
  var code = ` max_lvl="${number_max_lvl}"${value_max}`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['attri_maxgp'] = function(block) {
  var number_max_group = block.getFieldValue('MAX_GROUP');
  var value_maxgrp = Blockly.JavaScript.valueToCode(block, 'MAXGRP', Blockly.JavaScript.ORDER_ATOMIC);
  var code = ` max_group="${number_max_group}"${value_maxgrp}`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.JavaScript['text_list'] = function(block) {
  var text_txlt_name = block.getFieldValue('TXLT_NAME');
  var statements_txlist = Blockly.JavaScript.statementToCode(block, 'TXLIST');
  var code = `<textList name="${text_txlt_name.toUpperCase()}">
${statements_txlist}</textList>
`;
  return code;
};

Blockly.JavaScript['text_load'] = function(block) {
  var text_txload = block.getFieldValue('TXLOAD');
  var code = `<text load="${text_txload.toUpperCase()}"/>
`;
  return code;
};


Blockly.JavaScript['reward_auto'] = function(block) {
  var dropdown_reward_level = block.getFieldValue('REWARD_LEVEL');
  var dropdown_reward_type = block.getFieldValue('REWARD_TYPE');
  var code = `<autoReward level="${dropdown_reward_level}">${dropdown_reward_type}</autoReward>
`;
  return code;
};


Blockly.JavaScript['item_modify'] = function(block) {
  var checkbox_item_steal = block.getFieldValue('ITEM_STEAL') === 'TRUE';
  var statements_item_modify_childs = Blockly.JavaScript.statementToCode(block, 'ITEM_MODIFY_CHILDS');
  var code;
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

Blockly.JavaScript['item'] = function(block) {
  var dropdown_item_type = block.getFieldValue('ITEM_TYPE');
  var number_item_max = block.getFieldValue('ITEM_MAX');
  var number_item_min = block.getFieldValue('ITEM_MIN');
  var code = `<item type="${dropdown_item_type}" min="${number_item_min}" max="${number_item_max}"/>
`;
  return code;
};

Blockly.JavaScript['boarders'] = function(block) {
  var number_min = block.getFieldValue('MIN');
  var number_max = block.getFieldValue('MAX');
  var text_race = block.getFieldValue('RACE');
  var code = `<boarders min="${number_min}" max="${number_max}" class="${text_race}"/>
`;
  return code;
};


Blockly.JavaScript['comment'] = function(block) {
  var text_comt = block.getFieldValue('COMT');
  var code = `<!--${text_comt}-->
`;
  return code;
};

function dynamicUpdater(_event) {
  var allcode = Blockly.JavaScript.workspaceToCode(workspace);
  document.getElementById('outputArea').value = allcode;
}

// function save(){
//   var xml = Blockly.Xml.workspaceToDom(workspace);
//   var xmlString = Blockly.Xml.domToPrettyText(xml);
//   document.getElementById('outputArea2').value = xmlString;
// }

// function load(){
//   try{
//     var input = document.getElementById('outputArea2').value
//     var xml = Blockly.Xml.textToDom(input);
//     Blockly.Xml.domToWorkspace(xml,workspace);
//   }catch(error){
//     alert(error)
//   }
  
// }

workspace.addChangeListener(dynamicUpdater);
