import React, { ReactElement } from "react";
import "./Navbar.scss";
import { NavItem } from "../../constants";
import LinkComponent from "../LinkComponent/LinkComponent";

interface IProps {
  items: NavItem[];
  styles: string[];
  containerWidth?: string;
  color: string;
  active?: string;
}

const Navbar: React.FC<IProps> = (props): ReactElement => {
  return (
    <nav className={props.styles[0]} style={{ width: props.containerWidth }}>
      {props.items.map((item: NavItem, i: number) => (
        <LinkComponent
          to={item.path}
          styles={`${props.color} ${props.styles[1]}`}
          activeClassStyle={props.active}
          key={i}
        >
          {item.title}
        </LinkComponent>
      ))}
    </nav>
  );
};

export default Navbar;
