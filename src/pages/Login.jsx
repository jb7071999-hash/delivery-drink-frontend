import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// [E1] Tela de cadastro e login
// Formulário controlado com validação simples. A autenticação real
// (Supabase Auth) entra quando a tabela de usuários estiver no ar.

const PERFIS = [
  { id: 'cliente', label: 'Cliente' },
  { id: 'loja', label: 'Loja' },
  { id: 'entregador', label: 'Entregador' },
]

const ROTA_POR_PERFIL = {
  cliente: '/catalogo',
  loja: '/loja',
  entregador: '/entregador',
}

export default function Login() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login') // 'login' | 'cadastro'
  const [perfil, setPerfil] = useState('cliente') // 'cliente' | 'loja' | 'entregador'
  const [form, setForm] = useState({ nome: '', email: '', senha: '' })
  const [error, setError] = useState('')

  function handleChange(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.email || !form.senha) {
      setError('Preencha e-mail e senha para continuar.')
      return
    }
    if (mode === 'cadastro' && !form.nome) {
      setError('Preencha seu nome para criar a conta.')
      return
    }
    setError('')
    // Sem backend ainda: simula sucesso e abre a tela do perfil escolhido.
    navigate(ROTA_POR_PERFIL[perfil])
  }

  return (
    <div className="phone-shell">
      <p className="brand">
        delivery<span>drink</span>
      </p>
      <p className="subtitle">
        {mode === 'login' ? 'Entre para continuar pedindo' : 'Crie sua conta em segundos'}
      </p>

      <form onSubmit={handleSubmit}>
        <span className="field-label">Entrar como</span>
        <div className="chip-row" style={{ marginBottom: 16 }}>
          {PERFIS.map((p) => (
            <button
              type="button"
              key={p.id}
              className={`chip ${perfil === p.id ? 'active' : ''}`}
              onClick={() => setPerfil(p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>

        {mode === 'cadastro' && (
          <>
            <label className="field-label" htmlFor="nome">Nome</label>
            <input
              id="nome"
              className="input"
              placeholder="Seu nome completo"
              value={form.nome}
              onChange={handleChange('nome')}
            />
          </>
        )}

        <label className="field-label" htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          className="input"
          placeholder="voce@email.com"
          value={form.email}
          onChange={handleChange('email')}
        />

        <label className="field-label" htmlFor="senha">Senha</label>
        <input
          id="senha"
          type="password"
          className="input"
          placeholder="••••••••"
          value={form.senha}
          onChange={handleChange('senha')}
        />

        {error && <p className="error-text">{error}</p>}

        <button type="submit" className="btn-primary">
          {mode === 'login' ? 'Entrar' : 'Criar conta'}
        </button>
      </form>

      <div style={{ marginTop: 14, textAlign: 'center' }}>
        {mode === 'login' ? (
          <a className="link-muted" href="#" onClick={(e) => { e.preventDefault(); setMode('cadastro') }}>
            Não tem conta? Cadastre-se
          </a>
        ) : (
          <a className="link-muted" href="#" onClick={(e) => { e.preventDefault(); setMode('login') }}>
            Já tem conta? Entrar
          </a>
        )}
      </div>
    </div>
  )
}
