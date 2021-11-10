import React, { ReactElement } from "react";
import HeaderContainer from "../../../components/header/HeaderContainer/HeaderContainer";
import HeaderLogo from "../../../components/header/HeaderLogo/HeaderLogo";
import HeaderProfile from "../../../components/header/HeaderProfile/HeaderProfile";
import Navbar from "../../../components/Navbar/Navbar";

const ThemesPage: React.FC = (): ReactElement => {
  return (
    <div>
      <HeaderContainer>
        <HeaderLogo />
        <Navbar />
        <HeaderProfile />
      </HeaderContainer>
      <div>Themes Page</div>
    </div>
  );
};

export default ThemesPage;
