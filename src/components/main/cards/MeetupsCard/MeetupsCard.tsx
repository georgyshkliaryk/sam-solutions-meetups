import React, { ReactElement, useContext, useEffect, useState } from "react";
import { IMeetup } from "../../../../repositories/interfaces/IMeetupsRepository";
import Avatar from "../../../Avatar/Avatar";
import "./MeetupsCard.scss";
import dateFormat from "dateformat";
import LinkComponent from "../../../LinkComponent/LinkComponent";
import { routes } from "../../../../constants";
import { StoreContext } from "../../../../context/StoreContext";
import ModalWindow from "../../../ModalWindow/ModalWindow";
import { observer } from "mobx-react-lite";
import { IParticipant } from "../../../../repositories/interfaces/INetworkRepository";
import { Navigate } from "react-router-dom";
import { toJS } from "mobx";

interface IProps {
  item: IMeetup;
  editRights: boolean;
  type: string;
  participants?: IParticipant[];
}

const MeetupsCard: React.FC<IProps> = observer((props): ReactElement => {
  const { meetupsStore, authStore } = useContext(StoreContext);
  const author = {
    name: props.item.authorName,
    surname: props.item.authorSurname,
  };
  const [modalActive, setModalActive] = useState<boolean>(false);

  if (authStore.user === undefined) {
    return <Navigate to={routes.login} />;
  }

  const isParticipating = (participants: IParticipant[], id: string) => {
    return participants.some((p: IParticipant) => p.id === id);
  };

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
        {props.type === routes.future &&
          (props.participants !== undefined ? (
            isParticipating(props.participants, authStore.user.id) ? (
              <button>Иду</button>
            ) : (
              <button>Пойду</button>
            )
          ) : (
            <div>Загурузка...</div>
          ))}
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
});

export default MeetupsCard;
