import classNames from "classnames";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import LocaleChange from "../../LocaleChange/LocaleChange";
import ModalWindow from "../../ModalWindow/ModalWindow";
import "./HeaderDropdown.scss";

interface IProps {
  handleLogout: () => void;
}

const HeaderDropdown: React.FC<IProps> = (props): ReactElement => {
  const { t } = useTranslation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerDropdownRef = useRef<HTMLDivElement>(null);
  const [logoutModalActive, setLogoutModalActive] = useState<boolean>(false);

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
            <LocaleChange styles="header" />
          </div>
          <button
            className="header-dropdown-list-item header-dropdown-button-logout"
            onClick={() => setLogoutModalActive(true)}
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
