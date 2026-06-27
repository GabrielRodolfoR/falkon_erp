import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { CircleCheck } from "lucide-react";
import { StockTab } from "../components/StockTab";
import { AdjustStockModal } from "../components/AdjustStockModal";
import { updateProduct } from "../services/productsServices";

export default function StockLevels() {
  const { products, loadData } = useOutletContext();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [adjustQuantity, setAdjustQuantity] = useState(0);
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
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

  return (
    <div className="relative">
      {/* Success Alert Banner */}
      {successMessage && (
        <div className="absolute top-[-24px] left-1/2 -translate-x-1/2 bg-accent-green/10 border border-accent-green/20 text-accent-green px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs font-semibold shadow-lg z-30 animate-fade-in">
          <CircleCheck className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      <StockTab 
        products={products}
        onAdjustStockClick={(prod) => {
          setSelectedProduct(prod);
          setAdjustQuantity(prod.estoque);
          setIsAdjustModalOpen(true);
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
    </div>
  );
}
