import { observer } from "mobx-react-lite";
import React, { ReactElement, useContext } from "react";
import LinkComponent from "../../../components/LinkComponent/LinkComponent";
import ThemesCard from "../../../components/main/cards/ThemesCard/ThemesCard";
import { NumberDeclination, routes } from "../../../constants";
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
        <LinkComponent
          className="themes-page-meetups-quantity__button"
          to={`${routes.meetups}/${routes.create}`}
        >
          <span className="material-icons-round">add</span>Создать тему
        </LinkComponent>
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
