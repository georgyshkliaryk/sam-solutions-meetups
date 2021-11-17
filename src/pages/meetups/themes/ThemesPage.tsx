import React, { ReactElement } from "react";
import ThemesCard from "../../../components/main/cards/ThemesCard/ThemesCard";
import "./ThemesPage.scss";
import MeetupsQuantity from "../meetupsQuantity/MeetupsQuantity";

interface IMeetup {
  id: string;
  authorName: string;
  authorSurname: string;
  start?: string;
  title: string;
  desc?: string;
  place?: string;
  goCount: number;
  status?: string;
  isOver?: Boolean;
}

const ThemesPage: React.FC = (): ReactElement => {
  const fakeMeetups: IMeetup[] = [
    {
      id: "123123",
      authorName: "Joe",
      authorSurname: "Jackson",
      title: "EF Core от практикующих",
      desc: "Основные темы, которые буду рассказывать: Database-first (EF Core), Db migrations, Software triggers, DbSet pre-filter (tenant-solution)",
      goCount: 28,
    },
  ];
  // useEffect(() => {
  //   MeetupsStore.fetchMeetups();
  // }, []);
  return (
    <section className="themes">
      <MeetupsQuantity
        text="Тем предложено:"
        meetupsNumber={fakeMeetups.length}
        btn
      />
      <div className="themes-wrapper">
        {fakeMeetups.map((card: IMeetup) => (
          <ThemesCard key={card.id} item={card} />
        ))}
      </div>
    </section>
  );
};

export default ThemesPage;
