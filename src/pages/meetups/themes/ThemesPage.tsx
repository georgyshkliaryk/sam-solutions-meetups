import React, { ReactElement } from "react";
import HeaderContainer from "../../../components/header/HeaderContainer/HeaderContainer";
import HeaderProfile from "../../../components/header/HeaderProfile/HeaderProfile";
import LogoSam from "../../../components/LogoSam/LogoSam";
import Navbar from "../../../components/Navbar/Navbar";
import { navItems } from "../../../constants";

const ThemesPage: React.FC = (): ReactElement => {
  return (
    <div>
      <HeaderContainer>
        <LogoSam />
        <Navbar
          items={navItems.header}
          style={["header-navbar", "header-navbar__item"]}
        />
        <HeaderProfile />
      </HeaderContainer>
      <div>Themes Page</div>
    </div>
  );
};

export default ThemesPage;
