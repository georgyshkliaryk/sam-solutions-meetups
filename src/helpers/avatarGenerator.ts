import { avatarColors } from "./../constants";
import { IUser } from "../repositories/interfaces/INetworkRepository";

interface IAvatar {
  initials: string;
  color: string;
}
export const generateAvatar = (
  user: Pick<IUser, "name" | "surname">
): IAvatar => {
  let initials = "";
  let colorIndex = 0;
  let color = "";
  if (user.surname) {
    initials = user.name[0].toUpperCase() + user.surname[0].toUpperCase();
    colorIndex = (initials[0].charCodeAt(0) + initials[1].charCodeAt(0)) % 10;
    color = avatarColors[colorIndex];
  } else {
    initials = user.name[0].toUpperCase();
    colorIndex = initials[0].charCodeAt(0) % 10;
    color = avatarColors[colorIndex];
  }
  return {
    initials,
    color,
  };
};
