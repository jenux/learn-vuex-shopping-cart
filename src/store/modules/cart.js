import api from '../../apis/shop';

// shape: [{id, quantity}]
const state = {
  items: [],
  checkoutStatus: null
};

const getters = {
  cartProducts: (state, getters, rootState) => {
    return state.items.map(({id, quantity}) => {
      const product = rootState.products.all.find(product => product.id === id)
      return {
        id,
        title: product.title,
        price: product.price,
        quantity
      }
    })
  },
  totalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  }
}

const mutations = {
  addToCart (state, {id}) {
    state.items.push({
      id,
      quantity: 1
    })
  },
  incrementItemQuantity (state, {id}) {
    let item = state.items.find(item => item.id === id)
    item.quantity++
  },
  decrementItemQuantity (state, {id}) {
    let item = state.items.find(item => item.id === id)
    item.quantity--
  },
  deleteFromCart (state, {id}) {
    let index = state.items.findIndex(item => item.id === id)
    if (index >= 0) {
      state.items.splice(index, 1)
    }
  },
  setCartItems (state, items) {
    state.items = items
  },
  setCheckoutStatus (state, status) {
    state.checkoutStatus = status
  }
};

const actions = {
  addToCart ({state, commit}, product) {
    commit('setCheckoutStatus', null)
    if (product.inventory > 0) {
      const item = state.items.find(item => item.id === product.id)
      if (!item) {
        commit('addToCart', product)
      } else {
        commit('incrementItemQuantity', {id: product.id})
      }
    }
  },
  incrementItemQuantity ({commit, rootState}, product) {
    commit('setCheckoutStatus', null)
    const productItem = rootState.products.all.find(item => item.id === product.id)
    const item = state.items.find(item => item.id === product.id)
    if (item) {
      if (item.quantity + 1 <= productItem.inventory) {
        commit('incrementItemQuantity', product)
      } else {
        alert('too much')
      }
    }
  },
  decrementItemQuantity ({state, commit}, product) {
    commit('setCheckoutStatus', null)
    const item = state.items.find(item => item.id === product.id)
    if (item) {
      if (item.quantity <= 1) {
        commit('deleteFromCart', product)
      } else {
        commit('decrementItemQuantity', product)
      }
    }
  },
  deleteFromCart ({commit}, product) {
    commit('setCheckoutStatus', null)
    commit('deleteFromCart', product)
  },
  checkout ({commit, state}, products) {
    const savedItems = [...state.items];
    commit('setCheckoutStatus', null)
    commit('setCartItems', [])

    api.buyProducts(
      products, 
      () => commit('setCheckoutStatus', 'successful'),
      () => {
        commit('setCheckoutStatus', 'failed')
        commit('setCartItems', savedItems)
      }
    )
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
