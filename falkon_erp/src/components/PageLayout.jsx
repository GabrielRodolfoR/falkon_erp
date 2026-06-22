import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { LeftSidebar } from "./LeftSidebar";
import { RightSidebar } from "./RightSidebar";

import { getProducts } from "../services/productsServices";
import { getUsers } from "../services/usersServices";

export const PageLayout = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const prodData = await getProducts();
      const userData = await getUsers();
      setProducts(prodData || []);
      setUsers(userData || []);
    } catch (error) {
      console.error("Erro ao carregar dados do ERP:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const totalProducts = products.length;
  const lowStockCount = products.filter(p => p.estoque >= 1 && p.estoque <= 3).length;
  const outOfStockCount = products.filter(p => p.estoque === 0).length;
  const totalItemsInStock = products.reduce((acc, p) => acc + Number(p.estoque), 0);
  const totalStockValue = products.reduce((acc, p) => acc + (Number(p.preco) * Number(p.estoque)), 0);

  const currentUser = users[0] || { nome: "Ana Silva", nivel: "Admin" };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg-primary text-text-primary text-sm font-sans transition-colors duration-200">
      
      <LeftSidebar theme={theme} setTheme={setTheme} />

      <main className="flex-1 h-full overflow-y-auto p-8 relative flex flex-col justify-start">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-7 h-7 border-2 border-accent-green border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-text-secondary font-medium">Carregando painel Falkon...</span>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto w-full space-y-8">
            <Outlet context={{ products, loadData, totalProducts, outOfStockCount, lowStockCount, totalItemsInStock, totalStockValue }} />
          </div>
        )}
      </main>

      <RightSidebar 
        currentUser={currentUser}
        totalProducts={totalProducts}
        outOfStockCount={outOfStockCount}
        lowStockCount={lowStockCount}
        totalItemsInStock={totalItemsInStock}
        totalStockValue={totalStockValue}
      />

    </div>
  );
};
