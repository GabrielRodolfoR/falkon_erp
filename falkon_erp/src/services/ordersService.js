import { api } from "./api";

export async function getOrders() {
  const response = await api.get("/pedidos");
  return response.data;
}

export async function getOrderById(id) {
  const response = await api.get(`/pedidos/${id}`);
  return response.data;
}

export async function createOrder(order) {
  const response = await api.post("/pedidos", order);
  return response.data;
}

export async function updateOrder(id, order) {
  const response = await api.put(`/pedidos/${id}`, order);
  return response.data;
}