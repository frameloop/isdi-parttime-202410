import mongoose from 'mongoose'
import fs from 'fs'
import { User, Customer, Service } from './models.js'

mongoose.connect('mongodb://localhost:27017/test')
    .then(() => Promise.all([User.deleteMany(), Customer.deleteMany(), Service.deleteMany()]))
    .then(() => {
        const customersJson = fs.readFileSync('./data/customers.json', 'utf8')
        const customers = JSON.parse(customersJson)

        const promises = []

        customers.forEach(customer => {
            const user = new User({
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
                password: '123123123',
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
        });
        return Promise.all(promises)
    })

    .catch(error => console.error(error))