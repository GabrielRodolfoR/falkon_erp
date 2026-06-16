import { api } from "./api";

export async function getProducts() {
  const response = await api.get("/produtos");
  return response.data;
}

export async function getProductById(id) {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
}

export async function createProduct(product) {
  const response = await api.post("/produtos", product);
  return response.data;
}

export async function updateProduct(id, product) {
  const response = await api.put(`/produtos/${id}`, product);
  return response.data;
}