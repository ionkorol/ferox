import { firestore } from "firebase";
import React, { useEffect, useState } from "react";
import { connect, RootStateOrAny } from "react-redux";

import * as arenaActions from "../redux/actions/arenaActions";

import Button from "../components/Button";
import Card from "../components/Card";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroInfo from "../components/Hero/HeroInfo";
import HeroStats from "../components/Hero/HeroStats";
import HeroTable from "../components/Hero/HeroTable";
import Toast from "../components/Toast";
import useCooldown from "../hooks/useCooldown";
import { firebaseApp, firestoreApp } from "../utils/firebase";

import { UserObject, UserProp } from "../utils/UserObject";
import { getRandomInt } from "../utils/UtilityFunctions";

import "./Arena.css";
import { handleRewards } from "../hooks/Rewards";

interface Props {
  userData: UserProp;
  arenaReward: (xp: number) => any;
}

export const Arena: React.FC<Props> = (props) => {
  const { userData, arenaReward } = props;
  const [oppData, setOppData] = useState(UserObject);
  const [oppHealth, setOppHealth] = useState(oppData.maxHealth);
  const [oppMana, setOppMana] = useState(oppData.maxMana);
  const [userHealth, setUserHealth] = useState(userData.maxHealth);
  const [userMana, setUserMana] = useState(userData.maxMana);
  const [attackDelay, resetCooldown] = useCooldown(1);
  const [userAttack, setUserAttack] = useState<number>();
  const [oppAttack, setOppAttack] = useState<number>();

  const userPower =
    userData.stats.agility +
    userData.stats.intelligence +
    userData.stats.strength;
  const oppPower =
    oppData.stats.agility + oppData.stats.intelligence + oppData.stats.strength;

  const handleNext = () => {
    oppData.stats.agility = getRandomInt(
      userData.stats.agility - 10,
      userData.stats.agility + 10
    );
    oppData.stats.strength = getRandomInt(
      userData.stats.strength - 10,
      userData.stats.strength + 10
    );
    oppData.stats.intelligence = getRandomInt(
      userData.stats.intelligence - 10,
      userData.stats.intelligence + 10
    );
    oppData.level = getRandomInt(userData.level - 10, userData.level + 10);
    setOppData(oppData);
    setOppHealth(oppData.maxHealth);
    setUserHealth(userData.maxHealth);
  };

  const handleAttack = () => {
    if (attackDelay > 0) {
      return;
    }
    setOppHealth((prevState) => prevState - userPower);
    setUserHealth((prevState) => prevState - oppPower);
    setOppAttack(getRandomInt(oppPower - 10, oppPower + 10));
    setUserAttack(getRandomInt(userPower - 10, userPower + 10));
    resetCooldown();
  };

  const handleResult = () => {
    if (oppHealth <= userHealth) {
      handleRewards("win");
    } else {
      handleRewards("loss");
    }
  };

  useEffect(() => {
    if (oppHealth <= 0 || userHealth <= 0) {
      handleResult();
      handleNext();
    }
  }, [oppHealth, userHealth]);

  return (
    <Container>
      <Header>Arena</Header>
      <div className="arena__container">
        <div className="arena__heroes">
          <Card className="arena__hero">
            <HeroInfo
              userData={userData}
              currentHealth={userHealth}
              currentMana={userMana}
            />
            <HeroTable items={userData.items} small />
            <HeroStats stats={userData.stats} powerOnly />
          </Card>
          <div className="arena__logs">
            {userAttack ? (
              <div className="arena__logs_user">
                <img
                  src={require("../assets/power.png")}
                  height="20"
                  width="20"
                  alt=""
                />
                {userAttack}
              </div>
            ) : null}
            {oppAttack ? (
              <div className="arena__logs_opp">
                {oppAttack}
                <img
                  src={require("../assets/power.png")}
                  height="20"
                  width="20"
                  alt=""
                />
              </div>
            ) : null}
          </div>
          <Card className="arena__hero">
            <HeroInfo
              userData={oppData}
              currentHealth={oppHealth}
              currentMana={oppMana}
            />
            <HeroTable items={oppData.items} small />
            <HeroStats stats={oppData.stats} powerOnly />
          </Card>
        </div>
        <div className="arena__controls">
          <Button onClick={handleAttack} icon={require("../assets/power.png")}>
            {attackDelay ? `${attackDelay} Seconds` : "Attack"}
          </Button>
          <Button onClick={handleNext}>Refresh</Button>
        </div>
      </div>
      <Footer />
    </Container>
  );
};

const mapState = (state: RootStateOrAny) => ({
  userData: state.userReducer.data,
});

const mapDispatch = {
  arenaReward: arenaActions.arenaReward,
};

export default connect(mapState, mapDispatch)(Arena);
