import { observer } from "mobx-react-lite";
import React, { ReactElement, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Loader from "react-loader-spinner";
import { Navigate } from "react-router-dom";
import MeetupsCard from "../../../components/main/cards/MeetupsCard/MeetupsCard";
import NoDataPlaceholder from "../../../components/NoDataPlaceholder/NoDataPlaceholder";
import {
  loadingColor,
  MeetupPageTypes,
  NumberDeclination,
  routes,
} from "../../../constants";
import { StoreContext } from "../../../context/StoreContext";
import { numberDeclination } from "../../../helpers/declination";
import { hasUserRights } from "../../../helpers/hasUserRights";
import { IMeetup } from "../../../repositories/interfaces/IMeetupsRepository";
import "./FuturePage.scss";

const FuturePage: React.FC = observer((): ReactElement => {
  const { meetupsStore, authStore } = useContext(StoreContext);
  const currentUser = authStore.user;
  const { t } = useTranslation();

  useEffect(() => {
    if (meetupsStore.future.length > 0) {
      meetupsStore.future.forEach(async (m: IMeetup) => {
        await meetupsStore.fetchParticipants(m.id);
      });
    }
  }, [meetupsStore, meetupsStore.future]);

  const handleDeleteMeetup = (id: string) => {
    meetupsStore.deleteMeetup(id);
  };

  const handleParticipateInMeetup = async (id: string) => {
    await meetupsStore.participateInMeetup(id);
  };

  const handleStopParticipateInMeetup = async (id: string) => {
    if (currentUser !== undefined) {
      await meetupsStore.stopParticipateInMeetup(id, currentUser.id);
    }
  };

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
        {meetupsStore.loadState ? (
          <Loader type="Puff" color={loadingColor} height={100} width={100} />
        ) : meetupsStore.future.length === 0 ? (
          <NoDataPlaceholder text={t("placeholders.noFuture")} />
        ) : (
          meetupsStore.future.map((card: IMeetup) => (
            <MeetupsCard
              key={card.id}
              item={card}
              editRights={hasUserRights(currentUser, card)}
              type={MeetupPageTypes.FUTURE}
              participants={meetupsStore.participantsMap.get(card.id)}
              buttonInLoading={meetupsStore.buttonInLoading}
              user={currentUser}
              deleteMeetup={handleDeleteMeetup}
              participateInMeetup={handleParticipateInMeetup}
              stopParticipateInMeetup={handleStopParticipateInMeetup}
            />
          ))
        )}
      </div>
    </section>
  );
});

export default FuturePage;
