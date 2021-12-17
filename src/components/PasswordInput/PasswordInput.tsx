import classNames from "classnames";
import React, { ReactElement, useState } from "react";
import "./PasswordInput.scss";

interface IProps {
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  className?: string;
}

const PasswordInput: React.FC<IProps> = (props): ReactElement => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const toggleShowPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordVisible(event.target.checked);
  };
  return (
    <div className={classNames("password-input-wrapper", props.className)}>
      <input
        type={passwordVisible ? "text" : "password"}
        className="password-input"
        placeholder="Пароль"
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
        title={passwordVisible ? "Скрыть пароль" : "Показать пароль"}
      >
        <span className="material-icons-round">
          {passwordVisible ? "visibility_off" : "visibility"}
        </span>
      </label>
    </div>
  );
};

export default PasswordInput;
