import React, { ReactElement } from "react";
import "./MainContainer.scss";

const MainContainer: React.FC = (props): ReactElement => {
  return (
    <div className="main">
      <div className="main-wrapper">{props.children}</div>
    </div>
  );
};

export default MainContainer;
