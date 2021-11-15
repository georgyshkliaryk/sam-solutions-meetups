import React, { ReactElement } from "react";
import { NavItem } from "../../../constants";
import LinkComponent from "../../LinkComponent/LinkComponent";
import "./MainNavbar.scss";

interface IProps {
  items: NavItem[];
}

const MainNavbar: React.FC<IProps> = (props): ReactElement => {
  return (
    <nav className="main-navbar">
      {props.items.map((item: NavItem) => (
        <LinkComponent
          to={item.path}
          className={"link-grey main-link-item"}
          activeClassStyle={"main-link-is-active"}
          key={item.path}
        >
          {item.title}
        </LinkComponent>
      ))}
    </nav>
  );
};

export default MainNavbar;
