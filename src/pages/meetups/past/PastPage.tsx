import { observer } from "mobx-react-lite";
import React, { ReactElement, useContext } from "react";
import MeetupsCard from "../../../components/main/cards/MeetupsCard/MeetupsCard";
import { NumberDeclination } from "../../../constants";
import { StoreContext } from "../../../context/StoreContext";
import { numberDeclination } from "../../../helpers/declination";
import { IMeetup } from "../../../repositories/interfaces/IMeetupsRepository";
import "./PastPage.scss";

const PastPage: React.FC = observer((): ReactElement => {
  const { meetupsStore } = useContext(StoreContext);
  return (
    <section className="past-page">
      <div className="past-page-meetups-quantity">
        <p className="past-page-meetups-quantity__text">
          {numberDeclination(meetupsStore.past.length, NumberDeclination.past)}
        </p>
      </div>
      <div className="past-page-wrapper">
        {meetupsStore.past.map((card: IMeetup) => (
          <MeetupsCard key={card.id} item={card} />
        ))}
      </div>
    </section>
  );
});

export default PastPage;
