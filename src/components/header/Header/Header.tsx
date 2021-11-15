import React, { ReactElement } from "react";
import "./Header.scss";
import classNames from "classnames";

interface IProps {
  className?: string;
}

const Header: React.FC<IProps> = (props): ReactElement => {
  return (
    <div className={classNames("header", props.className)}>
      <div className="header-wrapper">{props.children}</div>
    </div>
  );
};

export default Header;
