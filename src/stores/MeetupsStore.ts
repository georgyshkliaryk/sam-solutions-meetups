import axios from "axios";
import { makeAutoObservable } from "mobx";

export interface IMeetup {
  id: string;
  authorName: string;
  authorSurname: string;
  start?: string;
  title: string;
  description: string;
  place?: string;
  goCount?: number;
  status?: string;
  isOver?: boolean;
}

interface IAuthor {
  name: string;
  surname: string;
}

interface IResponse {
  id: string;
  subject: string;
  excerpt: string;
  goCount?: number;
  author: IAuthor;
  status: string;
  start?: string;
  place?: string;
}

class Meetups {
  themes: IMeetup[] = [];
  drafts: IMeetup[] = [];
  future: IMeetup[] = [];
  past: IMeetup[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  fetchThemes() {
    this.themes = [];
    axios
      .get("/meetups")
      .then((response) => {
        response.data
          .filter((el: IResponse) => el.status === "REQUEST")
          .map((el: IResponse) => {
            return this.themes.push({
              id: el.id,
              title: el.subject,
              description: el.excerpt,
              goCount: el.goCount,
              authorName: el.author.name,
              authorSurname: el.author.surname,
            });
          });
        console.log(JSON.parse(JSON.stringify(this.themes)));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fetchDrafts() {
    this.drafts = [];
    axios
      .get("/meetups")
      .then((response) => {
        response.data
          .filter((el: IResponse) => el.status === "DRAFT")
          .map((el: IResponse) => {
            return this.drafts.push({
              id: el.id,
              title: el.subject,
              description: el.excerpt,
              authorName: el.author.name,
              authorSurname: el.author.surname,
              start: el.start,
              place: el.place,
            });
          });
        console.log(JSON.parse(JSON.stringify(this.drafts)));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fetchFuture() {
    this.future = [];
    axios
      .get("/meetups")
      .then((response) => {
        response.data
          .filter((el: IResponse) => el.status === "CONFIRMED")
          .map((el: IResponse) => {
            return this.future.push({
              id: el.id,
              title: el.subject,
              description: el.excerpt,
              authorName: el.author.name,
              authorSurname: el.author.surname,
              start: el.start,
              place: el.place,
            });
          });
        console.log(JSON.parse(JSON.stringify(this.future)));
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default new Meetups();
