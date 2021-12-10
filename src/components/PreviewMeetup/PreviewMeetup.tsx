import React, { ReactElement } from "react";
import { IMeetup } from "../../repositories/interfaces/IMeetupsRepository";
import MainTitle from "../main/MainTitle/MainTitle";
import "./PreviewMeetup.scss";
import MeetupDefaultImage from "../../pages/viewMeetup/assets/MeetupDefaultImage.svg";
import dateFormat from "dateformat";
import Avatar from "../Avatar/Avatar";
import { ISpeaker } from "../../repositories/interfaces/INetworkRepository";

interface IProps {
  title: string;
  description: string;
  start?: string;
  finish?: string;
  place?: string;
  speaker?: ISpeaker[];
  image?: string;
}

const PreviewMeetup: React.FC<IProps> = (props): ReactElement => {
  return (
    <>
      <MainTitle>Предпросмотр митапа</MainTitle>
      <article className="view-meetup-data">
        <div className="view-meetup-data-item">
          <img
            className="view-meetup-data-item__image"
            src={props.image ?? MeetupDefaultImage}
            alt="Meetup cover"
          />
          <p className="view-meetup-data-content view-meetup-data-content__title">
            {props.title}
          </p>
        </div>
        <div className="view-meetup-data-item">
          <p className="view-meetup-data-label">Время и место проведения</p>
          <div className="view-meetup-data-content view-meetup-data-content-schedule">
            {props.start && (
              <>
                <p className="view-meetup-data-content-schedule__item">
                  <span className="material-icons-round view-meetup-data-content-schedule__item-icon">
                    calendar_today
                  </span>
                  <time dateTime={props.start}>
                    {dateFormat(props.start, "dddd, d mmmm yyyy")}
                  </time>
                </p>
                {props.finish ? (
                  <p className="view-meetup-data-content-schedule__item">
                    <span className="material-icons-round view-meetup-data-content-schedule__item-icon">
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
                  <p className="view-meetup-data-content-schedule__item">
                    <span className="material-icons-round view-meetup-data-content-schedule__item-icon">
                      schedule
                    </span>
                    <span>{dateFormat(props.start, "H:MM")}</span>
                  </p>
                )}
              </>
            )}
            {props.place && (
              <p className="view-meetup-data-content-schedule__item">
                <span className="material-icons-round view-meetup-data-content-schedule__item-icon">
                  place
                </span>
                <span>{props.place}</span>
              </p>
            )}
          </div>
        </div>
        <div className="view-meetup-data-item">
          <p className="view-meetup-data-label">Спикер</p>
          <div className="view-meetup-data-content">
            {props.speaker && (
              <Avatar
                className="view-meetup-data-content-avatar"
                user={{
                  name: props.speaker[0].name,
                  surname: props.speaker[0].surname,
                }}
              />
            )}
            {/* <span>
              {`${props.speaker[0].name} ${props.speaker[0].surname}`}
            </span> */}
          </div>
        </div>
        <div className="view-meetup-data-item">
          <p className="view-meetup-data-label">Описание</p>
          <div className="view-meetup-data-content view-meetup-data-content__description">
            {props.description}
          </div>
        </div>
        <div className="view-meetup-data-item view-theme-data-item-last">
          buttons
        </div>
      </article>
    </>
  );
};

export default PreviewMeetup;
