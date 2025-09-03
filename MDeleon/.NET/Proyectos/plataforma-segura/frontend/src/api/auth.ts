import api from "./axios";

export const login = async (email: string, password: string) => {
  const { data } = await api.post("/auth/login", { username: email, password });
  if (data.accessToken) {
    localStorage.setItem("accessToken", data.accessToken);
  }
  return data;
};

export const register = async (name: string, email: string, password: string) => {
  const { data } = await api.post("/auth/register", { username: name, email, password, displayName: name });
  if (data.accessToken) {
    localStorage.setItem("accessToken", data.accessToken);
  }
  return data;
};

export const getProfile = async (token: string) => {
  const { data } = await api.get("/auth/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
