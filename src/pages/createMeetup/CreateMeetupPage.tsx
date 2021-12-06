import { observer } from "mobx-react-lite";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import Header from "../../components/header/Header/Header";
import HeaderNavbar from "../../components/header/HeaderNavbar/HeaderNavbar";
import HeaderProfile from "../../components/header/HeaderProfile/HeaderProfile";
import LinkComponent from "../../components/LinkComponent/LinkComponent";
import LogoSam from "../../components/LogoSam/LogoSam";
import Main from "../../components/main/Main/Main";
import MainTitle from "../../components/main/MainTitle/MainTitle";
import {
  fileMaxSize,
  imageTypesRegex,
  navItems,
  routes,
} from "../../constants";
import { StoreContext } from "../../context/StoreContext";
import "./CreateMeetupPage.scss";
import DropZoneIcon from "./assets/dropzone-icon.svg";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { INewMeetup } from "../../repositories/interfaces/IMeetupsRepository";
import { getBase64 } from "../../helpers/getBase64";
import { useDropzone } from "react-dropzone";
import classNames from "classnames";

const CreateMeetupPage: React.FC = observer((): ReactElement => {
  const navigate = useNavigate();
  const { authStore, meetupsStore } = useContext(StoreContext);
  const [requiredFilled, setRequiredFilled] = useState(false);
  const [requiredTabOpen, setRequiredTabOpen] = useState(true);
  const [title, setTitle] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [finishDate, setFinishDate] = useState<Date | null>(null);
  const [place, setPlace] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [urlImage, setUrlImage] = useState("");
  const [maxSizeError, setMaxSizeError] = useState(false);
  const { getRootProps, isDragActive, fileRejections, isDragReject } =
    useDropzone({
      accept: "image/jpeg, image/png, image/jpg",
      onDrop: (acceptedFiles: File[]) => {
        if (!isDragReject) {
          setFile(acceptedFiles[0]);
          URL.revokeObjectURL(urlImage);
          setUrlImage(URL.createObjectURL(acceptedFiles[0]));
        }
      },
      maxFiles: 1,
    });

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

  useEffect(() => {
    if (fileRejections.length > 0) {
      setMaxSizeError(true);
    } else if (file !== null && file.size > fileMaxSize) {
      setMaxSizeError(true);
    } else {
      setMaxSizeError(false);
    }
  }, [file, fileRejections.length]);

  if (authStore.user === undefined) {
    return <Navigate to={routes.login} />;
  }

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

  const handleResetFile = () => {
    setFile(null);
    if (urlImage !== "") {
      URL.revokeObjectURL(urlImage);
      setUrlImage("");
    }
  };

  const handleCreateMeetup = async (event: React.FormEvent) => {
    event.preventDefault();
    if (authStore.user === undefined) {
      navigate(routes.meetups);
    } else {
      const meetupData: INewMeetup = {
        authorId: authStore.user.id,
        authorName: authStore.user.name,
        authorSurname: authStore.user.surname,
        speakers: [
          {
            name: speaker,
            surname: speaker,
          },
        ],
        title,
        description,
      };
      if (place !== "") {
        meetupData.place = place;
      }
      if (startDate !== null) {
        meetupData.start = startDate.toISOString();
      }
      if (finishDate !== null) {
        meetupData.start = finishDate.toISOString();
      }
      if (file !== null) {
        const imageBase64 = await getBase64(file);
        if (typeof imageBase64 === "string" && imageBase64 !== undefined) {
          meetupData.image = imageBase64;
        }
      }

      await meetupsStore.createNewMeetup(meetupData);
      navigate(routes.meetups);
    }
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
            <span
              className={classNames("create-meetup-nav-item__icon", {
                "create-meetup-nav-item__icon-success": requiredFilled,
              })}
            >
              {requiredTabOpen ? (
                "1"
              ) : (
                <span className="material-icons-outlined create-meetup-nav-item__icon-success-tick">
                  done
                </span>
              )}
            </span>
            Обязательные поля
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
                              new Date().setMinutes(
                                new Date().getMinutes() + 30
                              )
                            )
                          : new Date(new Date().setHours(0, 30))
                      }
                      maxTime={new Date(new Date().setHours(23, 59))}
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
                {file !== null &&
                !isDragReject &&
                !maxSizeError &&
                imageTypesRegex.test(file.type) ? (
                  <div className="create-meetup-data-content-uploaded-image">
                    <p className="create-meetup-data-content__label">
                      Загруженные изображения
                    </p>
                    <div className="create-meetup-data-content-uploaded-image-icon">
                      <span className="material-icons-outlined create-meetup-data-content-uploaded-image-icon__image">
                        image
                      </span>
                      <div className="create-meetup-data-content-uploaded-image-icon-text">
                        <p>{file.name}</p>
                        <p className="create-meetup-data-content-uploaded-image-icon-text-filesize">
                          Размер файла: {(file.size / (1024 * 1024)).toFixed(2)}{" "}
                          Mb{" "}
                        </p>
                      </div>
                      <button
                        className="material-icons-outlined create-meetup-data-content-uploaded-image-icon-text-delete"
                        onClick={handleResetFile}
                      >
                        close
                      </button>
                    </div>
                    <img
                      src={urlImage}
                      alt="preview"
                      className="create-meetup-data-content-uploaded-image-pic"
                    />
                  </div>
                ) : (
                  <div
                    {...getRootProps({
                      className: classNames(
                        "create-meetup-data-content-dragndrop",
                        {
                          "create-meetup-data-content-dragndrop-active":
                            isDragActive,
                        }
                      ),
                    })}
                  >
                    <img
                      src={DropZoneIcon}
                      alt="Drop zone"
                      className="create-meetup-data-content-dragndrop-icon"
                    />
                    Перетащите изображение сюда или{" "}
                    <label
                      htmlFor="image-upload"
                      className="create-meetup-data-content-dragndrop__label"
                    >
                      загрузите
                    </label>
                    &nbsp;(.jpeg, .png, .jpg)
                    <input
                      type="file"
                      id="image-upload"
                      accept=".png,.jpeg,.jpg"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFile(e.target.files ? e.target.files[0] : null);
                        if (e.target.files !== null) {
                          setUrlImage(URL.createObjectURL(e.target.files[0]));
                        }
                      }}
                      style={{ display: "none" }}
                    />
                    <p
                      className={
                        maxSizeError
                          ? "create-meetup-data-content-dragndrop__error-visible"
                          : "create-meetup-data-content-dragndrop__error-hidden"
                      }
                    >
                      Максимальный размер файла: 1 Mb <br />
                      Разрешенные форматы: .png .jpg .jpeg
                    </p>
                  </div>
                )}
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
