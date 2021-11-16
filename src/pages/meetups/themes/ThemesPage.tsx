import React, { ReactElement } from "react";
import ThemesCard from "../../../components/main/cards/ThemesCard/ThemesCard";
import "./ThemesPage.scss";

const ThemesPage: React.FC = (): ReactElement => {
  return (
    <div className="themes">
      <div className="meetups-quantity">
        <p className="meetups-quantity__text">Тем предложено: 0</p>
        <button className="meetups-quantity__btn">
          <span className="material-icons-round">add</span>Создать тему
        </button>
      </div>
      <ThemesCard />
      <ThemesCard />
      <ThemesCard />
      <ThemesCard />
    </div>
  );
};

export default ThemesPage;
