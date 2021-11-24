import React, { ReactElement, useState } from "react";
import { ILoginData } from "../../repositories/interfaces/INetworkRepository";
import { NetworkRepository } from "../../repositories/NetworkRepository/NetworkRepository";
import "./LoginPage.scss";

const LoginPage: React.FC = (): ReactElement => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const networkRepository = new NetworkRepository();

  const handleLoginAttempt = async (event: React.FormEvent) => {
    event.preventDefault();
    const loginData: ILoginData = {
      username: login,
      password: password,
    };
    await networkRepository.login(loginData);
  };

  return (
    <div className="login-page">
      <form className="login-page-form" onSubmit={handleLoginAttempt}>
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
            value={login}
            onChange={handleLoginChange}
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
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button
          className="login-page-form__submit-button"
          type="submit"
          disabled={login === "" || password === ""}
        >
          Войти <span className="material-icons-round">login</span>
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
