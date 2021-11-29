import { observer } from "mobx-react-lite";
import React, { ReactElement, useContext, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";
import Header from "../../components/header/Header/Header";
import HeaderNavbar from "../../components/header/HeaderNavbar/HeaderNavbar";
import HeaderProfile from "../../components/header/HeaderProfile/HeaderProfile";
import LinkComponent from "../../components/LinkComponent/LinkComponent";
import LogoSam from "../../components/LogoSam/LogoSam";
import Main from "../../components/main/Main/Main";
import MainTitle from "../../components/main/MainTitle/MainTitle";
import { navItems, routes } from "../../constants";
import { StoreContext } from "../../context/StoreContext";
import { IParticipant } from "../../repositories/interfaces/INetworkRepository";
import "./ViewThemePage.scss";

const ViewThemePage: React.FC = observer((): ReactElement => {
  const { authStore } = useContext(StoreContext);
  const { meetupsStore } = useContext(StoreContext);
  const themeId = useParams();
  meetupsStore.getMeetupById(themeId.id);

  useEffect(() => {
    meetupsStore.getParticipantsById(themeId.id);
  }, [meetupsStore, themeId.id]);

  const firstParticipants = meetupsStore.participants.slice(0, 10);

  if (authStore.user !== undefined) {
    return (
      <div className="view-theme">
        <Header className="header-outer">
          <LinkComponent to={routes.meetups}>
            <LogoSam className="header-logo-outer" />
          </LinkComponent>
          <HeaderNavbar items={navItems.header} />
          <HeaderProfile user={authStore.user} />
        </Header>
        <Main>
          <MainTitle>Просмотр темы</MainTitle>
          <article className="view-theme-data">
            <div className="view-theme-data-item">
              <p className="view-theme-data-label">Название</p>
              <div className="view-theme-data-content">
                <p className="view-theme-data-content__title">
                  {meetupsStore.current?.title}
                </p>
              </div>
            </div>
            <div className="view-theme-data-item">
              <p className="view-theme-data-label">Автор</p>
              <div className="view-theme-data-content">
                {meetupsStore.current && (
                  <Avatar
                    className="view-theme-data-content-avatar"
                    user={{
                      name: meetupsStore.current.authorName,
                      surname: meetupsStore.current.authorSurname,
                    }}
                  />
                )}
                <span>
                  {meetupsStore.current?.authorName}{" "}
                  {meetupsStore.current?.authorSurname}
                </span>
              </div>
            </div>
            <div className="view-theme-data-item">
              <p className="view-theme-data-label">Описание</p>
              <div className="view-theme-data-content">
                {meetupsStore.current?.description}
              </div>
            </div>
            <div className="view-theme-data-item">
              <p className="view-theme-data-label">Поддерживают</p>
              <div className="view-theme-data-content">
                {firstParticipants.map((p: IParticipant, i: number) => (
                  <Avatar
                    className="view-theme-data-content-avatar"
                    user={{
                      name: p.name,
                      surname: p.surname,
                    }}
                    //  FIX LATER
                    key={p.id + i}
                  />
                ))}
                {meetupsStore.participants.length > 10 && (
                  <div className="view-theme-data-content-avatar-rest">
                    +{meetupsStore.participants.length - 10}
                  </div>
                )}
              </div>
            </div>
            <div className="view-theme-data-item view-theme-data-item-last">
              <div className="view-theme-data-buttons">
                <LinkComponent
                  className="view-theme-data-buttons-button-back"
                  to={`/${routes.themes}`}
                >
                  Назад
                </LinkComponent>
                <div className="view-theme-data-buttons-right">
                  <button className="view-theme-data-buttons-button-delete">
                    Удалить
                  </button>
                  <button className="view-theme-data-buttons-button-submit">
                    Одобрить тему
                  </button>
                </div>
              </div>
            </div>
          </article>
        </Main>
      </div>
    );
  } else {
    return <Navigate to={routes.login} />;
  }
});

export default ViewThemePage;
