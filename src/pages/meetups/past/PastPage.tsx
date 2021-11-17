import React, { ReactElement } from "react";
import OthersCard from "../../../components/main/cards/OthersCard/OthersCard";
import MeetupsQuantity from "../meetupsQuantity/MeetupsQuantity";
import "./PastPage.scss";

const PastPage: React.FC = (): ReactElement => {
  return (
    <section className="past">
      <MeetupsQuantity text="Прошло митапов:" meetupsNumber={0} />
      <div className="past-wrapper">
        <OthersCard />
        <OthersCard />
      </div>
    </section>
  );
};

export default PastPage;
