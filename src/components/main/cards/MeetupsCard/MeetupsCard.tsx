import React, { ReactElement, useContext, useState } from "react";
import { IMeetup } from "../../../../repositories/interfaces/IMeetupsRepository";
import Avatar from "../../../Avatar/Avatar";
import "./MeetupsCard.scss";
import dateFormat from "dateformat";
import LinkComponent from "../../../LinkComponent/LinkComponent";
import { routes } from "../../../../constants";
import { StoreContext } from "../../../../context/StoreContext";
import ModalWindow from "../../../ModalWindow/ModalWindow";

interface IProps {
  item: IMeetup;
  editRights: boolean;
  type: string;
}

const MeetupsCard: React.FC<IProps> = (props): ReactElement => {
  const { meetupsStore } = useContext(StoreContext);
  const author = {
    name: props.item.authorName,
    surname: props.item.authorSurname,
  };
  const [modalActive, setModalActive] = useState<boolean>(false);

  return (
    <article className="meetups-card">
      <p className="meetups-card-header">
        <time dateTime={props.item.start}>
          {props.item.start
            ? dateFormat(props.item.start, "ddd, d mmmm • H:MM")
            : "–"}
        </time>
        &nbsp;
        {props.item.place && " • " + props.item.place}
      </p>
      <LinkComponent to={props.item.id} className="meetups-card-main">
        <p className="meetups-card-main__title">{props.item.title}</p>
        <p className="meetups-card-main__description">
          {props.item.description}
        </p>
      </LinkComponent>
      <div className="meetups-card-footer">
        <div className="meetups-card-footer-author">
          <Avatar className="meetups-card-footer__avatar" user={author} />
          <span className="meetups-card-footer__username">
            {props.item.authorName} {props.item.authorSurname}
          </span>
        </div>
        {props.type === routes.future && <button>Пойду</button>}
      </div>
      <ModalWindow
        active={modalActive}
        setActive={setModalActive}
        title="Удалить митап?"
      >
        <button
          className="meetups-card-modal-buttons__delete"
          onClick={() => meetupsStore.deleteMeetup(props.item.id)}
        >
          Удалить
        </button>
        <button
          className="meetups-card-modal-buttons__cancel"
          onClick={() => setModalActive(false)}
        >
          Отмена
        </button>
      </ModalWindow>
      {props.editRights && (
        <div className="meetups-card-buttons">
          <button
            className="meetups-card-delete-button"
            title="Удалить митап"
            onClick={() => setModalActive(true)}
          >
            <span className="material-icons-outlined">delete</span>
          </button>
          <LinkComponent
            to={`${routes.meetups}/${props.type}/${props.item.id}/edit`}
            className="meetups-card-edit-button"
          >
            <span
              className="material-icons-outlined"
              title="Редактировать митап"
            >
              edit
            </span>
          </LinkComponent>
        </div>
      )}
    </article>
  );
};

export default MeetupsCard;
