import axios from "axios";
import { makeAutoObservable } from "mobx";
import dateFormat from "dateformat";

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

  async fetchThemes() {
    this.themes = [];
    try {
      const response = await axios.get("/meetups");
      response.data
        .filter((el: IResponse) => el.status === "REQUEST")
        .map((el: IResponse) => {
          return this.themes.push({
            id: el.id,
            title: el.subject,
            description: el.excerpt,
            authorName: el.author.name,
            authorSurname: el.author.surname,
            goCount: el.goCount,
          });
        });
      console.log(JSON.parse(JSON.stringify(this.themes)));
    } catch (err) {
      console.log(err);
    }
  }

  async fetchDrafts() {
    this.drafts = [];
    try {
      const response = await axios.get("/meetups");
      response.data
        .filter((el: IResponse) => el.status === "REQUEST")
        .map((el: IResponse) => {
          return this.drafts.push({
            id: el.id,
            title: el.subject,
            description: el.excerpt,
            authorName: el.author.name,
            authorSurname: el.author.surname,
            start: dateFormat(el.start, "dddd, d mmmm ● H:MM"),
            place: el.place,
          });
        });
      console.log(JSON.parse(JSON.stringify(this.drafts)));
    } catch (err) {
      console.log(err);
    }
  }

  async fetchFuture() {
    this.future = [];
    try {
      const response = await axios.get("/meetups");
      response.data
        .filter((el: IResponse) => el.status === "REQUEST")
        .map((el: IResponse) => {
          return this.future.push({
            id: el.id,
            title: el.subject,
            description: el.excerpt,
            authorName: el.author.name,
            authorSurname: el.author.surname,
            start: dateFormat(el.start, "dddd, d mmmm ● H:MM"),
            place: el.place,
          });
        });
      console.log(JSON.parse(JSON.stringify(this.future)));
    } catch (err) {
      console.log(err);
    }
  }
}

export default new Meetups();
