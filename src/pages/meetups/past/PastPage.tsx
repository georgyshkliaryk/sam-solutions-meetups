import React, { ReactElement } from "react";
import MeetupsCard from "../../../components/main/cards/MeetupsCard/MeetupsCard";
import "./PastPage.scss";

const PastPage: React.FC = (): ReactElement => {
  return (
    <section className="past-page">
      <div className="past-page-meetups-quantity">
        <p className="past-page-meetups-quantity__text">Прошло митапов: {0}</p>
      </div>
      <div className="past-page-wrapper">
        {/* <MeetupsCard />
        <MeetupsCard /> */}
      </div>
    </section>
  );
};

export default PastPage;
