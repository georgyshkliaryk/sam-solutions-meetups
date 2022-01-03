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

const ViewNewsPage: React.FC = (): ReactElement => {
  const { t } = useTranslation();

  const { authStore, newsStore } = useContext(StoreContext);
  const navigate = useNavigate();
  const articleId = useParams();

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

  return <div>{article.title}</div>;
};

export default ViewNewsPage;
