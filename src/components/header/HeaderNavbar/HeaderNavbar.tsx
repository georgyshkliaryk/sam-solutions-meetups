import React, { ReactElement } from "react";
import { NavItem } from "../../../constants";
import LinkComponent from "../../LinkComponent/LinkComponent";
import "./HeaderNavbar.scss";

import { useTranslation } from "react-i18next";

interface IProps {
  items: NavItem[];
}

const HeaderNavbar: React.FC<IProps> = (props): ReactElement => {
  const { t } = useTranslation();

  return (
    <nav className="header__navbar">
      {props.items.map((item: NavItem) => (
        <LinkComponent
          to={item.path}
          className="link-white header__navbar-link-item"
          activeClassName="header__navbar-link-item-is-active"
          key={item.path}
        >
          {t(item.title)}
        </LinkComponent>
      ))}
    </nav>
  );
};

export default HeaderNavbar;
