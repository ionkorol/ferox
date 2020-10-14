import { firestore } from "firebase";
import React, { useEffect, useState } from "react";
import { RootStateOrAny, connect } from "react-redux";
import { firestoreApp } from "../../utils/firebase";
import { UserProp } from "../../utils/interfaces";
import Button from "../Button";
import Card from "../Card";
import Container from "../Container";
import Footer from "../Footer";
import Header from "../Header";

import "./GuildChat.css";

interface Props {
  userData: UserProp;
}

const GuildChat: React.FC<Props> = (props) => {
  const { userData } = props;
  const [msg, setMsg] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);

  const sendMessage = async (msg: string) => {
    await userData.guild?.collection("chat").add({
      content: msg,
      timestamp: firestore.FieldValue.serverTimestamp(),
      user: firestoreApp.collection("users").doc(userData.uid),
    });
    setMsg("");
  };

  useEffect(() => {
    if (userData.guild) {
      const unsubscribe = userData.guild
        .collection("chat")
        .onSnapshot((msgSnap) => {
          msgSnap.docChanges().forEach(async (change) => {
            if (change.type === "added") {
              let message = change.doc.data();
              const userData = (await message.user.get()).data();
              message = { ...message, user: userData };
              setMessages((prevState) => [message, ...prevState]);
            }
          });
        });

      return () => unsubscribe();
    }
  }, [userData.guild]);

  return (
    <Container>
      <Header>Guild Chat</Header>
      <div className="gchat__container">
        <Card className="gchat__input">
          <input
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <Button onClick={() => sendMessage(msg)}>Send</Button>
        </Card>
        <Card className="gchat__output">
          {messages.map((message) => (
            <div className="gchat__message" key={message.timestamp}>
              <img
                src={require(`../../assets/icons/class/${message.user.class}.png`)}
                width="15"
                height="15"
                alt={message.user.class}
              />
              {message.user.username}: {message.content}
            </div>
          ))}
        </Card>
      </div>
      <Footer />
    </Container>
  );
};

const mapState = (state: RootStateOrAny) => ({
  userData: state.userReducer.data,
});

export default connect(mapState)(GuildChat);
