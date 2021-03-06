import React, { ReactElement } from "react";
import { NavItem } from "../../../constants";
import LinkComponent from "../../LinkComponent/LinkComponent";
import "./MainNavbar.scss";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

interface IProps {
  items: NavItem[];
  className?: string;
}

const MainNavbar: React.FC<IProps> = (props): ReactElement => {
  const { t } = useTranslation();

  return (
    <nav className={classNames("main__navbar", props.className)}>
      {props.items.map((item: NavItem) => (
        <LinkComponent
          to={item.path}
          className="link-grey main__navbar-link-item"
          activeClassName="main__navbar-link-item-is-active"
          key={item.path}
        >
          {t(item.title)}
        </LinkComponent>
      ))}
    </nav>
  );
};

export default MainNavbar;
