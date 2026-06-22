import { Search, Pencil } from "lucide-react";
import { Card } from "./ui/Card";
import { Input } from "./ui/Input";
import { Badge } from "./ui/Badge";
import { Table, THead, TBody, TR, TH, TD } from "./ui/Table";

export const ProductsTab = ({ 
  products = [], 
  searchQuery = "", 
  setSearchQuery, 
  onAdjustStockClick 
}) => {
  const filteredProducts = products.filter(p => 
    p.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.categoria.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-left">
          <h1 className="text-xl font-bold tracking-tight text-text-primary">Catálogo de Produtos</h1>
          <p className="text-xs text-text-secondary mt-1">Consulta e gerenciamento de inventário operacional em tempo real.</p>
        </div>

        <div className="relative w-full sm:w-64 text-left">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary/40" />
          <Input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar por nome ou categoria..." 
            className="pl-9 w-full"
          />
        </div>
      </div>

      <Card hoverable={false} className="p-0 overflow-hidden border border-border-custom shadow-sm">
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center text-text-secondary">
            Nenhum produto encontrado para a busca "{searchQuery}".
          </div>
        ) : (
          <Table>
            <THead>
              <TR>
                <TH className="pl-6 w-16">ID</TH>
                <TH>Nome</TH>
                <TH>Categoria</TH>
                <TH className="text-right">Preço</TH>
                <TH className="text-right">Estoque</TH>
                <TH className="text-center w-36">Status</TH>
                <TH className="text-right pr-6 w-20">Ações</TH>
              </TR>
            </THead>
            <TBody>
              {filteredProducts.map((prod) => {
                let statusVariant = "success";
                let statusText = "Disponível";
                
                if (prod.estoque === 0) {
                  statusVariant = "danger";
                  statusText = "Esgotado";
                } else if (prod.estoque >= 1 && prod.estoque <= 3) {
                  statusVariant = "warning";
                  statusText = "Estoque Baixo";
                }

                return (
                  <TR key={prod.id}>
                    <TD className="pl-6 font-mono text-[11px] text-text-secondary">#{prod.id}</TD>
                    <TD className="font-semibold text-text-primary">{prod.nome}</TD>
                    <TD className="capitalize text-text-secondary">{prod.categoria}</TD>
                    <TD className="text-right font-medium text-text-secondary">
                      R$ {Number(prod.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </TD>
                    <TD className="text-right font-bold text-text-primary">{prod.estoque} un</TD>
                    <TD className="text-center">
                      <div className="flex justify-center">
                        <Badge variant={statusVariant}>{statusText}</Badge>
                      </div>
                    </TD>
                    <TD className="text-right pr-6">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => onAdjustStockClick(prod)}
                          className="p-1.5 text-text-secondary hover:text-accent-green hover:bg-accent-green/5 rounded-lg transition-all duration-200 cursor-pointer"
                          title="Ajustar quantidade em estoque"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                      </div>
                    </TD>
                  </TR>
                );
              })}
            </TBody>
          </Table>
        )}
      </Card>
    </div>
  );
};
