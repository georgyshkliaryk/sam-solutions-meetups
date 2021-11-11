import React, { ReactElement } from "react";
import "./Avatar.scss";
import AvatarImg from "./assets/avatar.svg";

interface IProps {
  img?: string;
}

const Avatar: React.FC<IProps> = (props): ReactElement => {
  return (
    <div className="avatar-wrapper">
      <img
        src={props.img ? props.img : AvatarImg} // if user has avatar, display it; else display standard one
        alt="user's avatar"
        className="avatar-wrapper__img"
      />
    </div>
  );
};

export default Avatar;
