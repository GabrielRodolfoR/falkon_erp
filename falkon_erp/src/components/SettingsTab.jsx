import { Search } from "lucide-react";
import { Card } from "./ui/Card";
import { Input } from "./ui/Input";
import ProductDetails from "./productDetails";

export const SettingsTab = ({ legacyProductId = "1", setLegacyProductId }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-left">
        <h1 className="text-xl font-bold tracking-tight text-text-primary">Configurações e Testes</h1>
        <p className="text-xs text-text-secondary mt-1">Ambiente de desenvolvimento e testes originais da API de produtos.</p>
      </div>

      <div className="max-w-md mx-auto">
        <Card hoverable={false} className="space-y-4">
          <div className="border-b border-border-custom pb-2 text-left">
            <h3 className="font-semibold text-text-primary">Teste de Produtos</h3>
            <p className="text-[10px] text-text-secondary">Consulta direta da API de produtos por ID.</p>
          </div>

          <div className="space-y-2 text-left">
            <label className="text-[10px] font-semibold text-text-secondary uppercase">ID do Produto</label>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary/40" />
              <Input
                type="text"
                value={legacyProductId}
                onChange={(e) => setLegacyProductId(e.target.value)}
                placeholder="Digite o ID do produto (ex: 1, 2)"
                className="pl-8"
              />
            </div>
          </div>

          <ProductDetails productId={legacyProductId} />
        </Card>
      </div>
    </div>
  );
};
