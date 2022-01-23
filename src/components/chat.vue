<template>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-300">
        <div class="bg-white py-10 px-6 shadow rounded-lg sm:px-10 h-100">
            <h1 class="text-center font-bold text-2xl">Room: XX</h1>

            <div
                class="flex flex-col items-stretch overflow-auto h-full scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
            >
                <div class="chat-message mt-2" v-for="message in receivedMessages" :key="message">
                    <div class="flex items-end">
                        <div
                            class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start"
                        >
                            <div>
                                <span
                                    class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600"
                                >{{ message }}</span>
                            </div>
                            <small>Deniz</small>
                        </div>
                        <img
                            src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                            alt="My profile"
                            class="w-6 h-6 rounded-full order-1"
                        />
                    </div>
                </div>

                <div class="chat-message mt-2" v-for="myMessage in myMessages" :key="myMessage">
                    <div class="flex items-end justify-end">
                        <div
                            class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end"
                        >
                            <div>
                                <span
                                    class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white"
                                >{{ myMessage }}</span>
                            </div>
                        </div>
                        <img
                            src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                            alt="My profile"
                            class="w-6 h-6 rounded-full order-2"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-10">
            <input type="text" name id />

            <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >Send Message</button>

            <a
                @click="$emit('changeComponent', 'roomsVue')"
                class="flex justify-center py-5 px-4 text-sm font-medium text-blue cursor-pointer"
            >Log out</a>
        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
            myMessages: ['xd', 'za'],
            receivedMessages: ['Aynen Kanka', '31', 'Aynen Kanka', '31', 'Aynen Kanka', '31', 'Aynen Kanka', '31', 'Aynen Kanka', '31', 'Aynen Kanka', '31', 'Aynen Kanka', '31', 'Aynen Kanka', '31', 'Aynen Kanka', '31', 'Aynen Kanka', '31', 'Aynen Kanka', '31',],
            rooms: []
        }
    },


}
</script>





<style>
.scrollbar-w-2::-webkit-scrollbar {
    width: 0.25rem;
    height: 0.25rem;
}

.scrollbar-track-blue-lighter::-webkit-scrollbar-track {
    --bg-opacity: 1;
    background-color: #f7fafc;
    background-color: rgba(247, 250, 252, var(--bg-opacity));
}

.scrollbar-thumb-blue::-webkit-scrollbar-thumb {
    --bg-opacity: 1;
    background-color: #edf2f7;
    background-color: rgba(237, 242, 247, var(--bg-opacity));
}

.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
    border-radius: 0.25rem;
}
</style>