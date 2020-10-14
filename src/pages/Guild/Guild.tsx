import { firestore } from "firebase";
import React, { useEffect, useState } from "react";
import { RootStateOrAny, connect } from "react-redux";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MenuItem from "../../components/MenuItem";
import ProgressBar from "../../components/ProgressBar";
import { firestoreApp } from "../../utils/firebase";
import { UserProp } from "../../utils/interfaces";

import "./Guild.css";

interface Props {
  userData: UserProp;
}

const Guild: React.FC<Props> = (props) => {
  const { userData } = props;
  const [guildData, setGuildData] = useState<firestore.DocumentData>();
  const [guildList, setGuildList] = useState<any[]>([]);
  let content;

  const joinGuild = async (guildId: string) => {
    await firestoreApp
      .collection("users")
      .doc(userData.uid)
      .update({ guild: firestoreApp.collection("guilds").doc(guildId) });
    await firestoreApp
      .collection("guilds")
      .doc(guildId)
      .update({
        members: firestore.FieldValue.arrayUnion(
          firestoreApp.doc(`/users/${userData.uid}`)
        ),
      });
  };

  const leaveGuild = async () => {
    await userData.guild?.update({
      members: firestore.FieldValue.arrayRemove(
        firestoreApp.doc(`/users/${userData.uid}`)
      ),
    });
    await firestoreApp.doc(`/users/${userData.uid}`).update({
      guild: null,
    });
  };

  useEffect(() => {
    if (!userData.guild) {
      firestoreApp
        .collection("guilds")
        .orderBy("level", "desc")
        .get()
        .then((QSnap) => {
          QSnap.docs.forEach((guildSnap) => {
            setGuildList((prevState) => [...prevState, guildSnap.data()]);
          });
        });
    }
  }, [userData.guild]);

  useEffect(() => {
    if (userData.guild) {
      userData.guild.get().then((guildSnap) => {
        setGuildData(guildSnap.data());
      });
    }
  }, [userData]);

  if (!guildData) {
    content = (
      <div className="guild__container">
        {guildList.map((guild) => (
          <div className="guild__info" key={guild.name}>
            <div className="guild__image">
              <img src={guild.image} alt="" />
            </div>
            <div className="guild__right">
              {guild.level} {guild.name}
              <Button onClick={() => joinGuild(guild.id)}>Join</Button>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    content = (
      <div className="guild__container">
        <div className="guild__info">
          <div className="guild__image">
            <img src={guildData.image} alt="" />
          </div>
          <div className="guild__right">
            <div className="guild__name">{guildData.name}</div>
            <div className="guild__level">
              <img
                src={require("../../assets/icons/level.png")}
                width="18"
                height="18"
                alt="level"
              />
              Level: {guildData.level}
            </div>
            <div className="guild__xp">
              <ProgressBar percentWidth={50} />
            </div>
          </div>
        </div>
        <MenuItem href="/chat/guild" icon="chat">
          Chat
        </MenuItem>
        <Card style={{ flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              borderBottom: "1px dashed gray",
              justifyContent: "center",
              paddingBottom: "10px",
            }}
          >
            There are {guildData.members.length} guild members
          </div>
          <div className="guild__members">
            {guildData.members.map(
              (member: firestore.DocumentReference, index: string) => (
                <div className="guild__member" key={index}>
                  <GuildMember memberRef={member} />
                </div>
              )
            )}
          </div>
        </Card>
        <MenuItem onClick={leaveGuild}>Leave Guild</MenuItem>
      </div>
    );
  }

  return (
    <Container>
      <Header />
      {content}
      <Footer />
    </Container>
  );
};

const mapState = (state: RootStateOrAny) => ({
  userData: state.userReducer.data,
});

export default connect(mapState)(Guild);

interface GMProps {
  memberRef: firestore.DocumentReference;
}

const GuildMember: React.FC<GMProps> = (props) => {
  const { memberRef } = props;

  const [data, setData] = useState<firestore.DocumentData>();

  console.log(memberRef);

  // Get member data
  useEffect(() => {
    memberRef.get().then((snap: any) => {
      setData(snap.data());
    });
  }, [memberRef]);

  if (data) {
    return (
      <>
        <img
          src={require(`../../assets/icons/class/${data.class}.png`)}
          width="15"
          height="15"
          alt={data.class}
        />
        {data.username} - {data.guild_xp} xp
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
};
