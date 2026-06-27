import { ProductFormModal } from "./ProductFormModal";

export const CreateProductModal = ({ isOpen = false, onClose, onSave }) => {
  if (!isOpen) return null;

  return (
    <ProductFormModal
      isOpen={isOpen}
      onClose={onClose}
      selectedProduct={null}
      adjustQuantity={0}
      setAdjustQuantity={() => {}}
      onSave={onSave}
      mode="create"
    />
  );
};
