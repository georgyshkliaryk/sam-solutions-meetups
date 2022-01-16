import { observer } from "mobx-react-lite";
import React, { ReactElement, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import Header from "../../components/header/Header/Header";
import HeaderNavbar from "../../components/header/HeaderNavbar/HeaderNavbar";
import HeaderProfile from "../../components/header/HeaderProfile/HeaderProfile";
import LinkComponent from "../../components/LinkComponent/LinkComponent";
import LogoSam from "../../components/LogoSam/LogoSam";
import Main from "../../components/main/Main/Main";
import { navItems, routes } from "../../constants";
import { StoreContext } from "../../context/StoreContext";
import "./ErrorPage.scss";

interface IProps {
  errorTitle: string;
  errorDescription: string;
  errorIconName: string;
}

const ErrorPage: React.FC<IProps> = observer((props): ReactElement => {
  const { authStore } = useContext(StoreContext);
  const { t } = useTranslation();

  if (authStore.user === undefined) {
    return <Navigate to={routes.login} />;
  }

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
        <div className="error-page-content">
          <p className="error-page-content-title">
            <span className="material-icons-round error-page-content-title__icon">
              {props.errorIconName}
            </span>
            <span className="error-page-content-title__text">
              {props.errorTitle}
            </span>
          </p>
          <p className="error-page-content-description">
            {props.errorDescription}
          </p>
          <LinkComponent
            className="error-page-content-button"
            to={`${routes.meetups}/${routes.themes}`}
          >
            <span className="material-icons-round">home</span>
            <span>{t("buttons.commonButtons.toMain")}</span>
          </LinkComponent>
        </div>
      </Main>
    </div>
  );
});

export default ErrorPage;
