import React, { useEffect, useState } from "react";
import { RootStateOrAny, connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useCooldown, useReward } from "../../hooks";
import { UserProp } from "../../utils/interfaces";
import { getRandomInt } from "../../utils/UtilityFunctions";
import Button from "../Button";
import Container from "../Container";
import Hero from "../Hero";

import "./Battle.css";

interface Props {
  referer: string;
  userData: UserProp;
  oppLoading: boolean;
  oppData: UserProp;
}

const Battle: React.FC<Props> = (props) => {
  const { userData, oppLoading, oppData, referer } = props;

  const history = useHistory();
  const handleReward = useReward;

  const [oppHealth, setOppHealth] = useState(100);
  const [oppMana, setOppMana] = useState(100);
  const [oppAttack, setOppAttack] = useState<number>(0);

  const [userHealth, setUserHealth] = useState(userData.maxMana);
  const [userMana, setUserMana] = useState(userData.maxHealth);
  const [userAttack, setUserAttack] = useState<number>(userData.power);

  const [attackDelay, resetCooldown] = useCooldown(1);

  // const handleResult = () => {};

  // Handle Attack
  const handleAttack = () => {
    if (attackDelay > 0) {
      return;
    }
    setOppHealth((prevState) => prevState - userAttack);
    setUserHealth((prevState) => prevState - oppAttack);
    setOppAttack(getRandomInt(oppData.power - 10, oppData.power + 10));
    setUserAttack(getRandomInt(userData.power - 10, userData.power + 10));
    resetCooldown();
  };

  // Set State
  useEffect(() => {
    if (oppData) {
      setOppHealth(oppData.maxHealth);
      setOppMana(oppData.maxMana);
      setOppAttack(oppData.power);
    }
  }, [oppData]);

  // Send Rewards and get next opponent
  useEffect(() => {
    if (oppHealth <= 0 || userHealth <= 0) {
      if (oppHealth <= userHealth) {
        handleReward("win");
      } else {
        handleReward("loss");
      }
    }
  }, [oppHealth, userHealth, handleReward]);

  if (oppLoading || !oppData) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="battle__container">
      <div className="battle__heroes">
        <Hero
          userData={userData}
          userHealth={userHealth}
          userMana={userMana}
          heroInfo
          heroTable
          heroStats
        />
        <div className="battle__logs">
          {userAttack ? (
            <div className="battle__logs_user">
              <img
                src={require("../../assets/power.png")}
                height="20"
                width="20"
                alt=""
              />
              {userAttack}
            </div>
          ) : null}
          {oppAttack ? (
            <div className="battle__logs_opp">
              {oppAttack}
              <img
                src={require("../../assets/power.png")}
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
      <div className="battle__controls">
        <Button onClick={handleAttack} icon={require("../../assets/power.png")}>
          {attackDelay ? `${attackDelay} Seconds` : "Attack"}
        </Button>
        <Button
          onClick={() =>
            history.push(referer, {result: "win"})
          }
        >
          Back
        </Button>
      </div>
    </Container>
  );
};

const mapState = (state: RootStateOrAny) => ({
  userData: state.userReducer.data,
  oppData: state.battleReducer.data,
  oppLoading: state.battleReducer.loading,
  referer: state.battleReducer.referer,
});

export default connect(mapState)(Battle);
