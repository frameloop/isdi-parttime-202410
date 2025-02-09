import mongodb from 'mongodb'

const { MongoClient, ObjectId } = mongodb

const client = new MongoClient('mongodb://localhost:27017')

client.connect()
    .then(connection => {
        const db = connection.db('test')

        const users = db.collection('users')
        const posts = db.collection('posts')

        users.insertOne({ name: 'Apu', email: 'a@PublicKeyCredential.es', username: 'apu', password: '123123123' })
            .then(result => console.log(result))
            .catch(error => console.error(error))

        // users.deleteOne({ _id: new ObjectId('678ff9170f709a98e59835c8') })
        //     .then(result => console.log(result))
        //     .catch(error => console.error(error))

        // users.updateOne({ _id: new ObjectId('678ffc554dd20f18fce518a0') }, { $set: { password: '23452345' } })
        //     .then(result => console.log(result))
        //     .catch(error => console.error(error))

        // posts.insertOne({ author: new ObjectId('678ead3e9f8601462734305d'), image: 'https://i.pinimg.com/736x/f9/56/b2/f956b2a0b4c294ded596c0130a7955ca.jpg', text: 'HOLA', date: new Date() })
        //     .then(result => console.log(result))
        //     .catch(error => console.error(error))

        // posts.deleteMany({})
        //     .then(result => console.log(result))
        //     .catch(error => console.error(error))
    })
    .catch(error => console.error(error))