import React, { ReactElement } from "react";
import "./MainTitle.scss";

interface IProps {
  textAlign?: "left" | "center" | "right";
}

const MainTitle: React.FC<IProps> = (props): ReactElement => {
  return (
    <h1 className="main-title" style={{ textAlign: props.textAlign }}>
      {props.children}
    </h1>
  );
};

export default MainTitle;
