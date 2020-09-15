import React from "react";
import { connect, RootStateOrAny } from "react-redux";
import "./Header.css";

interface Props {
  userData: any;
}

export const Header: React.FC<Props> = (props) => {
  const { userData } = props;

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

              <div className="header__health">
                {userData.health}
                <img
                  src={require("../assets/icons/health.png")}
                  height="18"
                  width="18"
                  alt="silver"
                />
              </div>
              <div className="header__energy">
                {userData.energy}
                <img
                  src={require("../assets/icons/energy.png")}
                  height="18"
                  width="18"
                  alt="silver"
                />
              </div>
            </div>
          </>
        ) : null}
      </div>
      {userData ? (
        <div className="header__xp">
          <div className="xp__progress" />
        </div>
      ) : null}
    </div>
  );
};

const mapState = (state: RootStateOrAny) => ({
  userData: state.userReducer.data,
});

export default connect(mapState)(Header);
