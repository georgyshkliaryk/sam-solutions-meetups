import React, { ReactElement } from "react";
import HeaderContainer from "../../components/header/HeaderContainer/HeaderContainer";
import HeaderProfile from "../../components/header/HeaderProfile/HeaderProfile";
import LogoSam from "../../components/LogoSam/LogoSam";
import MainContainer from "../../components/main/MainContainer/MainContainer";
import MainTitle from "../../components/main/MainTitle/MainTitle";
import Navbar from "../../components/Navbar/Navbar";
import { navItems } from "../../constants";
import "./NewsPage.scss";

const NewsPage: React.FC = (): ReactElement => {
  return (
    <div className="news">
      <HeaderContainer>
        <LogoSam />
        <Navbar
          items={navItems.header}
          styles={["header-navbar", "header-link-item"]}
          containerWidth={"15rem"}
          color={"link-white"}
          active={"header-link-is-active"}
        />
        <HeaderProfile />
      </HeaderContainer>
      <MainContainer>
        <MainTitle title={navItems.header[1].title} />
      </MainContainer>
    </div>
  );
};

export default NewsPage;
