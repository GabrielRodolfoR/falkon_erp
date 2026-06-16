import { useEffect, useState } from "react";
import { getOrderById } from "../services/ordersService";

export default function OrderDetails({ orderId }) {
    const [order, setOrder] = useState(null);

    useEffect(() => {
        async function loadOrder() {
            try {
                const data = await getOrderById(orderId);

                console.log("===== PEDIDO =====");
                console.log(data);

                setOrder(data);
            } catch (error) {
                console.error("Erro ao buscar pedido:", error);
            }
        }

        if (orderId) {
            loadOrder();
        }
    }, [orderId]);

    if (!order) {
        return <p>Carregando pedido...</p>;
    }

    return (
        <div>
            <h2>Pedido #{order.id}</h2>

            <p>
                <strong>Usuário:</strong> {order.usuarioId}
            </p>

            <p>
                <strong>Produto:</strong> {order.produtoId}
            </p>

            <p>
                <strong>Quantidade:</strong> {order.quantidade}
            </p>

            <p>
                <strong>Data:</strong> {order.data}
            </p>

            <p>
                <strong>Status:</strong> {order.status}
            </p>

            <p>
                <strong>Valor Pago:</strong> R$ {order.valor_pago}
            </p>
        </div>
    );
}