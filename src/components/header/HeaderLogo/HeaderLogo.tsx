import React, { ReactElement } from "react";
import "./HeaderLogo.scss";
import headerLogo from "./assets/header_logo.png";

const HeaderLogo: React.FC = (): ReactElement => {
  return (
    <div className="header-logo-wrapper">
      <img
        className="header-logo-wrapper__img"
        src={headerLogo}
        alt="header-logo"
      />
    </div>
  );
};

export default HeaderLogo;
