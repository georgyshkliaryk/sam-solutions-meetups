import classNames from "classnames";
import React, { ReactElement, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LocaleChange from "../../ChangeLocale/LocaleChange";
import ModalWindow from "../../ModalWindow/ModalWindow";
import "./HeaderDropdown.scss";

interface IProps {
  handleLogout: () => void;
}

const HeaderDropdown: React.FC<IProps> = (props): ReactElement => {
  const { t } = useTranslation();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [logoutModalActive, setLogoutModalActive] = useState<boolean>(false);

  const handleDropdownBlur = (e: React.FocusEvent<HTMLDivElement>): void => {
    const currentTarget = e.currentTarget;
    const relatedTarget = e.relatedTarget;

    if (!currentTarget.contains(relatedTarget)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    return () => {
      setIsMenuOpen(false);
    };
  }, []);

  const handleExpandButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoutModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLogoutModalActive(true);
  };

  return (
    <div className="header-dropdown" onBlur={handleDropdownBlur}>
      <button
        className={classNames(
          "header-dropdown-expand-button material-icons-round header-dropdown-expand-button-icon",
          {
            "header-dropdown-expand-button-rotated": isMenuOpen,
          }
        )}
        onClick={handleExpandButtonClick}
        data-cy="header-button-header-dropdown"
      >
        expand_more
      </button>
      {isMenuOpen && (
        <div className="header-dropdown-list" tabIndex={-1}>
          <div className="header-dropdown-list-item">
            <LocaleChange />
          </div>
          <button
            className="header-dropdown-list-item header-dropdown-button-logout"
            onClick={handleLogoutModal}
            data-cy="header-button-logout"
          >
            <span className="material-icons-outlined">logout</span>
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
          data-cy="header-button-logout-confirm"
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
