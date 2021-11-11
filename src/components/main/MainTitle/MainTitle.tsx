import React, { ReactElement } from "react";
import "./MainTitle.scss";

interface IProps {
  title: string;
}

const MainTitle: React.FC<IProps> = (props): ReactElement => {
  return (
    <div>
      <h1 className="main-title">{props.title}</h1>
    </div>
  );
};

export default MainTitle;
