import React from "react";
import MenuItem from "./MenuItem";

import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footer__container">
      <MenuItem href="/hero" icon="hero">
        My Hero
      </MenuItem>
      <MenuItem href="/guild" icon="guild">
        My Guild
      </MenuItem>
      <MenuItem href="/" icon="town">
        Town Center
      </MenuItem>
    </div>
  );
};

export default Footer;
