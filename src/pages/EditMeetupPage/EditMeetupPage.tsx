import React, { ReactElement, useContext } from "react";
import { Navigate } from "react-router";
import Header from "../../components/header/Header/Header";
import HeaderNavbar from "../../components/header/HeaderNavbar/HeaderNavbar";
import HeaderProfile from "../../components/header/HeaderProfile/HeaderProfile";
import LinkComponent from "../../components/LinkComponent/LinkComponent";
import LogoSam from "../../components/LogoSam/LogoSam";
import Main from "../../components/main/Main/Main";
import MainTitle from "../../components/main/MainTitle/MainTitle";
import { navItems, routes } from "../../constants";
import { StoreContext } from "../../context/StoreContext";
import "./EditMeetupPage.scss";

const EditMeetupPage: React.FC = (): ReactElement => {
  const { authStore, meetupsStore } = useContext(StoreContext);

  if (authStore.user === undefined) {
    return <Navigate to={routes.login} />;
  }

  return (
    <div className="edit-meetup">
      <Header className="edit-meetup__header">
        <LinkComponent to={routes.meetups}>
          <LogoSam className="edit-meetup__header-logo" />
        </LinkComponent>
        <HeaderNavbar items={navItems.header} />
        <HeaderProfile user={authStore.user} />
      </Header>
      <Main>
        <MainTitle>Редактирование митапа</MainTitle>
        <form className="edit-meetup-data">
          <div className="edit-meetup-data-item">
            <label htmlFor="editTitle">Тема</label>
            <input type="text" id="editTitle" />
          </div>
          <fieldset className="edit-meetup-data-item-date">
            <div>
              <label htmlFor="editStartDate">Начало</label>
              <input type="date" id="editStartDate" />
            </div>
            <div>
              <label htmlFor="">Окончание</label>
              <input type="date" id="editEndDate" />
            </div>
          </fieldset>
          <div className="edit-meetup-data-item">
            <label htmlFor="editPlace">Место проведения</label>
            <input type="text" id="editPlace" />
          </div>
          <div className="edit-meetup-data-item">
            <label htmlFor="editSpeaker">Спикер</label>
            <input type="text" id="editSpeaker" />
          </div>
          <div className="edit-meetup-data-item">
            <label htmlFor="editDescription">Описание</label>
            <textarea
              name="editDescription"
              id="editDescription"
              cols={30}
              rows={10}
            ></textarea>
          </div>
        </form>
      </Main>
    </div>
  );
};

export default EditMeetupPage;
