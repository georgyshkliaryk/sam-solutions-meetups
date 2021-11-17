import React, { ReactElement } from "react";
import OthersCard from "../../../components/main/cards/OthersCard/OthersCard";
import MeetupsQuantity from "../meetupsQuantity/MeetupsQuantity";
import "./FuturePage.scss";

const FuturePage: React.FC = (): ReactElement => {
  return (
    <section className="future">
      <MeetupsQuantity text="Опубликовано митапов:" meetupsNumber={0} />
      <div className="future-wrapper">
        <OthersCard />
        <OthersCard />
      </div>
    </section>
  );
};

export default FuturePage;
