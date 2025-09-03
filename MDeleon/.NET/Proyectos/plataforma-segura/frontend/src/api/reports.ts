import api from "./axios";

export const getReports = async () => {
  const { data } = await api.get("/reports");
  return data;
};
