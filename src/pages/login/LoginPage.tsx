import classNames from "classnames";
import { observer } from "mobx-react-lite";
import React, { ReactElement, useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import { routes } from "../../constants";
import { StoreContext } from "../../context/StoreContext";
import { ILoginData } from "../../repositories/interfaces/INetworkRepository";
import "./LoginPage.scss";

const LoginPage: React.FC = observer((): ReactElement => {
  const { authStore } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState(false);

  const from = location.state?.from?.pathname ?? routes.meetups;

  if (authStore.isAuthenticated) {
    return <Navigate replace to={from} />;
  }

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
    setValidationError(false);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setValidationError(false);
  };

  const handleLoginAttempt = async (event: React.FormEvent) => {
    event.preventDefault();
    const loginData: ILoginData = {
      username: login,
      password: password,
    };
    await authStore.login(loginData);
    if (authStore.isAuthenticated) {
      navigate(routes.meetups);
    } else {
      setValidationError(true);
    }
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
            className={classNames("login-page-form__input", {
              "login-page-form__input-error": validationError,
            })}
            placeholder="Логин"
            id="login-input"
            value={login}
            onChange={handleLoginChange}
            data-cy="login"
          />
        </div>
        <div className="login-page-form__input-wrapper">
          <label htmlFor="login-password" className="login-page-form__label">
            Введите пароль:
          </label>
          <PasswordInput
            id="password-input"
            onChange={handlePasswordChange}
            value={password}
            className={
              validationError
                ? "login-page-form__input-error login-page-form__input-password"
                : "login-page-form__input-password"
            }
          />
          <p
            className={classNames("login-page-form__error-text", {
              "login-page-form__error-text-visible": validationError,
            })}
          >
            <span className="material-icons-round login-page-form__error-text-icon">
              error_outline
            </span>
            &nbsp; Неверный логин или пароль!
          </p>
        </div>
        <button
          className="login-page-form__submit-button"
          type="submit"
          disabled={login === "" || password === ""}
          data-cy="login-button"
        >
          Войти{" "}
          <span className="material-icons-round login-page-form__submit-button-icon">
            login
          </span>
        </button>
      </form>
    </div>
  );
});

export default LoginPage;
