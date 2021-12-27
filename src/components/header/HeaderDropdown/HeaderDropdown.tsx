import classNames from "classnames";
import React, {
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { languageNames, LOCALES } from "../../../constants";
import { StoreContext } from "../../../context/StoreContext";
import ModalWindow from "../../ModalWindow/ModalWindow";
import "./HeaderDropdown.scss";

interface IProps {
  handleLogout: () => void;
}

const HeaderDropdown: React.FC<IProps> = (props): ReactElement => {
  const { t, i18n } = useTranslation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerDropdownRef = useRef<HTMLDivElement>(null);
  const [logoutModalActive, setLogoutModalActive] = useState<boolean>(false);
  const { notificationsStore } = useContext(StoreContext);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        isMenuOpen &&
        headerDropdownRef.current &&
        !headerDropdownRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isMenuOpen]);

  const handleExpandButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
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
    <div className="header-dropdown" ref={headerDropdownRef}>
      <button
        className={classNames("header-dropdown-expand-button", {
          "header-dropdown-expand-button-rotated": isMenuOpen,
        })}
        onClick={handleExpandButtonClick}
      >
        <span className="material-icons-round header-dropdown-expand-button-icon">
          expand_more
        </span>
      </button>
      {isMenuOpen && (
        <div className="header-dropdown-list">
          <div className="header-dropdown-list-item">
            <p className="header-dropdown-list-item-change-language-title">
              Сменить язык:
            </p>
            <fieldset className="header-dropdown-list-item-change-language-buttons">
              <input
                className="header-dropdown-list-item-change-language-buttons-input"
                type="radio"
                id="language1"
                name="changeLang"
                value={LOCALES.RU}
                checked={i18n.language === LOCALES.RU}
                onChange={handleLanguageChange}
              />
              <label
                htmlFor="language1"
                className="header-dropdown-list-item-change-language-buttons-label"
              >
                RU
              </label>
              <input
                className="header-dropdown-list-item-change-language-buttons-input"
                type="radio"
                id="language2"
                name="changeLang"
                value={LOCALES.EN}
                checked={i18n.language === LOCALES.EN}
                onChange={handleLanguageChange}
              />
              <label
                htmlFor="language2"
                className="header-dropdown-list-item-change-language-buttons-label"
              >
                EN
              </label>
              <input
                className="header-dropdown-list-item-change-language-buttons-input"
                type="radio"
                id="language3"
                name="changeLang"
                value={LOCALES.DE}
                checked={i18n.language === LOCALES.DE}
                onChange={handleLanguageChange}
              />
              <label
                htmlFor="language3"
                className="header-dropdown-list-item-change-language-buttons-label"
              >
                DE
              </label>
            </fieldset>
          </div>
          <button
            className="header-dropdown-list-item header-dropdown-button-logout"
            onClick={() => setLogoutModalActive(true)}
          >
            {t("buttons.authButtons.logout")}
          </button>
        </div>
      )}
      <ModalWindow
        active={logoutModalActive}
        setActive={setLogoutModalActive}
        title={t("modalWindow.titles.logout")}
      >
        <button
          className="meetups-card-modal-buttons__delete"
          onClick={props.handleLogout}
          data-cy="meetup-card-modal-button-delete"
        >
          {t("modalWindow.buttons.logout")}
        </button>
        <button
          className="meetups-card-modal-buttons__cancel"
          onClick={() => setLogoutModalActive(false)}
        >
          {t("modalWindow.buttons.cancel")}
        </button>
      </ModalWindow>
    </div>
  );
};

export default HeaderDropdown;
