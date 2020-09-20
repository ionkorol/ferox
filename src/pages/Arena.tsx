import { firestore } from "firebase";
import React, { useEffect, useState } from "react";
import { connect, RootStateOrAny } from "react-redux";
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

interface Props {
  userData: UserProp;
}

export const Arena: React.FC<Props> = (props) => {
  const { userData } = props;
  const [oppData, setOppData] = useState(UserObject);
  const [oppHealth, setOppHealth] = useState(oppData.maxHealth);
  const [oppEnergy, setOppEnergy] = useState(oppData.maxEnergy);
  const [userHealth, setUserHealth] = useState(userData.maxHealth);
  const [userEnergy, setUserEnergy] = useState(userData.maxEnergy);
  const [attackDelay, resetCooldown] = useCooldown(5);

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
    resetCooldown();
  };

  const handleResult = () => {
    const userRef = firestoreApp
      .collection("users")
      .doc(firebaseApp.auth().currentUser?.uid);
    if (oppHealth <= userHealth) {
      userRef.update({
        energy: firestore.FieldValue.increment(-50),
        xp: firestore.FieldValue.increment(50),
      });
      Toast.success("Won");
    } else {
      userRef.update({
        energy: firestore.FieldValue.increment(-50),
        health: firestore.FieldValue.increment(-100),
        xp: firestore.FieldValue.increment(25),
      });
      Toast.error("Lost");
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
          <Card style={{ flexDirection: "column", padding: "5px" }}>
            <HeroInfo
              userData={userData}
              currentHealth={userHealth}
              currentMana={userEnergy}
            />
            <HeroTable items={userData.items} small />
            <HeroStats stats={userData.stats} />
          </Card>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Button onClick={handleAttack} small>
              {attackDelay ? (
                attackDelay
              ) : (
                <img
                  src={require("../assets/power.png")}
                  width="13"
                  height="13"
                  alt=""
                />
              )}
            </Button>
            <Button onClick={handleNext} small>
              Re
            </Button>
          </div>
          <Card style={{ flexDirection: "column", padding: "5px" }}>
            <HeroInfo
              userData={oppData}
              currentHealth={oppHealth}
              currentMana={oppEnergy}
            />
            <HeroTable items={oppData.items} small />
            <HeroStats stats={oppData.stats} />
          </Card>
        </div>
      </div>
      <Footer />
    </Container>
  );
};

const mapState = (state: RootStateOrAny) => ({
  userData: state.userReducer.data,
});

export default connect(mapState)(Arena);
