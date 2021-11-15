import React, { ReactElement } from "react";
import "./ThemesPage.scss";
import HeaderProfile from "../../../components/header/HeaderProfile/HeaderProfile";
import LogoSam from "../../../components/LogoSam/LogoSam";
import { defaultUser, navItems, routes } from "../../../constants";
import MainTitle from "../../../components/main/MainTitle/MainTitle";
import Main from "../../../components/main/Main/Main";
import Header from "../../../components/header/Header/Header";
import LinkComponent from "../../../components/LinkComponent/LinkComponent";
import HeaderNavbar from "../../../components/header/HeaderNavbar/HeaderNavbar";
import MainNavbar from "../../../components/main/MainNavbar/MainNavbar";

const ThemesPage: React.FC = (): ReactElement => {
  return (
    <div className="themes">
      <Header className={"header-outer"}>
        <LinkComponent to={routes.meetups.themes}>
          <LogoSam className={"header-logo-outer"} />
        </LinkComponent>
        <HeaderNavbar items={navItems.header} />
        <HeaderProfile user={defaultUser} />
      </Header>
      <Main>
        <MainTitle>{navItems.header[0].title}</MainTitle>
        <MainNavbar items={navItems.meetups} />
      </Main>
    </div>
  );
};

export default ThemesPage;
