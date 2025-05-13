fetch('http://localhost:8080/users/verify', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: 'emestudi' }) // Cambia 'acme' por el username que quieras probar
})
    .then(res => {
        // console.log('HTTP Status:', res.status);
        // console.log('Headers:', [...res.headers]);

        const { status } = res;

        if (status === 200) {
            return res.json()
                .then(body => console.log('✅ OK', status, body))
                .catch(() => console.log('No JSON in response'));
        }

        return res.json()
            .then(body => console.log('❌ KO', status, body))
            .catch(() => console.log('No JSON in response'));
    })
    .catch(error => console.error('❌ Fetch error:', error));
