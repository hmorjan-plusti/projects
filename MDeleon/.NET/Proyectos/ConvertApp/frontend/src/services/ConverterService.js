import axios from "axios";

const API = "http://localhost:5293/api/Converter";

const convert = async (from, to, amount) => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API}/convert`, {
    params: { from, to, amount },
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.result;
};

export default {
  convert,
};
