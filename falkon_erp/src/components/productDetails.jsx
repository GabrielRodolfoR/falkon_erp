import { useEffect, useState } from "react";
import { getProductById } from "../services/productsServices";

export default function ProductDetails({ productId }) {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        async function loadProduct() {
            try {
                const data = await getProductById(productId);

                console.log("===== Produto =====");
                console.log(data);

                setProduct(data);
            } catch (error) {
                console.error("Erro ao buscar produto:", error);
            }
        }

        if (productId) {
            loadProduct();
        }
    }, [productId]);

    if (!product) {
        return <p>Carregando pedido...</p>;
    }

    return (
        <div>
            <h2>Produto #{product.id}</h2>

            <p>
                <strong>nome:</strong> {product.nome}
            </p>

            <p>
                <strong>descricao:</strong> {product.descricao}
            </p>

            <p>
                <strong>Preco:</strong> R$ {product.preco}
            </p>

            <p>
                <strong>Categoria:</strong> {product.categoria}
            </p>

            <p>
                <strong>Estoque:</strong> {product.estoque}
            </p>

            <p>
                <strong>Promocao:</strong>{product.promocao}
            </p>
            <p>
                <strong>Nota:</strong> {product.nota}
            </p>
        </div>
    );
}