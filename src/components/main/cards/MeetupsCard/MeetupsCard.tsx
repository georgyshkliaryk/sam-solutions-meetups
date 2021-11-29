import React, { ReactElement } from "react";
import { IMeetup } from "../../../../repositories/interfaces/IMeetupsRepository";
import Avatar from "../../../Avatar/Avatar";
import "./MeetupsCard.scss";
import dateFormat from "dateformat";

interface IProps {
  item: IMeetup;
}

const MeetupsCard: React.FC<IProps> = (props): ReactElement => {
  const author = {
    name: props.item.authorName,
    surname: props.item.authorSurname,
  };
  return (
    <article className="meetups-card">
      <p className="meetups-card-header">
        <time>
          {props.item.start
            ? dateFormat(props.item.start, "dddd, d mmmm ● H:MM")
            : "–"}
        </time>
        &nbsp;
        {props.item.place && " ● " + props.item.place}
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
    </article>
  );
};

export default MeetupsCard;
