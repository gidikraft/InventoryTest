export const isValidText = (text: string) => {
  if (text == null || text === undefined || text === "") {
    return false;
  }
  text = text.toString();
  if (text.replace(/\s/g, "").length === 0) {
    return false;
  }
  return true;
};
