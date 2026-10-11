import { useState } from 'react'
import { useOrders } from '../context/OrdersContext'
import { formatBRL } from '../utils/format'
import DemoNav from '../components/DemoNav'

// [E6] Painel do entregador — corridas disponíveis
// Lista os pedidos prontos para coleta. O entregador aceita a corrida e
// marca como entregue ao concluir.

const ENTREGADOR = 'Marcos T.'

export default function PainelEntregador() {
  const { pedidos, atualizarStatus } = useOrders()
  const [disponivel, setDisponivel] = useState(true)

  const disponiveis = pedidos.filter((p) => p.status === 'pronto' && !p.entregador)
  const emAndamento = pedidos.find(
    (p) => p.status === 'a_caminho' && p.entregador === ENTREGADOR
  )
  const concluidas = pedidos.filter(
    (p) => p.status === 'entregue' && p.entregador === ENTREGADOR
  )

  // Valores-base do dia (do protótipo) somados às entregas concluídas nesta sessão
  const entregasHoje = 5 + concluidas.length
  const ganhosHoje = 87 + concluidas.reduce((soma, p) => soma + p.ganho, 0)

  return (
    <div className="phone-shell">
      <div className="header-row">
        <div>
          <p className="subtitle" style={{ margin: 0 }}>Olá,</p>
          <p className="brand" style={{ fontSize: 19 }}>{ENTREGADOR}</p>
        </div>
        <div className="avatar">MT</div>
      </div>

      <div className="switch-row">
        Disponível para corridas
        <button
          className={`switch ${disponivel ? 'on' : ''}`}
          onClick={() => setDisponivel((d) => !d)}
          aria-label="Alternar disponibilidade"
          aria-pressed={disponivel}
        />
      </div>

      <div className="stat-row">
        <div className="stat"><strong>{entregasHoje}</strong><span>entregas hoje</span></div>
        <div className="stat"><strong>{formatBRL(ganhosHoje).replace(',00', '')}</strong><span>ganhos hoje</span></div>
      </div>

      {emAndamento && (
        <>
          <p className="section-title">Corrida em andamento</p>
          <div className="order-card" style={{ borderColor: 'var(--accent)' }}>
            <div className="order-head">
              <strong>{emAndamento.loja}</strong>
              <span className="ride-price">{formatBRL(emAndamento.ganho)}</span>
            </div>
            <p className="order-meta">Pedido #{emAndamento.id} · {emAndamento.cliente}</p>
            <p className="order-meta">Entregar em {emAndamento.endereco}</p>
            <div className="order-actions">
              <button
                className="btn-primary"
                onClick={() => atualizarStatus(emAndamento.id, 'entregue')}
              >
                Marcar como entregue
              </button>
            </div>
          </div>
        </>
      )}

      <p className="section-title">Corridas disponíveis</p>

      {!disponivel && (
        <p className="empty-state">Você está indisponível. Ative o botão acima para receber corridas.</p>
      )}

      {disponivel && disponiveis.length === 0 && (
        <p className="empty-state">Nenhuma corrida disponível no momento.</p>
      )}

      {disponivel &&
        disponiveis.map((corrida, i) => (
          <div className="order-card" key={corrida.id}>
            <div className="order-head">
              <strong>{corrida.loja}</strong>
              <span className="ride-price">{formatBRL(corrida.ganho)}</span>
            </div>
            <p className="order-meta">
              Coleta a {corrida.distColeta} km · Entrega a {corrida.distEntrega} km
            </p>
            <p className="order-meta">{corrida.endereco}</p>
            <div className="order-actions">
              <button
                className={i === 0 ? 'btn-primary' : 'btn-secondary'}
                disabled={!!emAndamento}
                onClick={() => atualizarStatus(corrida.id, 'a_caminho', { entregador: ENTREGADOR })}
              >
                Aceitar corrida
              </button>
            </div>
          </div>
        ))}

      {emAndamento && disponivel && disponiveis.length > 0 && (
        <p className="help-note">Conclua a corrida em andamento para aceitar outra.</p>
      )}

      <DemoNav />
    </div>
  )
}
