import classNames from "classnames";
import { observer } from "mobx-react-lite";
import React, { ReactElement, useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { routes } from "../../constants";
import { StoreContext } from "../../context/StoreContext";
import { ILoginData } from "../../repositories/interfaces/INetworkRepository";
import "./LoginPage.scss";

const LoginPage: React.FC = observer((): ReactElement => {
  const { authStore } = useContext(StoreContext);
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState(false);
  const inputErrorStyle = "login-page-form__input-error";

  if (authStore.isAuthenticated) {
    return <Navigate to={routes.meetups} />;
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
            className={classNames(
              "login-page-form__input",
              validationError && inputErrorStyle
            )}
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
            className={classNames(
              "login-page-form__input",
              validationError && inputErrorStyle
            )}
            placeholder="Пароль"
            id="password-input"
            value={password}
            onChange={handlePasswordChange}
          />
          <p
            className="login-page-form__error-text"
            style={
              validationError
                ? { visibility: "visible" }
                : { visibility: "hidden" }
            }
          >
            <span className="material-icons-round">error_outline</span>&nbsp;
            Неверный логин или пароль!
          </p>
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
});

export default LoginPage;
