import { api } from "./api";

export async function getUsers() {
  const response = await api.get("/usuarios");
  return response.data;
}

export async function getUserById(id) {
  const response = await api.get(`/usuarios/${id}`);
  return response.data;
}

export async function createUser(user) {
  const response = await api.post("/usuarios", user);
  return response.data;
}

export async function updateUser(id, user) {
  const response = await api.put(`/usuarios/${id}`, user);
  return response.data;
}