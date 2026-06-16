import { useState } from "react";
import OrderDetails from "../components/orderDetails";
import ProductDetails from "../components/productDetails";

export default function TestePage() {
    const [orderId, setOrderId] = useState("101");
    const [productId, setProductId] = useState("1");

    return (
        <div>
            <h1>Teste de Pedidos</h1>
            <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Digite o ID do pedido"
            />

            <OrderDetails orderId={orderId} />


            <h1>Teste de Produtos</h1>
            <input
                type="text"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="Digite o ID do Produto"
            />

            <ProductDetails productId={productId} />
        </div>
    );
}