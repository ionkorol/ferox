import { firestore } from "firebase";
import React from "react";
import { connect, RootStateOrAny } from "react-redux";

import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Item from "../components/Item";

interface Props {
  userData: any;
}

export const Inventory: React.FC<Props> = (props) => {
  const { userData } = props;

  return (
    <Container>
      <Header>Inventory</Header>
      {userData.inventory.map(
        (item: firestore.DocumentReference, index: string) => (
          <Item
            itemRef={item}
            placeholder="ring"
            detailed
            buttons={{ equip: true, sell: true }}
            key={index}
          />
        )
      )}
      <Footer />
    </Container>
  );
};

const mapState = (state: RootStateOrAny) => ({
  userData: state.userReducer.data,
});

export default connect(mapState)(Inventory);
