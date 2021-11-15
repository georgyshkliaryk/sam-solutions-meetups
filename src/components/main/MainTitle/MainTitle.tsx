import React, { ReactElement } from "react";
import "./MainTitle.scss";

const MainTitle: React.FC = (props): ReactElement => {
  return <h1 className="main-title">{props.children}</h1>;
};

export default MainTitle;
