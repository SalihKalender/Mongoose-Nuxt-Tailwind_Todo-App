export const state = () => {
    return {
        Todos: null,
    }
}

export const getters = {
    get_Todos(state) {
        return state.Todos;
    }
}

export const mutations = {
    set_Todos(state,payload) {
        state.Todos = payload;
    },
    add_Todo(state,payload) {
        state.Todos.push(payload);
    },
    delete_Todo(state,payload) {
        const index = state.Todos.findIndex(todo => todo.id == payload);
        state.Todos.splice(index,1);
    },
    update_Todo(state,payload) {
        const index = state.Todos.findIndex(todo => todo._id == payload.id);
        state.Todos[index].description = payload.description;
    }
}

export const actions = {
    async nuxtServerInit(vuex_Context,nuxt_Context) {
        const response = await nuxt_Context.$axios.$get('/api/todo-list');
        vuex_Context.commit('set_Todos',response.data);
    }
}