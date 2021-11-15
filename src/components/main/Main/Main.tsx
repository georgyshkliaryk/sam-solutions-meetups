import React, { ReactElement } from "react";
import "./Main.scss";

const Main: React.FC = (props): ReactElement => {
  return (
    <main className="main">
      <div className="main-wrapper">{props.children}</div>
    </main>
  );
};

export default Main;
