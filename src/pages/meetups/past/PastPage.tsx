import React, { ReactElement } from "react";
import OthersCard from "../../../components/main/cards/OthersCard/OthersCard";
import "./PastPage.scss";

const PastPage: React.FC = (): ReactElement => {
  return (
    <div className="past">
      <div className="meetups-quantity">
        <p className="meetups-quantity__text">Прошло митапов: 0</p>
      </div>
      <OthersCard />
    </div>
  );
};

export default PastPage;
