import classNames from "classnames";
import React, { ReactElement, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LocaleChange from "../../LocaleChange/LocaleChange";
import ModalWindow from "../../ModalWindow/ModalWindow";
import "./HeaderDropdown.scss";

interface IProps {
  handleLogout: () => void;
}

const HeaderDropdown: React.FC<IProps> = (props): ReactElement => {
  const { t } = useTranslation();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [logoutModalActive, setLogoutModalActive] = useState<boolean>(false);
  const [blurTimerId, setBlurTimerId] = useState<number>(0);

  const handleDropdownBlur = (e: React.FocusEvent<HTMLDivElement>): void => {
    const currentTarget = e.currentTarget;
    setBlurTimerId(
      window.setTimeout(() => {
        if (!currentTarget.contains(document.activeElement)) {
          setIsMenuOpen(false);
        }
      }, 100)
    );
  };

  useEffect(() => {
    //cleanup
    return () => {
      window.clearTimeout(blurTimerId);
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
    <div className="header-dropdown" onBlur={handleDropdownBlur} tabIndex={0}>
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
            <LocaleChange />
          </div>
          <button
            className="header-dropdown-list-item header-dropdown-button-logout"
            onClick={handleLogoutModal}
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
