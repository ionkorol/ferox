import React from "react";
import { connect, RootStateOrAny } from "react-redux";

import * as userActions from "../redux/actions/userActions";

import Container from "../components/Container";
import Header from "../components/Header";
import MenuItem from "../components/MenuItem";
import Footer from "../components/Footer";

interface Props {
  userData: any;
  userLogout: () => any;
}

const Main: React.FC<Props> = (props) => {
  const { userData, userLogout } = props;

  const handleLogout = () => {
    userLogout();
  };

  return (
    <Container>
      <Header>Test</Header>
      <div style={{ padding: "5px" }}>
        <img
          src="http://tiwar.net/images/town/hd/main_h.jpg"
          alt=""
          width="100%"
        />
      </div>
      <MenuItem href="/arena" icon="arena">
        Arena
      </MenuItem>
      <MenuItem href="/league" icon="league">
        League
      </MenuItem>
      <MenuItem href="/shop" icon="shop">
        Shop
      </MenuItem>
      <Footer />
      <MenuItem onClick={handleLogout}>Log Out</MenuItem>
    </Container>
  );
};

const mapState = (state: RootStateOrAny) => ({
  userData: state.userReducer.data,
});

const mapDispatch = {
  userLogout: userActions.userLogout,
};

export default connect(mapState, mapDispatch)(Main);
