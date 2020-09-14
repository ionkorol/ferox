import React, { useEffect, useState } from "react";
import { RootStateOrAny, connect } from "react-redux";
import Button from "../components/Button";
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

  const [items, setItems] = useState<any>({});

  useEffect(() => {
    Object.entries(userData.items).forEach(([key, value]: any) => {
      if (value) {
        value.get().then((docSnap: any) => {
          setItems((prevState: any) => ({
            ...prevState,
            [key]: docSnap.data(),
          }));
        });
      } else {
        setItems((prevState: any) => ({ ...prevState, [key]: null }));
      }
    });
  }, []);

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
          <Item type="head" image={items.head ? items.head.image : ""} />
          <Item
            type="shoulder"
            image={items.shoulder ? items.shoulder.image : ""}
          />
          <Item type="chest" image={items.chest ? items.chest.image : ""} />
          <Item type="pants" image={items.pants ? items.pants.image : ""} />
          <Item type="shoes" image={items.shoes ? items.shoes.image : ""} />
        </div>
        <div className="hero_table__row">
          <Item type="sword" image={items.sword ? items.sword.image : ""} />
          <Item type="shield" image={items.shield ? items.shield.image : ""} />
        </div>
        <div className="hero_table__column">
          <Item type="gloves" image={items.gloves ? items.gloves.image : ""} />
          <Item type="cloack" image={items.cloack ? items.cloack.image : ""} />
          <Item type="ring" image={items.ring ? items.ring.image : ""} />
          <Item
            type="necklace"
            image={items.necklace ? items.necklace.image : ""}
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
