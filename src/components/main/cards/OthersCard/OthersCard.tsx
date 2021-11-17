import React, { ReactElement } from "react";
import { defaultUser } from "../../../../constants";
import Avatar from "../../../Avatar/Avatar";
import "./OthersCard.scss";

const OthersCard: React.FC = (): ReactElement => {
  return (
    <article className="others-card">
      <div className="others-card-header">Пон., 12 апреля 15:00 комн. 601b</div>
      <div className="others-card-main">
        <div className="others-card-main__title">Rollingstack</div>
        <div className="others-card-main__desc">
          Расскажу про один из проектов SaM Solutions - Rollingstack. Это
          система, что помогает создавать, использовать и поддерживать
          приложения на...
        </div>
      </div>
      <div className="others-card-footer">
        <div className="others-card-footer-left">
          <Avatar className="others-card-footer__avatar" />
          <div className="others-card-footer__username">
            {defaultUser.firstName} {defaultUser.lastName}
          </div>
        </div>
      </div>
    </article>
  );
};

export default OthersCard;
