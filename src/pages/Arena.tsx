import React, { useEffect, useState } from "react";
import { connect, RootStateOrAny } from "react-redux";

import * as arenaActions from "../redux/actions/arenaActions";

import Button from "../components/Button";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useCooldown from "../hooks/useCooldown";

import { UserObject, UserProp } from "../utils/UserObject";
import { getRandomInt } from "../utils/UtilityFunctions";

import "./Arena.css";
import { handleRewards } from "../hooks/Rewards";
import Hero from "../components/Hero";

interface Props {
  userData: UserProp;
  arenaReward: (xp: number) => any;
}

export const Arena: React.FC<Props> = (props) => {
  const { userData } = props;

  const userPower =
    userData.stats.agility +
    userData.stats.intelligence +
    userData.stats.strength;

  const [oppData, setOppData] = useState(UserObject);
  const oppPower =
    oppData.stats.agility + oppData.stats.intelligence + oppData.stats.strength;
  const [oppHealth, setOppHealth] = useState(oppData.maxHealth);
  const [oppMana, setOppMana] = useState(oppData.maxMana);
  const [userHealth, setUserHealth] = useState(userData.maxHealth);
  const [userMana, setUserMana] = useState(userData.maxMana);
  const [attackDelay, resetCooldown] = useCooldown(1);
  const [userAttack, setUserAttack] = useState<number>(userPower);
  const [oppAttack, setOppAttack] = useState<number>(oppPower);

  // Get Next Opponent Random
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

  // Handle Attack
  const handleAttack = () => {
    if (attackDelay > 0) {
      return;
    }
    setOppHealth((prevState) => prevState - userAttack);
    setUserHealth((prevState) => prevState - oppAttack);
    setOppAttack(getRandomInt(oppPower - 10, oppPower + 10));
    setUserAttack(getRandomInt(userPower - 10, userPower + 10));
    resetCooldown();
  };

  // Send Rewards and get next opponent
  useEffect(() => {
    if (oppHealth <= 0 || userHealth <= 0) {
      if (oppHealth <= userHealth) {
        handleRewards("win");
      } else {
        handleRewards("loss");
      }
      handleNext();
    }
  }, [oppHealth, userHealth, handleNext]);

  return (
    <Container>
      <Header>Arena</Header>
      <div className="arena__container">
        <div className="arena__heroes">
          <Hero
            userData={userData}
            userHealth={userHealth}
            userMana={userMana}
            heroInfo
            heroTable
            heroStats
          />
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
          <Hero
            userData={oppData}
            userHealth={oppHealth}
            userMana={oppMana}
            heroInfo
            heroTable
            heroStats
          />
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
