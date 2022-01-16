import { t } from "i18next";
import { observer } from "mobx-react-lite";
import React, { ReactElement, useContext } from "react";
import Loader from "react-loader-spinner";
import { Navigate } from "react-router-dom";
import Header from "../../components/header/Header/Header";
import HeaderNavbar from "../../components/header/HeaderNavbar/HeaderNavbar";
import HeaderProfile from "../../components/header/HeaderProfile/HeaderProfile";
import LinkComponent from "../../components/LinkComponent/LinkComponent";
import LogoSam from "../../components/LogoSam/LogoSam";
import Main from "../../components/main/Main/Main";
import MainTitle from "../../components/main/MainTitle/MainTitle";
import { loadingColor, navItems, routes } from "../../constants";
import { StoreContext } from "../../context/StoreContext";
import "./LoadingPage.scss";

const LoadingPage: React.FC = observer((): ReactElement => {
  const { authStore } = useContext(StoreContext);

  if (authStore.user === undefined) {
    return <Navigate to={routes.login} />;
  }

  return (
    <div className="loading-page">
      <Header className="loading-page__header">
        <LinkComponent to={`${routes.meetups}/${routes.themes}`}>
          <LogoSam className="loading-page__header-logo" />
        </LinkComponent>
        <HeaderNavbar items={navItems.header} />
        <HeaderProfile user={authStore.user} />
      </Header>
      <Main>
        <MainTitle>{t("loading")}...</MainTitle>
        <Loader type="Puff" color={loadingColor} height={100} width={100} />
      </Main>
    </div>
  );
});

export default LoadingPage;
