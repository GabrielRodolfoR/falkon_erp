export const RightSidebar = ({ 
  currentUser = { nome: "Ana Silva", nivel: "Admin" }, 
  totalProducts = 0, 
  outOfStockCount = 0, 
  lowStockCount = 0, 
  totalItemsInStock = 0, 
  totalStockValue = 0 
}) => {
  return (
    <aside className="hidden lg:flex flex-col w-[300px] h-full bg-bg-sidebar border-l border-border-custom p-6 overflow-y-auto">
      
      <div className="flex items-center gap-3 pb-6 text-left">
        <div className="w-9 h-9 rounded-lg bg-bg-hover flex items-center justify-center text-text-primary font-bold text-xs shrink-0">
          {currentUser.nome ? currentUser.nome.charAt(0) : "U"}
        </div>
        <div>
          <div className="text-xs font-semibold text-text-primary leading-none">{currentUser.nome}</div>
          <div className="text-[10px] text-text-secondary uppercase tracking-wider mt-1">{currentUser.nivel} &bull; Almoxarifado</div>
        </div>
      </div>

      <div className="h-[1px] bg-border-custom w-full my-1" />

      <div className="flex-1 flex flex-col justify-between pt-6 text-left">
        <div className="space-y-6">

          <div>
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block mb-5">Resumo do Estoque</span>
            
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Cadastrados:</span>
                <span className="font-semibold text-text-primary">{totalProducts} produtos</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Esgotados:</span>
                <span className={`font-semibold ${outOfStockCount > 0 ? "text-accent-red animate-pulse" : "text-text-primary"}`}>
                  {outOfStockCount} itens
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Estoque Baixo:</span>
                <span className={`font-semibold ${lowStockCount > 0 ? "text-accent-yellow" : "text-text-primary"}`}>
                  {lowStockCount} itens
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Total Itens:</span>
                <span className="font-semibold text-text-primary">{totalItemsInStock} unidades</span>
              </div>

              <div className="flex justify-between items-center pt-2.5 mt-2.5 border-t border-border-custom/30">
                <span className="text-text-secondary font-medium">Patrimônio:</span>
                <span className="font-bold text-accent-green">
                  R$ {totalStockValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          <div className="h-[1px] bg-border-custom w-full my-1" />

          <div>
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block mb-5">Legenda de Status</span>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                <span className="text-text-secondary">Disponível (&gt; 3 un)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow" />
                <span className="text-text-secondary">Estoque Baixo (1 a 3 un)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-red" />
                <span className="text-text-secondary">Esgotado (0 un)</span>
              </div>
            </div>
          </div>

          <div className="h-[1px] bg-border-custom w-full my-1" />

          <div className="text-xs">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block mb-5">Sincronização</span>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-bold text-accent-green uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green shrink-0" />
                <span>Conectado à API</span>
              </div>
              <p className="text-[10px] text-text-secondary leading-relaxed">
                Integração direta ativa na porta 3001.
              </p>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-border-custom text-[10px] text-text-secondary/30 text-center">
          &copy; 2026 Falkon ERP.
        </div>
      </div>
    </aside>
  );
};
