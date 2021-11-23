import React, { ReactElement } from "react";
import "./LoginPage.scss";

const LoginPage: React.FC = (): ReactElement => {
  return (
    <div className="login-page">
      <form className="login-page-container">
        <p className="login-page-container__title">
          Войдите для просмотра митапов:
        </p>
        <div className="login-page-container__input-wrapper">
          <label htmlFor="login-input" className="login-page-container__label">
            Введите имя пользователя:
          </label>
          <input
            type="text"
            className="login-page-container__input"
            placeholder="Логин"
            id="login-input"
          />
        </div>
        <div className="login-page-container__input-wrapper">
          <label
            htmlFor="login-password"
            className="login-page-container__label"
          >
            Введите пароль:
          </label>
          <input
            type="password"
            className="login-page-container__input"
            placeholder="Пароль"
            id="password-input"
          />
        </div>
        <button
          className="login-page-container__submit-button"
          type="submit"
          disabled
        >
          Войти <span className="material-icons-round">login</span>
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
