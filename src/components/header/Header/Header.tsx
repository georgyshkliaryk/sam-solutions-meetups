import React, { ReactElement } from "react";
import "./Header.scss";
import classNames from "classnames";

interface IProps {
  className?: string;
}

const Header: React.FC<IProps> = (props): ReactElement => {
  return (
    <div className={classNames("header", props.className)}>
      {props.children}
    </div>
  );
};

export default Header;
