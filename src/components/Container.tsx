import React from "react";
import "react-toastify/dist/ReactToastify.css";

import "./Container.css";

interface Props {}

const Container: React.FC = (props) => {
  return <div className="container">{props.children}</div>;
};

export default Container;
