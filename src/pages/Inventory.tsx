import { firestore } from "firebase";
import React, { useEffect, useState } from "react";
import { connect, RootStateOrAny } from "react-redux";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Item from "../components/Item";
import { firestoreApp } from "../utils/firebase";

interface Props {
  userData: any;
}

export const Inventory: React.FC<Props> = (props) => {
  const { userData } = props;

  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    userData.inventory.forEach((item: firestore.DocumentReference) => {
      item.get().then((itemSnap) => {
        setItems((prevState) => [...prevState, itemSnap.data()]);
      });
    });
  }, []);

  return (
    <Container>
      <Header>Inventory</Header>
      {items.map((item) => (
        <div className="shop_item__container" key={item.name}>
          <Item image={item.image} type={item.type} />
          <div className="shop_item__right">
            <div className="shop_item__name">{item.name}</div>
            <div className="shop_item__stats">
              {Object.entries(item.stats).map(([key, value]) => (
                <span className="shop_item__stat" key={key}>
                  +{value} {key}{" "}
                  <img
                    src={require(`../assets/${key}.png`)}
                    height="10"
                    width="10"
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
      <Footer />
    </Container>
  );
};

const mapState = (state: RootStateOrAny) => ({
  userData: state.userReducer.data,
});

export default connect(mapState)(Inventory);
