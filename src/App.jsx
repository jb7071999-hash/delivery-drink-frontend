import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { OrdersProvider } from './context/OrdersContext'
import Login from './pages/Login'
import Catalogo from './pages/Catalogo'
import Carrinho from './pages/Carrinho'
import Checkout from './pages/Checkout'
import Acompanhamento from './pages/Acompanhamento'
import PainelLoja from './pages/PainelLoja'
import PainelEntregador from './pages/PainelEntregador'

export default function App() {
  return (
    <CartProvider>
      <OrdersProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/acompanhamento" element={<Acompanhamento />} />
            <Route path="/loja" element={<PainelLoja />} />
            <Route path="/entregador" element={<PainelEntregador />} />
          </Routes>
        </BrowserRouter>
      </OrdersProvider>
    </CartProvider>
  )
}
