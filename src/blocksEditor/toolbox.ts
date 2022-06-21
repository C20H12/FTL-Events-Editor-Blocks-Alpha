export type BlocklyToolboxDef = {
  kind: string,
  contents: Array<{
    kind: string,
    name: string,
    colour?: string,
    contents: Array<{
      kind: "block" ,
      type: string,
      inputs?: object,
      text?: string,
    }>,
    cssConfig?: object,
  }>,
}

export const toolbox: BlocklyToolboxDef = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Events",
      colour: "#006092",
      contents: [
        {
          kind: "block",
          type: "event",
        },
        {
          kind: "block",
          type: "event_nested",
        },
        {
          kind: "block",
          type: "event_load",
        },
        {
          kind: "block",
          type: "event_end",
        },
        {
          kind: "block",
          type: "event_list",
        },
        {
          kind: "block",
          type: "text",
        },
        {
          kind: "block",
          type: "text_load",
        },
      ],
    },
    {
      kind: "category",
      name: "Choices",
      colour: "#865e5b",
      contents: [
        {
          kind: "block",
          type: "choice",
        },
        {
          kind: "block",
          type: "choice_adv",
        },
        {
          kind: "block",
          type: "attri_req",
        },
        {
          kind: "block",
          type: "attri_lvl",
        },
        {
          kind: "block",
          type: "attri_maxlvl",
        },
        {
          kind: "block",
          type: "attri_maxgp",
        },
        {
          kind: "block",
          type: "text_choice",
        },
        {
          kind: "block",
          type: "text_load_choice",
        },
      ],
    },
    {
      kind: "category",
      name: "Rewards",
      colour: "#084ac4",
      contents: [
        {
          kind: "block",
          type: "reward_auto",
        },
        {
          kind: "block",
          type: "item_modify",
          inputs: {
            ITEM_MODIFY_CHILDS: {
              block: {
                type: "item",
              },
            },
          },
        },
        {
          kind: "block",
          type: "item",
        },
        
      ],
    },
    {
      kind: "category",
      name: "Equipments",
      colour: "#059c2d",
      contents: [
        {
          kind: "block",
          type: "reward_weapon",
        },
        {
          kind: "block",
          type: "reward_augment",
        },
        {
          kind: "block",
          type: "reward_drone",
        },
        {
          kind: "block",
          type: "remove",
        },
      ]
    },
    {
      kind: "category",
      name: "Crew",
      colour: "#10b2ba",
      contents: [
        {
          kind: "block",
          type: "boarders",
        },
        {
          kind: "block",
          type: "crew_member",
        },
        {
          kind: "block",
          type: "attri_crew_skill",
        },
        {
          kind: "block",
          type: "remove_crew",
        },
      ],
    },
    {
      kind: "category",
      name: "Ship",
      colour: "#96921d",
      contents: [
        {
          kind: "block",
          type: "damage",
        },
        {
          kind: "block",
          type: "attri_damage_system",
        },
        {
          kind: "block",
          type: "attri_damage_effect",
        },
        {
          kind: "block",
          type: "status",
        },
        {
          kind: "block",
          type: "upgrade",
        },
        {
          kind: "block",
          type: "system",
        },
      ],
    },
    {
      kind: "category",
      name: "Map",
      colour: "#8f0373",
      contents: [
        {
          kind: "block",
          type: "distress_beacon",
        },
        {
          kind: "block",
          type: "reveal_map",
        },
        {
          kind: "block",
          type: "modify_pursuit",
        },
        {
          kind: "block",
          type: "store",
        },
        {
          kind: "block",
          type: "quest",
        },
      ],
    },
    {
      kind: "category",
      name: "Background",
      colour: "#530096",
      contents: [
        {
          kind: "block",
          type: "environment",
        },
        {
          kind: "block",
          type: "img",
        },
      ]
    },
    {
      kind: "category",
      name: "Enemy Ship",
      colour: "#619123",
      contents: [
        {
          kind: "block",
          type: "ship_load",
        },
        {
          kind: "block",
          type: "ship",
        },
        {
          kind: "block",
          type: "surrender",
        },
        {
          kind: "block",
          type: "escape",
        },
        {
          kind: "block",
          type: "gotaway",
        },
        {
          kind: "block",
          type: "destroyed",
        },
        {
          kind: "block",
          type: "deadcrew",
        },
        {
          kind: "block",
          type: "ship_crew",
          inputs: {
            SHIP_CREW_CHILDS: {
              block: {
                type: "ship_crew_member",
              },
            },
          },
        },
        {
          kind: "block",
          type: "ship_crew_member",
        },
        {
          kind: "block",
          type: "weapon_override",
          inputs: {
            WEPOR_CHILDS: {
              block: {
                type: "wep_override_name",
              },
            },
          },
        },
        {
          kind: "block",
          type: "wep_override_name",
        },
      ],
    },
    {
      kind: "category",
      name: "Others",
      colour: "#101f2c",
      contents: [
        {
          kind: "block",
          type: "text_txlist",
        },
        {
          kind: "block",
          type: "text_list",
        },
        {
          kind: "block",
          type: "comment",
        },
      ],
    },
    {
      kind: "sep",
      name: "",
      contents: [],
      cssConfig: {
        container: "hsSeparator",
      },
    },
    {
      kind: "category",
      name: "Loading",
      colour: "#545991",
      contents: [
        {
          kind: "block",
          type: "hs_load_event",
        },
        {
          kind: "block",
          type: "hs_load_event_list",
        },
        {
          kind: "block",
          type: "hs_load_event_list_event",
        },
        {
          kind: "block",
          type: "attri_req",
        },
        {
          kind: "block",
          type: "attri_lvl",
        },
        {
          kind: "block",
          type: "attri_maxlvl",
        },
        {
          kind: "block",
          type: "attri_maxgp",
        },
        {
          kind: "block",
          type: "revisit_event",
        },
        {
          kind: "block",
          type: "event_alias",
        },
        {
          kind: "block",
          type: "queue_event",
        },
        {
          kind: "block",
          type: "restart",
        },
        {
          kind: "block",
          type: "rename_beacon",
        },
      ]
    },
    {
      kind: "category",
      name: "Triggers",
      colour: "#0e1096",
      contents: [
        {
          kind: "block",
          type: "jump_event",
        },
        {
          kind: "block",
          type: "jump_event_clear",
        },
        {
          kind: "block",
          type: "death_event",
        },
        {
          kind: "block",
          type: "death_event_clear",
        },
        {
          kind: "block",
          type: "triggered_event",
        },
        {
          kind: "block",
          type: "triggered_event_types",
        },
        {
          kind: "block",
          type: "attri_trig_event_amount",
        },
        {
          kind: "block",
          type: "attri_trig_event_minmax",
        },
        {
          kind: "block",
          type: "attri_trig_event_scaling",
        },
        {
          kind: "block",
          type: "attri_trig_event_countrepair",
        },
        {
          kind: "block",
          type: "attri_trig_event_clonebay",
        },
        {
          kind: "block",
          type: "attri_trig_event_countnew",
        },
        {
          kind: "block",
          type: "triggered_event_box",
        },
        {
          kind: "block",
          type: "triggered_event_sounds",
        },
        {
          kind: "block",
          type: "triggered_warning",
        },
        {
          kind: "block",
          type: "triggered_event_mod",
        },
        {
          kind: "block",
          type: "triggered_event_clear",
        },
      ]
    },
    {
      kind: "category",
      name: "Warping",
      colour: "#821400",
      contents: [
        {
          kind: "block",
          type: "secret_sector",
        },
        {
          kind: "block",
          type: "goto_flagship",
        },
        {
          kind: "block",
          type: "replace_sector",
        },
      ]
    },
    {
      kind: "category",
      name: "Items",
      colour: "#059c2d",
      contents: [
        {
          kind: "block",
          type: "check_cargo",
        },
        {
          kind: "block",
          type: "hidden_aug",
        },
        {
          kind: "block",
          type: "remove_item",
        },
      ]
    },
    {
      kind: "category",
      name: "Backgrounds",
      colour: "#530096",
      contents: [
        {
          kind: "block",
          type: "change_background",
        },
        {
          kind: "block",
          type: "back_object",
        },
        {
          kind: "block",
          type: "back_object_clear",
        },
        {
          kind: "block",
          type: "back_object_trans",
        },
        {
          kind: "block",
          type: "event_button",
        },
        {
          kind: "block",
          type: "event_button_clear",
        },
        {
          kind: "block",
          type: "custom_fleet",
        },
        {
          kind: "block",
          type: "clear_fleet",
        },
        {
          kind: "block",
          type: "remove_nebula",
        },
        {
          kind: "block",
          type: "remove_hazards",
        },

      ]
    },
    {
      kind: "category",
      name: "Variables",
      colour: "#c76d00",
      contents: [
        {
          kind: "block",
          type: "hs_variable",
        },
        {
          kind: "block",
          type: "hs_meta_variable",
        },
        {
          kind: "block",
          type: "hs_temp_variable",
        },
        {
          kind: "block",
          type: "attri_var_val",
        },
        {
          kind: "block",
          type: "attri_var_minmax",
        },
        {
          kind: "block",
          type: "attri_var_var",
        },
      ]
    },
    {
      kind: "category",
      name: "Beacon",
      colour: "#8f0373",
      contents: [
        {
          kind: "block",
          type: "hs_beacon_type",
        },
        {
          kind: "block",
          type: "remove_store",
        },
        {
          kind: "block",
          type: "prevent_quest",
        },
        {
          kind: "block",
          type: "no_quest_text",
        },
        {
          kind: "block",
          type: "prevent_fleet",
        },
        {
          kind: "block",
          type: "prevent_boss_fleet",
        },
        {
          kind: "block",
          type: "run_from_fleet",
        },
        {
          kind: "block",
          type: "hs_quest",
        },
      ]
    },
    {
      kind: "category",
      name: "Crew Modify",
      colour: "#10b2ba",
      contents: [
        {
          kind: "block",
          type: "allow_noslot",
        },
        {
          kind: "block",
          type: "block_noslot",
        },
        {
          kind: "block",
          type: "require_crew",
        },
        {
          kind: "block",
          type: "transform_race",
        },
      ]
    },
    {
      kind: "category",
      name: "Player",
      colour: "#96921d",
      contents: [
        {
          kind: "block",
          type: "reset_ftl",
        },
        {
          kind: "block",
          type: "repair_allsys",
        },
        {
          kind: "block",
          type: "kill_boarders",
        },
        {
          kind: "block",
          type: "recall_boarders",
        },
      ]
    },
    {
      kind: "category",
      name: "Enemy",
      colour: "#619123",
      contents: [
        {
          kind: "block",
          type: "instant_esc",
        },
        {
          kind: "block",
          type: "escape_load",
        },
        {
          kind: "block",
          type: "surrender_load",
        },
        {
          kind: "block",
          type: "disable_surrender",
        },
        {
          kind: "block",
          type: "disable_esc",
        },
        {
          kind: "block",
          type: "enemy_damage",
        },
        {
          kind: "block",
          type: "attri_damage_system",
        },
        {
          kind: "block",
          type: "attri_damage_effect",
        },
        {
          kind: "block",
          type: "attri_damage_extra",
        },
      ]
    },
    {
      kind: "category",
      name: "Surges",
      colour: "#8a8a63",
      contents: [
        {
          kind: "block",
          type: "super_drones",
        },
        {
          kind: "block",
          type: "super_barrage",
        },
        {
          kind: "block",
          type: "super_shields",
        },
        {
          kind: "block",
          type: "super_drones_clear",
        },
      ]
    },
    {
      kind: "category",
      name: "Unlocks",
      colour: "#679967",
      contents: [
        {
          kind: "block",
          type: "unlock_ship",
        },
        {
          kind: "block",
          type: "achievement",
        },
      ]
    },
    {
      kind: "category",
      name: "Misc",
      colour: "#101f2c",
      contents: [
        {
          kind: "block",
          type: "disableScrapScore",
        },
        {
          kind: "block",
          type: "disableScrapAugments",
        },
        {
          kind: "block",
          type: "playSound",
        },
        {
          kind: "block",
          type: "playMusic",
        },
        {
          kind: "block",
          type: "win",
        },
        {
          kind: "block",
          type: "lose",
        },
      ]
    },
  ],
};
