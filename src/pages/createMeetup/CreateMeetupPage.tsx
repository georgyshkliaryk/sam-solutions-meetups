import { observer } from "mobx-react-lite";
import React, { ReactElement, useContext } from "react";
import { Navigate } from "react-router";
import Header from "../../components/header/Header/Header";
import HeaderNavbar from "../../components/header/HeaderNavbar/HeaderNavbar";
import HeaderProfile from "../../components/header/HeaderProfile/HeaderProfile";
import LinkComponent from "../../components/LinkComponent/LinkComponent";
import LogoSam from "../../components/LogoSam/LogoSam";
import Main from "../../components/main/Main/Main";
import MainTitle from "../../components/main/MainTitle/MainTitle";
import { navItems, routes } from "../../constants";
import { StoreContext } from "../../context/StoreContext";
import "./CreateMeetupPage.scss";

const CreateMeetupPage: React.FC = observer((): ReactElement => {
  const { authStore } = useContext(StoreContext);

  if (authStore.user === undefined) {
    return <Navigate to={routes.login} />;
  }

  return (
    <div className="create-meetup">
      <Header className="create-meetup__header">
        <LinkComponent to={routes.meetups}>
          <LogoSam className="create-meetup__header-logo" />
        </LinkComponent>
        <HeaderNavbar items={navItems.header} />
        <HeaderProfile user={authStore.user} />
      </Header>
      <Main>
        <MainTitle>Новый митап</MainTitle>
        <p className="create-meetup__description">
          Заполните необходимые поля ниже наиболее подробно, это даст полную
          информации о предстоящем событии.
        </p>
        <article className="create-meetup-data">
          <div className="create-meetup-data-content">
            <div className="create-meetup-data-content-input-wrapper">
              <label
                htmlFor="createTitle"
                className="create-meetup-data-content__label"
              >
                Название
              </label>
              <input
                type="text"
                className="create-meetup-data-content__input"
                id="createTitle"
              />
            </div>
            <div className="create-meetup-data-content-input-wrapper">
              <label
                htmlFor="createSpeaker"
                className="create-meetup-data-content__label"
              >
                Спикер
              </label>
              <input
                type="text"
                className="create-meetup-data-content__input"
                id="createSpeaker"
              />
            </div>
            <div className="create-meetup-data-content-input-wrapper">
              <label
                htmlFor="createDescription"
                className="create-meetup-data-content__label"
              >
                Описание
              </label>
              <textarea
                className="create-meetup-data-content__textarea"
                name="createDescription"
                id="createDescription"
                cols={30}
                rows={10}
              ></textarea>
            </div>
          </div>
          <div className="create-meetup-data-buttons">
            <LinkComponent
              className="create-meetup-data-buttons-button-back"
              to={routes.meetups}
            >
              Назад
            </LinkComponent>
            <div className="create-meetup-data-buttons-right">
              <button className="create-meetup-data-buttons-button-submit">
                Далее
              </button>
            </div>
          </div>
        </article>
      </Main>
    </div>
  );
});

export default CreateMeetupPage;
