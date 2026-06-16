import axios from "axios";

// Le o servidor local, servindo como uma "Base" de conexao aos demais endpoints
export const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json"
  }
});