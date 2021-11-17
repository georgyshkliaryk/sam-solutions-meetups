import { observer } from "mobx-react-lite";
import React, { ReactElement, useEffect } from "react";
import MeetupsCard from "../../../components/main/cards/MeetupsCard/MeetupsCard";
import MeetupsStore, { IMeetup } from "../../../stores/MeetupsStore";
import "./DraftsPage.scss";

const DraftsPage: React.FC = observer((): ReactElement => {
  useEffect(() => {
    MeetupsStore.fetchDrafts();
  }, []);
  return (
    <section className="drafts-page">
      <div className="drafts-page-meetups-quantity">
        <p className="drafts-page-meetups-quantity__text">
          На модерации: {MeetupsStore.drafts.length}
        </p>
      </div>
      <div className="drafts-page-wrapper">
        {MeetupsStore.drafts.map((card: IMeetup) => (
          <MeetupsCard key={card.id} item={card} />
        ))}
      </div>
    </section>
  );
});

export default DraftsPage;
