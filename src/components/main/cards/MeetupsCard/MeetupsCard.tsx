import React, { ReactElement, useState } from "react";
import { IMeetup } from "../../../../repositories/interfaces/IMeetupsRepository";
import Avatar from "../../../Avatar/Avatar";
import "./MeetupsCard.scss";
import LinkComponent from "../../../LinkComponent/LinkComponent";
import {
  loadingColor,
  MeetupPageTypes,
  NumberDeclination,
  routes,
} from "../../../../constants";
import ModalWindow from "../../../ModalWindow/ModalWindow";
import { observer } from "mobx-react-lite";
import {
  IParticipant,
  IUser,
} from "../../../../repositories/interfaces/INetworkRepository";
import Loader from "react-loader-spinner";
import { numberDeclination } from "../../../../helpers/declination";
import { useTranslation } from "react-i18next";
import { fullDateTimeLocalization } from "../../../../helpers/dateTimeLocalization";
import { truncText } from "../../../../helpers/truncText";

interface IProps {
  item: IMeetup;
  editRights: boolean;
  type: string;
  participants?: IParticipant[];
  buttonInLoading?: string;
  user: IUser;
  deleteMeetup: (id: string) => void;
  participateInMeetup?: (id: string) => void;
  stopParticipateInMeetup?: (id: string) => void;
}

const MeetupsCard: React.FC<IProps> = observer((props): ReactElement => {
  const author = {
    name: props.item.authorName,
    surname: props.item.authorSurname,
  };
  const [modalActive, setModalActive] = useState<boolean>(false);
  const { t } = useTranslation();

  const isParticipating = (
    participants: IParticipant[],
    id: string
  ): boolean => {
    return participants.some((p: IParticipant): boolean => p.id === id);
  };

  const handleParticipateInMeetup = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (props.participateInMeetup !== undefined) {
      props.participateInMeetup(props.item.id);
    }
  };

  const handleStopParticipateInMeetup = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (
      props.user !== undefined &&
      props.stopParticipateInMeetup !== undefined
    ) {
      props.stopParticipateInMeetup(props.item.id);
    }
  };

  return (
    <article className="meetups-card">
      <p className="meetups-card-header">
        <time dateTime={props.item.start}>
          {props.item.start
            ? fullDateTimeLocalization("short", props.item.start)
            : "???"}
        </time>
        &nbsp;
        {props.item.place && " ??? " + props.item.place}
      </p>
      <LinkComponent to={props.item.id} className="meetups-card-main">
        <p className="meetups-card-main__title" data-cy="meetup-card-title">
          {props.item.title}
        </p>
        <p className="meetups-card-main__description">
          {truncText(360, props.item.description)}
        </p>
      </LinkComponent>
      <div className="meetups-card-footer">
        <div className="meetups-card-footer-author">
          <Avatar className="meetups-card-footer__avatar" user={author} />
          <span className="meetups-card-footer__username">
            {props.item.authorName} {props.item.authorSurname}
          </span>
        </div>
        <div className="meetups-card-footer-buttons">
          {props.type === MeetupPageTypes.FUTURE &&
            props.participants !== undefined && (
              <span>
                {numberDeclination(
                  props.participants.length,
                  NumberDeclination.participants
                )}
              </span>
            )}

          {props.type === MeetupPageTypes.FUTURE &&
            (props.participants !== undefined ? (
              isParticipating(props.participants, props.user.id) ? (
                <button
                  onClick={handleStopParticipateInMeetup}
                  className="meetups-card-footer__button-participating"
                  disabled={props.buttonInLoading === props.item.id}
                >
                  {props.buttonInLoading === props.item.id ? (
                    <Loader
                      type="ThreeDots"
                      color={loadingColor}
                      height="0.8rem"
                      width={30}
                    />
                  ) : (
                    <>
                      <span className="material-icons-round meetups-card-footer__button-participating-icon">
                        check_circle_outline
                      </span>
                      <span>
                        {t("buttons.cardButtons.stopParticipateInMeetup")}
                      </span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleParticipateInMeetup}
                  className="meetups-card-footer__button-not-participating"
                  disabled={props.buttonInLoading === props.item.id}
                >
                  {props.buttonInLoading === props.item.id ? (
                    <Loader
                      type="ThreeDots"
                      color="#FFFFFF"
                      height="0.8rem"
                      width={30}
                    />
                  ) : (
                    <span>{t("buttons.cardButtons.participateInMeetup")}</span>
                  )}
                </button>
              )
            ) : (
              <div className="meetups-card-footer__button-loading">
                <Loader
                  type="ThreeDots"
                  color={loadingColor}
                  height="0.8rem"
                  width={30}
                />
              </div>
            ))}
        </div>
      </div>
      <ModalWindow
        active={modalActive}
        setActive={setModalActive}
        title={t("modalWindow.titles.deleteMeetup")}
      >
        <button
          className="meetups-card-modal-buttons__delete"
          onClick={() => props.deleteMeetup(props.item.id)}
          data-cy="meetup-card-modal-button-delete"
        >
          {t("modalWindow.buttons.delete")}
        </button>
        <button
          className="meetups-card-modal-buttons__cancel"
          onClick={() => setModalActive(false)}
        >
          {t("modalWindow.buttons.cancel")}
        </button>
      </ModalWindow>
      {props.editRights && (
        <div className="meetups-card-buttons">
          <button
            className="meetups-card-delete-button"
            title={t("htmlTitles.deleteMeetup")}
            onClick={() => setModalActive(true)}
            data-cy="meetup-card-button-delete"
          >
            <span className="material-icons-outlined">delete</span>
          </button>
          <LinkComponent
            to={`${routes.meetups}/${props.type.toLowerCase()}/${
              props.item.id
            }/edit`}
            className="meetups-card-edit-button"
          >
            <span
              className="material-icons-outlined"
              title={t("htmlTitles.editMeetup")}
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
