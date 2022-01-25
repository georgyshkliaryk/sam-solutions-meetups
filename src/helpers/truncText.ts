export const truncText = (len: number, text: string): string => {
  if (text.length < len) {
    return text;
  }
  return `${text.slice(0, len).trim()}...`;
};
