import React, { ReactElement } from "react";
import "./FuturePage.scss";

const FuturePage: React.FC = (): ReactElement => {
  return (
    <div className="future">
      <div className="meetups-quantity">
        <p className="meetups-quantity__text">Опубликовано митапов: 0</p>
      </div>
    </div>
  );
};

export default FuturePage;
