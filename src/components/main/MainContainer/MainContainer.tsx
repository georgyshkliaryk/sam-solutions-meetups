import React, { ReactElement } from "react";
import "./MainContainer.scss";

const MainContainer: React.FC = (props): ReactElement => {
  return <div className="main-wrapper">{props.children}</div>;
};

export default MainContainer;
