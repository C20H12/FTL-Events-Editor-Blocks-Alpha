import React from "react";
import { eventObject } from "./xmlToObj";
import { randint, getRandomSkill } from "./utils";
import AutoRewards from "./AutoRewards";

export default function EventMessage(props: { eventExtras: eventObject["eventExtras"] }) {
  const { eventExtras } = props;

  return (
    <div className="message">
      {Object.keys(eventExtras).map((extraKey, i) => {
        if (extraKey === "autoRewards") {
          const autoRewards = eventExtras[extraKey]!;
          return <AutoRewards rewardType={autoRewards.type} rewardLvl={autoRewards.level} />
        }

        if (extraKey === "itemModify") {
          const itemModify = eventExtras[extraKey]!;

          return itemModify.map((item, i) => {
            const randomAmount = randint(item.min, item.max);
            return (
              <React.Fragment key={i}>
                <img
                  src={`/img/${item.type}_${
                    randomAmount < 0 ? "minus" : "plus"
                  }.png`}
                  alt="e"
                  className="resources"
                />
                <span>{randomAmount}</span>
              </React.Fragment>
            );
          });
        }

        if (extraKey === "equipment") {
          const equipment = eventExtras[extraKey];
          if (equipment?.type === "drone" || equipment?.type === "weapon") {
            return (
              <React.Fragment key={i}>
                <img
                  src={`/img/${equipment.type}_placehold.png`}
                  alt="e"
                  className={equipment.type}
                />
                <span>{equipment.name}</span>
              </React.Fragment>
            );
          }
          return (
            <span>
              <b>Augment: </b>
              {equipment?.name}
            </span>
          );
        }

        if (extraKey === "boarders") {
          const boarders = eventExtras[extraKey]!;
          const amount = randint(boarders?.min, boarders?.max);
          return (
            <span className="bad" key={i}>
              Intruders on board | {amount} of {boarders.race}
            </span>
          );
        }

        if (extraKey === "damage") {
          const damage = eventExtras[extraKey]!;
          const amount = damage.amount;
          return (
            <React.Fragment key={i}>
              {amount < 0 ? (
                <span className="good">{-amount} hull points repaired</span>
              ) : (
                <span className="bad">{amount} damage to your hull</span>
              )}
            </React.Fragment>
          );
        }

        if (extraKey === "crewMember") {
          const crewMember = eventExtras[extraKey]!;
          const skillName = crewMember.skill;
          const skilllColor = crewMember.skillLevel === 2 ? "gold" : "green";
          return (
            <React.Fragment key={i}>
              <img src="/img/human_placehold.png" alt="e" className="crew" />
              <span>{crewMember.name}</span>
              {skillName === "all_skills" ? (
                <>
                  {crewMember.skillLevel !== 0 && (
                    <>
                      <img
                        src={`/img/skills/pilot.png`}
                        alt="e"
                        className={"skill " + skilllColor}
                      />
                      <img
                        src={`/img/skills/engines.png`}
                        alt="e"
                        className={"skill " + skilllColor}
                      />
                    </>
                  )}
                </>
              ) : (
                <img
                  src={`/img/skills/${
                    skillName === "random" ? getRandomSkill() : skillName
                  }.png`}
                  alt="e"
                  className={
                    "skill " + (crewMember.skillLevel === 2 ? "gold" : "green")
                  }
                />
              )}
            </React.Fragment>
          );
        }

        if (extraKey === "remove") {
          return <span className="bad" key={i}>Item removed: {eventExtras[extraKey]?.name}</span>
        }

        if (extraKey === "removeCrew") {
          return <span className="bad">A {eventExtras[extraKey]?.race} is gone</span>
        }
      })}
    </div>
  );
}
