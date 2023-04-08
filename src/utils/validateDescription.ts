export const isValidDescription = (text: string, testLength: number) => {
  if (text == null || text === undefined || text === "") {
    return false;
  }
  let splitText = text.trim().split(" ");
  if (!(splitText.length >= testLength)) {
    return false;
  }
  return true;
};
