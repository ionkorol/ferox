import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Item from "../components/Item";
import MenuItem from "../components/MenuItem";
import { firestoreApp } from "../utils/firebase";

import "./Shop.css";

interface Props {}

export const Shop: React.FC<Props> = (props) => {
  const traits = ["agility", "strength", "intelligence"];

  return (
    <Container>
      <Header>Shop</Header>
      {traits.map((trait) => (
        <MenuItem href={`/shop/${trait}`} key={trait} icon={trait}>
          {trait.toUpperCase()}
        </MenuItem>
      ))}
      <Footer />
    </Container>
  );
};

export default Shop;
