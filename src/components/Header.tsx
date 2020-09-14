import React from "react";
import "./Header.css";

interface Props {}

export const Header: React.FC<Props> = (props) => {
  return (
    <div className="header__container">
      <div className="header__body">{props.children}</div>
      <div className="header__xp">
        <div className="xp__progress" />
      </div>
    </div>
  );
};

export default Header;
