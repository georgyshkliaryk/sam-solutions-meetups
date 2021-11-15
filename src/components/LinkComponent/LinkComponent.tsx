import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import "./LinkComponent.scss";

interface IProps {
  to: string;
  styles?: string;
  activeClassStyle?: string;
}

const LinkComponent: React.FC<IProps> = (props): ReactElement => {
  return (
    <NavLink
      to={props.to}
      activeClassName={props.activeClassStyle}
      className={props.styles}
    >
      {props.children}
    </NavLink>
  );
};

export default LinkComponent;
