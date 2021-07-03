import { createStore } from 'vuex'

export default createStore({
  state: {
    cartList:[]
  },
  mutations: {
    addCounter(state,index){
      state.cartList[index].count += 1
    },
    addToCart(state,goods){
      state.cartList.push(goods)
    }
  },
  actions: {
    addCart({state, commit}, info) {
      return new Promise((resolve) => {
        // 1.查看该商品是否已经添加到cartList中
        const oldInfo = state.cartList.find(item => item.iid === info.iid)
  
        // 2.如果oldInfo存在, 那么原来的数量加1
        if (oldInfo) {
          const index = state.cartList.indexOf(oldInfo)
          commit('addCounter', index)
        } else {
          info.count = 1
          info.checked = true
          commit('addToCart', info)
        }
  
        resolve()
      })
    }
  },
  modules: {
  }
})
