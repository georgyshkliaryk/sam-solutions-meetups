import { observer } from "mobx-react-lite";
import React, { ReactElement, useContext, useEffect, useState } from "react";
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
  const [requiredFilled, setRequiredFilled] = useState(false);
  const [requiredTabOpen, setRequiredTabOpen] = useState(true);
  const [title, setTitle] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (
      title.trim() === "" ||
      speaker.trim() === "" ||
      description.trim() === ""
    ) {
      setRequiredFilled(false);
    } else {
      setRequiredFilled(true);
    }
  }, [description, speaker, title]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSpeakerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpeaker(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

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
        <nav className="create-meetup-nav">
          <p
            className="create-meetup-nav-item"
            onClick={() => setRequiredTabOpen(true)}
          >
            Обязательные поля
          </p>
          <p
            className="create-meetup-nav-item"
            onClick={() => {
              if (requiredFilled) {
                setRequiredTabOpen(false);
              }
            }}
          >
            Дополнительные поля
          </p>
        </nav>
        <MainTitle>Новый митап</MainTitle>
        <p className="create-meetup__description">
          Заполните необходимые поля ниже наиболее подробно, это даст полную
          информации о предстоящем событии.
        </p>
        {requiredTabOpen ? (
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
                  onChange={handleTitleChange}
                  value={title}
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
                  onChange={handleSpeakerChange}
                  value={speaker}
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
                  onChange={handleDescriptionChange}
                  value={description}
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
                <button
                  className="create-meetup-data-buttons-button-submit"
                  disabled={!requiredFilled}
                  onClick={() => setRequiredTabOpen(false)}
                >
                  Далее
                </button>
              </div>
            </div>
          </article>
        ) : (
          <article className="create-meetup-data">
            <div className="create-meetup-data-content">
              <div className="create-meetup-data-content-input-wrapper create-meetup-data-content-input-date">
                <div className="create-meetup-data-content-input-wrapper-date">
                  <label
                    htmlFor="createDateStart"
                    className="create-meetup-data-content__label"
                  >
                    Начало
                  </label>
                  <input
                    type="date"
                    className="create-meetup-data-content__input"
                    id="createDateStart"
                  />
                </div>
                <div className="create-meetup-data-content-input-wrapper-date">
                  <label
                    htmlFor="createDateEnd"
                    className="create-meetup-data-content__label"
                  >
                    Конец
                  </label>
                  <input
                    type="date"
                    className="create-meetup-data-content__input"
                    id="createDateEnd"
                  />
                </div>
              </div>
              <div className="create-meetup-data-content-input-wrapper">
                <label
                  htmlFor="createPlace"
                  className="create-meetup-data-content__label"
                >
                  Место проведения
                </label>
                <input
                  type="text"
                  className="create-meetup-data-content__input"
                  id="createPlace"
                />
              </div>
              <div className="create-meetup-data-content-dragndrop">
                Перетащите изображения сюда или загрузите
              </div>
            </div>
            <div className="create-meetup-data-buttons">
              <button
                className="create-meetup-data-buttons-button-back"
                onClick={() => setRequiredTabOpen(true)}
              >
                Назад
              </button>
              <div className="create-meetup-data-buttons-right">
                <button className="create-meetup-data-buttons-button-submit">
                  Создать
                </button>
              </div>
            </div>
          </article>
        )}
      </Main>
    </div>
  );
});

export default CreateMeetupPage;
