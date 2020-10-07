import React, { useEffect, useState } from "react";
import { connect, RootStateOrAny } from "react-redux";
import { firestoreApp } from "../utils/firebase";
import { UserProp } from "../utils/UserObject";
import ProgressBar from "./ProgressBar";

import "./Header.css";

interface Props {
  userData: UserProp;
}

const Header: React.FC<Props> = (props) => {
  const { userData } = props;
  const [xpWidth, setXpWidth] = useState(0);

  // TODO: Add energy time
  const energyTimeLeft =
    userData && userData.energy.timestamp
      ? new Date().getTime() - userData.energy.timestamp.seconds
      : 0;
  const [energyTime, setEnergyTime] = useState(energyTimeLeft);

  const fancyTimeFormat = (duration: number) => {
    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    console.log(ret)
    return ret;
  };

  const energyTimer = () => {
    setTimeout(() => {
      setEnergyTime((prevState) => prevState - 1);
    }, 1000);
  };
  // END TODO

  const calculateWidth = async () => {
    if (!userData) {
      return 0
    }
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
  }, [userData]);

  if (!userData) {
    return <div className="header__container">Loading...</div>
  }

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
                {userData.energy.current}
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
