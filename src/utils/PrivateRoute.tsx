import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect, RootStateOrAny } from "react-redux";

interface Props {
  userData: any;
}

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  ...rest
}: any) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const mapState = (state: RootStateOrAny) => ({
  userData: state.userReducer.data,
  isAuthenticated: state.userReducer.isAuthenticated,
});

export default connect(mapState)(PrivateRoute);
