import { avatarColors } from "./../constants";

interface IAvatar {
  initials: string;
  color: string;
}
export const generateAvatarData = (name: string, surname?: string): IAvatar => {
  let initials = "";
  let colorIndex = 0;
  let color = "";
  if (surname) {
    initials = name[0].toUpperCase() + surname[0].toUpperCase();
    colorIndex = (initials[0].charCodeAt(0) + initials[1].charCodeAt(0)) % 10;
    color = avatarColors[colorIndex];
  } else {
    initials = name[0].toUpperCase();
    colorIndex = initials[0].charCodeAt(0) % 10;
    color = avatarColors[colorIndex];
  }
  return {
    initials,
    color,
  };
};
