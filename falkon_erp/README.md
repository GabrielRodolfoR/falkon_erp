# Documentação Técnica — Falkon ERP

**Sistema de Gerenciamento de Estoque para E-commerce Geek, Tech e Gamer**

**Disciplina:** Desafio Acadêmico Falkon  
**Data:** Junho de 2026  
**Integrantes:** Gabriel Rodolfo R., Kevin Girelli, Iago Cardoso Rabello de Souza

---

## 1. Introdução

Este documento descreve o desenvolvimento do **Falkon ERP**, aplicação web criada como resposta ao desafio acadêmico proposto pela empresa Falkon — e-commerce especializado em produtos Geek, Tech e Gamer. O problema central é a venda de produtos sem estoque disponível, situação que gera insatisfação dos clientes e prejudica a imagem da marca.

Para solucionar esse problema, foi construído um sistema de gerenciamento de estoque (ERP) que permite ao time operacional acompanhar, visualizar e atualizar as quantidades disponíveis de cada produto em tempo real. A solução foi implementada como Single Page Application (SPA) com React, com persistência simulada via JSON Server, emulando uma API RESTful.

---

## 2. Objetivos do Projeto

- Desenvolver dashboard com indicadores consolidados de estoque (Big Numbers).
- Identificar visualmente os níveis: **Esgotado** (0 un.), **Estoque Baixo** (1–3 un.) e **Disponível** (> 3 un.).
- Criar página dedicada ao ajuste e monitoramento de estoque.
- Permitir incremento e decremento rápido de quantidades (+ e −).
- Persistir alterações via API REST simulada (JSON Server).
- Exibir produtos em tabela dinâmica com busca por nome ou categoria.
- Atender requisitos acadêmicos: React Router, Custom Hooks e componentização.

---

## 3. Tecnologias Utilizadas

| Tecnologia | Finalidade |
|---|---|
| React 19 | Construção da interface |
| React Router DOM 7 | Roteamento entre páginas |
| Vite 8 | Bundler e servidor de desenvolvimento |
| Tailwind CSS 4 | Estilização e design system |
| Axios | Cliente HTTP para comunicação com a API |
| JSON Server | Simulação de backend REST com arquivo JSON |
| Lucide React / CVA | Ícones e variantes de componentes UI |

---

## 4. Arquitetura do Sistema

A aplicação segue arquitetura em camadas, separando apresentação, roteamento, negócio, serviços e dados:

```
Camada de Apresentação → Pages (Dashboard, Catálogo, Estoque) + Components (Tabs, Modals, Sidebars, UI)
Camada de Roteamento   → AppRoutes (React Router) + PageLayout (Outlet)
Camada de Negócio      → Custom Hooks + cálculos de métricas no PageLayout
Camada de Serviços     → productsServices, usersServices, ordersService, api.js
Camada de Dados        → JSON Server (porta 3001) → db.json
```

A estrutura de pastas organiza `components/` (incluindo `ui/` para o design system), `pages/`, `routes/`, `hooks/`, `services/` e `database/`, facilitando manutenção e evolução do código.

---

## 5. Modelo de Dados

O banco simulado (`src/database/db.json`) contém quatro entidades:

- **Produtos:** id, nome, descrição, preço, categoria, estoque, promoção e nota — 8 itens nas categorias periféricos, geek, livros e monitores.
- **Usuários:** operadores do ERP com nome, e-mail, nível (admin, vip, comum) e saldo da carteira.
- **Pedidos:** vendas com referência a usuário e produto, quantidade, data, status e valor pago.
- **Cupons:** códigos de desconto com percentual, categoria válida e flag ativo.

---

## 6. Funcionalidades Implementadas

### 6.1 Dashboard — Visão Geral do Almoxarifado (`/`)

Apresenta quatro indicadores (Big Numbers): produtos cadastrados, produtos esgotados (vermelho pulsante quando > 0), itens em estoque baixo (amarelo) e total de unidades físicas. Inclui gráfico de rosca em SVG com distribuição do patrimônio por categoria (tooltip interativo) e ranking Top 5 dos produtos com maior capital imobilizado (preço × estoque).

### 6.2 Catálogo de Produtos (`/catalogo-de-produtos`)

Tabela dinâmica com busca em tempo real por nome ou categoria. Colunas: ID, Nome, Categoria, Preço, Estoque, Status (Badge verde/amarelo/vermelho) e Ações. Permite ajustar estoque de cada produto via modal.

### 6.3 Níveis de Estoque (`/niveis-de-estoque`)

Cards individuais por produto com barra de progresso colorida (capacidade máxima de 30 un.), badge com quantidade atual e botão "Ajustar Estoque".

### 6.4 Modal de Ajuste de Estoque

Componente reutilizável (`AdjustStockModal`) usado no Catálogo e em Níveis de Estoque. Exibe quantidade atual e preço, permite editar via botões +/− ou campo numérico, salva com `PUT /produtos/:id` e exibe banner de sucesso temporário.

### 6.5 Layout e Navegação

- **LeftSidebar:** navegação entre páginas, alternância tema claro/escuro (persistido em localStorage).
- **RightSidebar:** resumo do estoque, legenda de status, indicador de conexão com API e usuário logado.
- **Estado de carregamento:** spinner animado enquanto dados são buscados da API.

---

## 7. Requisitos Técnicos Acadêmicos

### React Router

Três rotas principais dentro de `PageLayout` com padrão `<Outlet />` e compartilhamento de dados via `useOutletContext()`:

| Rota | Página | Descrição |
|---|---|---|
| `/` | Dashboard | Painel com indicadores |
| `/catalogo-de-produtos` | ProductsCatalog | Tabela de produtos |
| `/niveis-de-estoque` | StockLevels | Cards de estoque |

### Custom Hooks

`useProducts`, `useUsers` e `useOrders` encapsulam chamadas assíncronas, estados de loading/erro e função de recarregamento, separando regras de negócio da apresentação.

### Componentização

Design system reutilizável: `Card`, `Badge` (variantes via CVA), `Button`, `Input` e `Table`. Componentes de domínio como `DashboardTab`, `StockTab`, `ProductsTab` e `AdjustStockModal` são compartilhados entre páginas.

---

## 8. Comunicação com a API e Execução

Axios centralizado em `api.js` (`http://localhost:3001`). Serviços expõem CRUD para produtos, usuários e pedidos. Fluxo de atualização: usuário ajusta quantidade → `updateProduct` via PUT → JSON Server persiste → `loadData()` recarrega → indicadores atualizados em todas as páginas.

### Como executar

```bash
npm install
npx json-server --watch src/database/db.json --port 3001
npm run dev
```

Acesse a URL exibida no terminal (geralmente `http://localhost:5173`).

---

## 9. Considerações Finais

O Falkon ERP atende integralmente aos requisitos do desafio acadêmico, entregando sistema funcional de gerenciamento de estoque com interface moderna. A arquitetura em camadas e a componentização facilitam manutenção e evolução. Como melhorias futuras: backend real, autenticação de usuários, gestão de pedidos/cupons na interface e alertas automáticos de estoque baixo.

---

**Desenvolvido por:**  
[Gabriel Rodolfo R.](https://github.com/GabrielRodolfoR) · [Kevin Girelli](https://github.com/KevinGirelli) · Iago Cardoso Rabello de Souza

© 2026 Falkon ERP
