import classNames from "classnames";
import React, { Fragment, ReactElement, useContext } from "react";
import { useTranslation } from "react-i18next";
import { languageNames, LOCALES } from "../../constants";
import { StoreContext } from "../../context/StoreContext";

import "./LocaleChange.scss";

interface IProps {
  styles: string;
}

const LocaleChange: React.FC<IProps> = (props): ReactElement => {
  const { t, i18n } = useTranslation();
  const { notificationsStore } = useContext(StoreContext);

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
    <>
      <p
        className={classNames(
          props.styles === "login"
            ? "locale-change-language-title-login"
            : "locale-change-language-title"
        )}
      >
        {t("inputLabels.changeLanguage")}:
      </p>
      <fieldset
        className={classNames(
          props.styles === "login"
            ? "locale-change-language-buttons-login"
            : "locale-change-language-buttons"
        )}
      >
        {LOCALES.map((locale: string) => (
          <Fragment key={locale}>
            <input
              className="locale-change-language-buttons-input"
              type="radio"
              id={`language_${locale}`}
              name="changeLang"
              value={locale}
              checked={i18n.language === locale}
              onChange={handleLanguageChange}
            />
            <label
              htmlFor={`language_${locale}`}
              className={classNames(
                props.styles === "login"
                  ? "locale-change-language-buttons-label-login"
                  : "locale-change-language-buttons-label"
              )}
            >
              {locale.toUpperCase()}
            </label>
          </Fragment>
        ))}
      </fieldset>
    </>
  );
};

export default LocaleChange;
