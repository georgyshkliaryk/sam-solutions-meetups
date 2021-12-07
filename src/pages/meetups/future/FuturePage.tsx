import { observer } from "mobx-react-lite";
import React, { ReactElement, useContext } from "react";
import MeetupsCard from "../../../components/main/cards/MeetupsCard/MeetupsCard";
import { NumberDeclination, routes, UserRoles } from "../../../constants";
import { StoreContext } from "../../../context/StoreContext";
import { numberDeclination } from "../../../helpers/declination";
import { IMeetup } from "../../../repositories/interfaces/IMeetupsRepository";
import "./FuturePage.scss";

const FuturePage: React.FC = observer((): ReactElement => {
  const { meetupsStore, authStore } = useContext(StoreContext);
  return (
    <section className="future-page">
      <div className="future-page-meetups-quantity">
        <p className="future-page-meetups-quantity__text">
          {numberDeclination(
            meetupsStore.future.length,
            NumberDeclination.future
          )}
        </p>
      </div>
      <div className="future-page-wrapper">
        {meetupsStore.future.map((card: IMeetup) => (
          <MeetupsCard
            key={card.id}
            item={card}
            editRights={
              authStore.user?.id === card.authorId ||
              authStore.user?.roles === UserRoles.CHIEF
            }
            type={routes.future}
          />
        ))}
      </div>
    </section>
  );
});

export default FuturePage;
