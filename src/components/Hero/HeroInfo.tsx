import React from "react";
import { UserProp } from "../../utils/UserObject";

import "./HeroInfo.css";

interface Props {
  userData: UserProp;
  currentHealth: number;
  currentMana: number;
}

const HeroInfo: React.FC<Props> = (props) => {
  const { userData, currentHealth, currentMana } = props;
  const healthPercent = Math.round((currentHealth / userData.maxHealth) * 100);
  const manaPercent = Math.round((currentMana / userData.maxEnergy) * 100);

  return (
    <div className="hero_info__container">
      <div className="hero_info_body__container">
        <div className="hero_info_name__container">
          <div className="hero_info_level__container">{userData.level}</div>
          {userData.username}
        </div>

        <div className="hero_info_health__container">
          <div
            className="hero_info_health__inner"
            style={{ width: `${healthPercent}%` }}
          >
            <div className="hero_info_health__text">{healthPercent} %</div>
          </div>
        </div>
        <div className="hero_info_mana__container">
          <div
            className="hero_info_mana__inner"
            style={{ width: `${manaPercent}%` }}
          >
            <div className="hero_info_mana__text">
              {manaPercent > 10 ? `${manaPercent}%` : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroInfo;
