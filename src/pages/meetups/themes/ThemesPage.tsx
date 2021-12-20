import { observer } from "mobx-react-lite";
import React, { ReactElement, useContext, useEffect } from "react";
import { Navigate } from "react-router";
import LinkComponent from "../../../components/LinkComponent/LinkComponent";
import ThemesCard from "../../../components/main/cards/ThemesCard/ThemesCard";
import { NumberDeclination, routes } from "../../../constants";
import { StoreContext } from "../../../context/StoreContext";
import { hasUserRights } from "../../../helpers/hasUserRights";
import { numberDeclination } from "../../../helpers/declination";
import { IMeetup } from "../../../repositories/interfaces/IMeetupsRepository";
import "./ThemesPage.scss";

const ThemesPage: React.FC = observer((): ReactElement => {
  const { authStore, meetupsStore } = useContext(StoreContext);
  const currentUser = authStore.user;

  useEffect(() => {
    if (meetupsStore.themes.length > 0) {
      meetupsStore.themes.forEach(async (m: IMeetup) => {
        await meetupsStore.fetchVotedUsers(m.id);
      });
    }
  }, [meetupsStore, meetupsStore.future]);

  const handleDeleteTheme = (id: string) => {
    meetupsStore.deleteMeetup(id);
  };

  const handleVoteForTheme = async (id: string) => {
    await meetupsStore.voteForTheme(id);
  };

  const handleUnvoteForTheme = async (id: string) => {
    if (currentUser !== undefined) {
      await meetupsStore.unvoteForTheme(id, currentUser.id);
    }
  };

  if (currentUser === undefined) {
    return <Navigate to={routes.login} />;
  }

  return (
    <section className="themes-page">
      <div className="themes-page-meetups-quantity">
        <p className="themes-page-meetups-quantity__text">
          {numberDeclination(
            meetupsStore.themes.length,
            NumberDeclination.themes
          )}
        </p>
        <LinkComponent
          className="themes-page-meetups-quantity__button"
          to={`${routes.meetups}/${routes.create}`}
        >
          <span className="material-icons-round" data-cy="create-meetup-button">
            add
          </span>
          Создать тему
        </LinkComponent>
      </div>
      <div className="themes-page-wrapper">
        {meetupsStore.themes.map((card: IMeetup) => (
          <ThemesCard
            key={card.id}
            item={card}
            editRights={hasUserRights(currentUser, card)}
            deleteTheme={handleDeleteTheme}
            loadingState={meetupsStore.loadingState}
            user={currentUser}
            voted={meetupsStore.votedUsersMap.get(card.id)}
            voteForTheme={handleVoteForTheme}
            unvoteForTheme={handleUnvoteForTheme}
          />
        ))}
      </div>
    </section>
  );
});

export default ThemesPage;
