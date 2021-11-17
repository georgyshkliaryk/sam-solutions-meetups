import React, { ReactElement } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "../../components/header/Header/Header";
import HeaderNavbar from "../../components/header/HeaderNavbar/HeaderNavbar";
import HeaderProfile from "../../components/header/HeaderProfile/HeaderProfile";
import LinkComponent from "../../components/LinkComponent/LinkComponent";
import LogoSam from "../../components/LogoSam/LogoSam";
import Main from "../../components/main/Main/Main";
import MainNavbar from "../../components/main/MainNavbar/MainNavbar";
import MainTitle from "../../components/main/MainTitle/MainTitle";
import { defaultUser, navItems, routes } from "../../constants";
import DraftsPage from "./drafts/DraftsPage";
import "./MeetupsPage.scss";
import ThemesPage from "./themes/ThemesPage";
import FuturePage from "./future/FuturePage";
import PastPage from "./past/PastPage";

const MeetupsPage: React.FC = (): ReactElement => {
  return (
    <div className="meetups">
      <Header className="header-outer">
        <LinkComponent to={routes.meetups}>
          <LogoSam className="header-logo-outer" />
        </LinkComponent>
        <HeaderNavbar items={navItems.header} />
        <HeaderProfile user={defaultUser} />
      </Header>
      <Main>
        <MainTitle>{navItems.header[0].title}</MainTitle>
        <MainNavbar items={navItems.meetups} className="main__navbar-outer" />
        <Routes>
          <Route path={routes.themes} element={<ThemesPage />} />
          <Route path={routes.drafts} element={<DraftsPage />} />
          <Route path={routes.future} element={<FuturePage />} />
          <Route path={routes.past} element={<PastPage />} />
          <Route path="*" element={<Navigate replace to={routes.themes} />} />
        </Routes>
      </Main>
    </div>
  );
};

export default MeetupsPage;
