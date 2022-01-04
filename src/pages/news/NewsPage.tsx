import React, { ReactElement, useContext, useEffect } from "react";
import { Navigate } from "react-router";
import Header from "../../components/header/Header/Header";
import HeaderNavbar from "../../components/header/HeaderNavbar/HeaderNavbar";
import HeaderProfile from "../../components/header/HeaderProfile/HeaderProfile";
import LinkComponent from "../../components/LinkComponent/LinkComponent";
import LogoSam from "../../components/LogoSam/LogoSam";
import Main from "../../components/main/Main/Main";
import MainTitle from "../../components/main/MainTitle/MainTitle";
import { navItems, routes, UserRoles } from "../../constants";
import { StoreContext } from "../../context/StoreContext";
import "./NewsPage.scss";
import NewsCard from "../../components/main/cards/NewsCard/NewsCard";

import { useTranslation } from "react-i18next";
import { INews } from "../../repositories/interfaces/INewsRepository";
import { observer } from "mobx-react-lite";
import { sortByDate } from "../../helpers/sortByDate";

const NewsPage: React.FC = observer((): ReactElement => {
  const { authStore, newsStore } = useContext(StoreContext);
  const { t } = useTranslation();

  const sortedNews = newsStore.news
    .slice()
    .sort((a: INews, b: INews) => sortByDate(a.date, b.date));

  useEffect(() => {
    newsStore.getAllNews();
  }, [newsStore]);

  if (authStore.user !== undefined) {
    return (
      <div className="news-page">
        <Header className="header-outer">
          <LinkComponent to={routes.meetups}>
            <LogoSam className="header-logo-outer" />
          </LinkComponent>
          <HeaderNavbar items={navItems.header} />
          <HeaderProfile user={authStore.user} />
        </Header>
        <Main>
          <MainTitle styles="news-page-title">
            <p>{t("pageTitles.news")}</p>
            {authStore.user.roles === UserRoles.CHIEF && (
              <LinkComponent
                className="news-page-title__create-news-button"
                to={`${routes.news}/${routes.create}`}
              >
                <span className="material-icons-round">add</span>
                {t("buttons.commonButtons.createNews")}
              </LinkComponent>
            )}
          </MainTitle>
          <div className="news-page-list">
            {sortedNews.map((n: INews) => (
              <NewsCard item={n} key={n.id} />
            ))}
          </div>
        </Main>
      </div>
    );
  } else {
    return <Navigate to={routes.login} />;
  }
});

export default NewsPage;
