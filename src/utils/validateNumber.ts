export const isValidNumber = (text: string) => {
  if (text == null || text === undefined || text === "") {
    return false;
  }
  if (text.replace(/\s/g, "").length === 0) {
    return false;
  }
  if (isNaN(Number(text) - 0)) {
    return false;
  }
  return true;
};
