import api from '../../apis/shop';

const state = {
  all: []
};

const getters = {};

const mutations = {
  setProducts (state, products) {
    state.all = products
  },
  decrementProductInventory (state, {id}) {
    const product = state.all.find(product => product.id === id)
    product.inventory--
  }
};

const actions = {
  getAllProducts({commit}) {
    api.getProducts(products => {
      commit('setProducts', products)
    })
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
