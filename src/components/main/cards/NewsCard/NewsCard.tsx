import React, { ReactElement } from "react";
import { INews } from "../../../../repositories/interfaces/INewsRepository";
import "./NewsCard.scss";
import defaultImage from "./assets/newsDefaultImage.svg";
import { truncText } from "../../../../helpers/truncText";
import { useTranslation } from "react-i18next";
import LinkComponent from "../../../LinkComponent/LinkComponent";
import ReactMarkdown from "react-markdown";

import stripMarkdown from "strip-markdown";

interface IProps {
  item: INews;
}

const NewsCard: React.FC<IProps> = (props): ReactElement => {
  const { t } = useTranslation();

  return (
    <LinkComponent className="news-card" to={props.item.id}>
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
        <div className="news-card-content__description">
          <ReactMarkdown remarkPlugins={[stripMarkdown]}>
            {truncText(90, props.item.description)}
          </ReactMarkdown>
        </div>
      </div>
    </LinkComponent>
  );
};

export default NewsCard;
