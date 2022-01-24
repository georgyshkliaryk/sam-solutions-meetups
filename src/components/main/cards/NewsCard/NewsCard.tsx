import React, { ReactElement, useEffect, useState } from "react";
import { INews } from "../../../../repositories/interfaces/INewsRepository";
import "./NewsCard.scss";
import defaultImage from "./assets/newsDefaultImage.svg";
import { truncText } from "../../../../helpers/truncText";
import { useTranslation } from "react-i18next";
import LinkComponent from "../../../LinkComponent/LinkComponent";

import { remark } from "remark";
import strip from "strip-markdown";
import remarkGfm from "remark-gfm";

interface IProps {
  item: INews;
}

const NewsCard: React.FC<IProps> = (props): ReactElement => {
  const { t } = useTranslation();
  const [trimmedNewsText, setTrimmedNewsText] = useState<string>("");

  useEffect(() => {
    remark()
      .use(remarkGfm)
      .use(strip)
      .process(props.item.description)
      .then((text) => {
        setTrimmedNewsText(truncText(90, String(text)));
      });
  }, [props.item.description]);

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
        <div className="news-card-content__description">{trimmedNewsText}</div>
      </div>
    </LinkComponent>
  );
};

export default NewsCard;
