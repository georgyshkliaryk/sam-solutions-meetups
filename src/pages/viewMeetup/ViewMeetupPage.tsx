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
import "./ViewMeetupPage.scss";
import MeetupDefaultImage from "./assets/MeetupDefaultImage.svg";
import dateFormat from "dateformat";

const ViewMeetupPage: React.FC = observer((): ReactElement => {
  const { authStore } = useContext(StoreContext);
  const { meetupsStore } = useContext(StoreContext);
  const themeId = useParams();
  meetupsStore.getMeetupById(themeId.id);

  useEffect(() => {
    meetupsStore.getParticipantsById(themeId.id);
  }, [meetupsStore, themeId.id]);

  if (authStore.user !== undefined) {
    return (
      <div className="view-meetup">
        <Header className="header-outer">
          <LinkComponent to={routes.meetups}>
            <LogoSam className="header-logo-outer" />
          </LinkComponent>
          <HeaderNavbar items={navItems.header} />
          <HeaderProfile user={authStore.user} />
        </Header>
        <Main>
          <MainTitle>Просмотр митапа</MainTitle>
          <article className="view-meetup-data">
            <div className="view-meetup-data-item">
              <img
                className="view-meetup-data-item__image"
                src={meetupsStore.current?.image ?? MeetupDefaultImage}
                alt="Meetup cover"
              />
              <p className="view-meetup-data-content view-meetup-data-content__title">
                {meetupsStore.current?.title}
              </p>
            </div>
            <div className="view-meetup-data-item">
              <p className="view-meetup-data-label">Время и место проведения</p>
              <div className="view-meetup-data-content view-meetup-data-content-schedule">
                {meetupsStore.current?.start && (
                  <>
                    <p className="view-meetup-data-content-schedule__item">
                      <span className="material-icons-round">
                        calendar_today
                      </span>
                      <span>
                        {dateFormat(
                          meetupsStore.current?.start,
                          "dddd, d mmmm"
                        )}
                      </span>
                    </p>
                    {meetupsStore.current.finish ? (
                      <p className="view-meetup-data-content-schedule__item">
                        <span className="material-icons-round">schedule</span>
                        <span>
                          {dateFormat(meetupsStore.current?.start, "H:MM")} –{" "}
                          {dateFormat(meetupsStore.current?.finish, "H:MM")}
                        </span>
                      </p>
                    ) : (
                      <p className="view-meetup-data-content-schedule__item">
                        <span className="material-icons-round">schedule</span>
                        <span>
                          {dateFormat(meetupsStore.current?.start, "H:MM")}
                        </span>
                      </p>
                    )}
                  </>
                )}
                {meetupsStore.current?.place && (
                  <p className="view-meetup-data-content-schedule__item">
                    <span className="material-icons-round">place</span>
                    <span>{meetupsStore.current?.place}</span>
                  </p>
                )}
              </div>
            </div>
            <div className="view-meetup-data-item">
              <p className="view-meetup-data-label">Спикер</p>
              <div className="view-meetup-data-content">
                {meetupsStore.current?.speakers && (
                  <Avatar
                    className="view-meetup-data-content-avatar"
                    user={{
                      name: meetupsStore.current.speakers[0].name,
                      surname: meetupsStore.current.speakers[0].surname,
                    }}
                  />
                )}
                <span>
                  {meetupsStore.current?.speakers[0].name}{" "}
                  {meetupsStore.current?.speakers[0].surname}
                </span>
              </div>
            </div>
            <div className="view-meetup-data-item">
              <p className="view-meetup-data-label">Описание</p>
              <div className="view-meetup-data-content">
                {meetupsStore.current?.description}
              </div>
            </div>
            <div className="view-meetup-data-item view-theme-data-item-last">
              <div className="view-meetup-data-buttons">
                <LinkComponent
                  className="view-meetup-data-buttons-button-back"
                  to={`/${routes.themes}`}
                >
                  Назад
                </LinkComponent>
                <div className="view-meetup-data-buttons-right">
                  <button className="view-meetup-data-buttons-button-delete">
                    Удалить
                  </button>
                  <button className="view-meetup-data-buttons-button-submit">
                    Опубликовать
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

export default ViewMeetupPage;
