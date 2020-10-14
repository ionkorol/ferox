import React, { useEffect, useState } from "react";
import { RootStateOrAny } from "react-redux";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { firestoreApp } from "../../utils/firebase";
import { UserProp } from "../../utils/interfaces";

import "./Rating.css";

interface Props {}

const Rating: React.FC<Props> = (props) => {
  const [data, setData] = useState<UserProp[]>();
  const [type, setType] = useState<string>("power");

  const getUsersByXp = () => {
    firestoreApp
      .collection("users")
      .orderBy("xp", "desc")
      .get()
      .then((QuerySnap) => {
        setData(QuerySnap.docs.map((userData) => userData.data() as UserProp));
      });
  };

  const getUsersByPower = () => {
    firestoreApp
      .collection("users")
      .orderBy("power", "desc")
      .get()
      .then((QuerySnap) => {
        setData(QuerySnap.docs.map((userData) => userData.data() as UserProp));
      });
  };

  useEffect(() => {
    console.log("Test");
    if (type === "power") {
      getUsersByPower();
    } else {
      getUsersByXp();
    }
  }, [type]);

  console.log(data);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Header>Rating</Header>
      <div className="rating__container">
        <Card className="rating__users">
          {data.map((userData, index) => (
            <User userData={userData} rank={index + 1} type={type} />
          ))}
        </Card>
        <div className="rating__controlers">
          <Button
            onClick={() => setType("power")}
            active={type === "power" ? true : false}
          >
            Power
          </Button>
          <Button
            onClick={() => setType("xp")}
            active={type === "xp" ? true : false}
          >
            Experience
          </Button>
        </div>
      </div>
      <Footer />
    </Container>
  );
};

const mapState = (state: RootStateOrAny) => ({});

export default Rating;

const User = (props: { userData: UserProp; type: string; rank: number }) => {
  const { userData, type, rank } = props;
  if (type === "power") {
    return (
      <div className="rating__user">
        <div>
          {rank}.{" "}
          <img
            src={require(`../../assets/icons/class/${userData.class}.png`)}
            width="15"
            height="15"
            alt={userData.class}
          />
          {userData.username}
        </div>
        <div>
          Power: {userData.power}
        </div>
      </div>
    );
  } else {
    return (
      <div className="rating__user">
        <div>
          {rank}.{" "}
          <img
            src={require(`../../assets/icons/class/${userData.class}.png`)}
            width="15"
            height="15"
            alt={userData.class}
          />
          {userData.username}
        </div>
        <div>
          Level: {userData.level} - {userData.xp} xp
        </div>
      </div>
    );
  }
};
