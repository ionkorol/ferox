import React from "react";

import "./Item.css";

interface Props {
  type?: string;
  image?: string;
}

export const Item: React.FC<Props> = (props) => {
  const { image, type } = props;

  return (
    <div className={`item__container ${type ? `item__${type}_icon` : ""}`}>
      {image ? <img src={image} alt={type} width="50" height="50" /> : null}
    </div>
  );
};

export default Item;
