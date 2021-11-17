import React, { ReactElement } from "react";
import "./MeetupsQuantity.scss";

interface IProps {
  meetupsNumber: number;
  text: string;
  btn?: boolean;
}

const componentName: React.FC<IProps> = (props): ReactElement => {
  return (
    <div className="meetups-quantity">
      <p className="meetups-quantity__text">
        {props.text} {props.meetupsNumber}
      </p>
      {props.btn && (
        <button className="meetups-quantity__btn">
          <span className="material-icons-round">add</span>Создать тему
        </button>
      )}
    </div>
  );
};

export default componentName;
