import React, { ReactElement } from "react";
import "./Avatar.scss";
import classNames from "classnames";
import { generateAvatar } from "../../helpers/avatarGenerator";
import { IUser } from "../../repositories/interfaces/INetworkRepository";

interface IProps {
  className?: string;
  img?: string;
  userName: Pick<IUser, "name" | "surname">;
}

const Avatar: React.FC<IProps> = (props): ReactElement => {
  return (
    <div
      className={classNames("avatar", props.className)}
      style={{ backgroundColor: generateAvatar(props.userName).color }}
    >
      {props.img ? (
        <img src={props.img} alt="User's avatar" className="avatar__img" />
      ) : (
        <p>{generateAvatar(props.userName).initials}</p>
      )}
    </div>
  );
};

export default Avatar;
