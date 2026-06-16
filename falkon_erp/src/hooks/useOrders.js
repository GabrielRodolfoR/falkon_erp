import { useEffect, useState } from "react";
import { getOrders } from "../../services/ordersService";

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadOrders() {
    try {
      setLoading(true);

      const data = await getOrders();

      setOrders(data);
      setError("");
    } catch (err) {
      setError("Erro ao carregar pedido");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  return {
    orders,
    loading,
    error,
    reload: loadOrders
  };
}