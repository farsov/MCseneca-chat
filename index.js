/*const seneca = require('seneca')
const config = require('./config/seneca.json')
const clientsChat = seneca(config)

clientsChat.client({
    host: 'localhost',
    port: 4001,
    pin: 'role:chats'
})

/* Obtener todos los datos 
clientsChat.act('role:chats, cmd:getAll', (err, result) => {
    console.log('result:getAll => ', result)
})*/