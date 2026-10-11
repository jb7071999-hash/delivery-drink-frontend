import { createContext, useContext, useMemo, useState } from 'react'

// [E3] Estado global do carrinho
// Guarda os itens do carrinho e expõe ações para adicionar, remover
// e ajustar quantidades, além dos totais já calculados.

const CartContext = createContext(null)

const DELIVERY_FEE = 6.9

export function CartProvider({ children }) {
  const [items, setItems] = useState([]) // { id, name, store, price, icon, qty }

  function addItem(product) {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  function increment(id) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item))
    )
  }

  function decrement(id) {
    setItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    )
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  function clearCart() {
    setItems([])
  }

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  )

  const total = items.length > 0 ? subtotal + DELIVERY_FEE : 0

  const value = {
    items,
    addItem,
    increment,
    decrement,
    removeItem,
    clearCart,
    subtotal,
    deliveryFee: DELIVERY_FEE,
    total,
    itemCount: items.reduce((sum, item) => sum + item.qty, 0),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart precisa estar dentro de <CartProvider>')
  return ctx
}
