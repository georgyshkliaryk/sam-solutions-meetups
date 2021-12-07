import { UserRoles } from "../constants";
import { IMeetup } from "./../repositories/interfaces/IMeetupsRepository";
import { IUser } from "./../repositories/interfaces/INetworkRepository";

export const checkUserRights = (user: IUser, meetup: IMeetup): boolean => {
  return user.id === meetup.authorId || user.roles === UserRoles.CHIEF;
};
