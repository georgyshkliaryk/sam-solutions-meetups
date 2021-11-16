import React, { ReactElement } from "react";
import "./DraftsPage.scss";

const DraftsPage: React.FC = (): ReactElement => {
  return (
    <div className="drafts">
      <div className="meetups-quantity">
        <p className="meetups-quantity__text">На модерации: 0</p>
      </div>
    </div>
  );
};

export default DraftsPage;
