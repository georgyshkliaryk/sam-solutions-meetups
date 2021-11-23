import { observer } from "mobx-react-lite";
import React, { ReactElement } from "react";
import MeetupsCard from "../../../components/main/cards/MeetupsCard/MeetupsCard";
import { NumberDeclination } from "../../../constants";
import { numberDeclination } from "../../../helpers/declination";
import { IMeetup } from "../../../repositories/interfaces/IMeetupsRepository";
import MeetupsStore from "../../../stores/MeetupsStore";
import "./DraftsPage.scss";

const DraftsPage: React.FC = observer((): ReactElement => {
  return (
    <section className="drafts-page">
      <div className="drafts-page-meetups-quantity">
        <p className="drafts-page-meetups-quantity__text">
          {numberDeclination(
            MeetupsStore.drafts.length,
            NumberDeclination.drafts
          )}
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
