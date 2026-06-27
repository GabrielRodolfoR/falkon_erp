import { useEffect, useState } from "react";
import { X, Save, Minus, Plus } from "lucide-react";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";

export const ProductFormModal = ({
  isOpen = false,
  onClose,
  selectedProduct,
  adjustQuantity = 0,
  setAdjustQuantity,
  onSave,
  mode = "edit"
}) => {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
    categoria: "",
    estoque: 0,
    capacidadeMaxima: 30
  });

  useEffect(() => {
    if (!isOpen) return;

    if (selectedProduct) {
      setFormData({
        nome: selectedProduct.nome ?? "",
        descricao: selectedProduct.descricao ?? "",
        preco: selectedProduct.preco ?? 0,
        categoria: selectedProduct.categoria ?? "",
        estoque: selectedProduct.estoque ?? adjustQuantity ?? 0,
        capacidadeMaxima: Number(selectedProduct.capacidadeMaxima ?? 30)
      });
    } else {
      setFormData({
        nome: "",
        descricao: "",
        preco: "",
        categoria: "",
        estoque: 0,
        capacidadeMaxima: 30
      });
    }
  }, [selectedProduct?.id, isOpen]);

  if (!isOpen) return null;

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (field === "estoque") {
      setAdjustQuantity?.(Math.max(0, Number(value) || 0));
    }
  };

  const handleSubmit = () => {
    onSave({
      ...(selectedProduct || {}),
      ...formData,
      preco: Number(formData.preco),
      estoque: Number(formData.estoque),
      capacidadeMaxima: Number(formData.capacidadeMaxima || 30)
    });
  };

  const isCreateMode = mode === "create";
  const categoryOptions = ["perifericos", "geek", "livros", "monitores"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <Card hoverable={false} className="relative w-full max-w-lg p-6 bg-bg-card border border-border-custom shadow-2xl rounded-xl z-10 animate-scale-up text-left">
        <div className="flex items-start justify-between border-b border-border-custom pb-4 mb-4">
          <div>
            <span className="text-[10px] text-accent-green font-bold uppercase tracking-wider">
              {isCreateMode ? "Novo Produto" : "Editar Produto"}
            </span>
            <h3 className="text-base font-bold text-text-primary mt-1">{formData.nome || (selectedProduct?.nome || "Novo produto")}</h3>
            <p className="text-[10px] text-text-secondary uppercase tracking-wide mt-0.5">{formData.categoria || (selectedProduct?.categoria || "Categoria")}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Nome</label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => handleFieldChange("nome", e.target.value)}
                className="mt-1 w-full rounded-lg border border-border-custom bg-bg-primary px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-green/60"
              />
            </div>

            <div>
              <label className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Descrição</label>
              <textarea
                rows="3"
                value={formData.descricao}
                onChange={(e) => handleFieldChange("descricao", e.target.value)}
                className="mt-1 w-full rounded-lg border border-border-custom bg-bg-primary px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-green/60"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Preço</label>
                <div className="mt-1 flex items-center rounded-lg border border-border-custom bg-bg-primary px-3 py-2 focus-within:border-accent-green/60">
                  <span className="mr-2 text-sm font-semibold text-text-secondary">R$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.preco}
                    onChange={(e) => handleFieldChange("preco", e.target.value)}
                    className="w-full bg-transparent text-sm text-text-primary focus:outline-none"
                    placeholder="0,00"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Categoria</label>
                <select
                  value={formData.categoria}
                  onChange={(e) => handleFieldChange("categoria", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-border-custom bg-bg-primary px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-green/60"
                >
                  <option value="">Selecione uma categoria</option>
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Quantidade em Estoque</label>
                <div className="mt-1 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleFieldChange("estoque", Math.max(0, Number(formData.estoque) - 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-custom bg-bg-primary text-text-primary transition-all hover:bg-bg-hover active:scale-95"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    min="0"
                    value={formData.estoque}
                    onChange={(e) => handleFieldChange("estoque", e.target.value)}
                    className="w-full rounded-lg border border-border-custom bg-bg-primary px-3 py-2 text-center text-sm font-semibold text-text-primary focus:outline-none focus:border-accent-green/60"
                  />
                  <button
                    type="button"
                    onClick={() => handleFieldChange("estoque", Number(formData.estoque) + 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-custom bg-bg-primary text-text-primary transition-all hover:bg-bg-hover active:scale-95"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Capacidade Máxima</label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={formData.capacidadeMaxima}
                  onChange={(e) => handleFieldChange("capacidadeMaxima", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-border-custom bg-bg-primary px-3 py-2 text-sm font-semibold text-text-primary focus:outline-none focus:border-accent-green/60"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={handleSubmit} className="flex-1 gap-2 py-2">
              <Save className="w-4 h-4" /> {isCreateMode ? "Cadastrar Produto" : "Salvar Alterações"}
            </Button>
            <Button variant="secondary" onClick={onClose} className="py-2 px-4">
              Cancelar
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
