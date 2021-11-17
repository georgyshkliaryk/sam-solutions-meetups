import React, { ReactElement } from "react";
import Avatar from "../../../Avatar/Avatar";
import "./ThemesCard.scss";

interface IMeetup {
  id: string;
  authorName: string;
  authorSurname: string;
  start?: string;
  title: string;
  desc?: string;
  place?: string;
  goCount: number;
  status?: string;
  isOver?: Boolean;
}

interface IProps {
  item: IMeetup;
}

const ThemesCard: React.FC<IProps> = (props): ReactElement => {
  return (
    <article className="themes-card">
      <div className="themes-card-header">
        <Avatar className="themes-card-header__avatar" />
        <div className="themes-card-header__username">
          {props.item.authorName} {props.item.authorSurname}
        </div>
      </div>
      <div className="themes-card-main">
        <div className="themes-card-main__title">{props.item.title}</div>
        <div className="themes-card-main__desc">{props.item.desc}</div>
      </div>
      <div className="themes-card-footer">
        <div className="themes-card-footer-left">
          <span className="material-icons-round">person</span>
          {props.item.goCount} поддерживают
        </div>
      </div>
    </article>
  );
};

export default ThemesCard;
