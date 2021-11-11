import React, { ReactElement } from "react";
import "./LogoSam.scss";
import LogoSamSolutions from "./assets/logoSam.svg";
import { routes } from "../../constants";
import LinkComponent from "../LinkComponent/LinkComponent";

const LogoSam: React.FC = (): ReactElement => {
  return (
    <div className="header-logo-wrapper">
      {/* <Link to={routes.meetups.themes}>
        <img
          className="header-logo-wrapper__img"
          src={LogoSamSolutions}
          alt="samsolutions company logo"
        />
      </Link> */}
      <LinkComponent to={routes.meetups.themes}>
        <img
          className="header-logo-wrapper__img"
          src={LogoSamSolutions}
          alt="samsolutions company logo"
        />
      </LinkComponent>
    </div>
  );
};

export default LogoSam;
