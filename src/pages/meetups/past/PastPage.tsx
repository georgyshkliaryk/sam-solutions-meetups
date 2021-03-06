import { observer } from "mobx-react-lite";
import React, { ReactElement, useContext } from "react";
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
import "./PastPage.scss";

const PastPage: React.FC = observer((): ReactElement => {
  const { meetupsStore, authStore } = useContext(StoreContext);
  const currentUser = authStore.user;
  const { t } = useTranslation();

  const handleDeleteMeetup = (id: string) => {
    meetupsStore.deleteMeetup(id);
  };

  if (currentUser === undefined) {
    return <Navigate to={routes.login} />;
  }

  return (
    <section className="past-page">
      <div className="past-page-meetups-quantity">
        <p className="past-page-meetups-quantity__text">
          {numberDeclination(meetupsStore.past.length, NumberDeclination.past)}
        </p>
      </div>
      <div className="past-page-wrapper">
        {meetupsStore.loadState ? (
          <Loader type="Puff" color={loadingColor} height={100} width={100} />
        ) : meetupsStore.past.length === 0 ? (
          <NoDataPlaceholder text={t("placeholders.noPast")} />
        ) : (
          meetupsStore.past.map((card: IMeetup) => (
            <MeetupsCard
              key={card.id}
              item={card}
              editRights={hasUserRights(currentUser, card)}
              type={MeetupPageTypes.PAST}
              user={currentUser}
              deleteMeetup={handleDeleteMeetup}
            />
          ))
        )}
      </div>
    </section>
  );
});

export default PastPage;
