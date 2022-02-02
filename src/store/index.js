import {
    createStore
} from 'vuex'

import {
    useCookies
} from "vue3-cookies";

const {
    cookies
} = useCookies()
const store = createStore({
    state: {
        room: null,
        userName: null,
        roomPassword: null,
    },
    getters: {
        getRoom(state) {

            return state.room || cookies.get('room')
        },

        getUserName(state) {
            return state.userName || cookies.get('userName')
        },

        getRoomPassword(state) {
            return state.roomPassword || cookies.get('roomPassword')
        }
    },
    mutations: {
        setRoom(state, room) {
            cookies.set('room', room)

            state.room = room
        },

        setUserName(state, userName) {
            cookies.set('userName', userName)
            state.userName = userName
        },
        setRoomPassword(state, roomPassword) {
            cookies.set('roomPassword', roomPassword)
            state.roomPassword = roomPassword
        },


    },
    actions: {
        logOut({}, payload) {
            cookies.remove('room')
            cookies.remove('userName')
            cookies.remove('roomPassword')
            this.commit('setRoom', null)
            this.commit('setUserName', '')
            this.commit('setRoomPassword', '')
        
        }

    },

})

export default store