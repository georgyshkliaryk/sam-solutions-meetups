import React, { ReactElement, useEffect, useRef, useState } from "react";
import "./HeaderDropdown.scss";

const HeaderDropdown: React.FC = (): ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerDropdownRef = useRef<any>(null);

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
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="header-dropdown" ref={headerDropdownRef}>
      <button
        className="header-dropdown-expand-button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className="material-icons-round header-dropdown-expand-button-icon">
          expand_more
        </span>
      </button>
      {isMenuOpen && (
        <div className="header-dropdown-list">
          <p className="header-dropdown-list-item">choose lng</p>
          <p className="header-dropdown-list-item">logout</p>
        </div>
      )}
    </div>
  );
};

export default HeaderDropdown;
