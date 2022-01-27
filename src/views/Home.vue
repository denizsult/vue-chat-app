<template>
    <notification-vue :data="description" v-if="noti" />
    <div
        class="lg:min-h-230 md:min-h-200 sm:min-h-260 bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8"
    >
        <header-vue />
        <component
            :is="activeComponent"
            :getRooms="rooms"
            @getRooms="setRooms"
            @description="setDescription"
            @changeComponent="newComponent"
        />
    </div>
    <footer-vue />
</template>



<script>
import loginVue from '../components/login.vue';
import chatVue from '../components/chat.vue';
import roomsVue from '../components/rooms.vue';
import footerVue from '../components/footer.vue';
import headerVue from '../components/header.vue';
import notificationVue from '../components/notification.vue';


export default {
    components: {
        loginVue,
        chatVue,
        roomsVue,
        footerVue,
        headerVue,
        notificationVue
    },

    data() {
        return {
            activeComponent: 'roomsVue',
            rooms: [],
            noti: false,
            description: ''
        }
    },

    methods: {
        newComponent(e) {
            this.activeComponent = e;
        },

        setRooms(e) {
            this.rooms = e;
        },

        setDescription(e) {
            this.noti = true
            this.description = e;
            setTimeout(() => {
                this.noti = false
            }, 3000)
        },

    },

    unmounted() {
        this.$io.emit('disconnect');
    },

    mounted() {
        this.$io.on('getRooms', (data) => {
            this.rooms = data;
        });

        this.$io.on('users', (data) => {
            console.log('users', data);
        });
    },





}


</script>

