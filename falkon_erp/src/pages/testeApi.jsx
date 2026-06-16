import { useEffect } from "react";
import { getProducts, getProductById } from "../services/productsServices";
import { getOrderById, getOrders } from "../services/ordersService";
import { getUserById, getUsers } from "../services/usersServices";

export default function TesteApi() {
  useEffect(() => {
    async function test() {
      try {
        const products = await getProducts();
        console.table(products);

        const orders = await getOrders();
        console.table(orders);

        const users = await getUsers();
        console.table(users)

        const productDetails= await getProductById("1");
        console.log(productDetails);

        const orderDetails = await getOrderById("101");
        console.log(orderDetails);

        const userDetails = await getUserById("1");
        console.log(userDetails)

      } catch (error) {
        console.error("Erro ao testar API:", error);
      }
    }

    test();
  }, []);

  return (
    <div>
      <h1>Teste da API</h1>
      <p>F12 para ver.</p>
    </div>
  );
}