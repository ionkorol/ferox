import React, { CSSProperties } from "react";

import "./Card.css";

interface Props {
  style?: CSSProperties;
}

const Card: React.FC<Props> = (props) => {
  const { style } = props;

  return (
    <div className="card__container" style={style}>
      {props.children}
    </div>
  );
};

export default Card;
