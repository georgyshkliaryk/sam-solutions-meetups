import React, { ReactElement } from "react";
import "./Main.scss";

const Main: React.FC = (props): ReactElement => {
  return (
    <div className="main">
      <div className="main-wrapper">{props.children}</div>
    </div>
  );
};

export default Main;
