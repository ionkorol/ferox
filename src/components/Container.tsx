import React from "react";
import "./Container.css";

interface Props {}

const Container: React.FC = (props) => {
  return <div className="container">{props.children}</div>;
};

export default Container;
