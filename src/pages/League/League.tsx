import { firestore } from "firebase";
import React, { useEffect, useState } from "react";
import { RootStateOrAny, connect } from "react-redux";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import HeroStats from "../../components/Hero/HeroStats";
import { firestoreApp } from "../../utils/firebase";
import { UserProp, UserObject } from "../../utils/UserObject";

import "./League.css";

interface Props {
  userData: UserProp;
}

const League: React.FC<Props> = (props) => {
  const { userData } = props;
  const [opponent1, setOpponent1] = useState<UserProp | undefined>();
  const [opponent2, setOpponent2] = useState<UserProp | undefined>();

  const getOpponent = async (ranksFrom: number) => {
    let league;
    if (userData.league.rank <= ranksFrom) {
      if (userData.league.tier === "bronze") {
        league = "silver";
      } else if (userData.league.tier === "silver") {
        league = "gold";
      } else {
        league = "gold";
      }
    } else {
      league = userData.league.tier;
    }

    try {
      const leagueSnap = await firestoreApp
        .collection("leagues")
        .doc(league)
        .get();

      let rank;
      if (userData.league.rank - ranksFrom === 0) {
        rank = "1";
      } else if (userData.league.rank - ranksFrom === 0) {
        rank = "2";
      } else {
        rank = String(userData.league.rank - ranksFrom);
      }

      const oppRef: firestore.DocumentReference = leagueSnap.get(rank);
      const oppSnap = await oppRef.get();

      return oppSnap.data() as UserProp;
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getOpponent(1)
      .then((data) => setOpponent1(data))
      .catch((error) => console.log(error));
    getOpponent(2)
      .then((data) => setOpponent2(data))
      .catch((error) => console.log(error));
  }, []);

  if (!opponent1 || !opponent2) {
    return <div>loading</div>;
  }

  console.log(opponent2);

  return (
    <Container>
      <Header>League</Header>
      <div className="league__container">
        <div className="league__opponent">
          <Hero
            userData={opponent2}
            userHealth={100}
            userMana={100}
            heroTable
          />
          <div className="league__right">
            <div>
              {opponent2.league.tier}
              {opponent2.league.rank}.
              <img
                src={require(`../../assets/icons/class/${opponent2.class}.png`)}
                height="15"
                width="15"
                alt={opponent2.class}
              />
              {opponent2.username}
            </div>
            <HeroStats stats={opponent2.stats} />
            <Button>Attack 1 g</Button>
          </div>
        </div>
        <div className="league__opponent">
          <Hero
            userData={opponent1}
            userHealth={100}
            userMana={100}
            heroTable
          />
          <div className="league__right">
            <div>
              {opponent1.league.tier}
              {opponent1.league.rank}.
              <img
                src={require(`../../assets/icons/class/${opponent1.class}.png`)}
                height="15"
                width="15"
                alt={opponent1.class}
              />
              {opponent1.username}
            </div>
            <HeroStats stats={opponent1.stats} />
            <Button>Attack</Button>
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

export default connect(mapState)(League);
