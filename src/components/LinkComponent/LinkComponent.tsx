import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import "./LinkComponent.scss";

interface IProps {
  to: string;
  styles: string;
  activeClassStyle: string;
  title: string;
}

const LinkComponent: React.FC<IProps> = (props): ReactElement => {
  return (
    <div className="link">
      <NavLink
        to={props.to}
        activeClassName={props.activeClassStyle}
        className={props.styles}
      >
        {props.title}
      </NavLink>
    </div>
  );
};

export default LinkComponent;
