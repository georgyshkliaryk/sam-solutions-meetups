import React, { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import Loader from "react-loader-spinner";
import { loadingColor, NumberDeclination } from "../../../../constants";
import { numberDeclination } from "../../../../helpers/declination";
import { IMeetup } from "../../../../repositories/interfaces/IMeetupsRepository";
import {
  IParticipant,
  IUser,
} from "../../../../repositories/interfaces/INetworkRepository";
import Avatar from "../../../Avatar/Avatar";
import LinkComponent from "../../../LinkComponent/LinkComponent";
import ModalWindow from "../../../ModalWindow/ModalWindow";
import "./ThemesCard.scss";

interface IProps {
  item: IMeetup;
  editRights: boolean;
  voted?: IParticipant[];
  buttonInLoading?: string;
  user: IUser;
  deleteTheme: (id: string) => void;
  voteForTheme?: (id: string) => void;
  unvoteForTheme?: (id: string) => void;
}

const ThemesCard: React.FC<IProps> = (props): ReactElement => {
  const author = {
    name: props.item.authorName,
    surname: props.item.authorSurname,
  };
  const [modalActive, setModalActive] = useState<boolean>(false);
  const { t } = useTranslation();

  const isVoted = (voted: IParticipant[], id: string): boolean => {
    return voted.some((p: IParticipant): boolean => p.id === id);
  };

  const handleVoteForTheme = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (props.voteForTheme !== undefined) {
      props.voteForTheme(props.item.id);
    }
  };

  const handleUnvoteForTheme = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (props.user !== undefined && props.unvoteForTheme !== undefined) {
      props.unvoteForTheme(props.item.id);
    }
  };

  return (
    <article className="themes-card">
      <div className="themes-card-header">
        <Avatar className="themes-card-header__avatar" user={author} />
        <span className="themes-card-header__username">
          {props.item.authorName} {props.item.authorSurname}
        </span>
      </div>
      <LinkComponent to={props.item.id} className="themes-card-main">
        <p className="themes-card-main__title" data-cy="theme-card-title">
          {props.item.title}
        </p>
        <p
          className="themes-card-main__description"
          data-cy="theme-card-description"
        >
          {props.item.description}
        </p>
      </LinkComponent>
      <div className="themes-card-footer">
        <div>
          {props.voted !== undefined && (
            <p className="themes-card-footer-support">
              <span className="material-icons-round">person</span>
              {numberDeclination(
                props.voted.length,
                NumberDeclination.votedUsers
              )}
            </p>
          )}
        </div>
        <div>
          {props.voted !== undefined ? (
            isVoted(props.voted, props.user.id) ? (
              <button
                onClick={handleUnvoteForTheme}
                className="themes-card-footer__button-participating"
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
                    <span className="material-icons-round themes-card-footer__button-participating-icon">
                      check_circle_outline
                    </span>
                    <span>{t("buttons.cardButtons.unvoteForTheme")}</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleVoteForTheme}
                className="themes-card-footer__button-not-participating"
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
                  <span>{t("buttons.cardButtons.voteForTheme")}</span>
                )}
              </button>
            )
          ) : (
            <div className="themes-card-footer__button-loading">
              <Loader
                type="ThreeDots"
                color={loadingColor}
                height="0.8rem"
                width={30}
              />
            </div>
          )}
        </div>
      </div>
      <ModalWindow
        active={modalActive}
        setActive={setModalActive}
        title={t("modalWindow.titles.deleteTheme")}
      >
        <button
          className="themes-card-modal-buttons__delete"
          onClick={() => props.deleteTheme(props.item.id)}
        >
          {t("modalWindow.buttons.delete")}
        </button>
        <button
          className="themes-card-modal-buttons__cancel"
          onClick={() => setModalActive(false)}
        >
          {t("modalWindow.buttons.cancel")}
        </button>
      </ModalWindow>
      {props.editRights && (
        <button
          className="themes-card-delete-button"
          title={t("htmlTitles.deleteTheme")}
          onClick={() => setModalActive(true)}
        >
          <span className="material-icons-outlined">delete</span>
        </button>
      )}
    </article>
  );
};

export default ThemesCard;
