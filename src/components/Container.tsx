import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Container.css";

interface Props {}

const Container: React.FC = (props) => {
  return (
    <div className="container">
      {props.children}
      <ToastContainer />
    </div>
  );
};

export default Container;
