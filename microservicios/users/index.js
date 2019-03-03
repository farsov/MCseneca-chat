const firebaseAdmin = require('firebase-admin')

const serviceAccount = require("../../config/firebase.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://proyectodevhack.firebaseio.com"
});

const seneca = require('seneca')
const chats = require('./actions')
const config = require('../../config/seneca.json')
const PORT = process.env.PORT || 4002

const server = seneca(config)

server.use(chats)
    .listen({type: 'http', port: PORT, pin:'role:users'})