import React, { useRef } from "react";
import { randint } from "./utils";

export default function AutoRewards(props: { rewardType: string; rewardLvl: string }) {
  const { rewardType, rewardLvl } = props;

  const rewardLevels = useRef({
    HIGH: {
      s: Math.round((randint(1300, 1550) / 1000) * 21), //S1 scrap lvl
      f: randint(3, 6),
      m: randint(4, 8),
      d: randint(1, 2),
    },
    MED: {
      s: Math.round((randint(800, 1300) / 1000) * 21),
      f: randint(2, 4),
      m: randint(2, 4),
      d: 1,
    },
    LOW: {
      s: Math.round((randint(500, 700) / 1000) * 21),
      f: randint(1, 2),
      m: randint(1, 2),
      d: 1,
    },
    RANDOM: {
      s: Math.round((randint(500, 1550) / 1000) * 21),
      f: randint(1, 6),
      m: randint(1, 8),
      d: randint(1, 2),
    },
  }).current;

  const currentLevel = useRef(
    rewardLevels[rewardLvl as keyof typeof rewardLevels]
  ).current;

  switch (rewardType) {
    case "standard":
      return (
        <>
          <RandomItem chance={randint(1, 3) === 3} />
          <RandomResource scrap={currentLevel.s} fuel={currentLevel.f} missiles={currentLevel.m} drones={currentLevel.d} />
        </>
      )
    case "stuff":
      const random60 = randint(1, 5);
      return (
        <>
          <RandomItem chance={random60 == 3 || random60 == 4 || random60 == 5} />
          <RandomResource scrap={rewardLevels["LOW"].s} fuel={currentLevel.f} missiles={currentLevel.m} drones={currentLevel.d} />
        </>
      )
    case "fuel":
      return (
        <>
          <img src="/img/scrap_plus.png" alt="e" />
          <span>{currentLevel.s}</span>
          <img src="/img/fuel_plus.png" />
          <span>{currentLevel.f}</span>
        </>
      );
    case "missiles":
      return (
        <>
          <img src="/img/scrap_plus.png" alt="e" />
          <span>{currentLevel.s}</span>
          <img src="/img/missiles_plus.png" />
          <span>{currentLevel.m}</span>
        </>
      );
    case "droneparts":
      return (
        <>
          <img src="/img/scrap_plus.png" alt="e" />
          <span>{currentLevel.s}</span>
          <img src="/img/drones_plus.png" />
          <span>{currentLevel.d}</span>
        </>
      );
    case "scrap_only":
      return (
        <>
          <img src="/img/scrap_plus.png" alt="e" />
          <span>{currentLevel.s}</span>
        </>
      );
    case "fuel_only":
      return (
        <>
          <img src="/img/fuel_plus" alt="e" />
          <span>{currentLevel.s}</span>
        </>
      );
    case "missiles_only":
      return (
        <>
          <img src="/img/missiles_plus" alt="e" />
          <span>{currentLevel.s}</span>
        </>
      );
    case "droneparts_only":
      return (
        <>
          <img src="/img/drones_plus" alt="e" />
          <span>{currentLevel.s}</span>
        </>
      );
    case "item":
      return (
        <>
          <RandomItem chance={true} />
          <RandomResource scrap={currentLevel.s} fuel={currentLevel.f} missiles={currentLevel.m} drones={currentLevel.d} />
        </>
      );
    case "weapon":
      return (
        <>
          <img src="/img/scrap_plus.png" alt="e" />
          <span>{currentLevel.s}</span>
          <img src="/img/weapon_placehold.png" />
          <span>Weapon</span>
        </>
      );
    case "drone":
      return (
        <>
          <img src="/img/scrap_plus.png" alt="e" />
          <span>{currentLevel.s}</span>
          <img src="/img/drone_placehold.png" />
          <span>Weapon</span>
        </>
      );
    case "augment":
      return (
        <>
          <img src="/img/scrap_plus.png" alt="e" />
          <span>{currentLevel.s}</span>
          <img src="/img/augment_placehold.png" />
          <span>Weapon</span>
        </>
      );
  }
  return <></>
}

function RandomResource(props: {
  scrap: number;
  fuel: number;
  missiles: number;
  drones: number;
}) {
  const { scrap, fuel, missiles, drones } = props;
  const roll = randint(1, 3);

  return (
    <>
      <img src="/img/scrap_plus.png" alt="e" />
      <span>{scrap}</span>
      {(roll === 1 || roll === 2) && (
        <>
          <img src="/img/fuel_plus.png" alt="e" />
          <span>{fuel}</span>
        </>
      )}
      {(roll === 2 || roll === 3) && (
        <>
          <img src="/img/missiles_plus.png" alt="e" />
          <span>{missiles}</span>
        </>
      )}
      {(roll === 1 || roll === 3) && (
        <>
          <img src="/img/drones_plus.png" alt="e" />
          <span>{drones}</span>
        </>
      )}
    </>
  );
}

function RandomItem(props: { chance: boolean }): JSX.Element {
  const { chance } = props;
  const itemroll = randint(1, 3);

  return (
    <>
      {(() => {
        if (chance) {
          if (itemroll === 1) {
            return (
              <>
                <img src="/img/weapon_placehold.png" />
                <span>Weapon</span>
              </>
            );
          } else if (itemroll == 2) {
            return (
              <>
                <img src="/img/drone_placehold.png" />
                <span>Drone</span>
              </>
            );
          } else if (itemroll == 3) {
            return (
              <span>
                <b>Augment: </b> Aug Name
              </span>
            );
          }
        }
      })()}
    </>
  );
}
