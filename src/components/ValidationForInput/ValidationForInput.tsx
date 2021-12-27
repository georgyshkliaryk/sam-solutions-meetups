import classNames from "classnames";
import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import "./ValidationForInput.scss";

interface IProps {
  inputData: string;
}

const ValidationForInput: React.FC<IProps> = (props): ReactElement => {
  const { t } = useTranslation();

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
        &nbsp;{t("inputValidation.common.requiredField")}
      </p>
      <p
        className={classNames("validation-for-input-success", {
          "validation-for-input-visible": props.inputData.trim() !== "",
        })}
      >
        <span className="material-icons-round validation-for-input-icon">
          check_circle
        </span>
        &nbsp;{t("inputValidation.common.requiredField")}
      </p>
    </>
  );
};

export default ValidationForInput;
