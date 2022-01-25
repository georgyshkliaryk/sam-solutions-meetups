import React, { ReactElement, useContext } from "react";
import "./HeaderProfile.scss";
import Avatar from "../../Avatar/Avatar";
import { IUser } from "../../../repositories/interfaces/INetworkRepository";
import { StoreContext } from "../../../context/StoreContext";
import { observer } from "mobx-react-lite";

import HeaderDropdown from "../HeaderDropdown/HeaderDropdown";
import { routes, UserRoles } from "../../../constants";
import { Navigate } from "react-router-dom";

interface IProps {
  user: IUser;
}

const HeaderProfile: React.FC<IProps> = observer((props): ReactElement => {
  const { authStore } = useContext(StoreContext);

  const handleLogout = async () => {
    await authStore.logout();
  };

  if (authStore.user === undefined) {
    return <Navigate to={routes.login} />;
  }

  return (
    <div className="header-profile">
      <p className="header-profile__text">
        {props.user.name} {props.user.surname}
      </p>
      <Avatar
        className="header-profile__avatar"
        user={props.user}
        isAdmin={authStore.user.roles === UserRoles.CHIEF}
      />
      <HeaderDropdown handleLogout={handleLogout} />
    </div>
  );
});

export default HeaderProfile;
