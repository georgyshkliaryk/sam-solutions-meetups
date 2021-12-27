import classNames from "classnames";
import { observer } from "mobx-react-lite";
import React, { ReactElement, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import { languageNames, LOCALES, routes } from "../../constants";
import { StoreContext } from "../../context/StoreContext";
import { ILoginData } from "../../repositories/interfaces/INetworkRepository";
import "./LoginPage.scss";

const LoginPage: React.FC = observer((): ReactElement => {
  const { t, i18n } = useTranslation();

  const { authStore, notificationsStore } = useContext(StoreContext);
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

  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    i18n.changeLanguage(e.target.value);
    notificationsStore.setNotification({
      type: "info",
      title: t("notifications.titles.info"),
      description: `${t(
        "notifications.descriptions.languageChangedSuccess"
      )}: ${languageNames[e.target.value]}`,
    });
  };

  return (
    <div className="login-page">
      <form className="login-page-form" onSubmit={handleLoginAttempt}>
        <p className="login-page-form__title">{t("pageTitles.login")}:</p>
        <div className="login-page-form__input-wrapper">
          <label htmlFor="login-input" className="login-page-form__label">
            {t("inputLabels.loginName")}:
          </label>
          <input
            type="text"
            className={classNames("login-page-form__input", {
              "login-page-form__input-error": validationError,
            })}
            placeholder={t("placeholders.loginName")}
            id="login-input"
            value={login}
            onChange={handleLoginChange}
            data-cy="login"
          />
        </div>
        <div className="login-page-form__input-wrapper">
          <label htmlFor="login-password" className="login-page-form__label">
            {t("inputLabels.loginPassword")}:
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
            placeholder={t("placeholders.loginPassword")}
          />
          <p
            className={classNames("login-page-form__error-text", {
              "login-page-form__error-text-visible": validationError,
            })}
          >
            <span className="material-icons-round login-page-form__error-text-icon">
              error_outline
            </span>
            &nbsp; {t("inputValidation.errors.incorrectLoginOrPassword")}
          </p>
        </div>
        <button
          className="login-page-form__submit-button"
          type="submit"
          disabled={login === "" || password === ""}
          data-cy="login-button"
        >
          {t("buttons.authButtons.login")}{" "}
          <span className="material-icons-round login-page-form__submit-button-icon">
            login
          </span>
        </button>
        <div>
          <p className="login-page-form-change-language-title">
            {t("inputLabels.changeLanguage")}:
          </p>
          <fieldset className="login-page-form-change-language-buttons">
            <input
              className="login-page-form-change-language-buttons-input"
              type="radio"
              id="language1"
              name="changeLang"
              value={LOCALES.RU}
              checked={i18n.language === LOCALES.RU}
              onChange={handleLanguageChange}
            />
            <label
              htmlFor="language1"
              className="login-page-form-change-language-buttons-label"
            >
              RU
            </label>
            <input
              className="login-page-form-change-language-buttons-input"
              type="radio"
              id="language2"
              name="changeLang"
              value={LOCALES.EN}
              checked={i18n.language === LOCALES.EN}
              onChange={handleLanguageChange}
            />
            <label
              htmlFor="language2"
              className="login-page-form-change-language-buttons-label"
            >
              EN
            </label>
            <input
              className="login-page-form-change-language-buttons-input"
              type="radio"
              id="language3"
              name="changeLang"
              value={LOCALES.DE}
              checked={i18n.language === LOCALES.DE}
              onChange={handleLanguageChange}
            />
            <label
              htmlFor="language3"
              className="login-page-form-change-language-buttons-label"
            >
              DE
            </label>
          </fieldset>
        </div>
      </form>
    </div>
  );
});

export default LoginPage;
