import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { connect, RootStateOrAny } from "react-redux";

import * as userActions from "../../redux/actions/userActions";

import Container from "../../components/Container";
import Header from "../../components/Header";

import "./Signup.css";

interface Props {
  loading: boolean;
  error: string;
  userSignup: (username: string, password: string) => any;
  isAuthenticated: boolean;
  history: any;
}

export const Signup: React.FC<Props> = (props) => {
  const { userSignup, isAuthenticated, loading, error } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const handleSubmit = () => {
    userSignup(username, password);
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
  }, [isAuthenticated]);

  return (
    <Container>
      <Header>SIGNUP</Header>
      <div style={{ padding: "5px" }}>
        <img
          src="http://tiwar.net/images/town/hd/main_h.jpg"
          alt=""
          width="100%"
        />
      </div>
      <div className="signup-form__container">
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
        <input
          type="password"
          value={cpassword}
          onChange={(e) => setCPassword(e.target.value)}
        />
        <Button onClick={handleSubmit}>
          {loading ? "Loading..." : "SIGNUP"}
        </Button>
      </div>
      <Button href="/login">LOGIN</Button>
    </Container>
  );
};

const mapDispatch = {
  userSignup: userActions.userSignup,
};

const mapState = (state: RootStateOrAny) => ({
  loading: state.userReducer.loading,
  error: state.userReducer.error,
  isAuthenticated: state.userReducer.isAuthenticated,
});

export default connect(mapState, mapDispatch)(Signup);
