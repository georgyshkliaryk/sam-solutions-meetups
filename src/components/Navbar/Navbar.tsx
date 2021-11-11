import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { routes } from "../../constants";

const Navbar: React.FC = (props): ReactElement => {
  return (
    <div className="navbar">
      <div className="navbar__item">
        <Link to={routes.meetups.themes} className="link-white">
          Митапы
        </Link>
      </div>
      <div className="navbar__item">
        <Link to={routes.news} className="link-white">
          Новости
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
