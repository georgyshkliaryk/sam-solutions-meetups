import { observer } from "mobx-react-lite";
import React, { ReactElement, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import MeetupsCard from "../../../components/main/cards/MeetupsCard/MeetupsCard";
import { MeetupPageTypes, NumberDeclination, routes } from "../../../constants";
import { StoreContext } from "../../../context/StoreContext";
import { numberDeclination } from "../../../helpers/declination";
import { hasUserRights } from "../../../helpers/hasUserRights";
import { IMeetup } from "../../../repositories/interfaces/IMeetupsRepository";
import "./DraftsPage.scss";

const DraftsPage: React.FC = observer((): ReactElement => {
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
    <section className="drafts-page">
      <div className="drafts-page-meetups-quantity">
        <p className="drafts-page-meetups-quantity__text">
          {numberDeclination(
            meetupsStore.drafts.length,
            NumberDeclination.drafts
          )}
        </p>
      </div>
      <div className="drafts-page-wrapper">
        {meetupsStore.drafts.map((card: IMeetup) => (
          <MeetupsCard
            key={card.id}
            item={card}
            editRights={hasUserRights(currentUser, card)}
            type={MeetupPageTypes.DRAFT}
            user={currentUser}
            deleteMeetup={handleDeleteMeetup}
          />
        ))}
      </div>
    </section>
  );
});

export default DraftsPage;
