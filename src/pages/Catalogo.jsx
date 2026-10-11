import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CATEGORIES, PRODUCTS } from '../data/products'
import { useCart } from '../context/CartContext'
import { useOrders } from '../context/OrdersContext'
import DemoNav from '../components/DemoNav'

// [E2] Tela de catálogo (listagem e busca)
// Busca por nome + filtro por categoria sobre a lista mockada de produtos.

export default function Catalogo() {
  const navigate = useNavigate()
  const { addItem, itemCount } = useCart()
  const { pedidoAtual } = useOrders()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Todas')

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory = category === 'Todas' || p.category === category
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [query, category])

  return (
    <div className="phone-shell">
      <p className="brand">
        delivery<span>drink</span>
      </p>
      <p className="subtitle">Entregar em Rua das Palmeiras, 120</p>

      <div className="search-bar">
        <span>🔎</span>
        <input
          placeholder="Buscar cerveja, vinho, gin..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="chip-row">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`chip ${category === cat ? 'active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="section-title">
        Mais pedidas perto de você
        <span>{filtered.length} produtos</span>
      </p>

      {filtered.length === 0 && (
        <p className="empty-state">Nenhum produto encontrado para essa busca.</p>
      )}

      {filtered.map((product) => (
        <div className="product-card" key={product.id}>
          <div className="product-thumb" style={{ background: 'var(--surface-2)' }}>
            {product.icon}
          </div>
          <div className="product-info">
            <p className="product-name">{product.name}</p>
            <p className="product-store">{product.store}</p>
            <p className="product-price">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </p>
          </div>
          <button className="add-btn" onClick={() => addItem(product)}>+</button>
        </div>
      ))}

      <div className="bottom-cta">
        <button className="btn-secondary" onClick={() => navigate('/carrinho')}>
          Ver carrinho {itemCount > 0 ? `(${itemCount})` : ''}
        </button>
        {pedidoAtual && (
          <>
            <div style={{ height: 10 }} />
            <button className="btn-secondary" onClick={() => navigate('/acompanhamento')}>
              Acompanhar pedido #{pedidoAtual.id}
            </button>
          </>
        )}
        <DemoNav />
      </div>
    </div>
  )
}
