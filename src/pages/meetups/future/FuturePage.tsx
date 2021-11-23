import { observer } from "mobx-react-lite";
import React, { ReactElement } from "react";
import MeetupsCard from "../../../components/main/cards/MeetupsCard/MeetupsCard";
import { NumberDeclination } from "../../../constants";
import { numberDeclination } from "../../../helpers/declination";
import { IMeetup } from "../../../repositories/interfaces/IMeetupsRepository";
import MeetupsStore from "../../../stores/MeetupsStore";
import "./FuturePage.scss";

const FuturePage: React.FC = observer((): ReactElement => {
  return (
    <section className="future-page">
      <div className="future-page-meetups-quantity">
        <p className="future-page-meetups-quantity__text">
          {numberDeclination(
            MeetupsStore.future.length,
            NumberDeclination.future
          )}
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
