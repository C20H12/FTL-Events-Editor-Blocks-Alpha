import { JavaScript } from "blockly";

// -------------------------------
// EVENT RELATED CATEGORY---------
// -------------------------------

JavaScript['event'] = block => {
  let text_eventname = block.getFieldValue('eventName');
  let statements_name = JavaScript.statementToCode(block, 'EVENT_CHILDS');
  let checkbox_uniq = block.getFieldValue('UNIQ') === 'TRUE';
  let code = '';
  if (checkbox_uniq){
    code = `<event name="${text_eventname.toUpperCase()}" unique="${checkbox_uniq}">\n${statements_name}</event>\n`;
  }else{
    code = `<event name="${text_eventname.toUpperCase()}">\n${statements_name}</event>\n`;
  }
  return code;
};

JavaScript['choice'] = block => {
  let checkbox_hidden = block.getFieldValue('hidden') === 'TRUE';
  let statements_name = JavaScript.statementToCode(block, 'CHOICE_S');
  let code = '';
  if (checkbox_hidden){
    code = `<choice hidden="${checkbox_hidden}">\n${statements_name}</choice>
`;
  }else{
    code = `<choice>\n${statements_name}</choice>\n`;
  }
  return code;
};

JavaScript['event_nested'] = block => {
  let statements_name = JavaScript.statementToCode(block, 'EVENT_N');
  let code = `<event>\n${statements_name}</event>\n`;
  return code;
}

JavaScript['event_load'] = block => {
  let text_ldevent = block.getFieldValue('LDEVENT');
  let code = `<event load="${text_ldevent.toUpperCase()}"/>\n`;
  return code;
};

JavaScript['event_end'] = function(_block) {
  let code = '<event/>\n';
  return code;
};

JavaScript['event_list'] = block => {
  let text_evlist_name = block.getFieldValue('EVLIST_NAME');
  let statements_evlist = JavaScript.statementToCode(block, 'EVLIST');
  let code = `<eventList name="${text_evlist_name.toUpperCase()}">\n${statements_evlist}</eventList>\n`;
  return code;
};



// -------------------------------
// CHOICE AND CHOICE ATTRIBUTES CATEGORY---------
// -------------------------------

JavaScript['choice_adv'] = block => {
  let value_attributes = JavaScript.valueToCode(block, 'ATTRIBUTES', JavaScript.ORDER_ATOMIC);
  let checkbox_hidd2 = block.getFieldValue('HIDD2') === 'TRUE';
  let statements_choice = JavaScript.statementToCode(block, 'CHOICE');
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

JavaScript['attri_req'] = block => {
  let text_req = block.getFieldValue('REQ');
  let value_req1 = JavaScript.valueToCode(block, 'REQ1', JavaScript.ORDER_ATOMIC);
  let code = ` req="${text_req}"${value_req1}`;
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['attri_lvl'] = block => {
  let number_lvl = block.getFieldValue('LVL');
  let value_lvl1 = JavaScript.valueToCode(block, 'LVL1', JavaScript.ORDER_ATOMIC);
  let code = ` lvl="${number_lvl}"${value_lvl1}`;
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['attri_maxlvl'] = block => {
  let number_max_lvl = block.getFieldValue('MAX_LVL');
  let value_max = JavaScript.valueToCode(block, 'MAX', JavaScript.ORDER_ATOMIC);
  let code = ` max_lvl="${number_max_lvl}"${value_max}`;
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['attri_maxgp'] = block => {
  let number_max_group = block.getFieldValue('MAX_GROUP');
  let value_maxgrp = JavaScript.valueToCode(block, 'MAXGRP', JavaScript.ORDER_ATOMIC);
  let code = ` max_group="${number_max_group}"${value_maxgrp}`;
  return [code, JavaScript.ORDER_ATOMIC];
};



// -------------------------------
// TEXT RELATED CATEGORY---------
// -------------------------------

JavaScript['text'] = block => {
  let text_texttag = block.getFieldValue('textTag');
  let code = `<text>${text_texttag.replace(/(?:\r\n|\r|\n)/gm,"&#10;")}</text>\n`;
  return code;
};

JavaScript['text_choice'] = block => {
  let text_texttag = block.getFieldValue('textTag');
  let code = `<text>${text_texttag}</text>\n`;
  return code;
};

JavaScript['text_txlist'] = block => {
  let text_texttag = block.getFieldValue('textTag');
  let code = `<text>${text_texttag}</text>\n`;
  return code;
};

JavaScript['text_list'] = block => {
  let text_txlt_name = block.getFieldValue('TXLT_NAME');
  let statements_txlist = JavaScript.statementToCode(block, 'TXLIST');
  let code = `<textList name="${text_txlt_name.toUpperCase()}">\n${statements_txlist}</textList>\n`;
  return code;
};

JavaScript['text_load'] = block => {
  let text_txload = block.getFieldValue('TXLOAD');
  let code = `<text load="${text_txload.toUpperCase()}"/>\n`;
  return code;
};

JavaScript['text_load_choice'] = block => {
  let text_txload = block.getFieldValue('TXLOAD');
  let code = `<text load="${text_txload.toUpperCase()}"/>\n`;
  return code;
};



// -------------------------------
// REWARDS CATEGORY---------
// -------------------------------

JavaScript['reward_auto'] = block => {
  let dropdown_reward_level = block.getFieldValue('REWARD_LEVEL');
  let dropdown_reward_type = block.getFieldValue('REWARD_TYPE');
  let code = `<autoReward level="${dropdown_reward_level}">${dropdown_reward_type}</autoReward>\n`;
  return code;
};

JavaScript['item_modify'] = block => {
  let checkbox_item_steal = block.getFieldValue('ITEM_STEAL') === 'TRUE';
  let statements_item_modify_childs = JavaScript.statementToCode(block, 'ITEM_MODIFY_CHILDS');
  let code;
  if (checkbox_item_steal){
    code = `<item_modify steal="true">\n${statements_item_modify_childs}</item_modify>\n`;    
  }else{
    code = `<item_modify>\n${statements_item_modify_childs}</item_modify>\n`;
  }
  return code;
};

JavaScript['item'] = block => {
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

JavaScript['reward_weapon'] = block => {
  let text_weapon_name = block.getFieldValue('WEAPON_NAME');
  let code = `<weapon name="${text_weapon_name}" />\n`;
  return code;
};

JavaScript['reward_augment'] = block => {
  let text_weapon_name = block.getFieldValue('AUG_NAME');
  let code = `<augment name="${text_weapon_name}" />\n`;
  return code;
};

JavaScript['reward_drone'] = block => {
  let text_weapon_name = block.getFieldValue('DRONE_NAME');
  let code = `<drone name="${text_weapon_name}" />\n`;
  return code;
};

JavaScript['remove'] = block => {
  let text_remove_name = block.getFieldValue('REMOVE_NAME');
  let code = `<remove name="${text_remove_name}" />\n`;
  return code;
};



// -------------------------------
// CREW RELATED CATEGORY---------
// -------------------------------


JavaScript['boarders'] = block => {
  let number_min = block.getFieldValue('MIN');
  let number_max = block.getFieldValue('MAX');
  let text_race = block.getFieldValue('RACE');
  let code = `<boarders min="${number_min}" max="${number_max}" class="${text_race}"/>\n`;
  return code;
};

JavaScript['crew_member'] = block => {
  let number_amount = block.getFieldValue("AMOUNT");
  let text_race = block.getFieldValue('RACE');
  let value_attributes = JavaScript.valueToCode(block, 'CREW_SKILLS', JavaScript.ORDER_ATOMIC);
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

JavaScript['attri_crew_skill'] = block => {
  let dropdown_skill = block.getFieldValue("SKILL_AREA");
  let number_skill_lvl = block.getFieldValue('SKILL_LVL');
  let code = `${dropdown_skill}="${number_skill_lvl}"`;
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['remove_crew'] = block => {
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

JavaScript['damage'] = block => {
  let number_dmg_amount = block.getFieldValue("DAMAGE_AMOUNT");
  let value_dmg_attributes = JavaScript.valueToCode(block, 'DAMAGE_ATTRIBUTES', JavaScript.ORDER_ATOMIC);
  let code = `<damage amount="${number_dmg_amount}" ${value_dmg_attributes}/>\n`;
  return code;
};

JavaScript['attri_damage_system'] = block => {
  let dropdown_damage_room = block.getFieldValue("DAMAGE_ROOM");
  let value_more_attributes = JavaScript.valueToCode(block, 'DAMAGE_EFF', JavaScript.ORDER_ATOMIC);
  let code = `system="${dropdown_damage_room}" ${value_more_attributes}`;
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['attri_damage_effect'] = block => {
  let dropdown_damage_eff = block.getFieldValue("DAMAGE_EFFECT");
  let value_more_attributes = JavaScript.valueToCode(block, 'DAMAGE_SYS', JavaScript.ORDER_ATOMIC);
  let code = `effect="${dropdown_damage_eff}" ${value_more_attributes}`;
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['status'] = block => {
  let dropdown_type = block.getFieldValue('STATUS_TYPE');
  let dropdown_target = block.getFieldValue('STATUS_TARGET');
  let dropdown_sys = block.getFieldValue('STATUS_ROOM');
  let number_amount = block.getFieldValue('STATUS_AMOUNT')
  let code = `<status type="${dropdown_type}" target="${dropdown_target}" system="${dropdown_sys}" amount="${number_amount}"/>\n`;
  return code;
};

JavaScript['upgrade'] = block => {
  let number_upg_amount = block.getFieldValue('UPG_AMOUNT');
  let dropdown_upg_sys = block.getFieldValue('UPG_SYS');
  let code = `<upgrade amount="${number_upg_amount}" system="${dropdown_upg_sys}"/>\n`;
  return code;
};

JavaScript['system'] = block => {
  let dropdown_sys_sys = block.getFieldValue('SYSTEM_SYS');
  let code = `<system name="${dropdown_sys_sys}"/>\n`;
  return code;
};



// -------------------------------
// MAP RELATED CATEGORY---------
// -------------------------------

JavaScript['distress_beacon'] = _block => {
  let code = `<distressBeacon />\n`;
  return code;
};

JavaScript['reveal_map'] = _block => {
  let code = `<reveal_map />\n`;
  return code;
};

JavaScript['modify_pursuit'] = block => {
  let number_pursuit_amt = block.getFieldValue('PURSUIT_AMOUNT');
  let code = `<modifyPursuit amount="${number_pursuit_amt}"/>\n`;
  return code;
};

JavaScript['store'] = block => {
  let text_store_name = block.getFieldValue('STORE');
  let code = `<store>${text_store_name}</store>\n`;
  return code;
};

JavaScript['quest'] = block => {
  let text_questevent = block.getFieldValue('QUEST_EVT');
  let code = `<quest event="${text_questevent}"/>\n`;
  return code;
};



// -------------------------------
// BACKGROUND OBJECTS CATEGORY---------
// -------------------------------

JavaScript['environment'] = block => {
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

JavaScript['img'] = block => {
  let text_bg = block.getFieldValue('IMG_BG');
  let text_planet = block.getFieldValue('IMG_PLT')
  let code = `<img back="${text_bg}" planet="${text_planet}"/>\n`;
  return code;
};

JavaScript['custom_fleet'] = block => {
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

JavaScript['ship_load'] = block => {
  let text_shipname = block.getFieldValue('SHIPL_NAME');
  let cb_host = block.getFieldValue('SHIPL_HOST')==="TRUE";
  let code;
  if (text_shipname.toLowerCase()==="current")
    code = `<ship hostile="${cb_host}"/>\n`;
  else code = `<ship load="${text_shipname}" hostile="${cb_host}"/>\n`;
  return code;
};

JavaScript['ship'] = block => {
  let text_shipname = block.getFieldValue('SHIP_NAME');
  let statements_childs = JavaScript.statementToCode(block, 'SHIP_CHILDS');
  let text_autobp = block.getFieldValue('SHIP_AUTOBP');
  let code = `<ship name="${text_shipname}" auto_blueprint="${text_autobp}">\n${statements_childs}</ship>\n`;
  return code;
};

JavaScript['surrender'] = block => {
  let num_chance = block.getFieldValue('SUR_CHANCE');
  let num_min = block.getFieldValue('SUR_MIN');
  let num_max = block.getFieldValue("SUR_MAX");
  let cb_is_load = block.getFieldValue("SUR_IS_LOAD") === "TRUE";
  let text_load_event = block.getFieldValue("SUR_LOAD");
  let statements_sur_event = JavaScript.statementToCode(block, 'SUR_CHILDS');
  let code;
  if (cb_is_load){
    code = `<surrender chance="${num_chance}" min="${num_min}" max="${num_max}" load="${text_load_event}"/>\n`;
  }else{
    code = `<surrender chance="${num_chance}" min="${num_min}" max="${num_max}">\n${statements_sur_event}</surrender>\n`;
  }
  return code;
};

JavaScript['escape'] = block => {
  let num_chance = block.getFieldValue('ESC_CHANCE');
  let num_min = block.getFieldValue('ESC_MIN');
  let num_max = block.getFieldValue("ESC_MAX");
  let num_time = block.getFieldValue("ESC_TIME")
  let cb_is_load = block.getFieldValue("ESC_IS_LOAD") === "TRUE";
  let text_load_event = block.getFieldValue("ESC_LOAD");
  let statements_sur_event = JavaScript.statementToCode(block, 'ESC_CHILDS');
  let code;
  if (cb_is_load){
    code = `<escape chance="${num_chance}" min="${num_min}" max="${num_max}" timer="${num_time}" load="${text_load_event}"/>\n`;
  }else{
    code = `<escape chance="${num_chance}" min="${num_min}" max="${num_max}" timer="${num_time}">\n${statements_sur_event}</escape>\n`;
  }
  return code;
};

JavaScript['gotaway'] = block => {
  let cb_is_load = block.getFieldValue("GA_IS_LOAD") === "TRUE";
  let text_load_event = block.getFieldValue("GA_LOAD");
  let statements_sur_event = JavaScript.statementToCode(block, 'GA_CHILDS');
  let code;
  if (cb_is_load){
    code = `<gotaway load="${text_load_event}"/>\n`;
  }else{
    code = `<gotaway>\n${statements_sur_event}</gotaway>\n`;
  }
  return code;
};

JavaScript['destroyed'] = block => {
  let cb_is_load = block.getFieldValue("DES_IS_LOAD") === "TRUE";
  let text_load_event = block.getFieldValue("DES_LOAD");
  let statements_sur_event = JavaScript.statementToCode(block, 'DES_CHILDS');
  let code;
  if (cb_is_load){
    code = `<destroyed load="${text_load_event}"/>\n`;
  }else{
    code = `<destroyed>\n${statements_sur_event}</destroyed>\n`;
  }
  return code;
};

JavaScript['deadcrew'] = block => {
  let cb_is_load = block.getFieldValue("CK_IS_LOAD") === "TRUE";
  let text_load_event = block.getFieldValue("CK_LOAD");
  let statements_sur_event = JavaScript.statementToCode(block, 'CK_CHILDS');
  let code;
  if (cb_is_load){
    code = `<deadCrew load="${text_load_event}"/>\n`;
  }else{
    code = `<deadCrew>\n${statements_sur_event}</deadCrew>\n`;
  }
  return code;
};

JavaScript['ship_crew'] = block => {
  let statements_shipcrew_childs = JavaScript.statementToCode(block, 'SHIP_CREW_CHILDS');
  let code = `<crew>\n${statements_shipcrew_childs}</crew>\n`;    
  return code;
};

JavaScript['ship_crew_member'] = block => {
  let text_type = block.getFieldValue('SHIP_CREW');
  let num_prop = block.getFieldValue('SHIP_PROP');
  let code = `<crewMember type="${text_type}" prop="${num_prop}"/>\n`;
  return code;
};

JavaScript['weapon_override'] = block => {
  let statements_wepor_childs = JavaScript.statementToCode(block, 'WEPOR_CHILDS');
  let num_wepor_cnt = block.getFieldValue("WEPOR_CNT");
  let code = `<weaponOverride count="${num_wepor_cnt}">\n${statements_wepor_childs}</weaponOverride>\n`;    
  return code;
};

JavaScript['wep_override_name'] = block => {
  let text_wepor_name = block.getFieldValue('WEPOR_NAME');
  let code = `<name>${text_wepor_name}</name>\n`;
  return code;
};



// -------------------------------
// OTHERS CATEGORY---------
// -------------------------------

JavaScript['comment'] = block => {
  let text_comt = block.getFieldValue('COMT');
  let code = `<!--${text_comt}-->\n`;
  return code;
};



// ------------------------------------------------------------------------------||
// -----------------------------------HYPERSPACE SECTION-------------------------||
// ------------------------------------------------------------------------------||


// ====LOAD===========
//======================

JavaScript['hs_load_event'] = block => {
  let text_loadName = block.getFieldValue('HS_LOAD');
  let cb_loadSeed = block.getFieldValue('LOAD_SEED')==="TRUE";
  let cb_loadNoUniq = block.getFieldValue('LOAD_NOUNIQ')==="TRUE";
  let code = `<loadEvent seeded="${cb_loadSeed}" ignoreUnique="${cb_loadNoUniq}">${text_loadName}</loadEvent>\n`;
  return code;
};

JavaScript['hs_load_event_list'] = block => {
  let cb_seed = block.getFieldValue('LOADEVENT_SEED')==="TRUE";
  let cb_first = block.getFieldValue('LOADEVENT_FIRST')==="TRUE";
  let cb_gen = block.getFieldValue('LOADEVENT_GEN')==="TRUE";
  let cb_noUniq = block.getFieldValue('LOADEVENT_NOUNIQ')==="TRUE";
  let text_default = block.getFieldValue('LOADEVENT_DEF');
  let statements_childs = JavaScript.statementToCode(block, 'LOADEVENT_CHILDS');
  let code = `<loadEventList seeded="${cb_seed}" first="${cb_first}" default="${text_default}"
               generate="${cb_gen}" ignoreUnique="${cb_noUniq}">\n${statements_childs}</loadEventList>\n`;
  return code;
};

JavaScript['hs_load_event_list_event'] = block => {
  let cb_is_load = block.getFieldValue("EVLIST_IS_LOAD") === "TRUE";
  let text_load_event = block.getFieldValue("EVLIST_LOAD");
  let value_ev_attri = JavaScript.valueToCode(block, 'EV_ATTRIBUTES', JavaScript.ORDER_ATOMIC);
  let statements_evlist_ev = JavaScript.statementToCode(block, 'EVLIST_CHILDS');
  let code;
  if (cb_is_load){
    code = `<event name="${text_load_event}"${value_ev_attri}/>\n`;
  }else{
    code = `<event${value_ev_attri}>\n${statements_evlist_ev}</event>\n`;
  }
  return code;
};

JavaScript['revisit_event'] = block => {
  let text_loadName = block.getFieldValue('HS_REVISIT');
  let cb_loadSeed = block.getFieldValue('REVISIT_SEED')==="TRUE";
  let cb_loadNoUniq = block.getFieldValue('REVISIT_NOUNIQ')==="TRUE";
  let code = `<revisitEvent seeded="${cb_loadSeed}" ignoreUnique="${cb_loadNoUniq}">${text_loadName}</revisitEvent>\n`;
  return code;
};

JavaScript['event_alias'] = block => {
  let text_aliasName = block.getFieldValue('EVENT_ALIAS');
  let text_aliasFor = block.getFieldValue("EVENT_ALIAS_FOR");
  let cb_jumpC = block.getFieldValue('EVENT_A_JC')==="TRUE";
  let cb_once = block.getFieldValue('EVENT_A_ONCE')==="TRUE";
  let code = `<eventAlias name="${text_aliasName}" jumpClear="${cb_jumpC}" once="${cb_once}">${text_aliasFor}</eventAlias>\n`;
  return code;
};

JavaScript['queue_event'] = block => {
  let text_queueName = block.getFieldValue('HS_QUEUE');
  let cb_queueSeed = block.getFieldValue('QUEUE_SEED')==="TRUE";
  let code = `<queueEvent seeded="${cb_queueSeed}">${text_queueName}</queueEvent>\n`;
  return code;
};

JavaScript['restart'] = _block => {
  let code = '<restartEvent />\n';
  return code;
};

JavaScript['rename_beacon'] = block => {
  let text_rename = block.getFieldValue('BEAC_RENAME');
  let code = `<renameBeacon>${text_rename}</renameBeacon>\n`;
  return code;
};



// ====TRIGGER===========
//======================

JavaScript['jump_event'] = block => {
  let text_jumpEvName = block.getFieldValue('JUMP_EVENT');
  let text_jumpEvLabel = block.getFieldValue('JUMP_LABEL');
  let cb_loop = block.getFieldValue('JUMP_LOOP')==="TRUE";
  let num_prio = block.getFieldValue('JUMP_PRI');
  let code = `<jumpEvent name="${text_jumpEvLabel}" loop="${cb_loop}" priority="${num_prio}">${text_jumpEvName}</jumpEvent>\n`;
  return code;
};

JavaScript['jump_event_clear'] = block => {
  let text_jumpEvName = block.getFieldValue('JUMP_C');
  let cb_jumpEvClear_all = block.getFieldValue("JUMP_C_ALL")==="TRUE";
  let code;
  if (cb_jumpEvClear_all)
  code = `<clearJumpEvent />\n`;
  else
  code = `<clearJumpEvent name="${text_jumpEvName}"/>\n`;
  return code;
};

JavaScript['death_event'] = block => {
  let text_deathEvName = block.getFieldValue('DEATH_EVENT');
  let text_deathEvLabel = block.getFieldValue('DEATH_LABEL');
  let cb_jumpc = block.getFieldValue('DEATH_JUMPC')==="TRUE";
  let cb_thisfight = block.getFieldValue('DEATH_FIGHT')==="TRUE";
  let num_prio = block.getFieldValue('DEATH_PRI');
  let code = `<deathEvent name="${text_deathEvLabel}" jumpClear="${cb_jumpc}" thisFight="${cb_thisfight}" priority="${num_prio}">${text_deathEvName}</deathEvent>\n`;
  return code;
};

JavaScript['death_event_clear'] = block => {
  let text_deathEvName = block.getFieldValue('DEATH_C');
  let cb_deathEvClear_all = block.getFieldValue("DEATH_C_ALL")==="TRUE";
  let code;
  if (cb_deathEvClear_all)
  code = `<clearDeathEvent />\n`;
  else
  code = `<clearDeathEvent name="${text_deathEvName}"/>\n`;
  return code;
};

JavaScript['triggered_event'] = block => {
  let text_trigEvName = block.getFieldValue('TRI_LOAD');
  let text_trigEvLabel = block.getFieldValue('TRI_LABEL');
  let cb_tri_seed = block.getFieldValue('TRI_SEED')==="TRUE";
  let cb_jumpc = block.getFieldValue('TRI_JUMPC')==="TRUE";
  let cb_thisfight = block.getFieldValue('TRI_THIS')==="TRUE";
  let num_loops = block.getFieldValue('TRI_LOOPS');
  let statements_childs = JavaScript.statementToCode(block, "TRI_EV_CHILDS");
  let code = `<triggeredEvent name="${text_trigEvLabel}" event="${text_trigEvName}" seeded="${cb_tri_seed}" thisFight="${cb_thisfight}" 
                clearOnJump="${cb_jumpc}" loops="${num_loops}">\n${statements_childs}</triggeredEvent>\n`;
  return code;
};

JavaScript['triggered_event_types'] = block => {
  let dd_type = block.getFieldValue('TRI_TYPE');
  let value_trig_attris = JavaScript.valueToCode(block, "TRI_TYPES_ATTRI", JavaScript.ORDER_ATOMIC)
  let code = `<${dd_type} ${value_trig_attris}/>\n`;
  return code;
};

JavaScript['attri_trig_event_amount'] = block => {
  let num_amt = block.getFieldValue('TRI_AMT');
  let value_trig_attris = JavaScript.valueToCode(block, "TRI_TYPES_ATTRI", JavaScript.ORDER_ATOMIC);
  let code = `amount="${num_amt}" ${value_trig_attris}`;
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['attri_trig_event_minmax'] = block => {
  let num_min = block.getFieldValue('TRI_MIN');
  let num_max = block.getFieldValue('TRI_MAX');
  let value_trig_attris = JavaScript.valueToCode(block, "TRI_TYPES_ATTRI", JavaScript.ORDER_ATOMIC);
  let code = `min="${num_min}" max="${num_max}" ${value_trig_attris}`;
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['attri_trig_event_scaling'] = block => {
  let num_scale = block.getFieldValue('TRI_SCALE');
  let value_trig_attris = JavaScript.valueToCode(block, "TRI_TYPES_ATTRI", JavaScript.ORDER_ATOMIC);
  let code = `scaling="${num_scale}" ${value_trig_attris}`;
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['attri_trig_event_countrepair'] = block => {
  let cb_cntrep = block.getFieldValue('TRI_CNTREP')==="TRUE";
  let value_trig_attris = JavaScript.valueToCode(block, "TRI_TYPES_ATTRI", JavaScript.ORDER_ATOMIC);
  let code = `countRepairs="${cb_cntrep}" ${value_trig_attris}`;
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['attri_trig_event_clonebay'] = block => {
  let cb_clone = block.getFieldValue('TRI_CLONE')==="TRUE";
  let value_trig_attris = JavaScript.valueToCode(block, "TRI_TYPES_ATTRI", JavaScript.ORDER_ATOMIC);
  let code = `includeClonebay="${cb_clone}" ${value_trig_attris}`;
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['attri_trig_event_countnew'] = block => {
  let cb_cntnew = block.getFieldValue('TRI_CNTNEW')==="TRUE";
  let value_trig_attris = JavaScript.valueToCode(block, "TRI_TYPES_ATTRI", JavaScript.ORDER_ATOMIC);
  let code = `countNewCrew="${cb_cntnew}" ${value_trig_attris}`;
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['triggered_event_box'] = block => {
  let text_trigEvBoxName = block.getFieldValue('TRI_BOX');
  let code = `<triggeredEventBox load="${text_trigEvBoxName}"/>`;
  return code;
};

JavaScript['triggered_event_sounds'] = block => {
  let text_trigEvSoundName = block.getFieldValue('TRI_SOUND');
  let code = `<timerSounds load="${text_trigEvSoundName}"/>\n`;
  return code;
};

JavaScript['triggered_warning'] = (block) => {
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

JavaScript['triggered_event_mod'] = block => {
  let text_trigEvName = block.getFieldValue('TRI_MOD');
  let dd_triEvType = block.getFieldValue("TRI_MOD_TYPE");
  let num_val = block.getFieldValue("TRI_MOD_VAL");
  let code = `<triggeredEventModifier name="${text_trigEvName}" ${dd_triEvType}="${num_val}"/>\n`;
  return code;
};

JavaScript['triggered_event_clear'] = block => {
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

JavaScript['secret_sector'] = block => {
  let text_sec_id = block.getFieldValue('SECRET_SEC');
  let code = `<secretSectorWarp>${text_sec_id}</secretSectorWarp>\n`;
  return code;
};

JavaScript['goto_flagship'] = block => {
  let cb_gotoBase = block.getFieldValue('GOTO_BASE')==="TRUE";
  let cb_gotoFleet = block.getFieldValue("GOTO_FLEET")==="TRUE";
  let code = `<goToFlagship atBase="${cb_gotoBase}" allFleet="${cb_gotoFleet}"/>\n`;
  return code;
};

JavaScript['replace_sector'] = block => {
  let text_secReplace = block.getFieldValue('SEC_REPLACE');
  let text_secReplaceNew = block.getFieldValue("SEC_REPLACE_NEW");
  let code = `<replaceSector name="${text_secReplace}">${text_secReplaceNew}</replaceSector>\n`;
  return code;
};



// ====ITEMS===========
//======================

JavaScript['check_cargo'] = _block => {
  let code = '<checkCargo />\n';
  return code;
};

JavaScript['hidden_aug'] = block => {
  let text_id = block.getFieldValue("HIDD_AUG");
  let code = `<hiddenAug>${text_id}</hiddenAug>\n`;
  return code;
};

JavaScript['remove_item'] = block => {
  let text_id = block.getFieldValue("HS_REMOVE");
  let code = `<removeItem>${text_id}</removeItem>\n`;
  return code;
};


// ====BACKGROUND===========
//======================

JavaScript['change_background'] = block => {
  let text_changeBg = block.getFieldValue('CHANGE_BG');
  let code = `<changeBackground>${text_changeBg}</changeBackground>\n`;
  return code;
};

JavaScript['back_object'] = block => {
  let text_objName = block.getFieldValue('BACK_OBJ');
  let code = `<backgroundObject load="${text_objName}"/>\n`;
  return code;
};

JavaScript['back_object_clear'] = block => {
  let text_objName = block.getFieldValue('BACK_OBJ_C');
  let cb_objClear_all = block.getFieldValue("BACK_OBJ_C_ALL")==="TRUE";
  let code;
  if (cb_objClear_all)
  code = `<clearBackgroundObject />\n`;
  else
  code = `<clearBackgroundObject name="${text_objName}"/>\n`;
  return code;
};

JavaScript['back_object_trans'] = block => {
  let text_objName = block.getFieldValue('BACK_OBJ_T');
  let text_objNameNew = block.getFieldValue("BACK_OBJ_T_NEW");
  let code = `<transformBackgroundObject name="${text_objName}">${text_objNameNew}</transformBackgroundObject>\n`;
  return code;
};

JavaScript['event_button'] = block => {
  let text_evtBtnName = block.getFieldValue('EVENT_BTN');
  let code = `<eventButton load="${text_evtBtnName}"/>\n`;
  return code;
};

JavaScript['event_button_clear'] = block => {
  let text_evtBtnName = block.getFieldValue('EVENT_BTN_C');
  let cb_btnClear_all = block.getFieldValue("EVENT_BTN_C_ALL")==="TRUE";
  let code;
  if (cb_btnClear_all)
    code = `<clearEventButton />\n`;
  else
    code = `<clearEventButton name="${text_evtBtnName}"/>\n`;
  return code;
};

JavaScript['clear_fleet'] = _block => {
  let code = `<clearCustomFleet />\n`;
  return code;
};

JavaScript['remove_nebula'] = _block => {
  let code = `<removeNebula />\n`;
  return code;
};

JavaScript['remove_hazards'] = _block => {
  let code = `<removeHazards />\n`;
  return code;
};



// ====VARIABLE===========
//======================

JavaScript['hs_variable'] = block => {
  let dd_op = block.getFieldValue("VAR_OP");
  let value_var_attributes = JavaScript.valueToCode(block, 'VAR_ATTRI', JavaScript.ORDER_ATOMIC);
  let code = `<variable op="${dd_op}" ${value_var_attributes}/>\n`;
  return code;
};

JavaScript['hs_meta_variable'] = block => {
  let dd_op = block.getFieldValue("VAR_OP");
  let value_var_attributes = JavaScript.valueToCode(block, 'VAR_ATTRI', JavaScript.ORDER_ATOMIC);
  let code = `<metaVariable op="${dd_op}" ${value_var_attributes}/>\n`;
  return code;
};

JavaScript['hs_temp_variable'] = block => {
  let dd_op = block.getFieldValue("VAR_OP");
  let value_var_attributes = JavaScript.valueToCode(block, 'VAR_ATTRI', JavaScript.ORDER_ATOMIC);
  let code = `<tempVariable op="${dd_op}" ${value_var_attributes}/>\n`;
  return code;
};

JavaScript['attri_var_val'] = block => {
  let num_val = block.getFieldValue("VAR_VAL");
  let value_more_attributes = JavaScript.valueToCode(block, 'VAR_VAL_ATTRI', JavaScript.ORDER_ATOMIC);
  let code = `val="${num_val}" ${value_more_attributes}`;
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['attri_var_minmax'] = block => {
  let num_min = block.getFieldValue("VAR_MIN");
  let num_max = block.getFieldValue("VAR_MAX");
  let value_more_attributes = JavaScript.valueToCode(block, 'VAR_MINMAX_ATTRI', JavaScript.ORDER_ATOMIC);
  let code = `min="${num_min}" max="${num_max}" ${value_more_attributes}`;
  return [code, JavaScript.ORDER_ATOMIC];
};

JavaScript['attri_var_var'] = block => {
  let text_val = block.getFieldValue("VAR_VAR");
  let value_more_attributes = JavaScript.valueToCode(block, 'VAR_VAR_ATTRI', JavaScript.ORDER_ATOMIC);
  let code = `var="${text_val}" ${value_more_attributes}`;
  return [code, JavaScript.ORDER_ATOMIC];
};



// ====BEACON===========
//======================

JavaScript['hs_beacon_type'] = (block) => {
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

JavaScript['remove_store'] = _block => {
  let code = `<removeStore />\n`;
  return code;
};

JavaScript['prevent_quest'] = _block => {
  let code = `<preventQuest />\n`;
  return code;
};

JavaScript['no_quest_text'] = _block => {
  let code = `<noQuestText />\n`;
  return code;
};

JavaScript['prevent_fleet'] = _block => {
  let code = `<preventFleet />\n`;
  return code;
};

JavaScript['prevent_boss_fleet'] = block => {
  let cb_last = block.getFieldValue('NO_BOSS_FLT')==="TRUE";
  let code = `<preventBossFleet forever="${cb_last}"/>\n`;
  return code;
};

JavaScript['run_from_fleet'] = block => {
  let cb_run = block.getFieldValue('RUN_CLOSE')==="TRUE";
  let code = `<runFromFleet closest="${cb_run}"/>\n`;
  return code;
};

JavaScript['hs_quest'] = block => {
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

JavaScript['allow_noslot'] = _block => {
  let code = '<allowNoSlot />\n';
  return code;
};

JavaScript['block_noslot'] = _block => {
  let code = '<blockNoSlot />\n';
  return code;
};

JavaScript['require_crew'] = _block => {
  let code = '<choiceRequiresCrew />\n';
  return code;
};

JavaScript['transform_race'] = block => {
  let text_orig = block.getFieldValue("TRANS_ORIG");
  let text_new = block.getFieldValue("TRANS_NEW");
  let code = `<transformRace class="${text_orig}">${text_new}</transformRace>\n`;
  return code;
};



// ====PLAYER SHIP===========
//======================

JavaScript['reset_ftl'] = _block => {
  let code = '<resetFtl />\n';
  return code;
};

JavaScript['repair_allsys'] = _block => {
  let code = '<repairAllSystems />\n';
  return code;
};

JavaScript['kill_boarders'] = _block => {
  let code = '<killEnemyBoarders />\n';
  return code;
};

JavaScript['recall_boarders'] = block => {
  let dd_ship = block.getFieldValue("RECALL_SHIP");
  let code = `<recallBoarders ship="${dd_ship}"/>\n`;
  return code;
};



// ====EMENY SHIP===========
//======================

JavaScript['instant_esc'] = _block => {
  let code = '<instantEscape />\n';
  return code;
};

JavaScript['escape_load'] = block => {
  let cb_loadevent = block.getFieldValue("HS_ESC")==="TRUE";
  let cb_force = block.getFieldValue("HS_ESC_FORCE")==="TRUE";
  let code;
  if (cb_loadevent) code = `<loadEscape force="${cb_force}"/>\n`;
  else code = '<escape />\n';
  return code;
};

JavaScript['surrender_load'] = block => {
  let cb_loadevent = block.getFieldValue("HS_SUR")==="TRUE";
  let cb_force = block.getFieldValue("HS_SUR_FORCE")==="TRUE";
  let code; 
  if (cb_loadevent) code = `<loadSurrender force="${cb_force}"/>\n`;
  else code = '<surrender />\n';
  return code;
};

JavaScript['disable_surrender'] = block => {
  let cb_force = block.getFieldValue("HS_NOSUR_FORCE")==="TRUE";
  let code = `<disableSurrender force="${cb_force}"/>\n`;
  return code;
};

JavaScript['disable_esc'] = block => {
  let cb_force = block.getFieldValue("HS_NOESC_FORCE")==="TRUE";
  let code = `<disableEscape force="${cb_force}"/>\n`;
  return code;
};

JavaScript['enemy_damage'] = block => {
  let number_dmg_amount = block.getFieldValue("DAMAGE_E_AMOUNT");
  let value_dmg_attributes = JavaScript.valueToCode(block, 'DAMAGE_ATTRIBUTES', JavaScript.ORDER_ATOMIC);
  let code = `<enemyDamage amount="${number_dmg_amount}" ${value_dmg_attributes}/>\n`;
  return code;
};

JavaScript['attri_damage_extra'] = block => {
  let cbforce = block.getFieldValue("DMG_FORCE")==="TRUE";
  let cb_hull = block.getFieldValue("DMG_HULL")==="TRUE";
  let value_more_attributes = JavaScript.valueToCode(block, 'DAMAGE_EXT', JavaScript.ORDER_ATOMIC);
  let code = `force="${cbforce}" damageHull="${cb_hull}" ${value_more_attributes}`;
  return [code, JavaScript.ORDER_ATOMIC];
};



// ====SURGES===========
//======================

JavaScript['super_drones'] = block => {
  let cb_player = block.getFieldValue('SURGE_D_PLAYER')==="TRUE";
  let text_name = block.getFieldValue("SURGE_D_NAME");
  let code = `<superDrones player="${cb_player}" name="${text_name}"/>\n`;
  return code;
};

JavaScript['super_barrage'] = block => {
  let cb_player = block.getFieldValue('SURGE_B_PLAYER')==="TRUE";
  let text_name = block.getFieldValue("SURGE_B_NAME");
  let code = `<superBarrage player="${cb_player}" name="${text_name}"/>\n`;
  return code;
};

JavaScript['super_shields'] = block => {
  let cb_player = block.getFieldValue('SURGE_S_PLAYER')==="TRUE";
  let num_amount = block.getFieldValue("SURGE_S_AMT");
  let num_add = block.getFieldValue("SURGE_S_ADD");
  let code = `<superShields player="${cb_player}" amount="${num_amount}" add="${num_add}"/>\n`;
  return code;
};

JavaScript['super_drones_clear'] = block => {
  let cb_player = block.getFieldValue('SURGE_DC_PLAYER')==="TRUE";
  let code = `<clearSuperDrones player="${cb_player}" />\n`;
  return code;
};



// ====UNLOCKS===========
//======================

JavaScript['unlock_ship'] = block => {
  let cb_silent = block.getFieldValue('UNLOCK_S')==="TRUE";
  let text_reqShip = block.getFieldValue("UNLOCK_REQ");
  let text_ship = block.getFieldValue("UNLOCK_SHIP");
  let code = `<unlockCustomShip silent="${cb_silent}" shipReq="${text_reqShip}">${text_ship}</unlockCustomShip>\n`;
  return code;
};

JavaScript['achievement'] = block => {
  let cb_silent = block.getFieldValue('ACH_S')==="TRUE";
  let text_ach_id = block.getFieldValue("ACH_ID");
  let code = `<achievement silent="${cb_silent}">${text_ach_id}</achievement>\n`;
  return code;
};



// ====MISC===========
//======================

JavaScript['disableScrapScore'] = _block => {
  let code = `<disableScrapScore />\n`;
  return code;
};

JavaScript['disableScrapAugments'] = _block => {
  let code = `<disableScrapAugments />\n`;
  return code;
};

JavaScript['playSound'] = block => {
  let text_sound_name = block.getFieldValue('SOUND');
  let code = `<playSound>${text_sound_name}</playSound>\n`;
  return code;
};

JavaScript['playMusic'] = block => {
  let text_music_name = block.getFieldValue('MUSIC');
  let code = `<playMusic>${text_music_name}</playMusic>\n`;
  return code;
};

JavaScript['win'] = block => {
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

JavaScript['lose'] = block => {
  let l_text = block.getFieldValue("L_TEXT");
  let l_sound = block.getFieldValue("L_SOUND");
  let code = `<lose text="${l_text}" sound="${l_sound}" />\n`;
  return code;
};
