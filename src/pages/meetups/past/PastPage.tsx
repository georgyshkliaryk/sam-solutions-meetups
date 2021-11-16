import React, { ReactElement } from "react";
import "./PastPage.scss";

const PastPage: React.FC = (): ReactElement => {
  return (
    <div className="past">
      <div className="meetups-quantity">
        <p className="meetups-quantity__text">Прошло митапов: 0</p>
      </div>
    </div>
  );
};

export default PastPage;
