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
import { MeetupPageTypes, navItems, routes } from "../../constants";
import { StoreContext } from "../../context/StoreContext";
import "./ViewMeetupPage.scss";
import MeetupDefaultImage from "./assets/MeetupDefaultImage.svg";
import dateFormat from "dateformat";
import Loader from "react-loader-spinner";

interface IProps {
  type: string;
}

const ViewMeetupPage: React.FC<IProps> = observer((props): ReactElement => {
  const { authStore } = useContext(StoreContext);
  const { meetupsStore } = useContext(StoreContext);
  const themeId = useParams();

  useEffect(() => {
    if (themeId.id) {
      meetupsStore.getMeetupById(themeId.id);
    }
  }, [meetupsStore, themeId.id]);

  if (authStore.user === undefined) {
    return <Navigate to={routes.login} />;
  }

  if (meetupsStore.errorState === true) {
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
    <div className="view-meetup">
      <Header className="view-meetup__header">
        <LinkComponent to={routes.meetups}>
          <LogoSam className="view-meetup__header-logo" />
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
              src={currentMeetup.image ?? MeetupDefaultImage}
              alt="Meetup cover"
            />
            <p className="view-meetup-data-content view-meetup-data-content__title">
              {currentMeetup.title}
            </p>
          </div>
          <div className="view-meetup-data-item">
            <p className="view-meetup-data-label">Время и место проведения</p>
            <div className="view-meetup-data-content view-meetup-data-content-schedule">
              {currentMeetup.start && (
                <>
                  <p className="view-meetup-data-content-schedule__item">
                    <span className="material-icons-round view-meetup-data-content-schedule__item-icon">
                      calendar_today
                    </span>
                    <time dateTime={currentMeetup.start}>
                      {dateFormat(currentMeetup.start, "dddd, d mmmm yyyy")}
                    </time>
                  </p>
                  {currentMeetup.finish ? (
                    <p className="view-meetup-data-content-schedule__item">
                      <span className="material-icons-round view-meetup-data-content-schedule__item-icon">
                        schedule
                      </span>
                      <time dateTime={currentMeetup.start}>
                        {dateFormat(currentMeetup.start, "H:MM")}
                      </time>
                      &nbsp;–&nbsp;
                      <time dateTime={currentMeetup.finish}>
                        {dateFormat(currentMeetup.finish, "H:MM")}
                      </time>
                    </p>
                  ) : (
                    <p className="view-meetup-data-content-schedule__item">
                      <span className="material-icons-round view-meetup-data-content-schedule__item-icon">
                        schedule
                      </span>
                      <span>{dateFormat(currentMeetup.start, "H:MM")}</span>
                    </p>
                  )}
                </>
              )}
              {currentMeetup.place && (
                <p className="view-meetup-data-content-schedule__item">
                  <span className="material-icons-round view-meetup-data-content-schedule__item-icon">
                    place
                  </span>
                  <span>{currentMeetup.place}</span>
                </p>
              )}
            </div>
          </div>
          <div className="view-meetup-data-item">
            <p className="view-meetup-data-label">Спикер</p>
            <div className="view-meetup-data-content">
              {currentMeetup.speakers && (
                <Avatar
                  className="view-meetup-data-content-avatar"
                  user={{
                    name: currentMeetup.speakers[0].name,
                    surname: currentMeetup.speakers[0].surname,
                  }}
                />
              )}
              <span>
                {`${currentMeetup.speakers[0].name} ${currentMeetup.speakers[0].surname}`}
              </span>
            </div>
          </div>
          <div className="view-meetup-data-item">
            <p className="view-meetup-data-label">Описание</p>
            <div className="view-meetup-data-content">
              {currentMeetup.description}
            </div>
          </div>
          <div className="view-meetup-data-item view-theme-data-item-last">
            {props.type === MeetupPageTypes.DRAFT ? (
              <div className="view-meetup-data-buttons">
                <LinkComponent
                  className="view-meetup-data-buttons-button-back"
                  to={`${routes.meetups}/${routes.drafts}`}
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
            ) : props.type === MeetupPageTypes.FUTURE ? (
              <div className="view-meetup-data-buttons">
                <LinkComponent
                  className="view-meetup-data-buttons-button-back"
                  to={`${routes.meetups}/${routes.future}`}
                >
                  Назад
                </LinkComponent>
                <div className="view-meetup-data-buttons-right">
                  <button className="view-meetup-data-buttons-button-delete">
                    Удалить
                  </button>
                  <button className="view-meetup-data-buttons-button-submit">
                    Пойду
                  </button>
                </div>
              </div>
            ) : (
              <div className="view-meetup-data-buttons">
                <LinkComponent
                  className="view-meetup-data-buttons-button-back"
                  to={`${routes.meetups}/${routes.past}`}
                >
                  Назад
                </LinkComponent>
                <div className="view-meetup-data-buttons-right">
                  <button className="view-meetup-data-buttons-button-delete">
                    Удалить
                  </button>
                </div>
              </div>
            )}
          </div>
        </article>
      </Main>
    </div>
  );
});

export default ViewMeetupPage;
