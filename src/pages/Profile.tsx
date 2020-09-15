import React, { useEffect, useState } from "react";
import { RootStateOrAny, connect } from "react-redux";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Item from "../components/Item";
import MenuItem from "../components/MenuItem";
import Colors from "../constants/Colors";

import "./Profile.css";

interface Props {
  userData: any;
}

export const Profile: React.FC<Props> = (props) => {
  const { userData } = props;
  const { items } = userData;

  return (
    <Container>
      <Header>Hero</Header>
      <div className="profile__info_container">
        <div className="profile__info_left">
          <div className="profile__level">{userData.level}</div>
          <div className="profile__username_team">
            <div className="profile__username">{userData.username}</div>
            <div className="profile__team">Guild</div>
          </div>
        </div>
        <div className="profile__info_right">
          <div>{userData.power}</div>
        </div>
      </div>
      <div className="hero_table__container">
        <div className="hero_table__column">
          <Item placeholder="head" itemRef={items.head ? items.head : null} />
          <Item placeholder="shoulder" itemRef={items.shoulder} />
          <Item
            placeholder="chest"
            itemRef={items.chest ? items.chest : null}
          />
          <Item
            placeholder="pants"
            itemRef={items.pants ? items.pants : null}
          />
          <Item
            placeholder="shoes"
            itemRef={items.shoes ? items.shoes : null}
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
        <div className="hero_table__column">
          <Item
            placeholder="gloves"
            itemRef={items.gloves ? items.gloves : null}
          />
          <Item
            placeholder="cloak"
            itemRef={items.cloak ? items.cloak : null}
          />
          <Item placeholder="ring" itemRef={items.ring ? items.ring : null} />
          <Item
            placeholder="necklace"
            itemRef={items.necklace ? items.necklace : null}
          />
        </div>
      </div>
      <div className="hero_attributes__container">
        <div className="hero_attribute">
          <img
            src={require("../assets/strength.png")}
            height="20"
            width="20"
            alt="strength"
          />
          <span className="hero_attribute_text">Strength</span>
          <span className="hero_attribute_points" style={{ color: Colors.red }}>
            {userData.attributes.strength}
          </span>
        </div>
        <div className="hero_attribute">
          <img
            src={require("../assets/intelligence.png")}
            height="20"
            width="20"
            alt="intelligence"
          />
          <span className="hero_attribute_text">Intelligence</span>
          <span
            className="hero_attribute_points"
            style={{ color: Colors.blue }}
          >
            {userData.attributes.intelligence}
          </span>
        </div>
        <div className="hero_attribute">
          <img
            src={require("../assets/agility.png")}
            height="20"
            width="20"
            alt="agility"
          />
          <span className="hero_attribute_text">Agility</span>
          <span
            className="hero_attribute_points"
            style={{ color: Colors.green }}
          >
            {userData.attributes.agility}
          </span>
        </div>
      </div>
      <MenuItem href="/inventory" icon="inventory">
        Inventory
      </MenuItem>
      <Footer />
    </Container>
  );
};

const mapState = (state: RootStateOrAny) => ({
  userData: state.userReducer.data,
});

export default connect(mapState)(Profile);
