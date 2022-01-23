const app = require('express')();
const socket = require('socket.io');
const http = require('http').createServer(app);
const port = process.env.PORT || 5000;

const rooms = [{
        id: 1,
        name: 'room1',
        description: 'room1 description',
        users: [],
        status: 'open',
        hasPassword: false,
    },
    {
        id: 2,
        name: 'room2',
        description: 'room2 description',
        users: [],
        status: 'open',
        hasPassword: true,
        password: '123'

    },
    {
        id: 3,
        name: 'room3',
        description: 'room3 description',
        users: [],
        status: 'open',
        hasPassword: false,

    },
    {
        id: 4,
        name: 'room4',
        description: 'room4 description',
        users: [],
        status: 'closed',
        hasPassword: false,


    }

];

http.listen(port, () => {
    console.log(`listening on ${port}`);
});


const io = socket(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "OPTIONS"]
    }
});


io.on('connection', (socket) => {
    console.log('Client connected');


    socket.on('joinRoom', (data) => {

        socket.join(data.room.id);

        if(data.room.hasPassword){
            

        }


    })

    socket.emit('getRooms', rooms.map(room => {
        return {
            id: room.id,
            name: room.name,
            description: room.description,
            users: room.users.length,
            status: room.status,
            hasPassword: room.hasPassword,
        }
    }));


})