import React, { ReactElement } from "react";
import { NumberDeclination } from "../../../../constants";
import { numberDeclination } from "../../../../helpers/declination";
import { IMeetup } from "../../../../repositories/interfaces/IMeetupsRepository";
import Avatar from "../../../Avatar/Avatar";
import LinkComponent from "../../../LinkComponent/LinkComponent";
import "./ThemesCard.scss";

interface IProps {
  item: IMeetup;
  editRights: boolean;
}

const ThemesCard: React.FC<IProps> = (props): ReactElement => {
  const author = {
    name: props.item.authorName,
    surname: props.item.authorSurname,
  };

  return (
    <LinkComponent to={props.item.id} className="themes-card-wrapper">
      <article className="themes-card">
        <div className="themes-card-header">
          <Avatar className="themes-card-header__avatar" user={author} />
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
            {numberDeclination(
              props.item.goCount,
              NumberDeclination.participants
            )}
          </p>
        </div>
        {props.editRights && (
          <button className="themes-card-delete-button" title="Удалить тему">
            <span className="material-icons-outlined">delete</span>
          </button>
        )}
      </article>
    </LinkComponent>
  );
};

export default ThemesCard;
