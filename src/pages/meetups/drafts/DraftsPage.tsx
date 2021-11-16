import React, { ReactElement } from "react";
import OthersCard from "../../../components/main/cards/OthersCard/OthersCard";
import "./DraftsPage.scss";

const DraftsPage: React.FC = (): ReactElement => {
  return (
    <div className="drafts">
      <div className="meetups-quantity">
        <p className="meetups-quantity__text">На модерации: 0</p>
      </div>
      <OthersCard />
    </div>
  );
};

export default DraftsPage;
