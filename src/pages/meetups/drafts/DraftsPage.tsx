import { observer } from "mobx-react-lite";
import React, { ReactElement, useContext } from "react";
import MeetupsCard from "../../../components/main/cards/MeetupsCard/MeetupsCard";
import { NumberDeclination } from "../../../constants";
import { StoreContext } from "../../../context/StoreContext";
import { numberDeclination } from "../../../helpers/declination";
import { IMeetup } from "../../../repositories/interfaces/IMeetupsRepository";
import "./DraftsPage.scss";

const DraftsPage: React.FC = observer((): ReactElement => {
  const { meetupsStore } = useContext(StoreContext);
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
          <MeetupsCard key={card.id} item={card} />
        ))}
      </div>
    </section>
  );
});

export default DraftsPage;
