import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

export const Button = (props: any) => {
  return (
    <Link to={props.href || "#"}>
      <div className="button__container" onClick={props.onClick}>
        <div className="button__inner-border">
          <div className="button__inner-container">{props.children}</div>
        </div>
      </div>
    </Link>
  );
};

export default Button;
