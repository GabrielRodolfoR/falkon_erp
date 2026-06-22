import { X, Minus, Plus, Save } from "lucide-react";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";

export const AdjustStockModal = ({ 
  isOpen = false, 
  onClose, 
  selectedProduct, 
  adjustQuantity = 0, 
  setAdjustQuantity, 
  onSave 
}) => {
  if (!isOpen || !selectedProduct) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      
      <div className="absolute inset-0" onClick={onClose} />
      
      <Card hoverable={false} className="relative w-full max-w-md p-6 bg-bg-card border border-border-custom shadow-2xl rounded-xl z-10 animate-scale-up text-left">
        
        <div className="flex items-start justify-between border-b border-border-custom pb-4 mb-4">
          <div>
            <span className="text-[10px] text-accent-green font-bold uppercase tracking-wider">Ajustar Estoque</span>
            <h3 className="text-base font-bold text-text-primary mt-1">{selectedProduct.nome}</h3>
            <p className="text-[10px] text-text-secondary uppercase tracking-wide mt-0.5">{selectedProduct.categoria}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5">
          <p className="text-xs text-text-secondary italic">
            "{selectedProduct.descricao}"
          </p>

          <div className="grid grid-cols-2 gap-4 py-3 px-4 bg-bg-primary border border-border-custom/50 rounded-xl text-xs">
            <div>
              <span className="text-text-secondary">Quantidade Atual:</span>
              <div className="text-sm font-bold text-text-primary mt-0.5">{selectedProduct.estoque} unidades</div>
            </div>
            <div>
              <span className="text-text-secondary">Preço Unitário:</span>
              <div className="text-sm font-semibold text-text-primary mt-0.5">R$ {Number(selectedProduct.preco).toFixed(2)}</div>
            </div>
          </div>

          <div className="space-y-2.5">
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Nova Quantidade</label>
            <div className="flex items-center gap-3">
              
              <button
                onClick={() => setAdjustQuantity(prev => Math.max(0, prev - 1))}
                className="w-10 h-10 flex items-center justify-center bg-bg-primary border border-border-custom rounded-lg hover:bg-bg-hover text-text-primary cursor-pointer active:scale-95 transition-all"
              >
                <Minus className="w-4 h-4" />
              </button>

              <input
                type="number"
                min="0"
                value={adjustQuantity}
                onChange={(e) => setAdjustQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                className="flex-1 w-20 text-center text-sm font-bold bg-bg-primary text-text-primary border border-border-custom rounded-lg h-10 focus:outline-none focus:border-accent-green/60"
              />

              <button
                onClick={() => setAdjustQuantity(prev => prev + 1)}
                className="w-10 h-10 flex items-center justify-center bg-bg-primary border border-border-custom rounded-lg hover:bg-bg-hover text-text-primary cursor-pointer active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>

            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button 
              onClick={onSave}
              className="flex-1 gap-2 py-2"
            >
              <Save className="w-4 h-4" /> Salvar Alterações
            </Button>
            <Button 
              variant="secondary"
              onClick={onClose}
              className="py-2 px-4"
            >
              Cancelar
            </Button>
          </div>

        </div>

      </Card>
    </div>
  );
};
