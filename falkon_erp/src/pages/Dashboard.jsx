import { useOutletContext } from "react-router-dom";
import { DashboardTab } from "../components/DashboardTab";

export default function Dashboard() {
  const { 
    products, 
    totalProducts, 
    outOfStockCount, 
    lowStockCount, 
    totalItemsInStock, 
    totalStockValue 
  } = useOutletContext();

  return (
    <DashboardTab 
      products={products}
      totalProducts={totalProducts}
      outOfStockCount={outOfStockCount}
      lowStockCount={lowStockCount}
      totalItemsInStock={totalItemsInStock}
      totalStockValue={totalStockValue}
    />
  );
}
