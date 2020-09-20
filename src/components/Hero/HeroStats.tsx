import React from "react";
import Colors from "../../constants/Colors";

import "./HeroStats.css";

interface Props {
  stats: any;
}

const HeroStats: React.FC<Props> = (props) => {
  const { stats } = props;

  return (
    <div className="hero_stats">
      <div className="hero_stat">
        <span className="hero_stat_text">
          <img
            src={require("../../assets/strength.png")}
            height="20"
            width="20"
            alt="strength"
          />
          Strength
        </span>
        <span className="hero_stat_points" style={{ color: Colors.red }}>
          {stats.strength}
        </span>
      </div>
      <div className="hero_stat">
        <span className="hero_stat_text">
          <img
            src={require("../../assets/intelligence.png")}
            height="20"
            width="20"
            alt="intelligence"
          />
          Intelligence
        </span>
        <span className="hero_stat_points" style={{ color: Colors.blue }}>
          {stats.intelligence}
        </span>
      </div>
      <div className="hero_stat">
        <span className="hero_stat_text">
          <img
            src={require("../../assets/agility.png")}
            height="20"
            width="20"
            alt="agility"
          />
          Agility
        </span>
        <span className="hero_stat_points" style={{ color: Colors.green }}>
          {stats.agility}
        </span>
      </div>
      <div className="hero_deliner" />
      <div className="hero_stat">
        <span className="hero_stat_text">
          <img
            src={require("../../assets/power.png")}
            height="20"
            width="20"
            alt="Power"
          />
          Power
        </span>
        <span className="hero_stat_points" style={{ color: "#B57204" }}>
          {stats.agility + stats.intelligence + stats.strength}
        </span>
      </div>
    </div>
  );
};

export default HeroStats;
