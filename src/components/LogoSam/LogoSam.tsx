import React, { ReactElement } from "react";
import "./LogoSam.scss";
import LogoSamSolutions from "./assets/logoSam.svg";
import classNames from "classnames";

interface IProps {
  className?: string;
}

const LogoSam: React.FC<IProps> = (props): ReactElement => {
  return (
    <div className={classNames("header-logo", props.className)}>
      <img src={LogoSamSolutions} alt="Samsolutions Company Logo" />
    </div>
  );
};

export default LogoSam;
