import React, { ReactElement } from "react";
import ThemesCard from "../../../components/main/cards/ThemesCard/ThemesCard";
import "./ThemesPage.scss";

interface IMeetup {
  id: string;
  authorName: string;
  authorSurname: string;
  start?: string;
  title: string;
  description?: string;
  place?: string;
  goCount: number;
  status?: string;
  isOver?: boolean;
}

const ThemesPage: React.FC = (): ReactElement => {
  const fakeMeetups: IMeetup[] = [
    {
      id: "123123",
      authorName: "Joe",
      authorSurname: "Jackson",
      title: "EF Core от практикующих",
      description:
        "Основные темы, которые буду рассказывать: Database-first (EF Core), Db migrations, Software triggers, DbSet pre-filter (tenant-solution)",
      goCount: 28,
    },
  ];
  // useEffect(() => {
  //   MeetupsStore.fetchMeetups();
  // }, []);
  return (
    <section className="themes-page">
      <div className="themes-page-meetups-quantity">
        <p className="themes-page-meetups-quantity__text">
          Тем предложено: {fakeMeetups.length}
        </p>
        <button className="themes-page-meetups-quantity__button">
          <span className="material-icons-round">add</span>Создать тему
        </button>
      </div>
      <div className="themes-page-wrapper">
        {fakeMeetups.map((card: IMeetup) => (
          <ThemesCard key={card.id} item={card} />
        ))}
      </div>
    </section>
  );
};

export default ThemesPage;
