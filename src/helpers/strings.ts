export const stringWithoutHTML = (text: string | null) => {
  if (text !== null) {
    return text.replace(/<\/?[^>]+(>|$)/g, '');
  }
  return '';
};

export const shortenString = (text: string) => {
  if (text.length > 100) {
    return `${text.slice(0, 130)}...`;
  }
  return text;
};
