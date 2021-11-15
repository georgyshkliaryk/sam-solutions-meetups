import React, { ReactElement } from "react";
import Header from "../../components/header/Header/Header";
import HeaderProfile from "../../components/header/HeaderProfile/HeaderProfile";
import LinkComponent from "../../components/LinkComponent/LinkComponent";
import LogoSam from "../../components/LogoSam/LogoSam";
import Main from "../../components/main/Main/Main";
import MainTitle from "../../components/main/MainTitle/MainTitle";
import Navbar from "../../components/Navbar/Navbar";
import { defaultUser, navItems, routes } from "../../constants";
import "./NewsPage.scss";

const NewsPage: React.FC = (): ReactElement => {
  return (
    <div className="news">
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
        <MainTitle>{navItems.header[1].title}</MainTitle>
      </Main>
    </div>
  );
};

export default NewsPage;
