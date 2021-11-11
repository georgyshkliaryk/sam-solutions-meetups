import React, { ReactElement } from "react";
import "./HeaderLogo.scss";
import headerLogo from "./assets/header_logo.png";
import { Link } from "react-router-dom";
import { routes } from "../../../constants";

const HeaderLogo: React.FC = (): ReactElement => {
  return (
    <div className="header-logo-wrapper">
      <Link to={routes.meetups.themes}>
        <img
          className="header-logo-wrapper__img"
          src={headerLogo}
          alt="header-logo"
        />
      </Link>
    </div>
  );
};

export default HeaderLogo;
