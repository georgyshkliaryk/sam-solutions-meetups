import React, { ReactElement } from "react";
import HeaderContainer from "../../../components/header/HeaderContainer/HeaderContainer";
import HeaderProfile from "../../../components/header/HeaderProfile/HeaderProfile";
import LogoSam from "../../../components/LogoSam/LogoSam";
import Main from "../../../components/main/Main/Main";
import MainTitle from "../../../components/main/MainTitle/MainTitle";
import Navbar from "../../../components/Navbar/Navbar";
import { navItems } from "../../../constants";
import "./DraftsPage.scss";

const DraftsPage: React.FC = (): ReactElement => {
  return (
    <div className="drafts">
      <HeaderContainer>
        <LogoSam />
        <Navbar
          items={navItems.header}
          styles={["header-navbar", "header-link-item"]}
          containerWidth={"15rem"}
          color={"link-white"}
        />
        <HeaderProfile />
      </HeaderContainer>
      <Main>
        <MainTitle>{navItems.header[0].title}</MainTitle>
        <Navbar
          items={navItems.meetups}
          styles={["main-navbar", "main-link-item"]}
          // containerWidth={"40rem"}
          color={"link-grey"}
          active={"main-link-is-active"}
        />
      </Main>
    </div>
  );
};

export default DraftsPage;
