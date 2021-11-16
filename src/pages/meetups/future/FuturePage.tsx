import React, { ReactElement } from "react";
import OthersCard from "../../../components/main/cards/OthersCard/OthersCard";
import "./FuturePage.scss";

const FuturePage: React.FC = (): ReactElement => {
  return (
    <div className="future">
      <div className="meetups-quantity">
        <p className="meetups-quantity__text">Опубликовано митапов: 0</p>
      </div>
      <OthersCard />
    </div>
  );
};

export default FuturePage;
