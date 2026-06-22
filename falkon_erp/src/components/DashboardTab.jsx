import { useState } from "react";
import { TrendingUp, Boxes, CircleAlert, Package } from "lucide-react";
import { Card } from "./ui/Card";

export const DashboardTab = ({ 
  products = [], 
  totalProducts = 0, 
  outOfStockCount = 0, 
  lowStockCount = 0, 
  totalItemsInStock = 0, 
  totalStockValue = 0 
}) => {
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.closest(".relative-container").getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left + 15,
      y: e.clientY - rect.top - 20
    });
  };

  const categories = ["perifericos", "geek", "livros", "monitores"];
  const categoryLabels = {
    perifericos: "Periféricos",
    geek: "Geek",
    livros: "Livros",
    monitores: "Monitores"
  };

  const categoryColors = {
    perifericos: "#14532D",
    geek: "#15803D",
    livros: "#4ADE80",
    monitores: "#DCFCE7",
    default: "#BBF7D0"
  };

  const categoryValues = products.reduce((acc, p) => {
    const val = Number(p.preco) * Number(p.estoque);
    acc[p.categoria] = (acc[p.categoria] || 0) + val;
    return acc;
  }, {});

  let accumulatedPercentage = 0;
  const circumference = 226.195; // 2 * PI * R (R=36)
  const circleSegments = categories.map(cat => {
    const val = categoryValues[cat] || 0;
    const percentage = totalStockValue > 0 ? (val / totalStockValue) * 100 : 0;
    const dashArray = `${(percentage / 100) * circumference} ${circumference}`;
    const dashOffset = -((accumulatedPercentage / 100) * circumference);
    accumulatedPercentage += percentage;
    
    return {
      cat,
      percentage,
      value: val,
      dashArray,
      dashOffset,
      color: categoryColors[cat] || categoryColors.default
    };
  });

  const topValuedItems = [...products]
    .map(p => ({
      ...p,
      totalValue: Number(p.preco) * Number(p.estoque)
    }))
    .filter(p => p.totalValue > 0)
    .sort((a, b) => b.totalValue - a.totalValue)
    .slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      
      <div className="text-left">
        <h1 className="text-xl font-bold tracking-tight text-text-primary">Visão Geral do Almoxarifado</h1>
        <p className="text-xs text-text-secondary mt-1">Status operacional e contabilidade patrimonial dos ativos da Falkon.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { 
            label: "Produtos Cadastrados", 
            value: `${totalProducts} itens`, 
            desc: "Catálogo ativo de produtos",
            icon: Package, 
            iconClass: "text-text-primary bg-bg-hover"
          },
          { 
            label: "Produtos Esgotados", 
            value: outOfStockCount, 
            desc: outOfStockCount > 0 ? "Ação de reposição necessária" : "Estoque 100% abastecido",
            icon: CircleAlert, 
            iconClass: outOfStockCount > 0 ? "text-accent-red bg-accent-red/5" : "text-text-secondary bg-bg-hover",
            valueClass: outOfStockCount > 0 ? "text-accent-red animate-pulse" : "text-text-primary"
          },
          { 
            label: "Nível de Alerta (Estoque Baixo)", 
            value: `${lowStockCount} itens`, 
            desc: "Quantidade abaixo do ideal",
            icon: Boxes, 
            iconClass: lowStockCount > 0 ? "text-accent-yellow bg-accent-yellow/5" : "text-text-secondary bg-bg-hover",
            valueClass: lowStockCount > 0 ? "text-accent-yellow" : "text-text-primary"
          },
          { 
            label: "Total de Itens Físicos", 
            value: `${totalItemsInStock} un`, 
            desc: "Volume de unidades em galpão",
            icon: TrendingUp, 
            iconClass: "text-accent-green bg-accent-green/5"
          }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} hoverable={true} className="flex flex-col justify-between p-5 min-h-36 text-left">
              <div className="flex justify-between items-start gap-4">
                <span className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider leading-relaxed">
                  {stat.label}
                </span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${stat.iconClass}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <span className={`text-xl font-bold tracking-tight block ${stat.valueClass || "text-text-primary"}`}>
                  {stat.value}
                </span>
                <span className="text-[10px] text-text-secondary/60 mt-0.5 block leading-none">
                  {stat.desc}
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        
        <Card hoverable={false} className="lg:col-span-4 p-6 flex flex-col justify-between">
          <div className="border-b border-border-custom/30 pb-3 mb-4 text-left">
            <h4 className="font-semibold text-text-primary text-xs uppercase tracking-wider">Capital por Categoria</h4>
            <p className="text-[10px] text-text-secondary mt-0.5">Distribuição do valor financeiro investido.</p>
          </div>

          <div className="relative-container relative flex flex-col items-center gap-6 py-4">
            
            <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {circleSegments.map((seg) => (
                  <circle
                    key={seg.cat}
                    cx="50"
                    cy="50"
                    r="36"
                    fill="transparent"
                    stroke={seg.color}
                    strokeWidth="8.5"
                    strokeDasharray={seg.dashArray}
                    strokeDashoffset={seg.dashOffset}
                    onMouseEnter={() => setHoveredSegment(seg)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setHoveredSegment(null)}
                    className="transition-all duration-300 ease-out hover:stroke-[10.5px] cursor-pointer"
                  />
                ))}
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold">Patrimônio</span>
                <span className="text-base font-bold text-text-primary mt-0.5">
                  R$ {totalStockValue.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>

            {hoveredSegment && (
              <div 
                className="absolute z-30 bg-[#171A1F] border border-border-custom px-3 py-2 rounded-xl shadow-lg pointer-events-none text-xs flex flex-col gap-0.5 animate-fade-in text-left"
                style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }}
              >
                <div className="flex items-center gap-1.5 font-semibold text-text-primary">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: hoveredSegment.color }} />
                  <span className="capitalize">{categoryLabels[hoveredSegment.cat]}</span>
                </div>
                <span className="text-[10px] text-text-secondary font-medium mt-0.5">
                  R$ {hoveredSegment.value.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ({hoveredSegment.percentage.toFixed(1)}%)
                </span>
              </div>
            )}

            <div className="w-full space-y-2 pt-4 border-t border-border-custom/40">
              <div className="grid grid-cols-3 font-semibold text-text-secondary/70 text-[9px] uppercase tracking-wider pb-1 border-b border-border-custom/30 text-left">
                <span>Setor</span>
                <span className="text-right">Valor</span>
                <span className="text-right">%</span>
              </div>
              {circleSegments.map(seg => (
                <div key={seg.cat} className="grid grid-cols-3 items-center py-0.5 text-[11px] text-text-primary text-left">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                    <span className="capitalize truncate">{categoryLabels[seg.cat]}</span>
                  </div>
                  <span className="text-right font-medium text-text-secondary">
                    R$ {seg.value.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                  <span className="text-right font-semibold text-text-primary">
                    {seg.percentage.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card hoverable={false} className="lg:col-span-6 p-6 flex flex-col justify-between">
          <div className="border-b border-border-custom/30 pb-3 mb-4 text-left">
            <h4 className="font-semibold text-text-primary text-xs uppercase tracking-wider">Produtos com Maior Capital</h4>
            <p className="text-[10px] text-text-secondary mt-0.5">Top 5 itens com maior valor imobilizado.</p>
          </div>

          <div className="space-y-4 my-auto">
            {topValuedItems.map((item) => {
              const maxItemVal = topValuedItems[0]?.totalValue || 1;
              const percent = (item.totalValue / maxItemVal) * 100;

              return (
                <div key={item.id} className="space-y-1.5 text-left">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-text-primary truncate max-w-[240px]">{item.nome}</span>
                    <span className="text-text-primary font-bold">
                      R$ {item.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-bg-primary rounded-md overflow-hidden border border-border-custom/40">
                    <div 
                      className="h-full bg-accent-green rounded-md transition-all duration-500 shadow-glow-green" 
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] text-text-secondary">
                    <span className="uppercase tracking-wide font-semibold">{item.categoria}</span>
                    <span>Preço: R$ {Number(item.preco).toFixed(2)} &bull; Estoque: {item.estoque} un</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

      </div>
    </div>
  );
};
