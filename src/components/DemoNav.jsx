import { useLocation, useNavigate } from 'react-router-dom'

// Atalho para alternar entre as três visões do sistema (cliente, loja e
// entregador) sem precisar de logins separados. Serve para demonstrar o
// fluxo completo de um pedido na apresentação.

const VISOES = [
  { label: 'Cliente', rota: '/catalogo', prefixos: ['/catalogo', '/carrinho', '/checkout', '/acompanhamento'] },
  { label: 'Loja', rota: '/loja', prefixos: ['/loja'] },
  { label: 'Entregador', rota: '/entregador', prefixos: ['/entregador'] },
]

export default function DemoNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className="demo-nav">
      <span className="label">Visão</span>
      {VISOES.map((v) => (
        <button
          key={v.label}
          className={v.prefixos.some((p) => pathname.startsWith(p)) ? 'active' : ''}
          onClick={() => navigate(v.rota)}
        >
          {v.label}
        </button>
      ))}
    </div>
  )
}
