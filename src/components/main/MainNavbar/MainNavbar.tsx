import React, { ReactElement } from "react";
import { NavItem } from "../../../constants";
import LinkComponent from "../../LinkComponent/LinkComponent";
import "./MainNavbar.scss";

interface IProps {
  items: NavItem[];
}

const MainNavbar: React.FC<IProps> = (props): ReactElement => {
  return (
    <nav className="main__navbar">
      {props.items.map((item: NavItem) => (
        <LinkComponent
          to={item.path}
          className="link-grey main__navbar-link-item"
          activeClassName="main__navbar-link-item-is-active"
          key={item.path}
        >
          {item.title}
        </LinkComponent>
      ))}
    </nav>
  );
};

export default MainNavbar;
