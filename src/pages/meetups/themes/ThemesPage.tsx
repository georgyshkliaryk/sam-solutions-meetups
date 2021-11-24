import { observer } from "mobx-react-lite";
import React, { ReactElement, useContext } from "react";
import ThemesCard from "../../../components/main/cards/ThemesCard/ThemesCard";
import { NumberDeclination } from "../../../constants";
import { StoreContext } from "../../../context/StoreContext";
import { numberDeclination } from "../../../helpers/declination";
import { IMeetup } from "../../../repositories/interfaces/IMeetupsRepository";
import "./ThemesPage.scss";

const ThemesPage: React.FC = observer((): ReactElement => {
  const { meetupsStore } = useContext(StoreContext);
  return (
    <section className="themes-page">
      <div className="themes-page-meetups-quantity">
        <p className="themes-page-meetups-quantity__text">
          {numberDeclination(
            meetupsStore.themes.length,
            NumberDeclination.themes
          )}
        </p>
        <button className="themes-page-meetups-quantity__button">
          <span className="material-icons-round">add</span>Создать тему
        </button>
      </div>
      <div className="themes-page-wrapper">
        {meetupsStore.themes.map((card: IMeetup) => (
          <ThemesCard key={card.id} item={card} />
        ))}
      </div>
    </section>
  );
});

export default ThemesPage;
