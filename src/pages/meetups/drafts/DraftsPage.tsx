import React, { ReactElement } from "react";
import OthersCard from "../../../components/main/cards/OthersCard/OthersCard";
import MeetupsQuantity from "../meetupsQuantity/MeetupsQuantity";
import "./DraftsPage.scss";

const DraftsPage: React.FC = (): ReactElement => {
  return (
    <section className="drafts">
      <MeetupsQuantity text="На модерации:" meetupsNumber={0} />
      <div className="drafts-wrapper">
        <OthersCard />
        <OthersCard />
      </div>
    </section>
  );
};

export default DraftsPage;
