import React, { ReactElement } from "react";
import "./Navbar.scss";
import { NavItem } from "../../constants";
import LinkComponent from "../LinkComponent/LinkComponent";

interface IProps {
  items: NavItem[];
  style: string[];
}

const Navbar: React.FC<IProps> = (props): ReactElement => {
  return (
    <nav className={props.style[0]}>
      {props.items.map((item: NavItem, i: number) => (
        <div className={props.style[1]} key={i}>
          <LinkComponent
            to={item.path}
            styles={"link-white header-link-item"}
            activeClassStyle={"header-link-is-active"}
          >
            {item.title}
          </LinkComponent>
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
