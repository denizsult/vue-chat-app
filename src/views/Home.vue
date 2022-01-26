<template>
    <div
        class="lg:min-h-230 md:min-h-200 sm:min-h-260 bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8"
    >
        <header-vue />
        <component
            :is="activeComponent"
            :getRooms="rooms"
            @getRooms="setRooms"
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


export default {
    components: {
        loginVue,
        chatVue,
        roomsVue,
        footerVue,
        headerVue
    },
    data() {
        return {
            activeComponent: 'roomsVue',
            rooms: []
        }
    },

    methods: {
        newComponent(e) {
            this.activeComponent = e;
        },

        setRooms(e) {
            this.rooms = e;
        }

    },

    mounted() {
        this.$io.on('getRooms', (data) => {
            this.rooms = data;
        });

        this.$io.on('notification', data => {
            console.log('notifi', data);
        });

        this.$io.on('users', (data) => {
            console.log('users', data);
        });
    },





}


</script>

