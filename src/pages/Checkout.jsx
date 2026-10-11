import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useOrders } from '../context/OrdersContext'
import { formatBRL } from '../utils/format'
import DemoNav from '../components/DemoNav'

// [E4] Tela de checkout
// Confirma endereço, forma de pagamento e total. Ao confirmar, cria o pedido
// (hoje em memória; depois via POST /pedidos) e segue para o acompanhamento.

const OPCOES_PAGAMENTO = [
  { id: 'pix', label: 'Pix (aprovação imediata)' },
  { id: 'cartao', label: 'Cartão de crédito •• 4412' },
  { id: 'dinheiro', label: 'Dinheiro na entrega' },
]

export default function Checkout() {
  const navigate = useNavigate()
  const { items, subtotal, deliveryFee, total, clearCart } = useCart()
  const { criarPedido } = useOrders()

  const [metodo, setMetodo] = useState('pix')
  const [endereco, setEndereco] = useState('Rua das Palmeiras, 120 — Centro')
  const [editandoEndereco, setEditandoEndereco] = useState(false)

  // Sem itens no carrinho não há o que finalizar
  if (items.length === 0) return <Navigate to="/carrinho" replace />

  function confirmar() {
    if (!endereco.trim()) return
    criarPedido({
      itens: items,
      metodo,
      endereco: endereco.trim(),
      subtotal,
      taxa: deliveryFee,
      total,
    })
    clearCart()
    navigate('/acompanhamento')
  }

  return (
    <div className="phone-shell">
      <p className="brand">
        delivery<span>drink</span>
      </p>
      <p className="subtitle">Finalizar pedido</p>

      <div className="info-card">
        <p className="kicker">Entregar em</p>
        <div className="row">
          {editandoEndereco ? (
            <input
              className="input"
              style={{ marginBottom: 0 }}
              value={endereco}
              autoFocus
              onChange={(e) => setEndereco(e.target.value)}
              onBlur={() => endereco.trim() && setEditandoEndereco(false)}
              onKeyDown={(e) => e.key === 'Enter' && endereco.trim() && setEditandoEndereco(false)}
            />
          ) : (
            <>
              <p className="value">{endereco}</p>
              <button className="text-action" onClick={() => setEditandoEndereco(true)}>
                Trocar
              </button>
            </>
          )}
        </div>
      </div>

      <div className="info-card">
        <p className="kicker">Previsão de entrega</p>
        <p className="value">25–35 min</p>
      </div>

      <p className="section-title" style={{ marginTop: 18 }}>Forma de pagamento</p>
      {OPCOES_PAGAMENTO.map((opcao) => (
        <button
          key={opcao.id}
          className={`radio-option ${metodo === opcao.id ? 'selected' : ''}`}
          onClick={() => setMetodo(opcao.id)}
        >
          <span className="radio-dot" />
          {opcao.label}
        </button>
      ))}

      <div className="summary-box">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>{formatBRL(subtotal)}</span>
        </div>
        <div className="summary-row">
          <span>Taxa de entrega</span>
          <span>{formatBRL(deliveryFee)}</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>{formatBRL(total)}</span>
        </div>
      </div>

      <div className="bottom-cta">
        <button className="btn-primary" onClick={confirmar} disabled={!endereco.trim()}>
          Confirmar pedido — {formatBRL(total)}
        </button>
        <div style={{ height: 10 }} />
        <button className="btn-secondary" onClick={() => navigate('/carrinho')}>
          Voltar ao carrinho
        </button>
        <DemoNav />
      </div>
    </div>
  )
}
