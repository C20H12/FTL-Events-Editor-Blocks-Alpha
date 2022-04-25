interface BlocklyToolboxBlock{
  kind: "block",
  type: string,
  inputs?: object,
}
interface BlocklyToolboxCategory{
  kind: string,
  name: string,
  colour?: number,
  contents: Array<BlocklyToolboxBlock>,
}
interface BlocklyToolboxDef{
  kind: string,
  contents: Array<BlocklyToolboxCategory>,
}

export const toolbox: BlocklyToolboxDef = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Events",
      colour: 230,
      contents: [
        {
          kind: "block",
          type: "text",
        },
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
      ],
    },
    {
      kind: "category",
      name: "Choices",
      colour: 20,
      contents: [
        {
          kind: "block",
          type: "text",
        },
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
      ],
    },
    {
      kind: "category",
      name: "Rewards",
      colour: 65,
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
      colour: 90,
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
      colour: 160,
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
      name: "Others",
      colour: 120,
      contents: [
        {
          kind: "block",
          type: "text_load",
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
  ],
};
