import React, { ReactElement } from "react";
import "./Avatar.scss";
import classNames from "classnames";

interface IProps {
  className?: string;
  img?: string;
}

const Avatar: React.FC<IProps> = (props): ReactElement => {
  return (
    <div className={classNames("avatar", props.className)}>
      {props.img && (
        <img src={props.img} alt="User's avatar" className="avatar__img" />
      )}
    </div>
  );
};

export default Avatar;
