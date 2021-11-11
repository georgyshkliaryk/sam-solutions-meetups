import React, { ReactElement } from "react";
import "./Navbar.scss";
import { NavItem } from "../../constants";
import LinkComponent from "../LinkComponent/LinkComponent";

interface IProps {
  items: NavItem[];
  style: string[];
}

interface IProps2 {
  to: string;
  styles: string;
  activeClassStyle: string;
  title: string;
}

const Navbar: React.FC<IProps> = (props): ReactElement<IProps2> => {
  return (
    <nav className={props.style[0]}>
      {props.items.map((item: NavItem, i: number) => (
        <div className={props.style[1]} key={i}>
          <LinkComponent
            to={item.path}
            title={item.title}
            styles={"link-white"}
            activeClassStyle={"is-active"}
          />
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
