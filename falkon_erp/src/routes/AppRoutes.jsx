import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import Dashboard from "../pages/Dashboard";
import ProductsCatalog from "../pages/ProductsCatalog";
import StockLevels from "../pages/StockLevels";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/catalogo-de-produtos" element={<ProductsCatalog />} />
          <Route path="/niveis-de-estoque" element={<StockLevels />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}