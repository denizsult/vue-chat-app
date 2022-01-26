const users = []

const addUser = (id, name, room) => {
    const existingUser = users.find(user => user.name.trim().toLowerCase() === name.trim().toLowerCase())

    if (existingUser) return {
        type: "name",
        error: "Username has already been taken"
    }

    if (room.hasPassword) {

    }

    if (!name && !room) return {
        error: "Username and room are required"
    }
    if (!name) return {
        type: "name",
        error: "Username is required"
    }
    if (!room) return {
        error: "Room is required"
    }

    const user = {
        id,
        name,
        room:room.name,
        room_id:room.id
    }
    users.push(user)
    return {
        user
    }
}

const getUser = id => {
    let user = users.find(user => user.id == id)
    return user
}

const updateUser = (id, name, room) => {
    const user = getUser(id)
    if (!user) return {
        error: "User not found"
    }

    if (user.name.trim().toLowerCase() === name.trim().toLowerCase()) {
        user.name = name
        user.room = room,
            user.room_id = room.id
        return {
            user
        }
    }


}

const deleteUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) return users.splice(index, 1)[0];
}

const getUsers = (room) => users.filter(user => user.room === room)

module.exports = {
    addUser,
    getUser,
    deleteUser,
    getUsers,
    updateUser
}