import React, { ReactElement, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header/Header";
import HeaderNavbar from "../../components/header/HeaderNavbar/HeaderNavbar";
import HeaderProfile from "../../components/header/HeaderProfile/HeaderProfile";
import LinkComponent from "../../components/LinkComponent/LinkComponent";
import LogoSam from "../../components/LogoSam/LogoSam";
import Main from "../../components/main/Main/Main";
import MainTitle from "../../components/main/MainTitle/MainTitle";
import { navItems, routes } from "../../constants";
import { StoreContext } from "../../context/StoreContext";
import "./CreateArticlePage.scss";

const CreateArticlePage: React.FC = (): ReactElement => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { authStore, newsStore } = useContext(StoreContext);

  if (authStore.user === undefined) {
    return <Navigate to={routes.login} />;
  }

  return (
    <div className="create-article">
      <Header className="create-article__header">
        <LinkComponent to={routes.meetups}>
          <LogoSam className="create-article__header-logo" />
        </LinkComponent>
        <HeaderNavbar items={navItems.header} />
        <HeaderProfile user={authStore.user} />
      </Header>
      <Main>
        <MainTitle>{t("pageTitles.newArticle")}</MainTitle>
        <form className="create-article-form">
          <fieldset className="create-article-form-inputs">
            <div className="create-article-form-inputs-item">
              <label
                htmlFor="articleTitle"
                className="create-article-form-inputs-item__label"
              >
                Заголовок
              </label>
              <input
                type="text"
                id="articleTitle"
                className="create-article-form-inputs-item__input"
              />
            </div>
            <div className="create-article-form-inputs-item">
              <label
                htmlFor="articleDescription"
                className="create-article-form-inputs-item__label"
              >
                Текст
              </label>
              <textarea
                className="create-article-form-inputs-item__textarea"
                name="articleDescription"
                id="articleDescription"
                cols={30}
                rows={10}
              ></textarea>
            </div>
            <div className="create-article-form-inputs-item">
              <label
                htmlFor=""
                className="create-article-form-inputs-item__label"
              >
                Изображение
              </label>
            </div>
          </fieldset>
          <fieldset className="create-article-form-buttons">
            <LinkComponent
              className="create-article-form-buttons__back"
              to={routes.news}
            >
              {t("buttons.meetupPageButtons.goBack")}
            </LinkComponent>
            <button
              type="submit"
              className="create-article-form-buttons__submit"
            >
              {t("buttons.commonButtons.create")}
            </button>
          </fieldset>
        </form>
      </Main>
    </div>
  );
};

export default CreateArticlePage;
