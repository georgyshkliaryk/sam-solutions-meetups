import React, { ReactElement } from "react";
import "./ThemesPage.scss";

const ThemesPage: React.FC = (): ReactElement => {
  return (
    <div className="themes">
      <div className="meetups-quantity">
        <p className="meetups-quantity__text">Тем предложено: 0</p>
        <button className="meetups-quantity__btn">Создать тему</button>
      </div>
    </div>
  );
};

export default ThemesPage;
