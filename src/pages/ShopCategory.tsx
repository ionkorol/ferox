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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    firestoreApp
      .collection("items")
      .where("trait", "==", match.params.trait)
      .get()
      .then((itemsQSnap) => {
        itemsQSnap.forEach((itemSnap) => {
          setItems((prevState) => [...prevState, itemSnap.ref]);
        });
      })
      .then(() => setLoading(false));
  }, [match.params.trait]);

  return (
    <Container>
      <Header>Shop</Header>
      {loading
        ? "Loading..."
        : items.map((item, index) => (
            <Item itemRef={item} placeholder="ring" detailed buttons={{ buy: true }} key={index} />
          ))}
      <Footer />
    </Container>
  );
};

export default ShopCategory;
