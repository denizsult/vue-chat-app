import {
    createStore
} from 'vuex'

const store = createStore({
    state: {
        room: null
    },
    getters: {
        getRoom(state) {
            return state.room
        }
    },
    mutations: {
        setRoom(state, room) {
            state.room = room
        }
    },
    actions: {},

})

export default store