import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { NavItem } from "../../constants";

interface IProps {
  items: NavItem[];
  style: string[];
}

const Navbar: React.FC<IProps> = (props): ReactElement => {
  return (
    <nav className={props.style[0]}>
      {props.items.map((item: NavItem, i: number) => (
        <div className={props.style[1]} key={i}>
          <Link to={item.path} className="link-white">
            {item.title}
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
