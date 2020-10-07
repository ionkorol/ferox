import React, { CSSProperties } from "react";

import "./Card.css";

interface Props {
  style?: CSSProperties;
  className?: string
}

const Card: React.FC<Props> = (props) => {
  const { style, className } = props;

  return (
    <div className={`card__container ${className ? className : ""}`} style={style}>
      {props.children}
    </div>
  );
};

export default Card;
