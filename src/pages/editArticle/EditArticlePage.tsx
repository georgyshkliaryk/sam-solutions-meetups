import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Loader from "react-loader-spinner";
import { ReactElement } from "react-markdown/lib/react-markdown";
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
import "./EditArticlePage.scss";

const EditArticlePage: React.FC = (): ReactElement => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { authStore, newsStore } = useContext(StoreContext);
  const articleId = useParams();
  const [article, setArticle] = useState(
    newsStore.newsList.find((a) => a.id === articleId.id)
  );

  useEffect(() => {
    return () => {
      newsStore.resetErrorState();
    };
  }, []);

  useEffect(() => {
    async function getArticle() {
      if (article === undefined && articleId.id !== undefined) {
        setArticle(await newsStore.getArticleById(articleId.id));
      }
    }
    getArticle();
  }, [articleId.id]);

  if (authStore.user === undefined) {
    return <Navigate to={routes.login} />;
  }

  if (newsStore.errorState === true) {
    return <Navigate to={routes.login} />;
  }

  if (article === undefined) {
    return (
      <div className="edit-meetup">
        <Header className="edit-meetup__header">
          <LinkComponent to={routes.meetups}>
            <LogoSam className="edit-meetup__header-logo" />
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

  return <div>edit article {article.id}</div>;
};

export default EditArticlePage;
