import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { ReactElement, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import MeetupsCard from "../../../components/main/cards/MeetupsCard/MeetupsCard";
import { NumberDeclination, routes } from "../../../constants";
import { StoreContext } from "../../../context/StoreContext";
import { numberDeclination } from "../../../helpers/declination";
import { hasUserRights } from "../../../helpers/hasUserRights";
import { IMeetup } from "../../../repositories/interfaces/IMeetupsRepository";
import "./FuturePage.scss";

const FuturePage: React.FC = observer((): ReactElement => {
  const { meetupsStore, authStore } = useContext(StoreContext);
  const currentUser = authStore.user;

  useEffect(() => {
    if (meetupsStore.future.length > 0) {
      meetupsStore.future.forEach(async (m: IMeetup) => {
        await meetupsStore.fetchParticipants(m.id);
      });
    }
  }, [meetupsStore, meetupsStore.future]);

  if (currentUser === undefined) {
    return <Navigate to={routes.login} />;
  }

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
            editRights={hasUserRights(currentUser, card)}
            type={routes.future}
            participants={meetupsStore.participantsMap.get(card.id)}
          />
        ))}
      </div>
    </section>
  );
});

export default FuturePage;
