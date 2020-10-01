import React from "react";

import "./ProgressBar.css"

interface Props {
  percentWidth: number;
}

const ProgressBar: React.FC<Props> = (props) => {
  const { percentWidth } = props;

  return (
    <div>
      <div className="progressbar__container">
        <div className="progressbar__body" style={{ width: `${percentWidth}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;
