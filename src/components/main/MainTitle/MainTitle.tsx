import classNames from "classnames";
import React, { ReactElement } from "react";
import "./MainTitle.scss";

interface IProps {
  styles?: string;
}

const MainTitle: React.FC<IProps> = (props): ReactElement => {
  return (
    <h1 className={classNames("main-title", props.styles)}>{props.children}</h1>
  );
};

export default MainTitle;
