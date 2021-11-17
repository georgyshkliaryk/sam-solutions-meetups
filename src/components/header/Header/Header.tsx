import React, { ReactElement } from "react";
import "./Header.scss";
import classNames from "classnames";

interface IProps {
  className?: string;
}

const Header: React.FC<IProps> = (props): ReactElement => {
  return (
    <header className={classNames("header", props.className)}>
      <div className="header__wrapper">{props.children}</div>
    </header>
  );
};

export default Header;
