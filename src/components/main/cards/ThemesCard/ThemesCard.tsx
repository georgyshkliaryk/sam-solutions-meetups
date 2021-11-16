import React, { ReactElement } from "react";
import { defaultUser } from "../../../../constants";
import Avatar from "../../../Avatar/Avatar";
import "./ThemesCard.scss";

const ThemesCard: React.FC = (): ReactElement => {
  return (
    <div className="themes-card">
      <div className="themes-card-top">
        <Avatar className="themes-card-top__avatar" />
        <div className="themes-card-top__username">
          {defaultUser.firstName} {defaultUser.lastName}
        </div>
      </div>
      <div className="themes-card-main">
        <div className="themes-card-main__title">Rollingstack</div>
        <div className="themes-card-main__desc">
          Расскажу про один из проектов SaM Solutions - Rollingstack. Это
          система, что помогает создавать, использовать и поддерживать
          приложения на...
        </div>
      </div>
      <div className="themes-card-bottom">
        <div className="themes-card-bottom-left">
          <span className="material-icons-round">person</span>17 поддерживают
        </div>
      </div>
    </div>
  );
};

export default ThemesCard;
