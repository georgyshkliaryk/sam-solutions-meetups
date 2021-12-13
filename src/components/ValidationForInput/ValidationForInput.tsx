import classNames from "classnames";
import React, { ReactElement } from "react";
import "./ValidationForInput.scss";

interface IProps {
  inputData: string;
}

const ValidationForInput: React.FC<IProps> = (props): ReactElement => {
  return (
    <>
      <p
        className={classNames("validation-for-input", {
          "validation-for-input-visible": props.inputData.trim() === "",
        })}
      >
        <span className="material-icons-round validation-for-input-icon">
          error_outline
        </span>
        &nbsp;Обязательное поле
      </p>
      <p
        className={classNames("validation-for-input-success", {
          "validation-for-input-visible": props.inputData.trim() !== "",
        })}
      >
        <span className="material-icons-round validation-for-input-icon">
          check_circle
        </span>
        &nbsp;Обязательное поле
      </p>
    </>
  );
};

export default ValidationForInput;
