import React, { useEffect, useState } from "react";
import { firestoreApp } from "../utils/firebase";

import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Item from "../components/Item";

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
          setItems((prevState) => [...prevState, itemSnap.ref]);
        });
      });
  }, [match.params.trait]);

  return (
    <Container>
      <Header>Shop</Header>
      {items.map((item, index) => (
        <Item itemRef={item} detailed buttons={{ buy: true }} key={index} />
      ))}
      <Footer />
    </Container>
  );
};

export default ShopCategory;
