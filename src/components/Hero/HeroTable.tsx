import React from "react";
import Item from "../Item";

import "./HeroTable.css";

interface Props {
  items: any;
  small?: boolean;
}

const HeroTable: React.FC<Props> = (props) => {
  const { items, small } = props;

  return (
    <div
      className={
        small ? "hero_table__container_small" : "hero_table__container"
      }
    >
      <div className="hero_table__column">
        <Item placeholder="head" itemRef={items.head ? items.head : null} />
        <Item placeholder="shoulder" itemRef={items.shoulder} />
        <Item placeholder="chest" itemRef={items.chest ? items.chest : null} />
        <Item placeholder="pants" itemRef={items.pants ? items.pants : null} />
        <Item placeholder="shoes" itemRef={items.shoes ? items.shoes : null} />
      </div>
      <div className="hero_table__column">
        <div className="hero_table__image">
          <img
            src={require("../../assets/hero-shape.png")}
            width={small ? "52" : "157"}
            height={small ? "104" : "285"}
            alt=""
          />
        </div>

        <div className="hero_table__row">
          <Item
            placeholder="sword"
            itemRef={items.sword ? items.sword : null}
          />
          <Item
            placeholder="shield"
            itemRef={items.shield ? items.shield : null}
          />
        </div>
      </div>
      <div className="hero_table__column">
        <Item
          placeholder="gloves"
          itemRef={items.gloves ? items.gloves : null}
        />
        <Item placeholder="cloak" itemRef={items.cloak ? items.cloak : null} />
        <Item placeholder="ring" itemRef={items.ring ? items.ring : null} />
        <Item placeholder="ring" itemRef={items.ring ? items.ring : null} />
        <Item
          placeholder="necklace"
          itemRef={items.necklace ? items.necklace : null}
        />
      </div>
    </div>
  );
};

export default HeroTable;
