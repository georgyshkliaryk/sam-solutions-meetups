import React, { ReactElement } from "react";
import Navbar from "../../Navbar/Navbar";
import HeaderLogo from "../HeaderLogo/HeaderLogo";
import HeaderProfile from "../HeaderProfile/HeaderProfile";
import "./HeaderContainer.scss";

const HeaderContainer: React.FC = (): ReactElement => {
  return (
    <div className="header">
      <HeaderLogo />
      <Navbar />
      <HeaderProfile />
    </div>
  );
};

export default HeaderContainer;
