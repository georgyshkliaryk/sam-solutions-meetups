import { makeAutoObservable } from "mobx";
import { IMeetup } from "../repositories/interfaces/IMeetupsRepository";

export class Meetups {
  themes: IMeetup[] = [];
  drafts: IMeetup[] = [];
  future: IMeetup[] = [];
  past: IMeetup[] = [];

  constructor() {
    makeAutoObservable(this);
  }
}

export default new Meetups();
