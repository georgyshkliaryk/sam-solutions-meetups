import React, { ReactElement } from "react";
import "./Avatar.scss";
import avatar from "./assets/avatar.png";

const Avatar: React.FC = (): ReactElement => {
  return (
    <>
      <img src={avatar} alt="avatar" />
    </>
  );
};

export default Avatar;
