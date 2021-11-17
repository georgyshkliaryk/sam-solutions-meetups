import { makeAutoObservable } from "mobx";
import axios from "axios";

export interface IMeetup {
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

interface IAuthor {
  name: string;
  surname: string;
}

interface IResponse {
  id: string;
  subject: string;
  excerpt?: string;
  goCount: number;
  author: IAuthor;
}

class Meetups {
  meetups: IMeetup[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  fetchMeetups() {
    this.meetups = [];
    axios
      .get("/meetups")
      .then((response) => {
        response.data.map((el: IResponse) => {
          return this.meetups.push({
            id: el.id,
            title: el.subject,
            description: el.excerpt,
            goCount: el.goCount,
            authorName: el.author.name,
            authorSurname: el.author.surname,
          });
        });
        console.log(JSON.parse(JSON.stringify(this.meetups)));
        // this.meetups = [...this.meetups];
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default new Meetups();
