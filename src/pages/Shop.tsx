import React from "react";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MenuItem from "../components/MenuItem";

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
