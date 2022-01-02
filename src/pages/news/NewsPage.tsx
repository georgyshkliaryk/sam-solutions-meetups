import React, { ReactElement, useContext } from "react";
import { Navigate } from "react-router";
import Header from "../../components/header/Header/Header";
import HeaderNavbar from "../../components/header/HeaderNavbar/HeaderNavbar";
import HeaderProfile from "../../components/header/HeaderProfile/HeaderProfile";
import LinkComponent from "../../components/LinkComponent/LinkComponent";
import LogoSam from "../../components/LogoSam/LogoSam";
import Main from "../../components/main/Main/Main";
import MainTitle from "../../components/main/MainTitle/MainTitle";
import { navItems, routes } from "../../constants";
import { StoreContext } from "../../context/StoreContext";
import "./NewsPage.scss";

import { useTranslation } from "react-i18next";

const NewsPage: React.FC = (): ReactElement => {
  const { authStore } = useContext(StoreContext);
  const { t } = useTranslation();

  if (authStore.user !== undefined) {
    return (
      <div className="news">
        <Header className="header-outer">
          <LinkComponent to={routes.meetups}>
            <LogoSam className="header-logo-outer" />
          </LinkComponent>
          <HeaderNavbar items={navItems.header} />
          <HeaderProfile user={authStore.user} />
        </Header>
        <Main>
          <MainTitle textAlign="left">{t("pageTitles.news")}</MainTitle>
        </Main>
      </div>
    );
  } else {
    return <Navigate to={routes.login} />;
  }
};

export default NewsPage;
