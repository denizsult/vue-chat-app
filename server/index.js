const app = require('express')();
const socket = require('socket.io');
const http = require('http').createServer(app);
const port = process.env.PORT || 5000;
const {
    addUser,
    getUser,
    deleteUser,
    getUsers
} = require('./users')
const rooms = [

    {
        id: 1,
        name: 'Genel',
        description: 'Genel Sohbet Odası',
        users: [],
        status: 'open',
        hasPassword: false,
    },
    {
        id: 2,
        name: 'Vue.js',
        description: 'Vue.Js Sohbet Odası',
        users: [],
        status: 'open',
        hasPassword: true,
        password: '123'

    },
    {
        id: 3,
        name: 'React.js',
        description: 'React.Js Sohbet Odası',
        users: [],
        status: 'open',
        hasPassword: false,

    },
    {
        id: 4,
        name: 'Node.js',
        description: 'Node.Js Sohbet Odası',
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


const returnRooms = () => {
    let getRooms = rooms.map(room => {
        return {
            id: room.id,
            name: room.name,
            description: room.description,
            status: room.status,
            hasPassword: room.hasPassword,
            users: room.users.length
        }
    })


    return getRooms;

}



io.on('connection', (socket) => {

    socket.on('joinRoom', (data, callback) => {
        const room = rooms[data.room.id - 1]
        const {
            user,
            error,
            type
        } = addUser(socket.id, data.userName, room, data.password);

        if (error) return callback({
            type,
            error
        })

        socket.join(user.room)

        socket.in(data.room.name).emit('notification', {
            title: 'Someone\'s here',
            description: `${user.name} just entered the room`,
            isEnter: true
        })

        io.in(data.room.name).emit('users', getUsers(data.room.name))

        rooms[data.room.id - 1].users.push(user)

        delete rooms.password
        socket.broadcast.emit('rooms', returnRooms())

        return callback({
            'success': true,
            room
        })


    })



    socket.on('leaveRoom', (data, callback) => {
        const user = deleteUser(socket.id)
        if (user) {
            io.in(user.room).emit('notification', {
                title: 'Someone just left',
                description: `${user.name} just left the room`,
                isEnter: false
            })
            io.in(user.room).emit('users', getUsers(user.room))
            //delete user
            rooms[user.room_id - 1].users = rooms[user.room_id - 1].users.filter(user => user.id !== socket.id)

            socket.broadcast.emit('rooms', returnRooms())
        }
    })





    socket.on('sendMessage', message => {
        const user = getUser(socket.id)

        io.in(user.room).emit('message', {
            user: user.name,
            text: message,
            room: user.room,
            room_id: user.room_id
        });
    })



    socket.on("disconnect", () => {
        console.log("User disconnected");
        var userData = getUser(socket.id)
        rooms.filter(room => room.users.includes(userData) && room.users.splice(room.users.indexOf(userData), 1))
        const user = deleteUser(socket.id)


        if (user) {
            io.in(user.room).emit('notification', {
                title: 'Someone just left',
                description: `${user.name} just left the room`
            })
            io.in(user.room).emit('users', getUsers(user.room))
        }

        socket.broadcast.emit('rooms',  returnRooms())

    })



    socket.on('getRooms', (callback) => {
        return callback({
            data: returnRooms()

        })
    })


    socket.on('getRoom', (data, callback) => {
        const room = rooms[data - 1]

        if (room) {
            return callback({
                room
            })
        }
    })

})
