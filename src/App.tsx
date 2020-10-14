import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import * as userActions from "./redux/actions/userActions";

import PrivateRoute from "./utils/PrivateRoute";
import Login from "./pages/auth/Login";
import Main from "./pages/Main";
import Signup from "./pages/auth/Signup";
import Profile from "./pages/Profile";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import Inventory from "./pages/Inventory";
import { ToastContainer } from "react-toastify";
import Arena from "./pages/Arena";
import Guild from "./pages/Guild";
import GuildChat from "./components/Chat";
import League from "./pages/League";
import Battle from "./components/Battle";
import { Rating } from "./pages/Rating";

interface Props {
  userUpdate: () => any;
}

const App: React.FC<Props> = (props) => {
  const { userUpdate } = props;

  useEffect(() => {
    const unsubscribe = userUpdate();
    return unsubscribe;
  });

  return (
    <>
      <ToastContainer />
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Main} />
          <PrivateRoute path="/battle" component={Battle} />
          <PrivateRoute path="/arena" component={Arena} />
          <PrivateRoute path="/league" component={League} />
          <PrivateRoute path="/hero" component={Profile} />
          <PrivateRoute path="/rating" component={Rating} />
          <PrivateRoute path="/inventory" component={Inventory} />
          <PrivateRoute exact path="/shop" component={Shop} />
          <PrivateRoute exact path="/shop/:trait" component={ShopCategory} />
          <PrivateRoute path="/chat/guild" component={GuildChat} />
          <PrivateRoute exact path="/guild" component={Guild} />
          <PrivateRoute exact path="/guild" component={Guild} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </Router>
    </>
  );
};

const mapDispatch = {
  userUpdate: userActions.userUpdate,
};

export default connect(null, mapDispatch)(App);
