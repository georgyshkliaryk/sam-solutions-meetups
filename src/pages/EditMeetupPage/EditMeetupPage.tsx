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
import { getBase64 } from "../../helpers/getBase64";
import { IEditedMeetup } from "../../repositories/interfaces/IMeetupsRepository";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import ValidationForInput from "../../components/ValidationForInput/ValidationForInput";
import classNames from "classnames";
import PreviewMeetup from "../../components/PreviewMeetup/PreviewMeetup";

const EditMeetupPage: React.FC = observer((): ReactElement => {
  const navigate = useNavigate();
  const { authStore, meetupsStore } = useContext(StoreContext);
  const meetupId = useParams();
  const [meetup, setMeetup] = useState(
    meetupsStore.meetups.find((m) => m.id === meetupId.id)
  );
  const [previewOpen, setPreviewOpen] = useState(false);

  const [title, setTitle] = useState(meetup?.title);
  const [description, setDescription] = useState(meetup?.description);
  const [place, setPlace] = useState(meetup?.place);
  const [speaker, setSpeaker] = useState(meetup?.speakers[0].name);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [finishDate, setFinishDate] = useState<Date | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState(meetup?.image);

  useEffect(() => {
    return () => {
      meetupsStore.resetErrorState();
    };
  }, []);

  useEffect(() => {
    async function getMeetup() {
      if (meetup === undefined && meetupId.id !== undefined) {
        setMeetup(await meetupsStore.getMeetupById(meetupId.id));
      }
    }
    getMeetup();
  }, [meetupId.id]);

  useEffect(() => {
    if (meetup && meetup.start) {
      setStartDate(new Date(meetup.start));
    }
    if (meetup && meetup.finish) {
      setFinishDate(new Date(meetup.finish));
    }
    if (meetup && meetup.place) {
      setPlace(meetup.place);
    }
    if (meetup && meetup.title) {
      setTitle(meetup.title);
    }
    if (meetup && meetup.description) {
      setDescription(meetup.description);
    }
    if (meetup && meetup.speakers) {
      setSpeaker(meetup.speakers[0].name);
    }
    if (meetup && meetup.image) {
      setImage(meetup.image);
    }
  }, [meetup]);

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

  const handleDeleteImage = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setFile(null);
    if (image) {
      URL.revokeObjectURL(image);
    }
    setImage(undefined);
  };

  const handleEditImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (image) {
      URL.revokeObjectURL(image);
    }
    setFile(e.target.files ? e.target.files[0] : null);
    if (e.target.files !== null) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
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

      if (file !== null) {
        editedData.image = await getBase64(file);
      }
      if (file === null && image === undefined) {
        editedData.image = null;
      }

      await meetupsStore.updateMeetup(editedData);
      navigate(routes.meetups);
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
        {!previewOpen ? (
          <>
            <MainTitle>Редактирование митапа</MainTitle>
            <form onSubmit={handleEditMeetup}>
              <div className="edit-meetup-data">
                <div className="edit-meetup__image-wrapper">
                  <img
                    src={image ?? DefaultImage}
                    alt="Edit meetup"
                    className="edit-meetup__image"
                  />
                  <input
                    type="file"
                    id="editImage"
                    className="edit-meetup__image-input"
                    accept=".png,.jpeg,.jpg"
                    onChange={handleEditImage}
                  />
                  <label
                    htmlFor="editImage"
                    className="edit-meetup__image-label"
                    title="Выбрать фотографию для митапа"
                  >
                    <span className="material-icons-round edit-meetup__image-label-icon">
                      file_upload
                    </span>
                  </label>
                  <button
                    className={classNames("edit-meetup__image-delete", {
                      "edit-meetup__image-delete-visible":
                        file !== null || image,
                    })}
                    title="Удалить фотографию"
                    onClick={handleDeleteImage}
                  >
                    <span className="material-icons-round edit-meetup__image-delete-icon">
                      delete_forever
                    </span>
                  </button>
                </div>
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
                    className={classNames(
                      "edit-meetup-data-item__input",
                      title !== undefined && title.trim() === ""
                        ? "edit-meetup-data-item__input-error"
                        : "edit-meetup-data-item__input-success"
                    )}
                    defaultValue={title}
                    onChange={handleTitleChange}
                  />
                  {title !== undefined && (
                    <ValidationForInput inputData={title} />
                  )}
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
                    defaultValue={place}
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
                    className={classNames(
                      "edit-meetup-data-item__textarea",
                      description !== undefined && description.trim() === ""
                        ? "edit-meetup-data-item__input-error"
                        : "edit-meetup-data-item__input-success"
                    )}
                    cols={30}
                    rows={10}
                    defaultValue={description}
                    onChange={handleDescriptionChange}
                  ></textarea>
                  {description !== undefined && (
                    <ValidationForInput inputData={description} />
                  )}
                </div>
              </div>
              <div className="edit-meetup-data-buttons">
                <button
                  className="edit-meetup-data-buttons-button-back"
                  onClick={() => navigate(routes.meetups)}
                >
                  Отмена
                </button>
                <div className="edit-meetup-data-buttons-right">
                  <button
                    disabled={
                      title?.trim() === "" || description?.trim() === ""
                    }
                    className="edit-meetup-data-buttons-button-preview"
                    onClick={() => setPreviewOpen(true)}
                  >
                    Предпросмотр
                  </button>
                  <button
                    disabled={
                      title?.trim() === "" || description?.trim() === ""
                    }
                    type="submit"
                    className="edit-meetup-data-buttons-button-submit"
                  >
                    Сохранить
                  </button>
                </div>
              </div>
            </form>
          </>
        ) : (
          <PreviewMeetup
            title={title ?? meetup.title}
            description={description ?? meetup.description}
            speaker={speaker ?? meetup.speakers[0].name}
            start={startDate?.toISOString() ?? meetup.start}
            finish={finishDate?.toISOString() ?? meetup.finish}
            place={place ?? meetup.place}
            image={image}
          >
            <div className="edit-meetup-data-buttons">
              <button
                className="edit-meetup-data-buttons-button-back"
                onClick={() => setPreviewOpen(false)}
              >
                Назад
              </button>
              <div className="edit-meetup-data-buttons-right">
                <button
                  onClick={handleEditMeetup}
                  disabled={title?.trim() === "" || description?.trim() === ""}
                  className="edit-meetup-data-buttons-button-submit"
                >
                  Опубликовать
                </button>
              </div>
            </div>
          </PreviewMeetup>
        )}
      </Main>
    </div>
  );
});

export default EditMeetupPage;
