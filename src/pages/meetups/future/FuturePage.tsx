import React, { ReactElement } from "react";
import MeetupsCard from "../../../components/main/cards/MeetupsCard/MeetupsCard";
import "./FuturePage.scss";

const FuturePage: React.FC = (): ReactElement => {
  return (
    <section className="future-page">
      <div className="future-page-meetups-quantity">
        <p className="future-page-meetups-quantity__text">
          Опубликовано митапов: {0}
        </p>
      </div>
      <div className="future-page-wrapper">
        <MeetupsCard />
        <MeetupsCard />
      </div>
    </section>
  );
};

export default FuturePage;
