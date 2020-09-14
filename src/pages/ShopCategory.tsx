import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Item from "../components/Item";
import { firestoreApp } from "../utils/firebase";

import "./ShopCategory.css";

interface Props {
  match: any;
}

export const ShopCategory: React.FC<Props> = (props) => {
  const { match } = props;

  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    firestoreApp
      .collection("items")
      .where("trait", "==", match.params.trait)
      .get()
      .then((itemsQSnap) => {
        itemsQSnap.forEach((itemSnap) => {
          setItems((prevState) => [...prevState, itemSnap.data()]);
        });
      });
  }, []);

  return (
    <Container>
      <Header>Shop</Header>
      {items.map((item, index) => (
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

export default ShopCategory;
