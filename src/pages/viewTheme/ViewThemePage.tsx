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
import Loader from "react-loader-spinner";

const ViewThemePage: React.FC = observer((): ReactElement => {
  const { authStore } = useContext(StoreContext);
  const { meetupsStore } = useContext(StoreContext);
  const themeId = useParams();
  if (themeId.id) {
    meetupsStore.getMeetupById(themeId.id);
  }

  useEffect(() => {
    if (themeId.id) {
      meetupsStore.getParticipantsList(themeId.id);
    }
  }, [meetupsStore, themeId.id]);

  if (authStore.user === undefined) {
    return <Navigate to={routes.login} />;
  }

  const currentMeetup = meetupsStore.current;

  if (currentMeetup === undefined) {
    return (
      <div className="view-meetup">
        <Header className="view-meetup__header">
          <LinkComponent to={routes.meetups}>
            <LogoSam className="view-meetup__header-logo" />
          </LinkComponent>
          <HeaderNavbar items={navItems.header} />
          <HeaderProfile user={authStore.user} />
        </Header>
        <Main>
          <MainTitle>Загрузка...</MainTitle>
          <Loader type="Puff" color="#00BFFF" height={100} width={100} />
        </Main>
      </div>
    );
  }
  return (
    <div className="view-theme">
      <Header className="view-theme__header">
        <LinkComponent to={routes.meetups}>
          <LogoSam className="view-theme__header-logo" />
        </LinkComponent>
        <HeaderNavbar items={navItems.header} />
        <HeaderProfile user={authStore.user} />
      </Header>
      <Main>
        <MainTitle>Просмотр темы</MainTitle>
        <article className="view-theme-data">
          <div className="view-theme-data-item">
            <p className="view-theme-data-label">Название</p>
            <p className="view-theme-data-content view-theme-data-content__title">
              {currentMeetup.title}
            </p>
          </div>
          <div className="view-theme-data-item">
            <p className="view-theme-data-label">Автор</p>
            <div className="view-theme-data-content">
              {currentMeetup && (
                <Avatar
                  className="view-theme-data-content-avatar"
                  user={{
                    name: currentMeetup.authorName,
                    surname: currentMeetup.authorSurname,
                  }}
                />
              )}
              <span>
                {`${currentMeetup.authorName} ${currentMeetup.authorSurname}`}
              </span>
            </div>
          </div>
          <div className="view-theme-data-item">
            <p className="view-theme-data-label">Описание</p>
            <div className="view-theme-data-content">
              {currentMeetup.description}
            </div>
          </div>
          <div className="view-theme-data-item">
            <p className="view-theme-data-label">Поддерживают</p>
            <div className="view-theme-data-content">
              {meetupsStore.participants
                .slice(0, 10)
                .map((p: IParticipant, i: number) => (
                  <Avatar
                    className="view-theme-data-content-avatar"
                    user={{
                      name: p.name,
                      surname: p.surname,
                    }}
                    // TODO: FIX LATER
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
                to={`${routes.meetups}`}
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
});

export default ViewThemePage;
