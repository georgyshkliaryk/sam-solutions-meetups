import React, { ReactElement } from "react";
import { IMeetup } from "../../../../repositories/interfaces/IMeetupsRepository";
import Avatar from "../../../Avatar/Avatar";
import "./MeetupsCard.scss";
import dateFormat from "dateformat";
import LinkComponent from "../../../LinkComponent/LinkComponent";

interface IProps {
  item: IMeetup;
  editRights: boolean;
}

const MeetupsCard: React.FC<IProps> = (props): ReactElement => {
  const author = {
    name: props.item.authorName,
    surname: props.item.authorSurname,
  };
  return (
    <LinkComponent to={props.item.id} className="meetups-card-wrapper">
      <article className="meetups-card">
        <p className="meetups-card-header">
          <time dateTime={props.item.start}>
            {props.item.start
              ? dateFormat(props.item.start, "ddd, d mmmm • H:MM")
              : "–"}
          </time>
          &nbsp;
          {props.item.place && " • " + props.item.place}
        </p>
        <div className="meetups-card-main">
          <p className="meetups-card-main__title">{props.item.title}</p>
          <p className="meetups-card-main__description">
            {props.item.description}
          </p>
        </div>
        <div className="meetups-card-footer">
          <div className="meetups-card-footer-author">
            <Avatar className="meetups-card-footer__avatar" user={author} />
            <span className="meetups-card-footer__username">
              {props.item.authorName} {props.item.authorSurname}
            </span>
          </div>
        </div>
        {props.editRights && (
          <div className="meetups-card-buttons">
            <button
              className="meetups-card-delete-button"
              title="Удалить митап"
            >
              <span className="material-icons-outlined">delete</span>
            </button>
            <button
              className="meetups-card-edit-button"
              title="Редактировать митап"
            >
              <span className="material-icons-outlined">edit</span>
            </button>
          </div>
        )}
      </article>
    </LinkComponent>
  );
};

export default MeetupsCard;
