export const getUId = () => {
  return Date.now() + (Math.random() * 100000).toFixed().toString();
};
