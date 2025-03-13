// Limpiar la consola al ejecutar el script
console.clear();

const clientItems = document.querySelectorAll('.client-item');
const clients = [];

clientItems.forEach(clientItem => {
    console.log('Procesando cliente:', clientItem);

    const client = {};

    const name = clientItem.querySelector('h5').textContent;
    const address = clientItem.querySelector('h6').textContent;
    console.log('Nombre:', name, '| Dirección:', address);

    const contact = clientItem.querySelector('.both');
    const [phoneAnchor, emailAnchor] = contact.querySelectorAll('a');
    const phone = phoneAnchor.textContent;
    const email = emailAnchor.textContent;
    console.log('Teléfono:', phone, '| Email:', email);

    const tours = [];
    const toursTypes = clientItem.querySelector('.tour-types').querySelectorAll('small');

    toursTypes.forEach(tourType => {
        const type = tourType.className.replace('n_tour_', '');
        const value = Number(tourType.textContent);

        tours.push({ type, value });
    });

    console.log('Tours:', tours);

    client.name = name;
    client.address = address;
    client.phone = phone;
    client.email = email;
    client.tours = tours;

    clients.push(client);
});

console.log('Clientes extraídos:', JSON.stringify(clients, null, 2));
