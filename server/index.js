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

    socket.on('joinRoom', (data, callback) => {
        const room = rooms[data.room.id - 1]
        const {
            user,
            error,
            type
        } = addUser(socket.id, data.userName, data.room.name, room);

        if (error) return callback({
            type,
            error
        })


        if (rooms[data.room.id - 1].hasPassword) {
            if (rooms[data.room.id - 1].password !== data.password) {
                return callback({
                    type: "password",
                    error: "Wrong Password"
                })
            }


        }


        socket.join(user.room)





        socket.in(data.room.name).emit('notification', {
            title: 'Someone\'s here',
            description: `${user.name} just entered the room`
        })

        io.in(data.room.name).emit('users', getUsers(data.room.name))

        rooms[data.room.id - 1].users.push(user)


        socket.broadcast.emit('rooms', rooms)

        return callback('success')






    })

    socket.on('leaveRoom', (data, callback) => {
        const user = deleteUser(socket.id)
        if (user) {
            io.in(user.room).emit('notification', {
                title: 'Someone just left',
                description: `${user.name} just left the room`
            })
            io.in(user.room).emit('users', getUsers(user.room))
            //delete user
            rooms[user.room_id - 1].users = rooms[user.room_id - 1].users.filter(user => user.id !== socket.id)

            socket.broadcast.emit('rooms', rooms)
        }
    })





    socket.on('sendMessage', message => {
        const user = getUser(socket.id)

        io.in(user.room).emit('message', {
            user: user.name,
            text: message,
            room: user.room
        });
    })




    socket.on("disconnect", () => {
        console.log("User disconnected");
        const user = deleteUser(socket.id)
        if (user) {
            io.in(user.room).emit('notification', {
                title: 'Someone just left',
                description: `${user.name} just left the room`
            })
            io.in(user.room).emit('users', getUsers(user.room))
        }
    })



    socket.emit('getRooms', rooms.map(room => {
        return {
            id: room.id,
            name: room.name,
            description: room.description,
            users: room.users,
            status: room.status,
            hasPassword: room.hasPassword,
        }
    }));


})