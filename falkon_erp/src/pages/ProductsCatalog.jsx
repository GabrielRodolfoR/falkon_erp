import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { CircleCheck } from "lucide-react";
import { ProductsTab } from "../components/ProductsTab";
import { AdjustStockModal } from "../components/AdjustStockModal";
import { CreateProductModal } from "../components/CreateProductModal";
import { createProduct, updateProduct } from "../services/productsServices";

export default function ProductsCatalog() {
  const { products, loadData } = useOutletContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [adjustQuantity, setAdjustQuantity] = useState(0);
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSaveStock = async (updatedProduct) => {
    if (!selectedProduct || !updatedProduct) return;
    try {
      await updateProduct(selectedProduct.id, updatedProduct);
      setSuccessMessage(`"${updatedProduct.nome}" atualizado com sucesso!`);
      setIsAdjustModalOpen(false);
      setTimeout(() => setSuccessMessage(""), 3500);
      await loadData();
    } catch (error) {
      console.error("Erro ao salvar alteração de produto:", error);
    }
  };

  const handleCreateProduct = async (newProduct) => {
    if (!newProduct) return;
    try {
      const nextId = products.reduce((max, product) => {
        const numericId = Number(product.id);
        return Number.isFinite(numericId) ? Math.max(max, numericId) : max;
      }, 0) + 1;

      await createProduct({
        ...newProduct,
        id: nextId,
        estoque: Number(newProduct.estoque || 0),
        preco: Number(newProduct.preco || 0),
        capacidadeMaxima: Number(newProduct.capacidadeMaxima || 30)
      });
      setSuccessMessage(`"${newProduct.nome}" cadastrado com sucesso!`);
      setIsCreateModalOpen(false);
      setTimeout(() => setSuccessMessage(""), 3500);
      await loadData();
    } catch (error) {
      console.error("Erro ao criar produto:", error);
    }
  };

  return (
    <div className="relative">
      {/* Success Alert Banner */}
      {successMessage && (
        <div className="absolute top-[-24px] left-1/2 -translate-x-1/2 bg-accent-green/10 border border-accent-green/20 text-accent-green px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs font-semibold shadow-lg z-30 animate-fade-in">
          <CircleCheck className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      <ProductsTab 
        products={products}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAdjustStockClick={(prod) => {
          setSelectedProduct(prod);
          setAdjustQuantity(prod.estoque);
          setIsAdjustModalOpen(true);
        }}
        onAddProductClick={() => {
          setSelectedProduct(null);
          setIsCreateModalOpen(true);
        }}
      />

      <AdjustStockModal 
        isOpen={isAdjustModalOpen}
        onClose={() => setIsAdjustModalOpen(false)}
        selectedProduct={selectedProduct}
        adjustQuantity={adjustQuantity}
        setAdjustQuantity={setAdjustQuantity}
        onSave={handleSaveStock}
      />

      <CreateProductModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateProduct}
      />
    </div>
  );
}
