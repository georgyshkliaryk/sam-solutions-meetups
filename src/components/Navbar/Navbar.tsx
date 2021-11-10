import React, { ReactElement } from "react";
import "./Navbar.scss";

const Navbar: React.FC = (): ReactElement => {
  return (
    <div className="navbar">
      <div className="navbar__item">Митапы</div>
      <div className="navbar__item">Новости</div>
    </div>
  );
};

export default Navbar;
