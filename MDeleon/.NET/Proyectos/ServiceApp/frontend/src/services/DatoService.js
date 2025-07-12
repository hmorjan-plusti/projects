const API_URL = "http://localhost:5135/api/datos";

export const getDatos = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener los datos");
  return await res.json();
};
