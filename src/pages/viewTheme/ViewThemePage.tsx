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
import { navItems, routes, UserRoles } from "../../constants";
import { StoreContext } from "../../context/StoreContext";
import { IParticipant } from "../../repositories/interfaces/INetworkRepository";
import "./ViewThemePage.scss";
import Loader from "react-loader-spinner";
import { hasUserRights } from "../../helpers/hasUserRights";
import { IMeetup } from "../../repositories/interfaces/IMeetupsRepository";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import { useTranslation } from "react-i18next";

const ViewThemePage: React.FC = observer((): ReactElement => {
  const { t } = useTranslation();

  const { authStore, meetupsStore } = useContext(StoreContext);
  const navigate = useNavigate();
  const themeId = useParams();
  const [meetup, setMeetup] = useState<IMeetup | undefined>(undefined);
  const [modalDeleteActive, setModalDeleteActive] = useState<boolean>(false);
  const [modalApproveActive, setModalApproveActive] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      meetupsStore.resetErrorState();
    };
  }, []);

  useEffect(() => {
    async function getMeetup() {
      if (themeId.id !== undefined) {
        setMeetup(await meetupsStore.getMeetupById(themeId.id));
        await meetupsStore.fetchVotedUsers(themeId.id);
      }
    }
    if (themeId.id) {
      getMeetup();
    }
  }, [meetupsStore, themeId.id]);

  if (authStore.user === undefined) {
    return <Navigate to={routes.login} />;
  }

  if (meetupsStore.errorState === true) {
    //alert("Theme not found!");
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

  const approveTheme = async () => {
    await meetupsStore.approveTheme(meetup.id);
    navigate(routes.themes);
  };

  const handleDeleteTheme = () => {
    meetupsStore.deleteMeetup(meetup.id);
    navigate(routes.meetups);
  };

  let voted = undefined;
  if (themeId.id !== undefined) {
    voted = meetupsStore.votedUsersMap.get(themeId.id);
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
        <MainTitle>{t("pageTitles.viewTheme")}</MainTitle>
        <article className="view-theme-data">
          <div className="view-theme-data-item">
            <p className="view-theme-data-label">{t("inputLabels.title")}</p>
            <p className="view-theme-data-content view-theme-data-content__title">
              {meetup.title}
            </p>
          </div>
          <div className="view-theme-data-item">
            <p className="view-theme-data-label">{t("inputLabels.author")}</p>
            <div className="view-theme-data-content">
              {meetup && (
                <Avatar
                  className="view-theme-data-content-avatar"
                  user={{
                    name: meetup.authorName,
                    surname: meetup.authorSurname,
                  }}
                />
              )}
              <span>{`${meetup.authorName} ${meetup.authorSurname}`}</span>
            </div>
          </div>
          <div className="view-theme-data-item">
            <p className="view-theme-data-label">
              {t("inputLabels.description")}
            </p>
            <div className="view-theme-data-content view-theme-data-content__description">
              {meetup.description}
            </div>
          </div>
          <div className="view-theme-data-item">
            <p className="view-theme-data-label">
              {t("inputLabels.supporters")}
            </p>

            {voted !== undefined && voted.length !== 0 ? (
              <div className="view-theme-data-content">
                {voted.slice(0, 10).map((p: IParticipant, i: number) => (
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
                {voted.length > 10 && (
                  <div className="view-theme-data-content-avatar-rest">
                    +{voted.length - 10}
                  </div>
                )}
              </div>
            ) : voted !== undefined && voted.length === 0 ? (
              <div className="view-theme-data-content">
                <i>{t("fillers.noSupporters")}</i>
              </div>
            ) : (
              <div className="view-theme-data-content">
                <Loader
                  type="ThreeDots"
                  color="#00BFFF"
                  height={30}
                  width={30}
                />
                <Loader
                  type="ThreeDots"
                  color="#00BFFF"
                  height={30}
                  width={30}
                />
                <Loader
                  type="ThreeDots"
                  color="#00BFFF"
                  height={30}
                  width={30}
                />
              </div>
            )}
          </div>
          <ModalWindow
            active={modalDeleteActive}
            setActive={setModalDeleteActive}
            title="Удалить тему?"
          >
            <button
              className="view-theme-modal-buttons__delete"
              onClick={handleDeleteTheme}
            >
              Удалить
            </button>
            <button
              className="view-theme-modal-buttons__cancel"
              onClick={() => setModalDeleteActive(false)}
            >
              Отмена
            </button>
          </ModalWindow>
          <ModalWindow
            active={modalApproveActive}
            setActive={setModalApproveActive}
            title="Одобрить тему?"
          >
            <button
              className="view-theme-modal-buttons__approve"
              onClick={approveTheme}
              data-cy="view-theme-modal-button-approve"
            >
              Одобрить
            </button>
            <button
              className="view-theme-modal-buttons__cancel"
              onClick={() => setModalApproveActive(false)}
            >
              Отмена
            </button>
          </ModalWindow>
          <div className="view-theme-data-item view-theme-data-item-last">
            <div className="view-theme-data-buttons">
              <LinkComponent
                className="view-theme-data-buttons-button-back"
                to={`${routes.meetups}`}
              >
                {t("buttons.meetupPageButtons.goBack")}
              </LinkComponent>
              <div className="view-theme-data-buttons-right">
                {hasUserRights(authStore.user, meetup) && (
                  <button
                    className="view-theme-data-buttons-button-delete"
                    onClick={() => setModalDeleteActive(true)}
                  >
                    {t("buttons.meetupPageButtons.deleteMeetup")}
                  </button>
                )}
                {authStore.user.roles === UserRoles.CHIEF && (
                  <button
                    className="view-theme-data-buttons-button-submit"
                    onClick={() => setModalApproveActive(true)}
                    data-cy="view-theme-button-approve"
                  >
                    {t("buttons.meetupPageButtons.approveTheme")}
                  </button>
                )}
              </div>
            </div>
          </div>
        </article>
      </Main>
    </div>
  );
});

export default ViewThemePage;
