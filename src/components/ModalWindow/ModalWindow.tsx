import classNames from "classnames";
import React, { ReactElement } from "react";
import "./ModalWindow.scss";

interface IProps {
  title: string;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>; //func
}

const ModalWindow: React.FC<IProps> = (props): ReactElement => {
  return (
    <div
      className={classNames("modal-wrapper", {
        "modal-wrapper-active": props.active,
      })}
      onClick={() => props.setActive(false)}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => props.setActive(false)}>
          <span className="material-icons-round modal-close-icon">close</span>
        </button>
        <p className="modal-title">{props.title}</p>
        <div className="modal-buttons">{props.children}</div>
      </div>
    </div>
  );
};

export default ModalWindow;
