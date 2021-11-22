import { observer } from "mobx-react-lite";
import React, { ReactElement, useEffect } from "react";
import MeetupsCard from "../../../components/main/cards/MeetupsCard/MeetupsCard";
import { IMeetup } from "../../../repositories/interfaces/IMeetupsRepository";
import MeetupsRepository from "../../../repositories/MeetupsRepository/MeetupsRepository";
import MeetupsStore from "../../../stores/MeetupsStore";
import "./FuturePage.scss";

const FuturePage: React.FC = observer((): ReactElement => {
  useEffect(() => {
    MeetupsRepository.getMeetupsFuture();
  }, []);
  return (
    <section className="future-page">
      <div className="future-page-meetups-quantity">
        <p className="future-page-meetups-quantity__text">
          Опубликовано митапов: {MeetupsStore.future.length}
        </p>
      </div>
      <div className="future-page-wrapper">
        {MeetupsStore.future.map((card: IMeetup) => (
          <MeetupsCard key={card.id} item={card} />
        ))}
      </div>
    </section>
  );
});

export default FuturePage;
