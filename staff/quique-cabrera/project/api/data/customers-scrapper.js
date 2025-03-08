// 🔄 Limpiar la consola al ejecutar el script
console.clear();

// 🏷️ Selecciona todos los elementos que representan clientes en la página
const clientItems = document.querySelectorAll('.client-item');

// 📋 Array donde se almacenarán los datos extraídos de cada cliente
const clients = [];

// 🏃‍♂️ Iterar sobre cada elemento de cliente en la lista
clientItems.forEach(clientItem => {
    console.log('🔍 Procesando cliente:', clientItem); // 📌 Verificar cada cliente procesado

    // 📌 Objeto donde se almacenarán los datos del cliente actual
    const client = {};

    // 📌 Extraer el nombre y la dirección del cliente
    const name = clientItem.querySelector('h5').textContent;
    const address = clientItem.querySelector('h6').textContent;
    console.log('📛 Nombre:', name, '| 📍 Dirección:', address); // 📌 Log de nombre y dirección

    // 📌 Extraer la información de contacto
    const contact = clientItem.querySelector('.both');
    const [phoneAnchor, emailAnchor] = contact.querySelectorAll('a');
    const phone = phoneAnchor.textContent;
    const email = emailAnchor.textContent;
    console.log('📞 Teléfono:', phone, '| 📧 Email:', email); // 📌 Log de contacto

    // 📌 Extraer información de tours asociados al cliente
    const tours = [];
    const toursTypes = clientItem.querySelector('.tour-types').querySelectorAll('small');

    toursTypes.forEach(tourType => {
        const type = tourType.className.replace('n_tour_', ''); // 📌 Limpiar el nombre de la clase
        const value = tourType.textContent; // 📌 Extraer el valor

        const tour = {
            type: type,
            value: Number(value) // 📌 Convertir el valor a número
        };

        tours.push(tour);
    });

    console.log('🎟️ Tours:', tours); // 📌 Log de los tours asociados al cliente

    // 📌 Asignar los valores extraídos al objeto cliente
    client.name = name;
    client.address = address;
    client.phone = phone;
    client.email = email;
    client.tours = tours;

    // 📌 Agregar el cliente al array de clientes
    clients.push(client);
});

// 📌 Mostrar los datos recopilados en formato JSON
console.log('✅ Clientes extraídos:', JSON.stringify(clients, null, 2));
