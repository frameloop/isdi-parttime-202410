console.clear()

const clientItems = document.querySelectorAll('.client-item')

const clients = []

clientItems.forEach(clientItem => {
    const client = {}

    const name = clientItem.querySelector('h5').textContent
    const address = clientItem.querySelector('h6').textContent

    const contact = clientItem.querySelector('.both')
    const [phoneAnchor, emailAnchor] = contact.querySelectorAll('a')
    const phone = phoneAnchor.textContent
    const email = emailAnchor.textContent


    const tours = []
    const toursTypes = clientItem.querySelector('.tour-types').querySelectorAll('small')
    toursTypes.forEach(tourType => {
        const type = tourType.className.replace('n_tour_', '')
        const value = tourType.textContent

        const tour = {}
        tour.type = type
        tour.value = Number(value)
        tours.push(tour)
    })


    client.name = name
    client.address = address
    client.phone = phone
    client.email = email
    client.tours = tours

    clients.push(client)
})

//console.log(clients)
console.log(JSON.stringify(clients))