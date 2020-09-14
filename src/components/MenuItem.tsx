import React from "react";
import { Link } from "react-router-dom";
import "./MenuItem.css";

interface Props {
  onClick?: any;
  href?: string;
  icon?: string;
}

export const MenuItem: React.FC<Props> = (props) => {
  const { onClick, href, icon } = props;
  return (
    <Link to={href || "#"}>
      <div className="menu_item__container" onClick={onClick}>
        {icon ? (
          <div className="menu_item__icon">
            <img
              src={require(`../assets/icons/menu/${icon}.png`)}
              alt={icon}
              height="20"
              width="20"
            />
          </div>
        ) : null}
        <div className="menu_item__text">{props.children}</div>
      </div>
    </Link>
  );
};

export default MenuItem;
