<template>
    <notification-vue :data="description" v-if="noti" />
    <div class="lg:min-h-230 bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8">
        <header-vue />
        <component
            :is="activeComponent"
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
        if (this.$cookies.get('room') && this.$cookies.get('userName')) {
            let room = this.$cookies.get('room');
            let userName = this.$cookies.get('userName');
            let roomPassword = this.$cookies.get('roomPassword');

            this.$io.emit('joinRoom', {
                room,
                userName,
                roomPassword
            }, (data) => {
                if (data.success) {
                    this.activeComponent = 'chatVue';
                }
            });
        }

    },


}


</script>

