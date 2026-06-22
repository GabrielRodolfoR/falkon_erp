import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, Boxes, Settings, Sun, Moon } from "lucide-react";


export const LeftSidebar = ({ theme, setTheme }) => {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-[90px] h-full bg-bg-sidebar border-r border-border-custom justify-between items-center py-8 z-20">
      
      <div className="flex items-center justify-center p-2 rounded-xl">
        <img src="/logo.png" alt="Falkon Logo" className="w-10 h-10 rounded-lg" />
      </div>

      <div className="w-10 h-[1px] bg-border-custom my-4" />

      <nav className="flex flex-col gap-6 my-auto items-center">
        {[
          { id: "dashboard", icon: LayoutDashboard, label: "Painel", path: "/" },
          { id: "produtos", icon: Package, label: "Produtos", path: "/catalogo-de-produtos" },
          { id: "estoque", icon: Boxes, label: "Estoque", path: "/niveis-de-estoque" }
        ].map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`relative flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200 cursor-pointer group
                ${isActive 
                  ? "text-accent-green bg-accent-green/5 border border-accent-green/10 shadow-glow-green-sm" 
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-hover"
                }`}
              title={item.label}
            >
              {isActive && (
                <span className="absolute left-[-15px] top-1/4 w-[3px] h-1/2 bg-accent-green rounded-r-md" />
              )}
              <Icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-105" />
            </Link>
          );
        })}
      </nav>

      {/* Separator */}
      <div className="w-10 h-[1px] bg-border-custom my-4" />

      {/* Bottom utility tools */}
      <div className="flex flex-col gap-6 items-center">
        {/* Light/Dark Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex items-center justify-center w-10 h-10 rounded-xl text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-all duration-200 cursor-pointer"
          title="Alternar Tema"
        >
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Settings Tab trigger (icon only) */}
        <button
          className="flex items-center justify-center w-10 h-10 rounded-xl text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-all duration-200 cursor-pointer"
          title="Configurações (Em breve)"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
};
