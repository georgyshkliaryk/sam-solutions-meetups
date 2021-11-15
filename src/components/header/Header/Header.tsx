import React, { ReactElement } from "react";
import "./Header.scss";

const Header: React.FC = (props): ReactElement => {
  return <div className="header">{props.children}</div>;
};

export default Header;
