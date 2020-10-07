import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

interface Props {
  icon?: any;
  onClick?: any;
  href?: string;
  small?: boolean;
}

export const Button: React.FC<Props> = (props) => {
  const { href, onClick, icon, small } = props;

  return (
    <div className="button__container" onClick={onClick}>
      <Link to={href || "#"} className={`button__body ${small ? "small" : ""}`}>
        {icon ? (
          <div className="button__icon">
            <img src={icon} width="13" height="13" alt="" />
          </div>
        ) : null}{" "}
        <div className="button__text">{props.children}</div>
      </Link>
    </div>
  );
};

export default Button;
