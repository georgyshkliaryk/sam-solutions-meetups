import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import Header from "../../components/header/Header/Header";
import HeaderNavbar from "../../components/header/HeaderNavbar/HeaderNavbar";
import HeaderProfile from "../../components/header/HeaderProfile/HeaderProfile";
import LinkComponent from "../../components/LinkComponent/LinkComponent";
import LogoSam from "../../components/LogoSam/LogoSam";
import Main from "../../components/main/Main/Main";
import MainTitle from "../../components/main/MainTitle/MainTitle";
import { navItems, routes } from "../../constants";
import { StoreContext } from "../../context/StoreContext";
import "./EditMeetupPage.scss";
import DefaultImage from "./assets/EditDefaultImage.svg";
import Loader from "react-loader-spinner";
import { NetworkRepository } from "../../repositories/NetworkRepository/NetworkRepository";

const EditMeetupPage: React.FC = (): ReactElement => {
  const networkRepository = new NetworkRepository();
  const { authStore, meetupsStore } = useContext(StoreContext);
  const meetupId = useParams();

  useEffect(() => {
    return () => {
      meetupsStore.resetErrorState();
    };
  });

  useEffect(() => {
    if (meetupId.id) {
      meetupsStore.getMeetupById(meetupId.id);
    }
  }, [meetupsStore, meetupId.id]);

  const currentMeetup = meetupsStore.current;

  const [title, setTitle] = useState(currentMeetup?.title);
  const [description, setDescription] = useState(currentMeetup?.description);
  const [place, setPlace] = useState(currentMeetup?.place);

  if (meetupsStore.errorState === true) {
    //alert("Meetup not found!");
    return <Navigate to={routes.login} />;
  }

  if (authStore.user === undefined) {
    return <Navigate to={routes.login} />;
  }

  if (currentMeetup === undefined) {
    return (
      <div className="edit-meetup">
        <Header className="edit-meetup__header">
          <LinkComponent to={routes.meetups}>
            <LogoSam className="edit-meetup__header-logo" />
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

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handlePlaceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlace(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleEditMeetup = async (event: React.FormEvent) => {
    event.preventDefault();
    const editedData = {
      id: meetupId.id,
      subject: title,
      excerpt: description,
      place,
    };

    await networkRepository.editMeetup(editedData);
  };

  return (
    <div className="edit-meetup">
      <Header className="edit-meetup__header">
        <LinkComponent to={routes.meetups}>
          <LogoSam className="edit-meetup__header-logo" />
        </LinkComponent>
        <HeaderNavbar items={navItems.header} />
        <HeaderProfile user={authStore.user} />
      </Header>
      <Main>
        <MainTitle>Редактирование митапа</MainTitle>
        <form onSubmit={handleEditMeetup}>
          <div className="edit-meetup-data">
            <img
              src={DefaultImage}
              alt="Edit meetup"
              className="edit-meetup__image"
            />
            <div className="edit-meetup-data-item">
              <label
                htmlFor="editTitle"
                className="edit-meetup-data-item__label"
              >
                Тема
              </label>
              <input
                type="text"
                id="editTitle"
                className="edit-meetup-data-item__input"
                defaultValue={currentMeetup.title}
                onChange={handleTitleChange}
              />
            </div>
            <fieldset className="edit-meetup-data-item-date">
              <div className="edit-meetup-data-item-date-item">
                <label
                  htmlFor="editStartDate"
                  className="edit-meetup-data-item__label"
                >
                  Начало
                </label>
                <input
                  type="date"
                  id="editStartDate"
                  className="edit-meetup-data-item__input"
                />
              </div>
              <div className="edit-meetup-data-item-date-item">
                <label
                  htmlFor="editEndDate"
                  className="edit-meetup-data-item__label"
                >
                  Окончание
                </label>
                <input
                  type="date"
                  id="editEndDate"
                  className="edit-meetup-data-item__input"
                />
              </div>
            </fieldset>
            <div className="edit-meetup-data-item">
              <label
                htmlFor="editPlace"
                className="edit-meetup-data-item__label"
              >
                Место проведения
              </label>
              <input
                type="text"
                id="editPlace"
                className="edit-meetup-data-item__input"
                defaultValue={currentMeetup.place}
                onChange={handlePlaceChange}
              />
            </div>
            <div className="edit-meetup-data-item">
              <label
                htmlFor="editSpeaker"
                className="edit-meetup-data-item__label"
              >
                Спикер
              </label>
              <input
                type="text"
                id="editSpeaker"
                className="edit-meetup-data-item__input"
              />
            </div>
            <div className="edit-meetup-data-item">
              <label
                htmlFor="editDescription"
                className="edit-meetup-data-item__label"
              >
                Описание
              </label>
              <textarea
                name="editDescription"
                id="editDescription"
                className="edit-meetup-data-item__textarea"
                cols={30}
                rows={10}
                defaultValue={currentMeetup.description}
                onChange={handleDescriptionChange}
              ></textarea>
            </div>
          </div>
          <div className="edit-meetup-data-buttons">
            <button className="edit-meetup-data-buttons-button-back">
              Назад
            </button>
            <div className="edit-meetup-data-buttons-right">
              <button
                type="submit"
                className="edit-meetup-data-buttons-button-preview"
              >
                Предпросмотр
              </button>
              <button
                type="submit"
                className="edit-meetup-data-buttons-button-submit"
              >
                Сохранить
              </button>
            </div>
          </div>
        </form>
      </Main>
    </div>
  );
};

export default EditMeetupPage;
