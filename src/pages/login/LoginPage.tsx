import React, { ReactElement, useState } from "react";
import "./LoginPage.scss";

const LoginPage: React.FC = (): ReactElement => {
  const loginRef = React.createRef<HTMLInputElement>();
  const passwordRef = React.createRef<HTMLInputElement>();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleInputChange = () => {
    if (loginRef.current?.value === "" || passwordRef.current?.value === "") {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-page-form">
        <p className="login-page-form__title">Войдите для просмотра митапов:</p>
        <div className="login-page-form__input-wrapper">
          <label htmlFor="login-input" className="login-page-form__label">
            Введите имя пользователя:
          </label>
          <input
            type="text"
            className="login-page-form__input"
            placeholder="Логин"
            id="login-input"
            ref={loginRef}
            onChange={handleInputChange}
          />
        </div>
        <div className="login-page-form__input-wrapper">
          <label htmlFor="login-password" className="login-page-form__label">
            Введите пароль:
          </label>
          <input
            type="password"
            className="login-page-form__input"
            placeholder="Пароль"
            id="password-input"
            ref={passwordRef}
            onChange={handleInputChange}
          />
        </div>
        <button
          className="login-page-form__submit-button"
          type="submit"
          disabled={isSubmitDisabled}
        >
          Войти <span className="material-icons-round">login</span>
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
