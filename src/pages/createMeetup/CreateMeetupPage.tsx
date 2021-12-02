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

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateMeetupPage: React.FC = observer((): ReactElement => {
  const { authStore } = useContext(StoreContext);
  const [requiredFilled, setRequiredFilled] = useState(false);
  const [requiredTabOpen, setRequiredTabOpen] = useState(true);
  const [title, setTitle] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [finishDate, setFinishDate] = useState(startDate);
  const [place, setPlace] = useState("");

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

  const handlePlaceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlace(event.target.value);
  };

  const handleClickNext = (event: React.FormEvent) => {
    event.preventDefault();
    setRequiredTabOpen(false);
  };

  const handleCreateMeetup = (event: React.FormEvent) => {
    event.preventDefault();
    const meetupObj = {
      title,
      description,
      speaker,
      start: startDate,
      finish: finishDate,
      place,
      authorName: authStore.user?.name,
      authorSurname: authStore.user?.surname,
    };
    console.log(meetupObj);
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
        <fieldset className="create-meetup-nav">
          <input
            type="radio"
            id="requiredTab"
            name="createMeetupTabs"
            className="create-meetup-nav-radio"
            checked={requiredTabOpen}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.checked) {
                setRequiredTabOpen(true);
              } else {
                setRequiredTabOpen(false);
              }
            }}
          />
          <label className="create-meetup-nav-item" htmlFor="requiredTab">
            <span className="create-meetup-nav-item__icon">1</span>Обязательные
            поля
          </label>
          <input
            type="radio"
            id="extraTab"
            name="createMeetupTabs"
            disabled={!requiredFilled}
            className="create-meetup-nav-radio"
            checked={!requiredTabOpen}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.checked) {
                setRequiredTabOpen(false);
              } else {
                setRequiredTabOpen(true);
              }
            }}
          />
          <label className="create-meetup-nav-item" htmlFor="extraTab">
            <span className="create-meetup-nav-item__icon">2</span>
            Дополнительные поля
          </label>
        </fieldset>
        <MainTitle>Новый митап</MainTitle>
        <p className="create-meetup__description">
          Заполните необходимые поля ниже наиболее подробно, это даст полную
          информацию о предстоящем событии.
        </p>
        <form className="create-meetup-data" onSubmit={handleCreateMeetup}>
          {requiredTabOpen ? (
            <>
              <fieldset className="create-meetup-data-content">
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
              </fieldset>
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
                    onClick={handleClickNext}
                  >
                    Далее
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <fieldset className="create-meetup-data-content">
                <div className="create-meetup-data-content-input-wrapper create-meetup-data-content-input-date">
                  <div className="create-meetup-data-content-input-wrapper-date">
                    <label
                      htmlFor="createDateStart"
                      className="create-meetup-data-content__label"
                    >
                      Начало
                    </label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date: Date) => {
                        setStartDate(date);
                        setFinishDate(date);
                      }}
                      showTimeSelect
                      minDate={new Date()}
                      minTime={
                        new Date().getDate() === startDate.getDate()
                          ? new Date()
                          : new Date(new Date().setHours(0, 0))
                      }
                      maxTime={new Date(new Date().setHours(23, 30))}
                      dateFormat="dd.MM.yyyy HH:mm"
                      timeFormat="HH:mm"
                      className="create-meetup-data-content__input"
                    />
                  </div>
                  <div className="create-meetup-data-content-input-wrapper-date">
                    <label
                      htmlFor="createDateEnd"
                      className="create-meetup-data-content__label"
                    >
                      Конец
                    </label>
                    <DatePicker
                      selected={finishDate}
                      onChange={(date: Date) => setFinishDate(date)}
                      minDate={startDate}
                      minTime={
                        finishDate.getDate() === startDate.getDate()
                          ? startDate
                          : new Date(new Date().setHours(0, 0))
                      }
                      maxTime={new Date(new Date().setHours(23, 30))}
                      showTimeSelect
                      dateFormat="dd.MM.yyyy HH:mm"
                      timeFormat="HH:mm"
                      className="create-meetup-data-content__input"
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
                    onChange={handlePlaceChange}
                    value={place}
                  />
                </div>
                <div className="create-meetup-data-content-dragndrop">
                  Перетащите изображения сюда или загрузите
                </div>
              </fieldset>
              <div className="create-meetup-data-buttons">
                <button
                  className="create-meetup-data-buttons-button-back"
                  onClick={() => setRequiredTabOpen(true)}
                >
                  Назад
                </button>
                <div className="create-meetup-data-buttons-right">
                  <button
                    type="submit"
                    className="create-meetup-data-buttons-button-submit"
                  >
                    Создать
                  </button>
                </div>
              </div>
            </>
          )}
        </form>
      </Main>
    </div>
  );
});

export default CreateMeetupPage;
