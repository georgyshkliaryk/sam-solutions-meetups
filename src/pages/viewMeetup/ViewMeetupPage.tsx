import { observer } from "mobx-react-lite";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";
import Header from "../../components/header/Header/Header";
import HeaderNavbar from "../../components/header/HeaderNavbar/HeaderNavbar";
import HeaderProfile from "../../components/header/HeaderProfile/HeaderProfile";
import LinkComponent from "../../components/LinkComponent/LinkComponent";
import LogoSam from "../../components/LogoSam/LogoSam";
import Main from "../../components/main/Main/Main";
import MainTitle from "../../components/main/MainTitle/MainTitle";
import { MeetupPageTypes, navItems, routes, UserRoles } from "../../constants";
import { StoreContext } from "../../context/StoreContext";
import "./ViewMeetupPage.scss";
import MeetupDefaultImage from "./assets/MeetupDefaultImage.svg";
import dateFormat from "dateformat";
import Loader from "react-loader-spinner";
import { hasUserRights } from "../../helpers/hasUserRights";
import { IMeetup } from "../../repositories/interfaces/IMeetupsRepository";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import { IParticipant } from "../../repositories/interfaces/INetworkRepository";

interface IProps {
  type: string;
}

const ViewMeetupPage: React.FC<IProps> = observer((props): ReactElement => {
  const { authStore, meetupsStore } = useContext(StoreContext);
  const navigate = useNavigate();
  const meetupId = useParams();
  const [meetup, setMeetup] = useState<IMeetup | undefined>(undefined);
  const [modalDeleteActive, setModalDeleteActive] = useState<boolean>(false);
  const [modalPublishActive, setModalPublishActive] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      meetupsStore.resetErrorState();
    };
  }, []);

  useEffect(() => {
    async function getMeetup() {
      if (meetupId.id !== undefined) {
        setMeetup(await meetupsStore.getMeetupById(meetupId.id));
        if (props.type === MeetupPageTypes.FUTURE) {
          await meetupsStore.fetchParticipants(meetupId.id);
        }
      }
    }
    if (meetupId.id) {
      getMeetup();
    }
  }, [meetupsStore, meetupId.id]);

  const isParticipating = (
    participants: IParticipant[],
    id: string
  ): boolean => {
    return participants.some((p: IParticipant): boolean => p.id === id);
  };

  const handleParticipateInMeetup = async (
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.preventDefault();
    if (meetupId.id !== undefined)
      await meetupsStore.participateInMeetup(meetupId.id);
  };

  const handleStopParticipateInMeetup = async (
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.preventDefault();
    if (authStore.user !== undefined && meetupId.id !== undefined) {
      await meetupsStore.stopParticipateInMeetup(
        meetupId.id,
        authStore.user.id
      );
    }
  };

  if (authStore.user === undefined) {
    return <Navigate to={routes.login} />;
  }

  if (meetupsStore.errorState === true) {
    //alert("Meetup not found!");
    return <Navigate to={routes.login} />;
  }

  if (meetup === undefined) {
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

  const publishMeetup = async () => {
    meetupsStore.publishMeetup(meetup.id);
    navigate(`${routes.meetups}/${routes.drafts}`);
  };

  const handleDeleteMeetup = () => {
    meetupsStore.deleteMeetup(meetup.id);
    if (props.type === MeetupPageTypes.DRAFT) {
      navigate(`${routes.meetups}/${routes.drafts}`);
    } else if (props.type === MeetupPageTypes.FUTURE) {
      navigate(`${routes.meetups}/${routes.future}`);
    } else {
      navigate(`${routes.meetups}/${routes.past}`);
    }
  };

  let participantsList = undefined;
  if (meetupId.id !== undefined) {
    participantsList = meetupsStore.participantsMap.get(meetupId.id);
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
              src={meetup.image ?? MeetupDefaultImage}
              alt="Meetup cover"
            />
            <p className="view-meetup-data-content view-meetup-data-content__title">
              {meetup.title}
            </p>
          </div>
          {!meetup.start && !meetup.finish && !meetup.place ? (
            <div className="view-meetup-data-item">
              <p className="view-meetup-data-label">Время и место проведения</p>
              <p className="view-theme-data-content">
                <i>Время и место проведения не указано</i>
              </p>
            </div>
          ) : (
            <div className="view-meetup-data-item">
              <p className="view-meetup-data-label">Время и место проведения</p>
              <div className="view-meetup-data-content view-meetup-data-content-schedule">
                {meetup.start && (
                  <>
                    <p className="view-meetup-data-content-schedule__item">
                      <span className="material-icons-round view-meetup-data-content-schedule__item-icon">
                        calendar_today
                      </span>
                      <time dateTime={meetup.start}>
                        {dateFormat(meetup.start, "dddd, d mmmm yyyy")}
                      </time>
                    </p>
                    {meetup.finish ? (
                      <p className="view-meetup-data-content-schedule__item">
                        <span className="material-icons-round view-meetup-data-content-schedule__item-icon">
                          schedule
                        </span>
                        <time dateTime={meetup.start}>
                          {dateFormat(meetup.start, "H:MM")}
                        </time>
                        &nbsp;–&nbsp;
                        <time dateTime={meetup.finish}>
                          {dateFormat(meetup.finish, "H:MM")}
                        </time>
                      </p>
                    ) : (
                      <p className="view-meetup-data-content-schedule__item">
                        <span className="material-icons-round view-meetup-data-content-schedule__item-icon">
                          schedule
                        </span>
                        <span>{dateFormat(meetup.start, "H:MM")}</span>
                      </p>
                    )}
                  </>
                )}
                {meetup.place && (
                  <p className="view-meetup-data-content-schedule__item">
                    <span className="material-icons-round view-meetup-data-content-schedule__item-icon">
                      place
                    </span>
                    <span>{meetup.place}</span>
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="view-meetup-data-item">
            <p className="view-meetup-data-label">Спикер</p>
            <div className="view-meetup-data-content">
              {meetup.speakers && (
                <Avatar
                  className="view-meetup-data-content-avatar"
                  user={{
                    name: meetup.speakers[0].name,
                    surname: meetup.speakers[0].surname,
                  }}
                />
              )}
              <span>
                {`${meetup.speakers[0].name} ${meetup.speakers[0].surname}`}
              </span>
            </div>
          </div>
          <div className="view-meetup-data-item">
            <p className="view-meetup-data-label">Описание</p>
            <div className="view-meetup-data-content view-meetup-data-content__description">
              {meetup.description}
            </div>
          </div>
          <ModalWindow
            active={modalDeleteActive}
            setActive={setModalDeleteActive}
            title="Удалить митап?"
          >
            <button
              className="view-meetup-modal-buttons__delete"
              onClick={handleDeleteMeetup}
            >
              Удалить
            </button>
            <button
              className="view-meetup-modal-buttons__cancel"
              onClick={() => setModalDeleteActive(false)}
            >
              Отмена
            </button>
          </ModalWindow>
          <ModalWindow
            active={modalPublishActive}
            setActive={setModalPublishActive}
            title="Опубликовать митап?"
          >
            <button
              className="view-theme-modal-buttons__approve"
              onClick={publishMeetup}
            >
              Опубликовать
            </button>
            <button
              className="view-theme-modal-buttons__cancel"
              onClick={() => setModalPublishActive(false)}
            >
              Отмена
            </button>
          </ModalWindow>
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
                  {hasUserRights(authStore.user, meetup) && (
                    <>
                      <LinkComponent
                        to={`${routes.meetups}/${routes.drafts}/${meetupId.id}/edit`}
                        className="view-meetup-data-buttons-button-edit"
                      >
                        <span className="material-icons-round">
                          drive_file_rename_outline
                        </span>
                      </LinkComponent>
                      <button
                        className="view-meetup-data-buttons-button-delete"
                        onClick={() => setModalDeleteActive(true)}
                      >
                        Удалить
                      </button>
                    </>
                  )}
                  {authStore.user.roles === UserRoles.CHIEF && (
                    <button
                      className="view-meetup-data-buttons-button-submit"
                      onClick={() => setModalPublishActive(true)}
                    >
                      Опубликовать
                    </button>
                  )}
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
                  {hasUserRights(authStore.user, meetup) && (
                    <>
                      <LinkComponent
                        to={`${routes.meetups}/${routes.future}/${meetupId.id}/edit`}
                        className="view-meetup-data-buttons-button-edit"
                      >
                        <span className="material-icons-round">
                          drive_file_rename_outline
                        </span>
                      </LinkComponent>
                      <button
                        className="view-meetup-data-buttons-button-delete"
                        onClick={() => setModalDeleteActive(true)}
                      >
                        Удалить
                      </button>
                    </>
                  )}

                  {meetupId.id !== undefined &&
                  participantsList !== undefined ? (
                    isParticipating(participantsList, authStore.user.id) ? (
                      <button
                        className="view-meetup-data-buttons-button-participating"
                        onClick={handleStopParticipateInMeetup}
                        disabled={meetupsStore.loadingState}
                      >
                        {meetupsStore.loadingState ? (
                          <Loader
                            type="ThreeDots"
                            color="#00BFFF"
                            height="1rem"
                            width={30}
                          />
                        ) : (
                          <>
                            <span className="material-icons-round">
                              check_circle_outline
                            </span>
                            <span>Иду</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        className="view-meetup-data-buttons-button-not-participating"
                        onClick={handleParticipateInMeetup}
                        disabled={meetupsStore.loadingState}
                      >
                        {meetupsStore.loadingState ? (
                          <Loader
                            type="ThreeDots"
                            color="#00BFFF"
                            height="1rem"
                            width={30}
                          />
                        ) : (
                          <span>Пойду</span>
                        )}
                      </button>
                    )
                  ) : (
                    <div>
                      <Loader
                        type="ThreeDots"
                        color="#00BFFF"
                        height="1rem"
                        width={30}
                      />
                    </div>
                  )}
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
                {hasUserRights(authStore.user, meetup) && (
                  <div className="view-meetup-data-buttons-right">
                    <LinkComponent
                      to={`${routes.meetups}/${routes.past}/${meetupId.id}/edit`}
                      className="view-meetup-data-buttons-button-edit"
                    >
                      <span className="material-icons-round">
                        drive_file_rename_outline
                      </span>
                    </LinkComponent>
                    <button
                      className="view-meetup-data-buttons-button-delete"
                      onClick={() => setModalDeleteActive(true)}
                    >
                      Удалить
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </article>
      </Main>
    </div>
  );
});

export default ViewMeetupPage;
