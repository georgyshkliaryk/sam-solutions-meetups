import React, { ReactElement } from "react";
import "./Avatar.scss";
import AvatarImg from "./assets/avatar.svg";

const Avatar: React.FC = (): ReactElement => {
  return (
    <div className="avatar-wrapper">
      <img src={AvatarImg} alt="user's avatar" />
    </div>
  );
};

export default Avatar;
