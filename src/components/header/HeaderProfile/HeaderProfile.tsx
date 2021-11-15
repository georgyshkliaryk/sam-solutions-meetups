import React, { ReactElement } from "react";
import "./HeaderProfile.scss";
import Avatar from "../../Avatar/Avatar";
import { IUser } from "../../../constants";

interface IProps {
  user: IUser;
}

const HeaderProfile: React.FC<IProps> = (props): ReactElement => {
  return (
    <div className="header-profile">
      <p className="header-profile__text">
        {props.user.firstName} {props.user.lastName}
      </p>
      <Avatar className={"header-avatar"} />
    </div>
  );
};

export default HeaderProfile;
