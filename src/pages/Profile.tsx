import React from "react";
import { RootStateOrAny, connect } from "react-redux";
import Card from "../components/Card";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroStats from "../components/Hero/HeroStats";
import HeroTable from "../components/Hero/HeroTable";
import MenuItem from "../components/MenuItem";

import "./Profile.css";

interface Props {
  userData: any;
}

export const Profile: React.FC<Props> = (props) => {
  const { userData } = props;

  return (
    <Container>
      <Header>Hero</Header>
      <div className="profile__container">
        <div className="profile__info_container">
          <div className="profile__info_left">
            <div className="profile__level">{userData.level}</div>
            <div className="profile__username_team">
              <div className="profile__username">
                <img
                  src={require(`../assets/icons/class/${userData.class}.png`)}
                  width="15"
                  height="15"
                  alt={userData.class}
                />
                {userData.username}
              </div>
              <div className="profile__team">Guild</div>
            </div>
          </div>
          <div className="profile__info_right">
            <div>Power: {userData.energy.timestamp.seconds}</div>
          </div>
        </div>
        <Card style={{ width: "fit-content", padding: "5px" }}>
          <HeroTable items={userData.items} />
        </Card>
        <Card style={{ width: "269px", padding: "5px" }}>
          <HeroStats stats={userData.stats} />
        </Card>
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
