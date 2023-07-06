export const formatDate = (date) =>
  date.split("T")[0] + " " + date.split("T")[1].split(".")[0];
