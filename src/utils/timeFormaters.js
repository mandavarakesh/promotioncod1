import dayjs from "dayjs";

export const formatTime = (value, includeTime) => {
  if (!value) {
    return "-";
  }
  if (includeTime === "WITHTIME") {
    return dayjs(value).format("DD/MM/YYYY  hh:mm A");
  }
  return dayjs(value).format("DD/MM/YYYY");
};
