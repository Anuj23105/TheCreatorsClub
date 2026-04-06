import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CART_STORAGE_KEY = 'trustserve-cart-v1'
const CartContext = createContext(null)

function readStoredCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) {
      return []
    }
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function createCartItemId(workerId, serviceType) {
  return `${workerId}:${serviceType}`
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => readStoredCart())

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function addToCart(payload) {
    const itemId = createCartItemId(payload.workerId, payload.serviceType)
    setItems((prev) => {
      const existing = prev.find((item) => item.id === itemId)
      if (existing) {
        return prev.map((item) =>
          item.id === itemId
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        )
      }

      const today = new Date()
      const defaultDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

      return [
        ...prev,
        {
          id: itemId,
          workerId: payload.workerId,
          workerName: payload.workerName,
          serviceType: payload.serviceType,
          fee: Number(payload.fee || 0),
          location: payload.location || '',
          image: payload.image || '',
          quantity: 1,
          date: payload.date || defaultDate,
          time: payload.time || '10:00',
          notes: payload.notes || '',
        },
      ]
    })
  }

  function updateCartItem(itemId, patch) {
    setItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, ...patch } : item)))
  }

  function updateQuantity(itemId, quantity) {
    const nextQuantity = Number(quantity)
    if (!Number.isFinite(nextQuantity) || nextQuantity < 1) {
      return
    }
    updateCartItem(itemId, { quantity: Math.floor(nextQuantity) })
  }

  function removeFromCart(itemId) {
    setItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  function clearCart() {
    setItems([])
  }

  const value = useMemo(() => {
    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)
    const cartTotal = items.reduce((sum, item) => sum + item.fee * item.quantity, 0)

    return {
      items,
      cartCount,
      cartTotal,
      addToCart,
      updateCartItem,
      updateQuantity,
      removeFromCart,
      clearCart,
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }
  return context
}