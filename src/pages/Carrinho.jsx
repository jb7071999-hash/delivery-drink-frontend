import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import DemoNav from '../components/DemoNav'

// [E3] Tela de carrinho
// Lê o estado global do CartContext e permite ajustar quantidades
// antes de seguir para o checkout.

export default function Carrinho() {
  const navigate = useNavigate()
  const { items, increment, decrement, subtotal, deliveryFee, total } = useCart()

  function formatBRL(value) {
    return `R$ ${value.toFixed(2).replace('.', ',')}`
  }

  return (
    <div className="phone-shell">
      <p className="brand">
        delivery<span>drink</span>
      </p>
      <p className="subtitle">Seu carrinho</p>

      {items.length === 0 ? (
        <p className="empty-state">
          Seu carrinho está vazio. Volte ao catálogo para adicionar bebidas.
        </p>
      ) : (
        <>
          {items.map((item) => (
            <div className="product-card" key={item.id}>
              <div className="product-thumb" style={{ background: 'var(--surface-2)' }}>
                {item.icon}
              </div>
              <div className="product-info">
                <p className="product-name">{item.name}</p>
                <p className="product-store">
                  {formatBRL(item.price)} / unid.
                </p>
              </div>
              <div className="qty-control">
                <button onClick={() => decrement(item.id)}>−</button>
                <span>{item.qty}</span>
                <button onClick={() => increment(item.id)}>+</button>
              </div>
            </div>
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
        </>
      )}

      <div className="bottom-cta">
        <button
          className="btn-primary"
          disabled={items.length === 0}
          onClick={() => navigate('/checkout')}
        >
          Ir para o checkout →
        </button>
        <div style={{ height: 10 }} />
        <button className="btn-secondary" onClick={() => navigate('/catalogo')}>
          Continuar comprando
        </button>
        <DemoNav />
      </div>
    </div>
  )
}
