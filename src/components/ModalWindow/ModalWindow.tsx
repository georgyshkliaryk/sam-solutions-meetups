import classNames from "classnames";
import React, { ReactElement } from "react";
import "./ModalWindow.scss";

interface IProps {
  title: string;
  active: boolean;
  setActive: (active: boolean) => void;
}

const ModalWindow: React.FC<IProps> = (props): ReactElement => {
  const resetActive = (): void => {
    props.setActive(false);
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
