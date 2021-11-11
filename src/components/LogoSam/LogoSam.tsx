import React, { ReactElement } from "react";
import "./LogoSam.scss";
import LogoSamSolutions from "./assets/logoSam.svg";
import { Link } from "react-router-dom";
import { routes } from "../../constants";

const LogoSam: React.FC = (): ReactElement => {
  return (
    <div className="header-logo-wrapper">
      <Link to={routes.meetups.themes}>
        <img
          className="header-logo-wrapper__img"
          src={LogoSamSolutions}
          alt="samsolutions company logo"
        />
      </Link>
    </div>
  );
};

export default LogoSam;
