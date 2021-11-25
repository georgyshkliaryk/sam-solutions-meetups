import React, { ReactElement, useContext } from "react";
import "./HeaderProfile.scss";
import Avatar from "../../Avatar/Avatar";
import { IUser } from "../../../repositories/interfaces/INetworkRepository";
import { StoreContext } from "../../../context/StoreContext";
import { observer } from "mobx-react-lite";

interface IProps {
  user: IUser;
}

const HeaderProfile: React.FC<IProps> = observer((props): ReactElement => {
  const { authStore } = useContext(StoreContext);

  const handleLogout = async () => {
    await authStore.logout();
  };
  return (
    <div className="header-profile">
      <p className="header-profile__text">
        {props.user.name} {props.user.surname}
      </p>
      <Avatar className="header-avatar" />
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
});

export default HeaderProfile;
