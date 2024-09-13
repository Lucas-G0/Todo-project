import { createStore } from 'vuex'
import axios from 'axios';
const axiosLink = 'http://localhost:3000'

export default createStore({
  state: {
    todos: []
  },
  mutations: {
    storeTodos(state, payload){
      state.todos = payload;
    },
    storeTodo(state, payload){
      const index = state.todos.findIndex(todo => todo.id === payload.id)
      if (index >= 0) {
        state.todos.splice(index, 1, payload)
      } else {
        state.todos.unshift(payload)
      }
    },
    deleteTodo(state, id){
      state.todos = state.todos.filter(todo => todo.id !== id)
    }
  },
  getters: {
  },
  actions: {
    getTodos({commit}){
      return new Promise (resolve => {
        setTimeout(() => {
          return axios.get(`${axiosLink}/todos`)
          .then(response => {
            commit('storeTodos', response.data),
            resolve()
          })
        }, 1000)
      })
    },
    addTodo({commit}, data){
      return axios.post(`${axiosLink}/todos`, data).then(response =>{
        commit('storeTodo', response.data)
      })
    },
    updateTodo({commit}, {id, data}){
      return axios.put(`${axiosLink}/todos/${id}`, data).then(response => {
        commit('storeTodo', response.data)
      })
    },
    deleteTodo({commit}, id){
      return axios.delete(`${axiosLink}/todos/${id}`).then(() =>{
        commit('deleteTodo', id)
      })
    }
    
  },
  modules: {
  }
})
