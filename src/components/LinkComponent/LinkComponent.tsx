import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import "./LinkComponent.scss";

interface IProps {
  to: string;
  className?: string;
  activeClassName?: string;
}

const LinkComponent: React.FC<IProps> = (props): ReactElement => {
  return (
    <NavLink
      to={props.to}
      activeClassName={props.activeClassName}
      className={props.className}
    >
      {props.children}
    </NavLink>
  );
};

export default LinkComponent;
