import React, { ReactElement } from "react";
import { INews } from "../../../../repositories/interfaces/INewsRepository";
import "./NewsCard.scss";
import defaultImage from "./assets/newsDefaultImage.svg";
import { truncText } from "../../../../helpers/truncText";
import { useTranslation } from "react-i18next";

interface IProps {
  item: INews;
}

const NewsCard: React.FC<IProps> = (props): ReactElement => {
  const { t } = useTranslation();

  return (
    <div className="news-card">
      <img
        src={props.item.image ?? defaultImage}
        className="news-card__image"
        alt="News card"
      />
      <div className="news-card-content">
        <time className="news-card-content__date" dateTime={props.item.date}>
          {t("intlDateTime", {
            val: new Date(props.item.date),
          })}
        </time>
        <p className="news-card-content__title">{props.item.title}</p>
        <p className="news-card-content__description">
          {truncText(90, props.item.description)}
        </p>
      </div>
    </div>
  );
};

export default NewsCard;
