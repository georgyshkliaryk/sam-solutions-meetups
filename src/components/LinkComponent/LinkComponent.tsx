import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import "./LinkComponent.scss";
import classNames from "classnames";

interface IProps {
  to: string;
  className?: string;
  activeClassName?: string;
}

const LinkComponent: React.FC<IProps> = (props): ReactElement => {
  return (
    <NavLink
      to={props.to}
      className={({ isActive }) =>
        isActive
          ? classNames(props.activeClassName, props.className)
          : classNames(props.className)
      }
    >
      {props.children}
    </NavLink>
  );
};

export default LinkComponent;
