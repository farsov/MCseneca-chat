const firebaseAdmin = require('firebase-admin');
const db = firebaseAdmin.firestore();
const bcrypt = require('bcrypt')

module.exports = function () {
    const seneca = this

    seneca.add('role:users, cmd:getTypeall', async (payload, reply) => {
        try {
            const usersRef = await db.collection('type_user').get()
            const users = await usersRef.docs.map(user => { return { id: user.id, ...user.data() } })
            reply(null, users)
        } catch (error) {
            reply(error)
        }
    })

    seneca.add('role:users, cmd:addUsers', async (payload, reply) => {
        try {
            const { args } = payload;
            const userRef = await db.collection('users').add(args);
            const userDoc = await db.collection('users').doc(userRef.id).get();
            reply(null, { ...userDoc.data(), ...{ id: userRef.id } });
        } catch (error) {
            reply(error)
        }
    })

    seneca.add('role:users, cmd:login', async (payload, reply) => {
        try {
            const { args } = payload
            const userQuery = await db.collection("users").where("username", "==", args.username).get()
            if (userQuery) {
                const userId = userQuery.docs[0].data()
                const passwordRight = await bcrypt.compare(args.password, userQuery.docs[0].data().password)
                const result = (passwordRight) ? userId : false
                
                reply(null, result)
            }

        } catch (error) {
            reply(error)
        }
    })

}