// src/api/orders.ts
import axios from "./axios";

export const getOrders = async () => {
  const { data } = await axios.get("/orders");
  return data;
};

export const createOrder = async (orderData: any, token: string) => {
  const res = await axios.post("/orders", orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
