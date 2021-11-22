import { observer } from "mobx-react-lite";
import React, { ReactElement } from "react";
import ThemesCard from "../../../components/main/cards/ThemesCard/ThemesCard";
import { IMeetup } from "../../../repositories/interfaces/IMeetupsRepository";
import MeetupsStore from "../../../stores/MeetupsStore";
import "./ThemesPage.scss";

const ThemesPage: React.FC = observer((): ReactElement => {
  return (
    <section className="themes-page">
      <div className="themes-page-meetups-quantity">
        <p className="themes-page-meetups-quantity__text">
          Тем предложено: {MeetupsStore.themes.length}
        </p>
        <button className="themes-page-meetups-quantity__button">
          <span className="material-icons-round">add</span>Создать тему
        </button>
      </div>
      <div className="themes-page-wrapper">
        {MeetupsStore.themes.map((card: IMeetup) => (
          <ThemesCard key={card.id} item={card} />
        ))}
      </div>
    </section>
  );
});

export default ThemesPage;
