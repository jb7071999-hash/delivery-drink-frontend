# 🍹 Delivery Drink — Front-end

Plataforma de delivery de bebidas que conecta clientes, lojas parceiras (bares, distribuidoras e conveniências) e entregadores — do catálogo até a confirmação de recebimento.

**Projeto Integrador II** · UAPITSI19 · Turma TLAGOASF (2025.2)

API do projeto: https://github.com/jb7071999-hash/delivery-drink-api

---

## 📋 Sobre o projeto

O sistema atende três perfis de usuário:

- **Cliente** — busca, compra e acompanha pedidos de bebidas.
- **Loja** — recebe pedidos, aceita/recusa e marca como pronto para coleta.
- **Entregador** — aceita corridas de entrega e conclui a entrega.

Este repositório contém o **front-end**. Por enquanto os dados são mockados em memória; a integração com a API (Supabase/PostgreSQL) entra na sequência.

## 🛠️ Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | React 18 |
| Build tool | Vite |
| Roteamento | React Router DOM |
| Estado global | Context API (carrinho e pedidos) |
| Estilização | CSS puro, com tokens de cor/tipografia próprios |
| Backend | API REST em Node.js + Express + Supabase (repositório separado) |

## 🚀 Como rodar

Pré-requisito: [Node.js](https://nodejs.org) 18 ou superior.

```bash
git clone https://github.com/jb7071999-hash/delivery-drink-front.git
cd delivery-drink-front
npm install
npm run dev
```

Acesse **http://localhost:5173**.

## 🎬 Como testar o fluxo completo

Na tela de login, escolha o perfil em **"Entrar como"** e clique em Entrar (ainda não há validação de credenciais). Depois, use o seletor **Visão** no rodapé das telas para alternar entre os perfis:

1. **Cliente** — adicione bebidas no catálogo → carrinho → checkout → confirme o pedido.
2. **Loja** — o pedido aparece como *Novo*: aceite e depois marque como pronto.
3. **Entregador** — a corrida aparece como disponível: aceite e marque como entregue.
4. **Cliente** — em *Acompanhar pedido*, o status acompanha cada passo.

## 🖥️ Telas

| Rota | Tela | Perfil | Épico |
|---|---|---|---|
| `/login` | Cadastro e login | Todos | E1 |
| `/catalogo` | Catálogo com busca e filtro por categoria | Cliente | E2 |
| `/carrinho` | Carrinho de compras | Cliente | E3 |
| `/checkout` | Endereço, pagamento e confirmação | Cliente | E4 |
| `/acompanhamento` | Rastreamento do pedido | Cliente | E7 |
| `/loja` | Painel de pedidos recebidos | Loja | E5 |
| `/entregador` | Painel de corridas disponíveis | Entregador | E6 |

Cada tela corresponde a uma rota especifica já definida na API

## 📁 Estrutura

```
src/
├── components/
│   └── DemoNav.jsx            # alternância entre visões (cliente/loja/entregador)
├── context/
│   ├── CartContext.jsx        # estado global do carrinho (E3)
│   └── OrdersContext.jsx      # estado global dos pedidos e seus status
├── data/products.js           # produtos mockados
├── pages/                     # uma tela por arquivo (ver tabela acima)
├── utils/format.js            # formatação de moeda e resumo de itens
├── App.jsx                    # rotas
├── main.jsx
└── index.css                  # estilos globais e tokens visuais
```

## ✅ Progresso por entrega

### Entrega 1 — Planejamento
- [x] Documentação inicial com diagramas UML
- [x] Prototipação de telas
- [x] Trello configurado, backlog criado e priorizado

### Entrega 2 — Front-end
- [x] Definição das tecnologias e repositório remoto
- [x] Login (E1), catálogo (E2), estado global do carrinho e carrinho (E3)

### Entrega 3 — Back-end
- [x] Checkout (E4)
- [x] Acompanhamento do pedido (E7)
- [x] Painel da loja (E5)
- [x] Painel do entregador (E6)
- [ ] Integração das telas com a API

## 📌 Gestão do projeto

Tarefas acompanhadas no Trello, no fluxo:
`Backlog` → `Sprint Atual (Priorizado)` → `Em Andamento` → `Em Revisão` → `Concluído`

## 👥 Equipe

- Maria dos Remédios Oliveira Santos
- Francisco das Chagas de Sousa
- Francisco de Assis Brito Rocha Junior
- Joceli do Nascimento Rodrigues
- Salomão Wenderson Medeiros Jucá
