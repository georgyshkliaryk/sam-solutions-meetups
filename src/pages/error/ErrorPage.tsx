import React, { ReactElement, useContext } from "react";
import Header from "../../components/header/Header/Header";
import HeaderNavbar from "../../components/header/HeaderNavbar/HeaderNavbar";
import HeaderProfile from "../../components/header/HeaderProfile/HeaderProfile";
import LinkComponent from "../../components/LinkComponent/LinkComponent";
import LogoSam from "../../components/LogoSam/LogoSam";
import Main from "../../components/main/Main/Main";
import MainTitle from "../../components/main/MainTitle/MainTitle";
import { navItems, routes } from "../../constants";
import { StoreContext } from "../../context/StoreContext";
import "./ErrorPage.scss";

const ErrorPage: React.FC = (): ReactElement => {
  const { authStore } = useContext(StoreContext);

  if (authStore.user !== undefined) {
    return (
      <div className="error-page">
        <Header className="error-page__header">
          <LinkComponent to={`${routes.meetups}/${routes.themes}`}>
            <LogoSam className="error-page__header-logo" />
          </LinkComponent>
          <HeaderNavbar items={navItems.header} />
          <HeaderProfile user={authStore.user} />
        </Header>
        <Main>
          <MainTitle>Error 404</MainTitle>
        </Main>
      </div>
    );
  }

  return <div>...</div>;
};

export default ErrorPage;
