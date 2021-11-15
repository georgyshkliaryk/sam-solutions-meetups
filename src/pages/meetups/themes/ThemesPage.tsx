import React, { ReactElement } from "react";
import "./ThemesPage.scss";
import HeaderProfile from "../../../components/header/HeaderProfile/HeaderProfile";
import LogoSam from "../../../components/LogoSam/LogoSam";
import Navbar from "../../../components/Navbar/Navbar";
import { defaultUser, navItems, routes } from "../../../constants";
import MainTitle from "../../../components/main/MainTitle/MainTitle";
import Main from "../../../components/main/Main/Main";
import Header from "../../../components/header/Header/Header";
import LinkComponent from "../../../components/LinkComponent/LinkComponent";

const ThemesPage: React.FC = (): ReactElement => {
  return (
    <div className="themes">
      <Header className={"header-outer"}>
        <LinkComponent to={routes.meetups.themes}>
          <LogoSam className={"header-logo-outer"} />
        </LinkComponent>
        <Navbar
          items={navItems.header}
          styles={["header-navbar", "header-link-item"]}
          containerWidth={"15rem"}
          color={"link-white"}
          active={"header-link-is-active"}
        />
        <HeaderProfile user={defaultUser} />
      </Header>
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

export default ThemesPage;
