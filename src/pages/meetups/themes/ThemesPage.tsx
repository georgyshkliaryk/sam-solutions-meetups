import { observer } from "mobx-react-lite";
import React, { ReactElement, useContext } from "react";
import { Navigate } from "react-router";
import LinkComponent from "../../../components/LinkComponent/LinkComponent";
import ThemesCard from "../../../components/main/cards/ThemesCard/ThemesCard";
import { NumberDeclination, routes, UserRoles } from "../../../constants";
import { StoreContext } from "../../../context/StoreContext";
import { numberDeclination } from "../../../helpers/declination";
import { IMeetup } from "../../../repositories/interfaces/IMeetupsRepository";
import "./ThemesPage.scss";

const ThemesPage: React.FC = observer((): ReactElement => {
  const { authStore, meetupsStore } = useContext(StoreContext);

  if (authStore.user === undefined) {
    return <Navigate to={routes.login} />;
  }

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
          <ThemesCard
            key={card.id}
            item={card}
            editRights={
              authStore.user?.id === card.authorId ||
              authStore.user?.roles === UserRoles.CHIEF
            }
          />
        ))}
      </div>
    </section>
  );
});

export default ThemesPage;
