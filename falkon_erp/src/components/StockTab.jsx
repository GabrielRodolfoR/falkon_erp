import { Pencil } from "lucide-react";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";

export const StockTab = ({ products = [], onAdjustStockClick }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-left">
        <h1 className="text-xl font-bold tracking-tight text-text-primary">Controle de Níveis de Estoque</h1>
        <p className="text-xs text-text-secondary mt-1">Acompanhamento visual direto da capacidade física dos itens.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((prod) => {
          const productCapacityMax = Number(prod.capacidadeMaxima ?? 0);
          const percent = Math.min((prod.estoque / productCapacityMax) * 100, 100);
          
          let barColor = "bg-accent-green";
          if (prod.estoque === 0) {
            barColor = "bg-accent-red";
          } else if (prod.estoque >= 1 && prod.estoque <= 3) {
            barColor = "bg-accent-yellow";
          }

          const statusConfig = prod.estoque === 0 // Lógica de status e cores do estoque
            ? { label: "Sem estoque", className: "bg-accent-red text-white border-accent-red" }
            : prod.estoque <= 3
              ? { label: "Estoque baixo", className: "bg-accent-yellow text-[#111827] border-accent-yellow" }
              : { label: "Disponível", className: "bg-accent-green text-white border-accent-green" };

          return (
            <Card key={prod.id} className="p-5 flex flex-col justify-between h-40">
              <div className="flex justify-between items-start gap-4">
                <div className="truncate text-left">
                  <h4 className="font-semibold text-text-primary truncate">{prod.nome}</h4>
                  <p className="text-[10px] text-text-secondary mt-0.5 uppercase tracking-wide">{prod.categoria}</p>
                </div>
                <Badge className={statusConfig.className}>
                  {statusConfig.label}
                </Badge>
              </div>
            
              <div className="mt-4 space-y-1.5 text-left">
                <div className="flex justify-between text-[10px] text-text-secondary">
                  <span>Nível: {Math.round(percent)}%</span>
                  <span>Capacidade: {productCapacityMax} un</span>
                </div>
                <div className="w-full h-1.5 bg-bg-primary rounded-full overflow-hidden border border-border-custom/50">
                  <div 
                    className={`h-full ${barColor} transition-all duration-300`} 
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mt-3 pt-2 border-t border-border-custom/30 text-xs">
                <span className="text-[10px] text-text-secondary">Ref: Prod #{prod.id}</span>
                <button
                  onClick={() => onAdjustStockClick(prod)}
                  className="text-[10px] font-semibold text-accent-green hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Pencil className="w-3 h-3" /> Ajustar Estoque
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
