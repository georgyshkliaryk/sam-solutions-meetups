import React, { ReactElement, useContext, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "../../components/header/Header/Header";
import HeaderNavbar from "../../components/header/HeaderNavbar/HeaderNavbar";
import HeaderProfile from "../../components/header/HeaderProfile/HeaderProfile";
import LinkComponent from "../../components/LinkComponent/LinkComponent";
import LogoSam from "../../components/LogoSam/LogoSam";
import Main from "../../components/main/Main/Main";
import MainNavbar from "../../components/main/MainNavbar/MainNavbar";
import MainTitle from "../../components/main/MainTitle/MainTitle";
import { navItems, routes } from "../../constants";
import DraftsPage from "./drafts/DraftsPage";
import "./MeetupsPage.scss";
import ThemesPage from "./themes/ThemesPage";
import FuturePage from "./future/FuturePage";
import PastPage from "./past/PastPage";
import { StoreContext } from "../../context/StoreContext";
import { observer } from "mobx-react-lite";

import { useTranslation } from "react-i18next";

const MeetupsPage: React.FC = observer((): ReactElement => {
  const { authStore, meetupsStore } = useContext(StoreContext);
  const { t } = useTranslation();

  useEffect(() => {
    meetupsStore.getAllMeetups();
  }, [meetupsStore]);

  if (authStore.user !== undefined) {
    return (
      <div className="meetups">
        <Header className="header-outer">
          <LinkComponent to={`${routes.meetups}/${routes.themes}`}>
            <LogoSam className="header-logo-outer" />
          </LinkComponent>
          <HeaderNavbar items={navItems.header} />
          <HeaderProfile user={authStore.user} />
        </Header>
        <Main>
          <MainTitle>{t("pageTitles.meetups")}</MainTitle>
          <MainNavbar items={navItems.meetups} className="main__navbar-outer" />
          <Routes>
            <Route path={routes.themes} element={<ThemesPage />} />
            <Route path={routes.drafts} element={<DraftsPage />} />
            <Route path={routes.future} element={<FuturePage />} />
            <Route path={routes.past} element={<PastPage />} />
            <Route
              path="*"
              element={<Navigate replace to={routes.notFound} />}
            />
          </Routes>
        </Main>
      </div>
    );
  } else {
    return <Navigate to={routes.login} />;
  }
});

export default MeetupsPage;
