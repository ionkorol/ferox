import React from "react";
import Colors from "../../constants/Colors";

import "./HeroStats.css";

interface Props {
  stats: any;
  powerOnly?: boolean;
}

const HeroStats: React.FC<Props> = (props) => {
  const { stats, powerOnly } = props;

  if (!stats) {
    return <div>Loading...</div>
  }

  return (
    <div className="hero_stats">
      {!powerOnly ? (
        <>
          <div className="hero_stat">
            <div className="hero_stat_icon">
              <img
                src={require("../../assets/strength.png")}
                height="15"
                width="15"
                alt="strength"
              />
            </div>
            <span className="hero_stat_text">Strength</span>
            <span className="hero_stat_points" style={{ color: Colors.red }}>
              {stats.strength}
            </span>
          </div>
          <div className="hero_stat">
            <div className="hero_stat_icon">
              <img
                src={require("../../assets/intelligence.png")}
                height="15"
                width="15"
                alt="intelligence"
              />
            </div>
            <span className="hero_stat_text">Intelligence</span>
            <span className="hero_stat_points" style={{ color: Colors.blue }}>
              {stats.intelligence}
            </span>
          </div>
          <div className="hero_stat">
            <div className="hero_stat_icon">
              <img
                src={require("../../assets/agility.png")}
                height="15"
                width="15"
                alt="agility"
              />
            </div>
            <span className="hero_stat_text">Agility</span>
            <span className="hero_stat_points" style={{ color: Colors.green }}>
              {stats.agility}
            </span>
          </div>
          <div className="hero_deliner" />
        </>
      ) : null}
      <div className="hero_stat">
        <div className="hero_stat_icon">
          <img
            src={require("../../assets/power.png")}
            height="15"
            width="15"
            alt="Power"
          />
        </div>
        <span className="hero_stat_text">Power</span>
        <span className="hero_stat_points" style={{ color: "#B57204" }}>
          {stats.agility + stats.intelligence + stats.strength}
        </span>
      </div>
    </div>
  );
};

export default HeroStats;
