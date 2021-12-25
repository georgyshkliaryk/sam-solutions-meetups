import React, {
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./HeaderProfile.scss";
import Avatar from "../../Avatar/Avatar";
import { IUser } from "../../../repositories/interfaces/INetworkRepository";
import { StoreContext } from "../../../context/StoreContext";
import { observer } from "mobx-react-lite";

import { useTranslation } from "react-i18next";
import { LOCALES } from "../../../constants";
import HeaderDropdown from "../HeaderDropdown/HeaderDropdown";

interface IProps {
  user: IUser;
}

const HeaderProfile: React.FC<IProps> = observer((props): ReactElement => {
  const { authStore } = useContext(StoreContext);
  const { t, i18n } = useTranslation();
  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const handleLogout = async () => {
    await authStore.logout();
  };

  return (
    <div className="header-profile">
      <button onClick={() => handleChangeLanguage(LOCALES.EN)}>en</button>
      <button onClick={() => handleChangeLanguage(LOCALES.RU)}>ru</button>
      <p className="header-profile__text">
        {props.user.name} {props.user.surname}
      </p>
      <Avatar className="header-profile__avatar" user={props.user} />
      {/* <button
        className="header-profile-logout"
        onClick={handleLogout}
        data-cy="header-button-logout"
      >
        <span className="header-profile-logout__text">
          {t("buttons.authButtons.logout")}
        </span>
        <span className="material-icons-round">logout</span>
      </button> */}
      <HeaderDropdown />
    </div>
  );
});

export default HeaderProfile;
