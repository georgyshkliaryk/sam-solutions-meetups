import { observer } from "mobx-react-lite";
import React, { ReactElement, useEffect } from "react";
import MeetupsCard from "../../../components/main/cards/MeetupsCard/MeetupsCard";
import { IMeetup } from "../../../repositories/interfaces/IMeetupsRepository";
import MeetupsRepository from "../../../repositories/MeetupsRepository/MeetupsRepository";
import MeetupsStore from "../../../stores/MeetupsStore";
import "./PastPage.scss";

const PastPage: React.FC = observer((): ReactElement => {
  useEffect(() => {
    MeetupsRepository.getMeetupsPast();
  }, []);
  return (
    <section className="past-page">
      <div className="past-page-meetups-quantity">
        <p className="past-page-meetups-quantity__text">Прошло митапов: {0}</p>
      </div>
      <div className="past-page-wrapper">
        {MeetupsStore.past.map((card: IMeetup) => (
          <MeetupsCard key={card.id} item={card} />
        ))}
      </div>
    </section>
  );
});

export default PastPage;
