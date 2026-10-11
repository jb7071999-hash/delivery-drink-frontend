import { createContext, useContext, useState } from 'react'

// Estado global dos pedidos (mockado em memória).
// Conecta as três visões do sistema: o cliente cria o pedido no checkout,
// a loja aceita e prepara, o entregador aceita a corrida e conclui a entrega.
// Quando a API estiver integrada, estas funções passam a chamar os endpoints
// POST /pedidos e PATCH /entregas/:id/status.
//
// Fluxo de status: confirmado → em_preparo → pronto → a_caminho → entregue
//                  (ou recusado, se a loja recusar)

const OrdersContext = createContext(null)

const PEDIDOS_INICIAIS = [
  {
    id: 1042, cliente: 'Juliana R.', loja: 'Empório do Lúpulo', metodo: 'pix',
    itens: [
      { name: 'IPA Session 350ml', qty: 3, price: 9.9 },
      { name: 'Pilsen Premium 473ml', qty: 6, price: 8.5 },
    ],
    subtotal: 80.7, taxa: 6.9, total: 87.6, status: 'confirmado',
    entregador: null, ganho: 7.2, distColeta: 0.8, distEntrega: 2.1,
    endereco: 'Rua das Palmeiras, 120 — Centro',
  },
  {
    id: 1041, cliente: 'Bruno S.', loja: 'Empório do Lúpulo', metodo: 'cartao',
    itens: [{ name: 'Vinho Tinto 750ml', qty: 2, price: 39.9 }],
    subtotal: 79.8, taxa: 6.9, total: 86.7, status: 'em_preparo',
    entregador: null, ganho: 7.2, distColeta: 0.8, distEntrega: 1.6,
    endereco: 'Av. Brasil, 900',
  },
  {
    id: 1039, cliente: 'Ana P.', loja: 'Bar do Zé', metodo: 'dinheiro',
    itens: [{ name: 'Gin Artesanal 750ml', qty: 1, price: 79.9 }],
    subtotal: 79.9, taxa: 6.9, total: 86.8, status: 'pronto',
    entregador: null, ganho: 9.5, distColeta: 1.4, distEntrega: 3.6,
    endereco: 'Rua das Flores, 45',
  },
]

export function OrdersProvider({ children }) {
  const [pedidos, setPedidos] = useState(PEDIDOS_INICIAIS)
  const [pedidoAtualId, setPedidoAtualId] = useState(null) // pedido do cliente logado
  const [proximoId, setProximoId] = useState(1043)

  // Chamado pelo checkout. Retorna o pedido criado.
  function criarPedido({ itens, metodo, endereco, subtotal, taxa, total }) {
    const pedido = {
      id: proximoId,
      cliente: 'Você',
      loja: itens[0]?.store ?? 'Empório do Lúpulo',
      metodo,
      itens: itens.map(({ name, qty, price }) => ({ name, qty, price })),
      subtotal,
      taxa,
      total,
      status: 'confirmado',
      entregador: null,
      ganho: 7.2,
      distColeta: 0.8,
      distEntrega: 2.1,
      endereco,
    }
    setPedidos((prev) => [pedido, ...prev])
    setPedidoAtualId(pedido.id)
    setProximoId((n) => n + 1)
    return pedido
  }

  function atualizarStatus(id, status, extra = {}) {
    setPedidos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status, ...extra } : p))
    )
  }

  const pedidoAtual = pedidos.find((p) => p.id === pedidoAtualId) ?? null

  return (
    <OrdersContext.Provider
      value={{ pedidos, pedidoAtual, criarPedido, atualizarStatus }}
    >
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  const ctx = useContext(OrdersContext)
  if (!ctx) throw new Error('useOrders precisa estar dentro de <OrdersProvider>')
  return ctx
}
