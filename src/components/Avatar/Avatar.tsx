import React, { ReactElement } from "react";
import "./Avatar.scss";
import classNames from "classnames";
import { generateAvatarData } from "../../helpers/avatarGenerator";
import { IUser } from "../../repositories/interfaces/INetworkRepository";

interface IProps {
  className?: string;
  img?: string;
  user: Pick<IUser, "name" | "surname">;
}

const Avatar: React.FC<IProps> = (props): ReactElement => {
  return (
    <div
      className={classNames("avatar", props.className)}
      style={{
        backgroundColor: generateAvatarData(props.user.name, props.user.surname)
          .color,
      }}
    >
      {props.img ? (
        <img src={props.img} alt="User's avatar" className="avatar__img" />
      ) : (
        <p>
          {generateAvatarData(props.user.name, props.user.surname).initials}
        </p>
      )}
    </div>
  );
};

export default Avatar;
