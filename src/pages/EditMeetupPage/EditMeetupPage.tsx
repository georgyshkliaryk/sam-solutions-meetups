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
import DatePicker from "react-datepicker";
import {
  IEditedMeetup,
  IMeetup,
} from "../../repositories/interfaces/IMeetupsRepository";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

const EditMeetupPage: React.FC = observer((): ReactElement => {
  const navigate = useNavigate();
  const { authStore, meetupsStore } = useContext(StoreContext);
  const meetupId = useParams();
  const [meetup, setMeetup] = useState<IMeetup | undefined>(undefined);

  console.log(meetup?.start);

  useEffect(() => {
    return () => {
      meetupsStore.resetErrorState();
    };
  }, []);

  useEffect(() => {
    async function getMeetup() {
      setMeetup(await meetupsStore.getMeetupById(meetupId.id));
    }
    if (meetupId.id) {
      meetupsStore.getParticipantsList(meetupId.id);
      getMeetup();
    }
  }, [meetupsStore, meetupId.id]);

  const [title, setTitle] = useState(meetup?.title);
  const [description, setDescription] = useState(meetup?.description);
  const [place, setPlace] = useState(meetup?.place);
  const [speaker, setSpeaker] = useState(meetup?.speakers[0].name);
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(meetup?.start || 0)
  );
  const [finishDate, setFinishDate] = useState<Date | null>(
    new Date(meetup?.finish || 0)
  );

  if (authStore.user === undefined) {
    return <Navigate to={routes.login} />;
  }

  if (meetupsStore.errorState === true) {
    //alert("Meetup not found!");
    return <Navigate to={routes.login} />;
  }

  if (meetup === undefined) {
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
    if (meetupId.id !== undefined) {
      const editedData: IEditedMeetup = {
        id: meetupId.id,
        place,
      };

      if (title !== undefined) {
        editedData.title = title;
      }
      if (description !== undefined) {
        editedData.description = description;
      }

      if (startDate !== null) {
        editedData.start = startDate.toISOString();
      } else {
        editedData.start = null;
      }
      if (finishDate !== null) {
        editedData.finish = finishDate.toISOString();
      } else {
        editedData.finish = null;
      }

      await meetupsStore.editMeetup(editedData);
      navigate(routes.meetups);
      console.log(editedData);
    }
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
                defaultValue={meetup.title}
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
                <DatePicker
                  id="editStartDate"
                  onFocus={(e) => e.target.blur()}
                  isClearable
                  selected={startDate}
                  onChange={(date: Date) => {
                    setStartDate(date);
                    setFinishDate(null);
                  }}
                  showTimeSelect
                  minDate={new Date()}
                  minTime={
                    startDate !== null &&
                    new Date().getDate() === startDate.getDate()
                      ? new Date(
                          new Date().setMinutes(new Date().getMinutes() + 30)
                        )
                      : new Date(new Date().setHours(0, 30))
                  }
                  maxTime={new Date(new Date().setHours(23, 59))}
                  dateFormat="dd.MM.yyyy HH:mm"
                  timeFormat="HH:mm"
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
                <DatePicker
                  id="editEndDate"
                  isClearable
                  onFocus={(e) => e.target.blur()}
                  disabled={startDate === null}
                  selected={finishDate}
                  onChange={(date: Date) => setFinishDate(date)}
                  minDate={startDate}
                  minTime={
                    startDate !== null &&
                    finishDate !== null &&
                    finishDate.getDate() === startDate.getDate()
                      ? startDate
                      : new Date(new Date().setHours(0, 0))
                  }
                  maxTime={new Date(new Date().setHours(23, 59))}
                  showTimeSelect
                  dateFormat="dd.MM.yyyy HH:mm"
                  timeFormat="HH:mm"
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
                defaultValue={meetup.place}
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
                defaultValue={speaker}
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
                defaultValue={meetup.description}
                onChange={handleDescriptionChange}
              ></textarea>
            </div>
          </div>
          <div className="edit-meetup-data-buttons">
            <button
              className="edit-meetup-data-buttons-button-back"
              // onClick={() => navigate(-1)}
            >
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
});

export default EditMeetupPage;
