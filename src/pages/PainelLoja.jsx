import { useOrders } from '../context/OrdersContext'
import { formatBRL, METODOS_PAGAMENTO, resumoItens } from '../utils/format'
import DemoNav from '../components/DemoNav'

// [E5] Painel da loja — pedidos recebidos
// A loja aceita ou recusa pedidos novos e marca como pronto para coleta.

const BADGES = {
  confirmado: { texto: 'Novo', classe: 'novo' },
  em_preparo: { texto: 'Em preparo', classe: 'preparo' },
  pronto: { texto: 'Pronto p/ coleta', classe: 'pronto' },
  a_caminho: { texto: 'A caminho', classe: 'caminho' },
  entregue: { texto: 'Entregue', classe: 'entregue' },
  recusado: { texto: 'Recusado', classe: 'recusado' },
}

export default function PainelLoja() {
  const { pedidos, atualizarStatus } = useOrders()

  const novos = pedidos.filter((p) => p.status === 'confirmado').length
  const emPreparo = pedidos.filter((p) => p.status === 'em_preparo').length
  const faturado = pedidos
    .filter((p) => p.status !== 'recusado' && p.status !== 'confirmado')
    .reduce((soma, p) => soma + p.subtotal, 0)

  return (
    <div className="phone-shell">
      <div className="header-row">
        <div>
          <p className="subtitle" style={{ margin: 0 }}>Painel da loja</p>
          <p className="brand" style={{ fontSize: 19 }}>Empório do Lúpulo</p>
        </div>
        <div className="avatar lime">EL</div>
      </div>

      <div className="stat-row">
        <div className="stat"><strong>{novos}</strong><span>pedidos novos</span></div>
        <div className="stat"><strong>{emPreparo}</strong><span>em preparo</span></div>
        <div className="stat"><strong>{formatBRL(faturado).replace(',00', '')}</strong><span>faturado hoje</span></div>
      </div>

      <p className="section-title">Pedidos recebidos</p>

      {pedidos.length === 0 && <p className="empty-state">Nenhum pedido por enquanto.</p>}

      {pedidos.map((pedido) => {
        const badge = BADGES[pedido.status]
        return (
          <div className="order-card" key={pedido.id}>
            <div className="order-head">
              <strong>Pedido #{pedido.id}</strong>
              <span className={`badge ${badge.classe}`}>{badge.texto}</span>
            </div>
            <p className="order-meta">{resumoItens(pedido.itens)}</p>
            <p className="order-meta">
              Cliente: {pedido.cliente} · {METODOS_PAGAMENTO[pedido.metodo]} · {formatBRL(pedido.total)}
            </p>

            {pedido.status === 'confirmado' && (
              <div className="order-actions">
                <button className="btn-primary" onClick={() => atualizarStatus(pedido.id, 'em_preparo')}>
                  Aceitar
                </button>
                <button className="btn-secondary" onClick={() => atualizarStatus(pedido.id, 'recusado')}>
                  Recusar
                </button>
              </div>
            )}
            {pedido.status === 'em_preparo' && (
              <div className="order-actions">
                <button className="btn-primary" onClick={() => atualizarStatus(pedido.id, 'pronto')}>
                  Marcar pronto
                </button>
              </div>
            )}
          </div>
        )
      })}

      <DemoNav />
    </div>
  )
}
