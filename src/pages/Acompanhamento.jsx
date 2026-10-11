import { Navigate, useNavigate } from 'react-router-dom'
import { useOrders } from '../context/OrdersContext'
import { formatBRL, resumoItens } from '../utils/format'
import DemoNav from '../components/DemoNav'

// [E7] Tela de acompanhamento do pedido (tracking)
// Mostra a etapa atual do pedido do cliente. O status muda conforme a loja e
// o entregador atualizam o pedido nos respectivos painéis.

const ETAPAS = ['Confirmado', 'Em preparo', 'A caminho', 'Entregue']

// Etapa (índice) em que cada status do pedido se encontra
const ETAPA_POR_STATUS = {
  confirmado: 0,
  em_preparo: 1,
  pronto: 1,
  a_caminho: 2,
  entregue: 3,
  recusado: 0,
}

const MENSAGENS = {
  confirmado: ['Pedido enviado à loja', 'Aguardando a loja aceitar o pedido'],
  em_preparo: ['Seu pedido está em preparo', 'A loja está separando suas bebidas'],
  pronto: ['Pedido pronto para coleta', 'Aguardando um entregador aceitar a corrida'],
  a_caminho: ['Seu pedido está a caminho 🛵', 'Chegada estimada em 12 min'],
  entregue: ['Pedido entregue! 🎉', 'Bom proveito e beba com moderação'],
  recusado: ['A loja não pôde atender o pedido', 'Nenhuma cobrança foi realizada'],
}

export default function Acompanhamento() {
  const navigate = useNavigate()
  const { pedidoAtual } = useOrders()

  if (!pedidoAtual) return <Navigate to="/catalogo" replace />

  const { status } = pedidoAtual
  const etapaAtual = ETAPA_POR_STATUS[status]
  const [titulo, subtitulo] = MENSAGENS[status]
  const recusado = status === 'recusado'
  const comEntregador = status === 'a_caminho' || status === 'entregue'

  return (
    <div className="phone-shell">
      <p className="status-title">{titulo}</p>
      <p className="status-sub">{subtitulo}</p>

      {!recusado && (
        <div className="stepper">
          {ETAPAS.map((nome, i) => {
            const concluida = i < etapaAtual || status === 'entregue'
            const atual = i === etapaAtual && status !== 'entregue'
            return (
              <div
                key={nome}
                className={`step ${concluida ? 'done' : ''} ${atual ? 'current' : ''}`}
              >
                <div className="step-dot">{concluida ? '✓' : i + 1}</div>
                {nome}
              </div>
            )
          })}
        </div>
      )}

      {!recusado && <div className="map-box">mapa em tempo real</div>}

      {comEntregador && (
        <div className="info-card">
          <div className="row">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="avatar">MT</div>
              <div>
                <p className="value">Marcos T. • moto prata</p>
                <p className="order-meta" style={{ margin: 0 }}>Placa ABC-1D23 · ★ 4.9</p>
              </div>
            </div>
            <button className="text-action">Chat</button>
          </div>
        </div>
      )}

      <div className="info-card">
        <p className="kicker">Pedido #{pedidoAtual.id} · {pedidoAtual.loja}</p>
        <p className="order-meta" style={{ fontSize: 12.5, color: 'var(--text)' }}>
          {resumoItens(pedidoAtual.itens)}
        </p>
        <p className="order-meta">Entrega em {pedidoAtual.endereco}</p>
        <p className="value" style={{ marginTop: 6 }}>{formatBRL(pedidoAtual.total)}</p>
      </div>

      <div className="bottom-cta">
        {status === 'entregue' || recusado ? (
          <button className="btn-primary" onClick={() => navigate('/catalogo')}>
            Fazer novo pedido
          </button>
        ) : (
          <button className="btn-secondary">Precisa de ajuda com o pedido?</button>
        )}
        <p className="help-note">
          Para ver o pedido avançar, use a visão Loja e depois Entregador abaixo.
        </p>
        <DemoNav />
      </div>
    </div>
  )
}
