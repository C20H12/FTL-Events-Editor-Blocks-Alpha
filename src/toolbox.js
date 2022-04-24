export const toolbox = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Events",
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
      name: "Crew-related",
      contents: [
        {
          kind: "block",
          type: "boarders",
        },
      ],
    },
    {
      kind: "category",
      name: "Others",
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
