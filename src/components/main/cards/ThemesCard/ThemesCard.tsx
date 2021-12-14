import React, { ReactElement, useContext, useState } from "react";
import { NumberDeclination } from "../../../../constants";
import { StoreContext } from "../../../../context/StoreContext";
import { numberDeclination } from "../../../../helpers/declination";
import { IMeetup } from "../../../../repositories/interfaces/IMeetupsRepository";
import Avatar from "../../../Avatar/Avatar";
import LinkComponent from "../../../LinkComponent/LinkComponent";
import ModalWindow from "../../../ModalWindow/ModalWindow";
import "./ThemesCard.scss";

interface IProps {
  item: IMeetup;
  editRights: boolean;
}

const ThemesCard: React.FC<IProps> = (props): ReactElement => {
  const { meetupsStore } = useContext(StoreContext);
  const author = {
    name: props.item.authorName,
    surname: props.item.authorSurname,
  };
  const [modalActive, setModalActive] = useState<boolean>(false);

  return (
    <article className="themes-card">
      <div className="themes-card-header">
        <Avatar className="themes-card-header__avatar" user={author} />
        <span className="themes-card-header__username">
          {props.item.authorName} {props.item.authorSurname}
        </span>
      </div>
      <LinkComponent to={props.item.id} className="themes-card-main">
        <p className="themes-card-main__title">{props.item.title}</p>
        <p className="themes-card-main__description">
          {props.item.description}
        </p>
      </LinkComponent>
      <div className="themes-card-footer">
        <p className="themes-card-footer-support">
          <span className="material-icons-round">person</span>
          {numberDeclination(
            props.item.goCount,
            NumberDeclination.participants
          )}
        </p>
      </div>
      <ModalWindow
        active={modalActive}
        setActive={setModalActive}
        title="Удалить тему?"
      >
        <button
          className="themes-card-modal-buttons__delete"
          onClick={() => meetupsStore.deleteMeetup(props.item.id)}
        >
          Удалить
        </button>
        <button
          className="themes-card-modal-buttons__cancel"
          onClick={() => setModalActive(false)}
        >
          Отмена
        </button>
      </ModalWindow>
      {props.editRights && (
        <button
          className="themes-card-delete-button"
          title="Удалить тему"
          onClick={() => setModalActive(true)}
        >
          <span className="material-icons-outlined">delete</span>
        </button>
      )}
    </article>
  );
};

export default ThemesCard;
