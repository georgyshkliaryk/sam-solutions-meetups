import React, { ReactElement, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Loader from "react-loader-spinner";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header/Header/Header";
import HeaderNavbar from "../../components/header/HeaderNavbar/HeaderNavbar";
import HeaderProfile from "../../components/header/HeaderProfile/HeaderProfile";
import LinkComponent from "../../components/LinkComponent/LinkComponent";
import LogoSam from "../../components/LogoSam/LogoSam";
import Main from "../../components/main/Main/Main";
import MainTitle from "../../components/main/MainTitle/MainTitle";
import { loadingColor, navItems, routes } from "../../constants";
import { StoreContext } from "../../context/StoreContext";
import { INews } from "../../repositories/interfaces/INewsRepository";
import "./ViewNewsPage.scss";
import defaultImage from "./assets/newsDefaultImage.svg";
import ModalWindow from "../../components/ModalWindow/ModalWindow";

const ViewNewsPage: React.FC = (): ReactElement => {
  const { t } = useTranslation();

  const { authStore, newsStore } = useContext(StoreContext);
  const navigate = useNavigate();
  const articleId = useParams();
  const [modalDeleteActive, setModalDeleteActive] = useState<boolean>(false);

  const [article, setArticle] = useState<INews | undefined>(undefined);

  useEffect(() => {
    return () => {
      newsStore.resetErrorState();
    };
  }, []);

  useEffect(() => {
    async function getArticle() {
      if (articleId.id !== undefined) {
        setArticle(await newsStore.getArticleById(articleId.id));
      }
    }
    if (articleId.id) {
      getArticle();
    }
  }, [newsStore, articleId.id]);

  if (authStore.user === undefined) {
    return <Navigate to={routes.login} />;
  }

  if (newsStore.errorState === true) {
    return <Navigate to={routes.login} />;
  }

  if (article === undefined) {
    return (
      <div className="view-article">
        <Header className="view-article__header">
          <LinkComponent to={routes.meetups}>
            <LogoSam className="view-article__header-logo" />
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
  }

  const handleDeleteArticle = () => {
    newsStore.deleteArticle(article.id);
    navigate(routes.news);
  };

  return (
    <div className="view-article">
      <Header className="view-article__header">
        <LinkComponent to={routes.meetups}>
          <LogoSam className="view-article__header-logo" />
        </LinkComponent>
        <HeaderNavbar items={navItems.header} />
        <HeaderProfile user={authStore.user} />
      </Header>
      <Main>
        <MainTitle>{t("pageTitles.viewArticle")}</MainTitle>
        <article className="view-article-content">
          <img
            src={article.image ?? defaultImage}
            alt="News Article"
            className="view-article-content__image"
          />
          <div className="view-article-content-text">
            <p className="view-article-content-text__title">{article.title}</p>
            <p className="view-article-content-text__description">
              {article.description}
            </p>
          </div>
        </article>
        <div className="view-article-buttons">
          <LinkComponent
            className="view-article-buttons__back"
            to={routes.news}
          >
            {t("buttons.meetupPageButtons.goBack")}
          </LinkComponent>
          <div className="view-article-buttons-right">
            <button className="view-article-buttons-right__edit">
              <span className="material-icons-round">
                drive_file_rename_outline
              </span>
            </button>
            <button
              className="view-article-buttons-right__delete"
              onClick={() => setModalDeleteActive(true)}
            >
              {t("buttons.meetupPageButtons.deleteMeetup")}
            </button>
          </div>
        </div>
        <ModalWindow
          active={modalDeleteActive}
          setActive={setModalDeleteActive}
          title={t("modalWindow.titles.deleteArticle")}
        >
          <button
            className="view-article-modal-buttons__delete"
            onClick={handleDeleteArticle}
          >
            {t("modalWindow.buttons.delete")}
          </button>
          <button
            className="view-article-modal-buttons__cancel"
            onClick={() => setModalDeleteActive(false)}
          >
            {t("modalWindow.buttons.cancel")}
          </button>
        </ModalWindow>
      </Main>
    </div>
  );
};

export default ViewNewsPage;
