import React, { ReactElement } from "react";
import HeaderContainer from "../../components/header/HeaderContainer/HeaderContainer";
import HeaderProfile from "../../components/header/HeaderProfile/HeaderProfile";
import LogoSam from "../../components/LogoSam/LogoSam";
import Main from "../../components/main/Main/Main";
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
      <Main>
        <MainTitle title={navItems.header[1].title} />
      </Main>
    </div>
  );
};

export default NewsPage;
