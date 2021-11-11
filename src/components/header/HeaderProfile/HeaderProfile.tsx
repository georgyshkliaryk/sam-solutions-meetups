import React, { ReactElement } from "react";
import "./HeaderProfile.scss";
import Avatar from "../../Avatar/Avatar";

const HeaderProfile: React.FC = (): ReactElement => {
  return (
    <div className="header-profile-wrapper">
      <div className="header-profile-wrapper__text">Name Surname</div>
      <Avatar sizes={"40px"} />
    </div>
  );
};

export default HeaderProfile;
