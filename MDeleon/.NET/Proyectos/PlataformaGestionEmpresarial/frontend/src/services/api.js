const API_URL = import.meta.env.VITE_API_URL;


export function setToken(t) {
  localStorage.setItem("token", t);
}

function getToken() {
  return localStorage.getItem("token") || "";
}

async function api(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  const currentToken = getToken();
  if (currentToken) headers["Authorization"] = `Bearer ${currentToken}`;
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!res.ok) throw new Error(await res.text());
  return res.json().catch(() => ({}));
}

export const AuthApi = {
  register: (fullName, email, password) =>
    api("/api/auth/register", { method: "POST", body: JSON.stringify({ fullName, email, password }) }),
  login: async (email, password) => {
    const data = await api("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
    setToken(data.accessToken);
    return data;
  },
  me: () => api("/api/auth/me")
};

export const CustomersApi = {
  create: (name, email) => api("/api/customers", { method: "POST", body: JSON.stringify({ name, email }) }),
  list: () => api("/api/customers")
};
