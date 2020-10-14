import React, { useEffect } from "react";
import { RootStateOrAny, connect } from "react-redux";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import HeroStats from "../../components/Hero/HeroStats";
import * as leagueActions from "../../redux/actions/leagueActions";
import * as battleActions from "../../redux/actions/battleActions";

import { UserProp } from "../../utils/interfaces";

import "./League.css";
import { useHistory, useLocation } from "react-router-dom";
import { useReward } from "../../hooks";

interface Props {
  loading: boolean;
  userData: UserProp;
  oppData: UserProp;
  leagueHandleWin: () => any;
  leagueGetOpponent: () => any;
  battleSetOpponent: (userData: UserProp, referer: string) => any;
}

const League: React.FC<Props> = (props) => {
  const {
    loading,
    userData,
    oppData,
    leagueHandleWin,
    leagueGetOpponent,
    battleSetOpponent,
  } = props;

  const handleReward = useReward;
  const location = useLocation();
  const history = useHistory();

  // Get Opponent
  useEffect(() => {
    leagueGetOpponent();
  }, [userData.league]);

  // Handle Attack button
  const handleAttack = () => {
    battleSetOpponent(oppData, "/league");
    history.push("/battle");
  };

  // Handle Result Win
  useEffect(() => {
    const locState = location.state as { result: string };
    console.log(location);
    if (locState) {
      if (locState.result === "win") {
        leagueHandleWin();
      }
      handleReward(locState.result);
      console.log("Ran");
    }
  }, [leagueHandleWin, handleReward, location]);

  if (loading || !oppData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Header>League</Header>
      <div className="league__container">
        <div className="league__opponent">
          <Hero userData={oppData} userHealth={100} userMana={100} heroTable />
          <div className="league__right">
            <div>
              {oppData.league.tier}
              {oppData.league.rank}.
              <img
                src={require(`../../assets/icons/class/${oppData.class}.png`)}
                height="15"
                width="15"
                alt={oppData.class}
              />
              {oppData.username}
            </div>
            <HeroStats stats={oppData.stats} />
            <Button onClick={() => handleAttack()}>Attack</Button>
          </div>
        </div>
      </div>

      <Footer />
    </Container>
  );
};

const mapState = (state: RootStateOrAny) => ({
  userData: state.userReducer.data,
  oppData: state.leagueReducer.data,
  loading: state.leagueReducer.loading,
});

const mapDispatch = {
  leagueGetOpponent: leagueActions.getOpponent,
  leagueHandleWin: leagueActions.leagueHandleWin,
  battleSetOpponent: battleActions.battleSetOpponent,
};

export default connect(mapState, mapDispatch)(League);
