import React, { ReactElement } from "react";
import MeetupsCard from "../../../components/main/cards/MeetupsCard/MeetupsCard";
import "./DraftsPage.scss";

const DraftsPage: React.FC = (): ReactElement => {
  return (
    <section className="drafts-page">
      <div className="drafts-page-meetups-quantity">
        <p className="drafts-page-meetups-quantity__text">На модерации: {0}</p>
      </div>
      <div className="drafts-page-wrapper">
        <MeetupsCard />
        <MeetupsCard />
      </div>
    </section>
  );
};

export default DraftsPage;
