import React, { ReactElement } from "react";
import { defaultUser } from "../../../../constants";
import Avatar from "../../../Avatar/Avatar";
import "./MeetupsCard.scss";

const MeetupsCard: React.FC = (): ReactElement => {
  return (
    <article className="meetups-card">
      <p className="meetups-card-header">Пон., 12 апреля 15:00 комн. 601b</p>
      <div className="meetups-card-main">
        <p className="meetups-card-main__title">Rollingstack</p>
        <p className="meetups-card-main__description">
          Расскажу про один из проектов SaM Solutions - Rollingstack. Это
          система, что помогает создавать, использовать и поддерживать
          приложения на...
        </p>
      </div>
      <div className="meetups-card-footer">
        <div className="meetups-card-footer-author">
          <Avatar className="meetups-card-footer__avatar" />
          <span className="meetups-card-footer__username">
            {defaultUser.firstName} {defaultUser.lastName}
          </span>
        </div>
      </div>
    </article>
  );
};

export default MeetupsCard;
