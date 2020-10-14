import React, { useEffect, useState } from "react";
import { connect, RootStateOrAny } from "react-redux";

import * as battleActions from "../redux/actions/battleActions";

import Button from "../components/Button";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useReward } from "../hooks";

import { UserObject } from "../utils/objects";
import { getRandomInt } from "../utils/UtilityFunctions";
import { UserProp } from "../utils/interfaces";

import "./Arena.css";
import Hero from "../components/Hero";
import HeroStats from "../components/Hero/HeroStats";
import { useHistory, useLocation } from "react-router-dom";

interface Props {
  userData: UserProp;
  battleSetOpponent: (userData: UserProp, referer: string) => any;
}

export const Arena: React.FC<Props> = (props) => {
  const { userData, battleSetOpponent } = props;

  const handleReward = useReward;
  const history = useHistory()
  const location = useLocation()

  const [oppData, setOppData] = useState(UserObject);

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
  };

  // Handle Attack
  const handleAttack = () => {
    battleSetOpponent(oppData, "/arena");
    history.push('/battle')
  };

  // Send Rewards and get next opponent
  useEffect(() => {
    const locState = location.state as { result: string };
    console.log(location);
    if (locState) {
      handleReward(locState.result);
      console.log("Ran");
    }
    handleNext()
  }, []);

  return (
    <Container>
      <Header>Arena</Header>
      <div className="arena__container">
        <div className="arena__opponent">
          <Hero userData={oppData} userHealth={100} userMana={100} heroTable />
          <div className="league__right">
            <div>
              {oppData.league.tier}
              {oppData.league.rank}.
              <img
                src={require(`../assets/icons/class/${oppData.class}.png`)}
                height="15"
                width="15"
                alt={oppData.class}
              />
              {oppData.username}
            </div>
            <HeroStats stats={oppData.stats} />
            <div className="arena__controls">
              <Button onClick={handleAttack}>Attack</Button>
              <Button onClick={handleNext}>New Opponent</Button>
            </div>
          </div>
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
  battleSetOpponent: battleActions.battleSetOpponent,
};

export default connect(mapState, mapDispatch)(Arena);
