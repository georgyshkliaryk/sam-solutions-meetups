import React, { ReactElement } from "react";
import "./HeaderContainer.scss";

const HeaderContainer: React.FC = (props): ReactElement => {
  return <div className="header">{props.children}</div>;
};

export default HeaderContainer;
