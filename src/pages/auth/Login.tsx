import React, { useEffect, useState } from "react";
import { connect, RootStateOrAny } from "react-redux";

import * as userActions from "../../redux/actions/userActions";

import Container from "../../components/Container";
import Header from "../../components/Header";
import "./Login.css";
import Button from "../../components/Button";

type Props = {
  loading: boolean;
  error: string;
  history: any;
  userLogin: (username: string, password: string) => void;
  userData: any;
  isAuthenticated: boolean;
};

export const Login: React.FC<Props> = (props) => {
  const { userLogin, isAuthenticated, loading, error } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    userLogin(username, password);
  };

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
  }, [isAuthenticated, props.history]);

  return (
    <Container>
      <Header>Login</Header>
      <div style={{ padding: "5px" }}>
        <img
          src="http://tiwar.net/images/town/hd/main_h.jpg"
          alt=""
          width="100%"
        />
      </div>
      <div className="login-form__container">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSubmit}>
          {loading ? "Loading..." : "SIGNIN"}
        </Button>
      </div>
      <Button href="/signup">SIGNUP</Button>
    </Container>
  );
};

const mapState = (state: RootStateOrAny) => ({
  loading: state.userReducer.loading,
  error: state.userReducer.error,
  userData: state.userReducer.data,
  isAuthenticated: state.userReducer.isAuthenticated,
});

const mapDispatch = {
  userLogin: userActions.userLogin,
};

export default connect(mapState, mapDispatch)(Login);
