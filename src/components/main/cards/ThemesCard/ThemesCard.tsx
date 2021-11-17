import React, { ReactElement } from "react";
import { IMeetup } from "../../../../stores/MeetupsStore";
import Avatar from "../../../Avatar/Avatar";
import "./ThemesCard.scss";

interface IProps {
  item: IMeetup;
}

const ThemesCard: React.FC<IProps> = (props): ReactElement => {
  return (
    <article className="themes-card">
      <div className="themes-card-header">
        <Avatar className="themes-card-header__avatar" />
        <span className="themes-card-header__username">
          {props.item.authorName} {props.item.authorSurname}
        </span>
      </div>
      <div className="themes-card-main">
        <p className="themes-card-main__title">{props.item.title}</p>
        <p className="themes-card-main__description">
          {props.item.description}
        </p>
      </div>
      <div className="themes-card-footer">
        <p className="themes-card-footer-support">
          <span className="material-icons-round">person</span>
          {props.item.goCount} поддерживают
        </p>
      </div>
    </article>
  );
};

export default ThemesCard;
