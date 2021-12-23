import React, { ReactElement } from "react";
import MainTitle from "../main/MainTitle/MainTitle";
import "./PreviewMeetup.scss";
import MeetupDefaultImage from "../../pages/viewMeetup/assets/MeetupDefaultImage.svg";
import dateFormat from "dateformat";
import Avatar from "../Avatar/Avatar";
import { useTranslation } from "react-i18next";

interface IProps {
  title: string;
  description: string;
  start?: string;
  finish?: string;
  place?: string;
  speaker?: string;
  image?: string | null;
}

const PreviewMeetup: React.FC<IProps> = (props): ReactElement => {
  const { t } = useTranslation();

  return (
    <>
      <MainTitle>{t("pageTitles.previewMeetup")}</MainTitle>
      <article className="preview-meetup-data">
        <div className="preview-meetup-data-item">
          <img
            className="preview-meetup-data-item__image"
            src={props.image ?? MeetupDefaultImage}
            alt="Meetup cover"
          />
          <p className="preview-meetup-data-content preview-meetup-data-content__title">
            {props.title}
          </p>
        </div>
        <div className="preview-meetup-data-item">
          <p className="preview-meetup-data-label">
            {t("inputLabels.timeAndPlace")}
          </p>
          <div className="preview-meetup-data-content preview-meetup-data-content-schedule">
            {props.start && (
              <>
                <p className="preview-meetup-data-content-schedule__item">
                  <span className="material-icons-round preview-meetup-data-content-schedule__item-icon">
                    calendar_today
                  </span>
                  <time dateTime={props.start}>
                    {dateFormat(props.start, "dddd, d mmmm yyyy")}
                  </time>
                </p>
                {props.finish ? (
                  <p className="preview-meetup-data-content-schedule__item">
                    <span className="material-icons-round preview-meetup-data-content-schedule__item-icon">
                      schedule
                    </span>
                    <time dateTime={props.start}>
                      {dateFormat(props.start, "H:MM")}
                    </time>
                    &nbsp;–&nbsp;
                    <time dateTime={props.finish}>
                      {dateFormat(props.finish, "H:MM")}
                    </time>
                  </p>
                ) : (
                  <p className="preview-meetup-data-content-schedule__item">
                    <span className="material-icons-round preview-meetup-data-content-schedule__item-icon">
                      schedule
                    </span>
                    <span>{dateFormat(props.start, "H:MM")}</span>
                  </p>
                )}
              </>
            )}
            {props.place && (
              <p className="preview-meetup-data-content-schedule__item">
                <span className="material-icons-round preview-meetup-data-content-schedule__item-icon">
                  place
                </span>
                <span>{props.place}</span>
              </p>
            )}
          </div>
        </div>
        <div className="preview-meetup-data-item">
          <p className="preview-meetup-data-label">
            {t("inputLabels.speaker")}
          </p>
          <div className="preview-meetup-data-content">
            {props.speaker && (
              <Avatar
                className="preview-meetup-data-content-avatar"
                user={{
                  name: props.speaker,
                  surname: props.speaker,
                }}
              />
            )}
            <span>{`${props.speaker}`}</span>
          </div>
        </div>
        <div className="preview-meetup-data-item">
          <p className="preview-meetup-data-label">
            {t("inputLabels.description")}
          </p>
          <div className="preview-meetup-data-content preview-meetup-data-content__description">
            {props.description}
          </div>
        </div>
        {props.children}
      </article>
    </>
  );
};

export default PreviewMeetup;
