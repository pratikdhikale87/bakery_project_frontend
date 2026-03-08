import { createContext, useContext, useEffect, useReducer } from 'react'
import {
  categories,
  makeProductFromForm,
  orderStatuses,
  seedOrders,
  seedProducts,
} from '../data/initialData'

const StoreContext = createContext(null)
const STORAGE_KEY = 'rosy-oven-store-v1'

const baseState = {
  products: seedProducts,
  cart: [],
  wishlist: [],
  quickBuyItem: null,
  orders: seedOrders,
  currentUser: null,
}

const syncStoredProducts = (storedProducts) => {
  if (!Array.isArray(storedProducts) || !storedProducts.length) {
    return seedProducts
  }

  const seedIds = new Set(seedProducts.map((product) => product.id))
  const customProducts = storedProducts.filter((product) => !seedIds.has(product.id))

  return [...seedProducts, ...customProducts]
}

const getSizePrice = (product, sizeLabel) =>
  product?.sizes.find((size) => size.label === sizeLabel)?.price ?? product?.sizes[0]?.price ?? 0

const buildOrderId = () => `RSY-${Math.floor(1000 + Math.random() * 9000)}`

const readInitialState = () => {
  if (typeof window === 'undefined') {
    return baseState
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)

    if (!raw) {
      return baseState
    }

    const parsed = JSON.parse(raw)

    return {
      ...baseState,
      ...parsed,
      products: syncStoredProducts(parsed.products),
      cart: Array.isArray(parsed.cart) ? parsed.cart : baseState.cart,
      wishlist: Array.isArray(parsed.wishlist) ? parsed.wishlist : baseState.wishlist,
      orders: Array.isArray(parsed.orders) && parsed.orders.length ? parsed.orders : baseState.orders,
    }
  } catch {
    return baseState
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const incoming = action.payload
      const matchIndex = state.cart.findIndex(
        (item) => item.productId === incoming.productId && item.size === incoming.size,
      )

      if (matchIndex >= 0) {
        return {
          ...state,
          cart: state.cart.map((item, index) =>
            index === matchIndex ? { ...item, quantity: item.quantity + incoming.quantity } : item,
          ),
        }
      }

      return {
        ...state,
        cart: [...state.cart, incoming],
      }
    }
    case 'UPDATE_CART_QTY':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.productId === action.payload.productId && item.size === action.payload.size
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item,
        ),
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(
          (item) =>
            !(item.productId === action.payload.productId && item.size === action.payload.size),
        ),
      }
    case 'SET_QUICK_BUY':
      return {
        ...state,
        quickBuyItem: action.payload,
      }
    case 'CLEAR_QUICK_BUY':
      return {
        ...state,
        quickBuyItem: null,
      }
    case 'PLACE_ORDER':
      return {
        ...state,
        orders: [action.payload.order, ...state.orders],
        cart: action.payload.mode === 'cart' ? [] : state.cart,
        quickBuyItem: action.payload.mode === 'quick' ? null : state.quickBuyItem,
      }
    case 'SET_USER':
      return {
        ...state,
        currentUser: action.payload,
      }
    case 'LOGOUT':
      return {
        ...state,
        currentUser: null,
      }
    case 'TOGGLE_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.includes(action.payload)
          ? state.wishlist.filter((item) => item !== action.payload)
          : [...state.wishlist, action.payload],
      }
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [action.payload, ...state.products],
      }
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.orderId
            ? { ...order, status: action.payload.status }
            : order,
        ),
      }
    default:
      return state
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, readInitialState)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const cartItems = state.cart
    .map((item) => {
      const product = state.products.find((entry) => entry.id === item.productId)

      if (!product) {
        return null
      }

      const unitPrice = getSizePrice(product, item.size)

      return {
        ...item,
        product,
        unitPrice,
        totalPrice: unitPrice * item.quantity,
      }
    })
    .filter(Boolean)

  const quickBuyItem = (() => {
    if (!state.quickBuyItem) {
      return null
    }

    const product = state.products.find((entry) => entry.id === state.quickBuyItem.productId)

    if (!product) {
      return null
    }

    const unitPrice = getSizePrice(product, state.quickBuyItem.size)

    return {
      ...state.quickBuyItem,
      product,
      unitPrice,
      totalPrice: unitPrice * state.quickBuyItem.quantity,
    }
  })()

  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0)
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const featuredProducts = state.products.filter((product) => product.featured).slice(0, 4)
  const wishlistProducts = state.products.filter((product) => state.wishlist.includes(product.id))

  const addToCart = ({ productId, size, quantity = 1 }) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        productId,
        size,
        quantity,
      },
    })
  }

  const updateCartQuantity = ({ productId, size, quantity }) => {
    dispatch({
      type: 'UPDATE_CART_QTY',
      payload: { productId, size, quantity },
    })
  }

  const removeFromCart = ({ productId, size }) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { productId, size },
    })
  }

  const beginQuickBuy = ({ productId, size, quantity = 1 }) => {
    dispatch({
      type: 'SET_QUICK_BUY',
      payload: { productId, size, quantity },
    })
  }

  const clearQuickBuy = () => dispatch({ type: 'CLEAR_QUICK_BUY' })

  const placeOrder = ({ customer, mode = 'cart' }) => {
    const sourceItems = mode === 'quick' ? (quickBuyItem ? [quickBuyItem] : []) : cartItems

    if (!sourceItems.length) {
      return null
    }

    const etaTime = new Date(Date.now() + 45 * 60000).toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
    })

    const order = {
      id: buildOrderId(),
      placedAt: new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      }),
      status: orderStatuses[0],
      eta: `Today, ${etaTime}`,
      customerName: customer.name,
      customerEmail: customer.email,
      deliveryAddress: `${customer.address}, ${customer.city} - ${customer.pinCode}`,
      paymentMethod: customer.paymentMethod,
      total: sourceItems.reduce((sum, item) => sum + item.totalPrice, 0),
      items: sourceItems.map((item) => ({
        productId: item.productId,
        name: item.product.name,
        size: item.size,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
    }

    dispatch({
      type: 'PLACE_ORDER',
      payload: { order, mode },
    })

    return order
  }

  const setUser = (payload) => {
    dispatch({
      type: 'SET_USER',
      payload: payload ?? null,
    })
  }

  const logout = () => dispatch({ type: 'LOGOUT' })

  const toggleWishlist = (productId) =>
    dispatch({
      type: 'TOGGLE_WISHLIST',
      payload: productId,
    })

  const addProduct = (formValues) => {
    const product = makeProductFromForm(formValues)

    dispatch({
      type: 'ADD_PRODUCT',
      payload: product,
    })

    return product
  }

  const updateOrderStatus = ({ orderId, status }) => {
    if (!orderStatuses.includes(status)) {
      return
    }

    dispatch({
      type: 'UPDATE_ORDER_STATUS',
      payload: { orderId, status },
    })
  }

  const value = {
    categories,
    products: state.products,
    featuredProducts,
    cartItems,
    cartSubtotal,
    cartCount,
    wishlist: state.wishlist,
    wishlistProducts,
    quickBuyItem,
    orders: state.orders,
    currentUser: state.currentUser,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    beginQuickBuy,
    clearQuickBuy,
    placeOrder,
    setUser,
    logout,
    toggleWishlist,
    addProduct,
    updateOrderStatus,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => {
  const context = useContext(StoreContext)

  if (!context) {
    throw new Error('useStore must be used within StoreProvider')
  }

  return context
}
