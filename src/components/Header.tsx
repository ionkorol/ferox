import React, { useEffect, useState } from "react";
import { connect, RootStateOrAny } from "react-redux";
import { firestoreApp } from "../utils/firebase";
import { UserProp } from "../utils/UserObject";
import ProgressBar from "./ProgressBar";

import "./Header.css";

interface Props {
  userData: UserProp;
}

export const Header: React.FC<Props> = (props) => {
  const { userData } = props;
  const [xpWidth, setXpWidth] = useState(0);

  const calculateWidth = async () => {
    const currentLevelSnap = await firestoreApp
      .collection("levels")
      .doc(`${userData.level}`)
      .get();
    const nextLevelSnap = await firestoreApp
      .collection("levels")
      .doc(`${userData.level + 1}`)
      .get();
    const nextLvlXpReq = nextLevelSnap.get("xp");
    const currentLvlReq = currentLevelSnap.get("xp");

    return (
      ((userData.xp - currentLvlReq) / (nextLvlXpReq - currentLvlReq)) * 100
    );
  };

  useEffect(() => {
    if (userData) {
      calculateWidth().then((width) => {
        setXpWidth(width);
      });
    }
  }, [userData, calculateWidth]);

  return (
    <div className="header__container">
      <div className="header__body">
        <div className="header__title">{props.children}</div>
        {userData ? (
          <>
            <div className="header__column">
              <div className="header__gold">
                <img
                  src={require("../assets/icons/gold.png")}
                  height="18"
                  width="18"
                  alt="gold"
                />
                {userData.gold}
              </div>
              <div className="header__silver">
                <img
                  src={require("../assets/icons/silver.png")}
                  height="18"
                  width="18"
                  alt="silver"
                />
                {userData.silver}
              </div>
            </div>
            <div className="header__column">
              <div className="header__level">
                {userData.level}
                <img
                  src={require("../assets/icons/level.png")}
                  height="18"
                  width="18"
                  alt="level"
                />
              </div>
              <div className="header__energy">
                {userData.energy}
                <img
                  src={require("../assets/icons/energy.png")}
                  height="18"
                  width="18"
                  alt="energy"
                />
              </div>
            </div>
          </>
        ) : null}
      </div>
      {userData ? <ProgressBar percentWidth={xpWidth} /> : null}
    </div>
  );
};

const mapState = (state: RootStateOrAny) => ({
  userData: state.userReducer.data,
});

export default connect(mapState)(Header);
