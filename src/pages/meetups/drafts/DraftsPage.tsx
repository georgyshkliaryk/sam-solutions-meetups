import React, { ReactElement } from "react";
import HeaderContainer from "../../../components/header/HeaderContainer/HeaderContainer";
import HeaderProfile from "../../../components/header/HeaderProfile/HeaderProfile";
import LogoSam from "../../../components/LogoSam/LogoSam";
import MainContainer from "../../../components/main/MainContainer/MainContainer";
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
      <MainContainer>
        <MainTitle title={navItems.header[0].title} />
        <Navbar
          items={navItems.meetups}
          styles={["main-navbar", "main-link-item"]}
          containerWidth={"35rem"}
          color={"link-grey"}
          active={"main-link-is-active"}
        />
      </MainContainer>
    </div>
  );
};

export default DraftsPage;
