import fs from 'fs'

import mongoose from 'mongoose'
import { User, Customer, Service } from './models.js'

mongoose.connect('mongodb://localhost:27017/test')
    // .then(() => Promise.all([User.deleteMany(), Customer.deleteMany()]))
    .then(() => mongoose.connection.dropDatabase())
    .then(() => {
        const customersJson = fs.readFileSync('./data/customers.json', 'utf8')
        const customers = JSON.parse(customersJson)

        const photographersJson = fs.readFileSync('./data/photographers.json', 'utf8')
        const photographers = JSON.parse(photographersJson)

        const administratorsJson = fs.readFileSync('./data/administrators.json', 'utf8')
        const administrators = JSON.parse(administratorsJson)

        const promises = []

        customers.forEach(customer => {
            const user = new User({
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
                username: customer.name.replace(/.*\((\d+)\).*/, "$1"),
                password: 'S3s10n4!',
                role: 'customer'
            })

            promises.push(user.save())

            const customer2 = new Customer({
                user: user._id,
                address: customer.address
            })

            customer.tours.forEach(tour => {
                const service = new Service({
                    name: tour.type,
                    quantity: tour.value
                })

                customer2.services.push(service)
            })

            promises.push(customer2.save())
        })

        photographers.forEach(photographer => {
            const user = new User({
                name: photographer.name,
                email: photographer.email,
                phone: photographer.phone,
                username: photographer.username,
                password: '123123123',
                role: 'photographer'
            })
            promises.push(user.save())
        })

        administrators.forEach(administrator => {
            const user = new User({
                name: administrator.name,
                email: administrator.email,
                phone: administrator.phone,
                username: administrator.username,
                password: '123123123',
                role: 'administrator'
            })
            promises.push(user.save())
        })

        return Promise.all(promises)
    })

    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())