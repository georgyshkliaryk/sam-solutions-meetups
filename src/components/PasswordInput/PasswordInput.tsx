import classNames from "classnames";
import React, { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import "./PasswordInput.scss";

interface IProps {
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  className?: string;
  placeholder?: string;
}

const PasswordInput: React.FC<IProps> = (props): ReactElement => {
  const { t } = useTranslation();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const toggleShowPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordVisible(event.target.checked);
  };
  return (
    <div className={classNames("password-input-wrapper", props.className)}>
      <input
        type={passwordVisible ? "text" : "password"}
        className="password-input"
        placeholder={props.placeholder}
        id={props.id}
        onChange={props.onChange}
        value={props.value}
        data-cy="password"
      />
      <input
        type="checkbox"
        id="showPassword"
        className="password-input-checkbox"
        onChange={toggleShowPassword}
      />
      <label
        htmlFor="showPassword"
        className="password-input__show-password-icon"
        title={
          passwordVisible
            ? t("htmlTitles.hidePassword")
            : t("htmlTitles.showPassword")
        }
      >
        <span className="material-icons-round">
          {passwordVisible ? "visibility" : "visibility_off"}
        </span>
      </label>
    </div>
  );
};

export default PasswordInput;
