import React, { ReactElement } from "react";
import "./Avatar.scss";
import classNames from "classnames";
import { generateAvatarData } from "../../helpers/avatarGenerator";
import { IUser } from "../../repositories/interfaces/INetworkRepository";

interface IProps {
  className?: string;
  img?: string;
  user: Pick<IUser, "name" | "surname">;
  isAdmin?: boolean;
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
      {props.isAdmin && (
        <span className="material-icons-round avatar__admin-icon">
          admin_panel_settings
        </span>
      )}
    </div>
  );
};

export default Avatar;
