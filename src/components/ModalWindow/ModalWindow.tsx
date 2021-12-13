import classNames from "classnames";
import React, { ReactElement, useEffect } from "react";
import "./ModalWindow.scss";

interface IProps {
  title: string;
  active: boolean;
  setActive: (active: boolean) => void;
}

const ModalWindow: React.FC<IProps> = (props): ReactElement => {
  useEffect(() => {
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const resetActive = (): void => {
    props.setActive(false);
  };

  const closeOnEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      resetActive();
    }
  };

  return (
    <div
      className={classNames("modal-wrapper", {
        "modal-wrapper-active": props.active,
      })}
    >
      <div className="modal-cover" onClick={resetActive}></div>
      <div className="modal">
        <button className="modal-close" onClick={resetActive}>
          <span className="material-icons-round modal-close-icon">close</span>
        </button>
        <p className="modal-title">{props.title}</p>
        <div className="modal-buttons">{props.children}</div>
      </div>
    </div>
  );
};

export default ModalWindow;
