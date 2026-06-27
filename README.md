# Falkon
Projeto desenvolvido para o desafio acadêmico da Falkon, um e-commerce especializado em produtos Geek, Tech e Gamer.

## Video do projeto:
https://drive.google.com/file/d/1g8vSjvqZG3X5mZqa0ERo9is9eaNbUhVd/view?usp=sharing

## Desafio de Negócio
A venda de produtos sem estoque pode gerar insatisfação dos clientes e impactar negativamente a imagem da empresa. Para solucionar esse problema, foi desenvolvido um sistema de gerenciamento de estoque (ERP) que permite o acompanhamento e atualização das quantidades disponíveis em tempo real.

### Funcionalidades 
- Dashboard com indicadores de estoque (Big Numbers)
- Identificação visual dos níveis de estoque:
    - 🔴 Esgotado
    - 🟡 Estoque Baixo
- Página dedicada para ajuste de estoque
- Incremento e decremento rápido de quantidades (+ e -)
- Atualização dos dados através do JSON Server
- Tabela dinâmica de produtos

## Requisitos Técnicos
  - React Router: É obrigatório o uso de uma rota base com pelo menos 2 routes.
  - Custom Hooks: Criação de pelo menos um Custom Hook para separar regras de negócio.
  - Componentização: Criação de componentes pelo menos 1 componentes reutilizáveis.

## Tecnologias Utilizadas
- React
- React Router DOM
- JavaScript
- CSS
- JSON Server

## Como Executar
1- Instalar dependências<br>
```bash
npm install
```

2- Iniciar o JSON Server<br>
```bash
npx json-server --watch db.json --port 3001
```
    
3- Executar a aplicação<br>
```bash
npm run dev
```

## Desenvolvido por:
  [GabrielRodolfoR](https://github.com/GabrielRodolfoR)<br>
  [KevinGirelli](https://github.com/KevinGirelli)<br>
  [Iago Cardoso Rabello De Souza]()
