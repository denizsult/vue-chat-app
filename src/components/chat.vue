<template>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-300">
        <div class="flex justify-evenly mb-4">
            <h1 class="font-bold text-2xl">Users: {{ room.users.length }}</h1>
            <h1 class="font-bold text-2xl">Room: {{ room.name }}</h1>
        </div>

        <div class="bg-white py-10 px-6 shadow rounded-lg sm:px-10 h-100">
            <div
                id="chatBox"
                class="flex flex-col items-stretch overflow-auto h-full scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
            >
                <div class="chat-message mt-2" v-for="message in receivedMessages" :key="message">
                    <div
                        :class="message.user == $store.getters.getUserName ? 'flex items-end justify-end' : 'flex items-end justify-start'"
                    >
                        <div
                            :class="message.user == $store.getters.getUserName ? 'flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end' : ' flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start'"
                        >
                            <div>
                                <span
                                    class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600"
                                >{{ message.text }}</span>
                            </div>
                            <small>{{ message.user }}</small>
                        </div>
                        <img
                            src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                            alt="My profile"
                            class="w-6 h-6 rounded-full order-1"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-10">
            <form @submit.prevent="sendMessage">
                <input
                    type="text"
                    :class="'w-full my-8 py-2 px-4 border border-transparent rounded-md shadow-sm focus:outline-blue-300 focus:shadow-outline ' + (msgError ? ' border-red-500' : '')"
                    placeholder="Please insert a message"
                    v-model="message"
                />

                <button
                    type="submit"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >Send Message</button>

                <a
                    @click="logOut"
                    class="flex justify-center py-2 px-4 mt-5 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-red-500 cursor-pointer hover:bg-red-700"
                >Leave Room</a>
            </form>
        </div>
    </div>
</template>

<script>

export default {

    data() {
        return {
            receivedMessages: [],
            room: this.$store.getters.getRoom,
            message: '',
            msgError: false,

        }
    },

    mounted() {
        this.$io.on('message', async (data) => {
            this.receivedMessages.push(await data);
        })

        this.$io.on('notification', (data) => {
            this.$emit('description', data);
            this.getRoom()

        });

    },

    methods: {
        sendMessage() {
            if (this.message != '') {
                this.$io.emit('sendMessage', this.message)
                this.message = ''
                setTimeout(() => {
                    var container = document.getElementById('chatBox');
                    container.scrollTop = container.scrollHeight;
                }, 100)


            } else {
                this.msgError = true;
            }

        },

        logOut() {
            this.$store.dispatch('logOut')
            this.$io.emit('leaveRoom')
            this.$emit('changeComponent', 'roomsVue')
        },

        getRoom() {
            this.$io.emit('getRoom', this.room.id, (data) => {
                this.room = data.room
            })

        }
    }

}
</script>





