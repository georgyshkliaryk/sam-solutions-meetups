import React, { ReactElement } from "react";
import "./HeaderProfile.scss";
import Avatar from "../../Avatar/Avatar";

const HeaderProfile: React.FC = (): ReactElement => {
  return (
    <div className="header-profile">
      <p className="header-profile__text">Name Surname</p>
      <Avatar />
    </div>
  );
};

export default HeaderProfile;
