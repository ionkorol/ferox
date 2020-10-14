import React from "react";
import "react-toastify/dist/ReactToastify.css";

import "./Container.css";

interface Props {
  className?: string;
}

const Container: React.FC<Props> = (props) => {
  const { className } = props;

  return (
    <div className={className ? `container ${className}` : "container"}>
      {props.children}
    </div>
  );
};

export default Container;
