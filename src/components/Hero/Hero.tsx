import React from "react";
import { UserProp } from "../../utils/UserObject";
import Card from "../Card";
import HeroInfo from "./HeroInfo";
import HeroStats from "./HeroStats";
import HeroTable from "./HeroTable";

import "./Hero.css";

interface Props {
  userData: UserProp;
  userHealth: number;
  userMana: number;
  heroInfo?: boolean;
  heroTable?: boolean;
  heroStats?: boolean;
}

const Hero: React.FC<Props> = (props) => {
  const {
    userData,
    userHealth,
    userMana,
    heroInfo,
    heroStats,
    heroTable,
  } = props;

  return (
    <Card className="hero__container">
      {heroInfo ? (
        <HeroInfo
          userData={userData}
          currentHealth={userHealth}
          currentMana={userMana}
        />
      ) : null}
      {heroTable ? <HeroTable items={userData.items} small /> : null}
      {heroStats ? <HeroStats stats={userData.stats} powerOnly /> : null}
    </Card>
  );
};

export default Hero;
