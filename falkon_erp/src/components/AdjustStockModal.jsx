import { ProductFormModal } from "./ProductFormModal";

export const AdjustStockModal = ({ isOpen = false, onClose, selectedProduct, adjustQuantity = 0, setAdjustQuantity, onSave }) => {
  if (!isOpen) return null;

  return (
    <ProductFormModal
      isOpen={isOpen}
      onClose={onClose}
      selectedProduct={selectedProduct}
      adjustQuantity={adjustQuantity}
      setAdjustQuantity={setAdjustQuantity}
      onSave={onSave}
      mode="edit"
    />
  );
};
